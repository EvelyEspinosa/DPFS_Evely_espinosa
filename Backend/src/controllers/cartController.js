const getCart = (req, res) => {
    try{
    const cart = req.session.cart || [];
    res.render('cart', { cart });
    } catch (error){
        console.error("Error al obtener el carrito:", error);
        res.status(500).send("Error al cargar el carrito");
    }
};

const addToCart = (req, res) => {
    try{
        const { id, name, price } = req.body;
        if (!id || !name || !price) {
         return res.status(400).json({message: "Datos de producto incompleto"})
    }
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
        res.json({ message: "Producto agregado al carrito", cart: req.session.cart });
    } catch (error) {
        console.error("Error al agregar al carrito:", error);
        res.status(500).json({ message: "Error al agregar el producto al carrito" });
    }
};

 module.exports ={
    getCart,
    addToCart
 }