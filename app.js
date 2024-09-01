var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let loginRouter = require('./routes/controllers');


// Configuracion ejs como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login',loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// Controlador para la página de inicio
app.get('/', (req, res) => {
  res.render('index', { title: 'Inicio' });
});

// Ruta para el detalle de producto
app.get('/product/:id', (req, res) => {
  const product = {
      id: req.params.id,
      name: 'Producto Ejemplo',
      description: 'Descripción del producto ejemplo.',
      price: '$99.99'
  };
  res.render('product-detail', { 
      title: 'Detalle del Producto', 
      productName: product.name, 
      productDescription: product.description, 
      productPrice: product.price 
  });
});
// Ruta para el carrito de compras
app.get('/cart', (req, res) => {
  res.render('cart', { title: 'Carrito de Compras' });
});

// Ruta para la página de creación de producto
app.get('/products/create', (req, res) => {
  res.render('create-product');
});

// Ruta para procesar la creación de producto
app.post('/products', upload.single('image'), (req, res) => {
  // Aquí iría la lógica para guardar el producto en la base de datos
  console.log(req.body);
  console.log(req.file); // Información del archivo subido
  res.redirect('/products');
});

// Ruta para la página de edición de producto
app.get('/products/:id/edit', (req, res) => {
  const product = {
      id: req.params.id,
      name: 'Producto Ejemplo',
      description: 'Descripción del producto ejemplo.',
      price: '99.99',
      imagePath: '/images/product-placeholder.jpg'
  };
  res.render('edit-product', { product });
});

// Ruta para procesar la edición de producto
app.post('/products/:id', upload.single('image'), (req, res) => {
  // Aquí iría la lógica para actualizar el producto en la base de datos
  console.log(req.body);
  console.log(req.file); // Información del archivo subido
  res.redirect('/products');
});


// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000');
});

module.exports = app;
