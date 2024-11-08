const userModel = require('../database/models/userModel');

// Obtener todos los usuarios
const getAllUsers = (req, res) => {
    try{ 
    const users = userModel.readUsers();
    res.render('users', { users });
    } catch (error) {
        console.error('Error al listar usuarios:', error);
        res.status(500).send('Error al cargar la lista de usuarios.');
    }
};

// Crear un nuevo usuario
const createUser = (req, res) => {
    const users = userModel.readUsers();
    const newUser = req.body;
    users.push(newUser);
    userModel.writeUsers(users);
    res.redirect('/users');
};

// Buscar un usuario por su ID
const getUserById = (req, res) => {
    const users = userModel.readUsers();
    const user = users.find(u => u.id === parseInt(req.params.id));
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
