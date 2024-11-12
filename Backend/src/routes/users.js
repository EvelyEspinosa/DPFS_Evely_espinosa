const express = require('express');
const userController = require('../../src/controllers/usersController');
const {authMiddleware} = require('../middlewares/authMiddleware')
const { createUserValidations, loginValidations,checkIfNotRegistered } = require('../middlewares/usersValidations');

const router = express.Router();

router.get('/users', loginValidations, userController.getAllUsers);
router.post('/users/create', createUserValidations, userController.createUser); 
router.get('/users/:id', checkIfNotRegistered, userController.getUserById); 
router.put('/users/:id', userController.updateUser); 
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
