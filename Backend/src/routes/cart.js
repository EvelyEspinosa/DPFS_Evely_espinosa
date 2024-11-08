const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const cartController = require('../controllers/cartController');

// Ruta para ver el carrito
router.get('/cart', cartController.getCart);
router.post('/add', cartController.addToCart);

module.exports = router;
