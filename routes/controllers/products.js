const fs = require('fs');
const path = require('path');

// Ruta al archivo JSON
const filePath = path.join(__dirname, 'products.json');

// Función para leer el archivo JSON
const readJSONFile = () => {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

module.exports = {
  find: async () => {
    return new Promise((resolve, reject) => {
      try {
        const products = readJSONFile();
        resolve(products);
      } catch (error) {
        reject(error);
      }
    });
  },
  
  findById: async (id) => {
    return new Promise((resolve, reject) => {
      try {
        const products = readJSONFile();
        const product = products.find(p => p.id === parseInt(id));
        resolve(product);
      } catch (error) {
        reject(error);
      }
    });
  }
};
