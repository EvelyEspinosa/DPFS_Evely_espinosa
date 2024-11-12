const userModel = require('../../database/models/userModel');

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
    try{ 
    const users = req.userModel.readUsers();
    res.render('users', { users });
    } catch (error) {
        console.error('Error al listar usuarios:', error);
        res.status(500).send('Error al cargar la lista de usuarios.');
    }
};

// Crear un nuevo usuario
const createUser = (req, res) => {
    try{
        const users = userModel.readUsers();
        const newUser = req.body;

        if (!newUser || !newUser.id || !newUser.name) {
            return res.status(400).send('Datos de usuario incompletos');
        }

        users.push(newUser);
        userModel.writeUsers(users);
        res.redirect('/users');
} catch(error) {
    console.error('Error al crear usuario:', error);
        res.status(500).send('Error al crear el usuario.');
}
};

// Buscar un usuario por su ID
const getUserById = (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        if (isNaN(userId)) {
            return res.status(400).send('ID de usuario no válido');
        }

        const users = userModel.readUsers();
        const user = users.find(u => u.id === userId);

        if (user) {
            res.render('userDetail', { user });
        } else {
            res.status(404).send('Usuario no encontrado');
        }
    } catch (error) {
        console.error('Error al buscar usuario:', error);
        res.status(500).send('Error al buscar el usuario.');
    }
};

// Editar un usuario existente
const updateUser = (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        if (isNaN(userId)) {
            return res.status(400).send('ID de usuario no válido');
        }
    const users = userModel.readUsers();
    const userIndex = users.findIndex(u => u.id === req.params.id);
    
    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...req.body };
        userModel.writeUsers(users);
        res.redirect('/users');
    } else {
        res.status(404).send('Usuario no encontrado');
    }
} catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).send('Error al actualizar el usuario.');
}
};

// Eliminar un usuario
const deleteUser = (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        if (isNaN(userId)) {
            return res.status(400).send('ID de usuario no válido');
        }
    const users = userModel.readUsers();
    const updatedUsers = users.filter(u => u.id !== req.params.id);
    
    if (users.length !== updatedUsers.length) {
        userModel.writeUsers(updatedUsers);
        res.redirect('/users');
    } else {
        res.status(404).send('Usuario no encontrado');
    }
} catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).send('Error al eliminar el usuario.');
}
};

module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
};
