// controllers/userController.js
const userModel = require('../models/userModel');

// Obtener todos los usuarios
const getAllUsers = (req, res) => {
    const users = userModel.readUsers();
    res.render('users', { users });
};

// Crear un nuevo usuario
const createUser = (req, res) => {
    const users = userModel.readUsers();
    const newUser = req.body; // Supone que los datos del nuevo usuario están en el body de la solicitud
    users.push(newUser);
    userModel.writeUsers(users);
    res.redirect('/users');
};

// Buscar un usuario por su ID
const getUserById = (req, res) => {
    const users = userModel.readUsers();
    const user = users.find(u => u.id === req.params.id);
    if (user) {
        res.render('userDetail', { user });
    } else {
        res.status(404).send('Usuario no encontrado');
    }
};

// Editar un usuario existente
const updateUser = (req, res) => {
    const users = userModel.readUsers();
    const userIndex = users.findIndex(u => u.id === req.params.id);
    
    if (userIndex !== -1) {
        // Actualizamos los datos del usuario
        users[userIndex] = { ...users[userIndex], ...req.body };
        userModel.writeUsers(users);
        res.redirect('/users');
    } else {
        res.status(404).send('Usuario no encontrado');
    }
};

// Eliminar un usuario
const deleteUser = (req, res) => {
    const users = userModel.readUsers();
    const updatedUsers = users.filter(u => u.id !== req.params.id);
    
    if (users.length !== updatedUsers.length) {
        userModel.writeUsers(updatedUsers);
        res.redirect('/users');
    } else {
        res.status(404).send('Usuario no encontrado');
    }
};

module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
};
