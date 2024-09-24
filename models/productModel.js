// models/productModel.js
const fs = require('fs');
const path = require('path');

// Ruta al archivo JSON de productos
const productFilePath = path.join(__dirname, '../data/products.json');

// Función para leer el archivo JSON
function readProducts() {
    const fileData = fs.readFileSync(productFilePath, 'utf-8');
    return JSON.parse(fileData);
}

// Función para escribir en el archivo JSON
function writeProducts(product) {
    const jsonData = JSON.stringify(product, null, 2);
    fs.writeFileSync(productFilePath, jsonData, 'utf-8');
}

// Crear un nuevo producto
function createProduct(req, res) {
    const { name, price, description, image } = req.body;
  
      const product = JSON.parse(fileData);

      const newProduct = {
        id: product.length + 1,
        name,
        price,
        description,
        image
      }
      product.push(newProduct);
    }

// Exportar las funciones para usarlas en los controladores
module.exports = {
    readProducts,
    writeProducts,
    createProduct
};
