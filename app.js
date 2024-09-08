var createError = require('http-errors');
var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const ejs = require('ejs');



// Configuracion ejs como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(bodyParser.json());


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let productRouter = require('./routes/products');
let cartRouter = require('./routes/cart')

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/product', productRouter);
app.use('/cart',cartRouter);

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