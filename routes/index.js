var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Ely Shopping' });
});

router.get('/users', function( req, res, next){
  res.render('users', { title: 'Usuarios' });
});

router.get('/product', function( req, res, next){
  res.render('products', { title: 'Productos' });
});

router.get('/cart', function( req, res, next){
  res.render('cart', { title: 'Carrito de compra' });
});

router.get('/login', function( req, res, next){
  res.render('login', { title: 'Ingresar' });
});

router.get('/register', function( req, res, next){
  res.render('register', { title: 'Registrarse' });
});
module.exports = router;
