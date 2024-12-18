const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../../database/config/connection');

const User = sequelize.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    profile_image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    roles_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
}, {
    Sequelize,
    tableName: 'users',
    timestamps: true,
    hooks: {
        beforeCreate: (user, options) => {
          user.password = bcrypt.hashSync(user.password, 10);
        }
      }
});

module.exports= User;
