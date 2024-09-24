const fs = require('fs');
const path = require('path');

const userFilePath = path.join(__dirname, '../data/users.json');


function readUsers() {
    const fileData = fs.readFileSync(userFilePath, 'utf-8');
    return JSON.parse(fileData);
}

function writeUsers(users) {
    const jsonData = JSON.stringify(users, null, 2);
    fs.writeFileSync(userFilePath, jsonData, 'utf-8');
}

function createUsers (req, res) {
    const { firstname, lastName, email, password,  type, avatar } = req.body;
  
      const users = JSON.parse(userFilePath);

      const newUsers = {
        id: users.length + 1,
        firstname,
        lastName,
        email,
        password,
        type,
        avatar
      }
      users.push(newUsers);
    }

// Exportar las funciones para usarlas en los controladores
module.exports = {
    readUsers,
    writeUsers,
    createUsers
};
