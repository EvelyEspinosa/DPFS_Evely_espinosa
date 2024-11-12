const { Product } = require('../../database/models/productModel');

const createProduct = async (productData) => {
  try{
    return await Product.create(productData);
  } catch (error){
    console.error("Error al crear el producto:", error);
    throw error;
  }
  
};

const getAllProduct = async (req, res) => {
  try{
    const products = req.Product.findAll();
    res.render('/product/list', { products });
  } catch(error){
    console.error("Error al obtener los productos:", error);
    res.status(500).send("Error interno del servidor");
  }
    
};

const updateProduct = async (req, res) => {
  const {id} = req.params;
  const updatedData = req.body;
  try{
    await Product.update(updatedData, { where: { id } });
    res.redirect('/product/list');
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    res.status(500).send("Error interno del servidor");
}
};

const deleteProduct = async (req, res) => {
  const id = parseInt(req.params.id);
  try{
    const result = await Product.destroy({ where: {id} });
    if (result === 0) {
      return res.status(404).send('Producto no encontrado');
    }
    res.render('/product/list');
  }catch (error){
    console.error("Error al eliminar el producto:", error);
    res.status(500).send("Error interno del servidor");
  }
};

// Mostrar el detalle de un producto
const showProductDetail = async (req, res) => {
  const productId = parseInt(req.params.id);
  try{
    const product = await Product.findOne({ where: { id: productId } });
    if (!product) {
      return res.status(404).send('Producto no encontrado');
    }
    res.render('/product/detail', { product });
  } catch(error) {
    console.error("Error al obtener el detalle del producto:", error);
    res.status(500).send("Error interno del servidor");
  }
};

module.exports ={
  createProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  showProductDetail
}