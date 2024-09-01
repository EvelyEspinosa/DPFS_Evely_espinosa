function updateCart(element) {
    const row = element.closest('tr');
    const price = parseFloat(row.children[2].textContent.replace('$', ''));
    const quantity = parseInt(element.value);
    const total = price * quantity;
    row.children[4].textContent = '$' + total.toFixed(2);

    // Actualizar el total del carrito
    updateCartTotal();
}

function removeFromCart(element) {
    const row = element.closest('tr');
    row.remove();

    // Actualizar el total del carrito
    updateCartTotal();
}

function updateCartTotal() {
    let total = 0;
    const cartItems = document.querySelectorAll('#cart-items tr');

    cartItems.forEach(function(row) {
        const itemTotal = parseFloat(row.children[4].textContent.replace('$', ''));
        total += itemTotal;
    });

    document.querySelector('.cart-total').textContent = 'Total: $' + total.toFixed(2);
}