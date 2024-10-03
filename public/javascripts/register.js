const form = document.getElementById('registerForm');

    form.addEventListener('submit', function (event) {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        let errors = [];

        if (name.length < 3) {
            errors.push('El nombre debe tener al menos 3 caracteres.');
        }
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!email.match(emailPattern)) {
            errors.push('Debe proporcionar un correo electrónico válido.');
        }
        if (password.length < 6) {
            errors.push('La contraseña debe tener al menos 6 caracteres.');
        }
        if (password !== confirmPassword) {
            errors.push('Las contraseñas no coinciden.');
        }

        if (errors.length > 0) {
            event.preventDefault();
            alert(errors.join('\n'));
        }
    });