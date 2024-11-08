const loginValidations = [
    body('email')
        .notEmpty()
        .withMessage('Debe proporcionar un correo electrónico válido')
        .isEmail()
        .withMessage('Email no es valido'),
    body('password')
        .notEmpty()
        .isLength({ min: 6 })
        .withMessage('La contraseña debe tener al menos 6 caracteres'),
    ];

    const createUserValidations = [
        body('email')
        .notEmpty()
        .withMessage('El email no puede estar vacio')
        .isEmail()
        .withMessage('Email no es valido'),
    body('password')
        .notEmpty()
        .withMessage('La contraseña no puede estar vacia')
        .isLength({ min: 6 })
        .withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('name')
        .notEmpty()
        .withMessage('El nombre no puede estar vacio')
    ];

function checkIfNotRegistered(req, res, next) {
    if (!req.session.user) {
      return res.redirect('/register'); 
    }
    next();
  }
  
  module.exports = { loginValidations, createUserValidations, checkIfNotRegistered };