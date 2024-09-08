const fs = require('fs');
const path = require('path');
const productsFilePath = require(path.join(__dirname, '../data/products.json'));

 const Products = {
  index: (req, res) => {
  const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
  console.log(product);
  res.render('product', { products });
},

detail: (req, res) => {
  const product = product.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).send('Producto no encontrado');
  }
  res.render('/product/product', { product });
},

create: (req, res) => {
  res.render('/product/create');
},

store: (req, res) => {
  const newProduct = {
    id: products.length + 1,
    ...req.body,
  };
  products.push(newProduct);

  const filePath = path.join(__dirname, '../data/products.json');
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
  res.redirect('/product');
},

show: (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).send('Producto no encontrado');
  }
  res.render('/product/edit', { product });
},

update: (req, res) => {
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
  if (productIndex === -1) {
    return res.status(404).send('Producto no encontrado');
  }
  products[productIndex] = { ...products[productIndex], ...req.body };

  const filePath = path.join(__dirname, '../data/products.json');
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
  res.redirect(`/product/${req.params.id}`);
},

delete: (req, res) => {
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
  if (productIndex === -1) {
    return res.status(404).send('Producto no encontrado');
  }
  products.splice(productIndex, 1);

  const filePath = path.join(__dirname, '../data/products.json');
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));

  res.redirect('/product');
}
 }

module.exports = (Products);