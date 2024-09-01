function validar(){
    let fullname, username, email, password, expresion;
    fullname = document.getElementById("fullname").value;
    username = document.getElementById("username").value;
    email = document.getElementById("email").value;
    password = document.getElementById("contraseña").value;
    expresion = /\w+@\w+\.+[a-z]/;
    

    if(fullname === "" || username === "" || email === "" || password === "" ){
        alert("Todos los campos son obligatorios");
        return false;
    }
    else if(fullname.length<2){
        alert("El nombre es muy corto");
        return false;
    }
    else if(username.length>30){
        alert("El apellido es muy largo");
        return false;
    }
    
    else if(email.length>100){
        alert("Correo no válido");
        return false;
    }
    else if(!expresion.text(correo)){
        alert("El correo electronico no válido");
        return false;
    }
    else if(password.length>20){
        alert("La contraseña debe tener 20 caracteres como máximo");
        return false;
    }
}