const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const productController = require('../controllers/productController');

// Rutas para productos
router.get('/product/list', productController.getAllProduct);
router.get('/product/:id', productController.showProductDetail);
router.get('/create', productController.createProduct);
router.put('/product/:id/edit', productController.updateProduct);
router.delete('/product/:id', productController.deleteProduct);

router.post('/create', [
    body('name')
        .notEmpty().withMessage('El nombre del producto es obligatorio')
        .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
    body('price')
        .isFloat({ gt: 0 }).withMessage('El precio debe ser un número positivo'),
    body('stock')
        .isInt({ min: 0 }).withMessage('El stock debe ser un número entero positivo'),
    body('category_id')
        .notEmpty().withMessage('La categoría es obligatoria')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
});

module.exports = router;