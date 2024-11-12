const express = require('express');
const router = express.Router();
const {authMiddleware} = require('../middlewares/authMiddleware')
const cartController = require('../controllers/cartController');

// Ruta para ver el carrito
router.get('/cart',authMiddleware, cartController.getCart);
router.post('/add',authMiddleware, cartController.addToCart);

module.exports = router;
