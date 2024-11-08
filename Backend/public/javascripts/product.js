const productForm = document.getElementById('productForm');

    productForm.addEventListener('submit', function (event) {
        const name = document.getElementById('name').value;
        const price = parseFloat(document.getElementById('price').value);
        const stock = parseInt(document.getElementById('stock').value);
        const category_id = document.getElementById('category_id').value;

        let errors = [];

        if (name.length < 3) {
            errors.push('El nombre del producto debe tener al menos 3 caracteres.');
        }
        if (isNaN(price) || price <= 0) {
            errors.push('El precio debe ser un número positivo.');
        }
        if (isNaN(stock) || stock < 0) {
            errors.push('El stock debe ser un número entero positivo.');
        }
        if (!category_id) {
            errors.push('Debes seleccionar una categoría.');
        }

        if (errors.length > 0) {
            event.preventDefault();
            alert(errors.join('\n'));
        }
    });