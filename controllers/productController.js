const { Product } = require('../models/productModel');

const createProduct = async (productData) => {
  return await Product.create(productData);
};

const getAllProducts = (req, res) => {
    const products = Product.readProducts();
    res.render('product', { products });
};

const updateProduct = async (id, updatedData) => {
  return await Product.update(updatedData, { where: { id } });
};

const deleteProduct = async (id) => {
  return await Product.destroy({ where: { id } });
};

// Mostrar el detalle de un producto
const showProductDetail = (req, res) => {
  const productId = parseInt(req.params.id);
  const product = product.find(p => p.id === productId);
  
  if (!product) {
    return res.status(404).send('Producto no encontrado');
  }

  res.render('product/detail', { product });
};


module.exports ={
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  showProductDetail
}