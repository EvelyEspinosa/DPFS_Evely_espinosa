var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    res.render('index', {
      title: 'Ely Shopping',
      styles: ['/css/style.css']
    });
  } catch (error) {
    next(error);
  }});

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

router.get('/product/list', (req, res) => {
  res.render('list', {
    title: 'Lista de Productos',
    styles: ['/css/list.css']
  });
});
router.get('/product/:id/edit', (req, res) =>{
  res.render('edit', {
    title: 'Editar Producto',
    styles: ['/css/edit-product.css']
  });
});

router.get('/product', (req, res) =>{
  res.render('product.ejs');
});
router.get('/product/:id/edit', (req, res) =>{
  res.render('edit.ejs');
});

router.get('/product/detail', (req, res) =>{
  res.render('detail.ejs');
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

router.get('/users', (req, res) => {
  res.render('users', {
    title: 'Usuarios',
    styles: ['/css/users.css']
  });
});


router.get('/register', (req, res) =>{
  res.render('register.ejs');
});

router.get('/login', (req, res) =>{
  res.render('login.ejs');
});

router.get('/cart', (req, res) =>{
  res.render('cart.ejs');
});

router.get('/users', (req, res) =>{
  res.render('users.ejs');
});

router.post('/login', [
  body('email')
      .isEmail().withMessage('Debe proporcionar un correo electrónico válido'),
  body('password')
      .notEmpty().withMessage('La contraseña es obligatoria')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }
});


module.exports = router;
