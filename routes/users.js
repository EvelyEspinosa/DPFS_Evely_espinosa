var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const usersFilePath = require(path.join(__dirname, '../data/users.json'));

 const getUsers = (req, res) => {
  const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
  res.render('users', { users });
};

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users');
});

router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Ely Shopping',
    description: 'La mejor tienda de compras en línea',
    keywords: 'compras, tienda, moda, electrónica'
  });
});

// Obtener un usuario por ID
router.get('/:id', function(req, res, next) {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('Usuario no encontrado');
  res.json(user);
});

// Crear un nuevo usuario
router.post('/', function(req, res, next) {
  const newUser = {
    id: users.length + 1,
    name: req.body.name
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Actualizar un usuario existente
router.put('/:id', function(req, res, next) {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('Usuario no encontrado');

  user.name = req.body.name;
  res.json(user);
});

// Eliminar un usuario
router.delete('/:id', function(req, res, next) {
  users = users.filter(u => u.id !== parseInt(req.params.id));
  res.status(204).send();
});

module.exports = router;
