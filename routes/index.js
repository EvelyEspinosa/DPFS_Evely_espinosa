var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    res.render('index');
  } catch (error) {
    next(error); // Pasar el error al middleware de manejo de errores
  }
});

router.get('/register', (req, res) =>{
  res.render('register.ejs');
});

router.get('/products', (req, res) =>{
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

router.get('/register', (req, res) => {
  res.render('register', { title: 'Registrate' });
});

router.get('/product', (req, res) => {
  res.render('products', { title: 'Productos' });
});

router.get('/users', (req, res) => {
  res.render('users', { title: 'Usuarios' });
});

router.get('/:id/edit', (req, res) => {
  res.render('edit', { title: 'Editar Producto' });
});

router.get('/create', (req, res) => {
  res.render('create', { title: 'Crear Producto' });
});

router.get('/list', (req, res) => {
  res.render('list', { title: 'Lista de productos' });
});
module.exports = router;
