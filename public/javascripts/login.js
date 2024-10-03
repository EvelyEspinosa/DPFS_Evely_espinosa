const submitFuncion = (event) => { 
    if (!validarFormulario()){
        event.preventDefault();
    }else{
        event.preventDefault();

        alert(
            'Los datos enviados fueron: \n' +
            'Email: ' + document.getElementById('email').value + '\n'+
            'Password: ' + document.getElementById('password').value + '\n'
        )
    }
}

document.getElementById('loginForm').addEventListener('submit', submitFuncion)

function validarFormulario() {
    let errors = [];

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
        errors.push('Debe proporcionar un correo electrónico válido.');
    }
    if (password.length < 1) {
        errors.push('La contraseña es obligatoria.');
    }

    if (errors.length > 0) {
        submitFuncion();
        alert(errors.join('\n'));
    }
}