var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    res.render('index', { title: 'Ely Shopping',styles: ['/css/style.css'] });
  } catch (error) {
    next(error); // Pasar el error al middleware de manejo de errores
  }
});


router.get('/cart', (req, res) => {
  res.render('cart', {
    title: 'Carrito de compra',
    styles: ['/css/cart.css']
  });
});

router.get('/product', (req, res) => {
  res.render('product', {
    title: 'Productos',
    styles: ['/css/product.css']
  });
});

router.get('/register', (req, res) => {
  res.render('register', {
    title: 'Registrarse',
    styles: ['/css/register.css']
  });
});

router.get('/login', (req, res) => {
  res.render('login', {
    title: 'Iniciar Sesión',
    styles: ['/css/login.css']
  });
});

router.get('/list', (req, res) => {
  res.render('list', {
    title: 'Lista de Productos',
    styles: ['/css/list.css']
  });
});

router.get('/users', (req, res) => {
  res.render('users', {
    title: 'Usuarios',
    styles: ['/css/users.css']
  });
});

router.get('/register', (req, res) =>{
  res.render('register.ejs');
});

router.get('/product', (req, res) =>{
  res.render('product.ejs');
});

router.get('/login', (req, res) =>{
  res.render('login.ejs');
});

router.get('/cart', (req, res) =>{
  res.render('cart.ejs');
});

router.get('/create', (req, res) =>{
  res.render('create.ejs');
});

router.get('/edit', (req, res) =>{
  res.render('edit.ejs');
});

router.get('/users', (req, res) =>{
  res.render('users.ejs');
});

module.exports = router;
