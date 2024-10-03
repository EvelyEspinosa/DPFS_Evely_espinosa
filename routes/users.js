const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const userController = require('../controllers/usersController');

router.get('/users', userController.getAllUsers);
router.post('/users/create', userController.createUser); 
router.get('/users/:id', userController.getUserById); 
router.put('/users/:id', userController.updateUser); 
router.delete('/users/:id', userController.deleteUser);

router.post('/register', [
    body('name')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
    body('email')
        .isEmail().withMessage('Debe proporcionar un correo electrónico válido'),
    body('password')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('confirmPassword')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Las contraseñas no coinciden');
            }
            return true;
        })
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
});

module.exports = router;
