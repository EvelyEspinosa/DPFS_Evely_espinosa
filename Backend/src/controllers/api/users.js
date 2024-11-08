const express = require('express');
const router = express.Router();
const User = require('../../models/userModel');


router.get('/users', async (req, res) => {
    try {

        const users = await User.findAll({
            attributes: ['id', 'name', 'email']
        });

        const response = {
            count: users.length,
            users: users.map(user => ({
                id: user.id,
                name: user.name,
                email: user.email,
                detail: `/api/users/${user.id}`
            }))
        };

        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
});

router.get('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findByPk(userId, {
            attributes: ['id', 'name', 'email', 'profile_image']
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const userDetail = {
            id: user.id,
            name: user.name,
            email: user.email,
            profileImage: `/uploads/${user.profile_image}`
        };

        res.json(userDetail);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el usuario' });
    }
});

module.exports = router;
