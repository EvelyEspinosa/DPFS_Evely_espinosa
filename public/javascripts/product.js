document.addEventListener('DOMContentLoaded', () => {
    console.log('Página cargada y JavaScript funcionando.');
    
    const product = document.querySelectorAll('li');
    product.forEach(product => {
        product.addEventListener('click', () => {
            alert(`Has seleccionado: ${product.textContent}`);
        });
    });
});

function addToCart() {
    alert("Producto agregado al carrito!");
    // Aquí puedes agregar la lógica para agregar el producto al carrito
    // como llamar a una API o actualizar el estado del carrito en el frontend
}
