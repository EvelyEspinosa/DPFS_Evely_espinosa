const { db } = require('../database/models/productModel');

const createProduct = async (productData) => {
  return await db.create(productData);
};

const getAllProduct = (req, res) => {
    const products = db.readProducts();
    res.render('product', { products });
};

const updateProduct = async (id, updatedData) => {
  return await db.update(updatedData, { where: { id } });
};

const deleteProduct = async (id) => {
  return await db.destroy({ where: { id } });
};

// Mostrar el detalle de un producto
const showProductDetail = (req, res) => {
  const productId = parseInt(req.params.id);
  const product = product.find(p => p.id === productId);
  
  if (product) {
    return res.status(404).send('Producto no encontrado');
  }
  res.render('/product/detail', { product });
};


module.exports ={
  createProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  showProductDetail
}