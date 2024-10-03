var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const ejs = require('ejs');
const session = require('express-session');
const bcrypt = require('bcryptjs');


// Configuracion ejs como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(session({
  secret: '1234',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const productRouter = require('./routes/products');
const cartRouter = require('./routes/cart')


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/product', productRouter);
app.use('/cart',cartRouter);


app.get('/', (req, res) => {
  res.render('index', {
    title: 'Página de Inicio',
    styles: ['../public/css/style.css']
  });
});

app.get('/cart', (req, res) => {
  res.render('cart', {
    title: 'Carrito de compra',
    styles: ['/css/cart.css']
  });
});

app.get('/register', (req, res) => {
  res.render('register', {
    title: 'Registrarse',
    styles: ['/css/register.css']
  });
});

app.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const existingUser = await ely_db.query('SELECT * FROM users WHERE email = ?', [email]);
  if (existingUser.length > 0) {
    return res.status(400).json({ message: 'El usuario ya existe' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.query('INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)', [firstName, lastName, email, hashedPassword]);

  res.status(201).json({ message: 'Usuario registrado exitosamente' });
});

app.get('/product/list', (req, res) => {
  res.render('list', {
    title: 'Lista de Productos',
    styles: ['/css/list.css']
  });
});

app.get('/users', (req, res) => {
  res.render('users', {
    title: 'Usuarios',
    styles: ['/css/users.css']
  });
});

app.get('/users/create', (req, res) => {
  res.render('users', {
    title: 'Crear Usuario',
    styles: ['/css/users.css']
  });
});
app.get('/login', (req, res) => {
  res.render('login', {
    title: 'Iniciar Sesión',
    styles: ['/css/login.css']
  });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await ely_db.query('SELECT * FROM users WHERE email = ?', [email]);
  if (user.length === 0) {
    return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
  }
  const validPassword = await bcrypt.compare(password, user[0].password);
  if (!validPassword) {
    return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
  }
  req.session.user = {
    id: user[0].id,
    name: user[0].firstName,
    lastName: user[0].lastName,
    email: user[0].email,
    role: user[0].role
  };

  res.status(200).json({ message: 'Inicio de sesión exitoso' });
});

const isAuthenticated = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'No has iniciado sesión' });
  }
  next();
};

const isAdmin = (req, res, next) => {
  if (req.session.user.role !== 'admin') {
    return res.status(403).json({ message: 'Acceso denegado' });
  }
  next();
};

app.get('/dashboard', isAuthenticated, (req, res) => {
  res.send(`Bienvenido ${req.session.user.firstName}`);
});

app.get('/admin', isAuthenticated, isAdmin, (req, res) => {
  res.send('Bienvenido al panel de administración');
});

app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error al cerrar sesión' });
    }
    res.status(200).json({ message: 'Sesión cerrada' });
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

 //error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Middleware para manejo de errores
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

app.listen(3135, () => {
  console.log('Servidor corriendo en el puerto 3135');
});

module.exports = app;