const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController.js');

// Rutas para productos
router.get('/products', productController.index);
router.get('/products/:id', productController.detail);
router.get('/create', productController.create);
router.post('/products/create', productController.store);
router.get('/:id/edit', productController.show);
router.post('/:id/edit', productController.update);
router.post('/:id/delete', productController.delete);

module.exports = router;