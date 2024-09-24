// controllers/productController.js
const productModel = require('../models/productModel');

const getAllProducts = (req, res) => {
    const products = productModel.readProducts();
    res.render('product', { products });
};

const createProduct = (req, res) => {
    const products = productModel.readProducts();
    const newProduct = req.body; 
    products.push(newProduct);
    productModel.writeProducts(products);
    res.redirect('/create');
};

const getProductById = (req, res) => {
  const productId = req.params.id;

    if (!productId) {
      return res.status(404).send('Producto no encontrado');
    }
    res.render('productDetails', { productId });
  }

module.exports = {
    getAllProducts,
    createProduct,
    getProductById
};
