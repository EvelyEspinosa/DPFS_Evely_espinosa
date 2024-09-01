const submitFuncion = (event) => { 
    if (!validarFormulario()){ //esto sera true o false segun sea valido o no el formulario
        event.preventDefault(); // que se preventa la actualizacion de la web
    }else{
        event.preventDefault();

        alert(
            'Los datos enviados fueron: \n' +
            'Nombre: ' + document.getElementById('username').value + '\n'+
            'Password: ' + document.getElementById('password').value + '\n'
        )
    }
}

document.getElementById('formulario').addEventListener('submit', submitFuncion) //escucha el envio del formulario

function validarFormulario() {
    
    //esto valida los campos de texto
    const camposTexto = document.querySelectorAll('input[type="text"]');
    let validacionCorrecta = true;

    camposTexto.forEach(campo => {
        let errorCampo = document.getElementById('error' + campo.id.charAt(0).toUpperCase() + campo.id.slice(1))// error + id con la primera en mayuscula
        if (campo.value.length == '') {
            mostrarError(errorCampo, '¡Este campo es requerido!')
            validacionCorrecta = false
        }else if(campo.value.length > 0 && campo.value.length < 3){
            mostrarError(errorCampo, '¡Este campo debe tener al menos 3 caracteres!')
            validacionCorrecta = false
        }else{
            ocultarError(errorCampo)
        }
    })

    //esto validael campo email
    const email = document.getElementById('email');
    let errorEmail = document.getElementById('errorEmail')
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {// este regex valida que el formato del email sea valido.SIEMPRE VA HACER EL MISMO
        ocultarError(errorEmail)
    } else {
        mostrarError(errorEmail, '!Ingrese un correo electronico válido¡')
    }


const mostrarError = (elemento, mensaje) => { elemento.textContent = mensaje; elemento.style.display ='block'; }
const ocultarError = (elemento) => { elemento.textContent = ''; elemento.style.display ='none';
}
}