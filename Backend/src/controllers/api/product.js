const express = require('express');
const router = express.Router();
const { Product, Category } = require('../models/productModel');

router.get('/product', async (req, res) => {
    try {

        const totalProducts = await Product.count();

        const categories = await Category.findAll({
            include: [{
                model: Product,
                attributes: ['id']
            }]
        });

        const countByCategory = {};
        categories.forEach(category => {
            countByCategory[category.name] = category.Products.length;
        });

        const products = await Product.findAll({
            include: [{ model: Category, as: 'categories' }]
        });

        const productArray = products.map(product => ({
            id: product.id,
            name: product.name,
            description: product.description,
            categories: product.categories.map(cat => cat.name),
            detail: `/data/products/${product.id}`
        }));

        res.json({
            count: totalProducts,
            countByCategory,
            products: productArray
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

router.get('/product/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            include: [
                { model: Category, as: 'categories' },
                { model: Color, as: 'colors' },
                { model: Size, as: 'sizes' } 
            ]
        });

        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.json({
            id: product.id,
            name: product.name,
            description: product.description,
            categories: product.categories.map(cat => cat.name),
            colors: product.colors.map(color => color.name),
            sizes: product.sizes.map(size => size.name),
            image: `/images/${product.image}`
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});


module.exports = router;
