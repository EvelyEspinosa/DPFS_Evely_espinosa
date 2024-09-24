const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController.js');

// Rutas para productos
router.get('/product', productController.getAllProducts);
router.get('/product/:id', productController.getProductById);
router.get('/create', productController.createProduct);
router.post('/product/create', productController.store);
router.get('/:id/edit', productController.show);
router.post('/:id/edit', productController.update);
router.post('/:id/delete', productController.delete);

module.exports = router;