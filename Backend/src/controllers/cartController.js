const getCart = (req, res) => {
    const cart = req.session.cart || [];
    res.render('cart', { cart });
};

const addToCart = (req, res) => {
    const { id, name, price } = req.body;
    
    if (!req.session.cart) {
        req.session.cart = [];
    }
    const existingProduct = req.session.cart.find(item => item.id === id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        req.session.cart.push({
            id,
            name,
            price,
            quantity: 1
        });
    }

    res.json({ message: 'Producto agregado al carrito', cart: req.session.cart });
};
 module.exports ={
    getCart,
    addToCart
 }