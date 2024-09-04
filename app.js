var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
const multer = require('multer');
const methodOverride = require('method-override');
const upload = multer({ dest: 'uploads/' });
const ejs = require('ejs');


// Configuracion ejs como motor de plantillas
app.set('view engine', ejs);
app.set('views', path.join(__dirname, 'views'));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/controllers/users');
let productRouter = require('./routes/controllers/products');
let cartRouter = require('./views/cart');
let loginRouter = require('./views/login');
let registerRouter = require ('./views/register');


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/product', productRouter);
app.use('/cart', cartRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);

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

const productsControlles = require('./routes/controllers/products');
// Ruta para el detalle de producto
 app.get('/products/:id', (req, res) => {
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
}),
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
  console.log(req.file);
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
// Ruta para listar todos los productos
app.get('/products', (req, res) => {
  res.render('products/index', { products });
});

// Ruta para mostrar el detalle de un producto
app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send('Producto no encontrado');
  res.render('products/detail', { product });
});

// Ruta para mostrar el formulario de creación de producto
app.get('/products/create', (req, res) => {
  res.render('products/create');
});

// Ruta para crear un nuevo producto
app.post('/products', upload.single('image'), (req, res) => {
  const newProduct = {
      id: products.length + 1,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      imagePath: req.file ? `/uploads/${req.file.filename}` : '/images/product-placeholder.jpg'
  };
  products.push(newProduct);
  res.redirect('/products');
});

// Ruta para mostrar el formulario de edición de producto
app.get('/products/:id/edit', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send('Producto no encontrado');
  res.render('products/edit', { product });
});

// Ruta para actualizar un producto
app.put('/products/:id', upload.single('image'), (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send('Producto no encontrado');
  
  product.name = req.body.name;
  product.description = req.body.description;
  product.price = req.body.price;
  if (req.file) {
      product.imagePath = `/uploads/${req.file.filename}`;
  }
  
  res.redirect('/products');
});

// Ruta para eliminar un producto
app.delete('/products/:id', (req, res) => {
  products = products.filter(p => p.id !== parseInt(req.params.id));
  res.redirect('/products');
});

module.exports = app;