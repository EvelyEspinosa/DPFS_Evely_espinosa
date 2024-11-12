const { userModel, cartModel } = require('../../database/models/'); 

let authMiddleware = {
  MiddlewareAuth: async (req, res, next) => {
    if (req.session.user) {
      try {
        req.user = req.session.user;
        const userWithCart = await userModel.findByPk(req.user.id, {
          include: [{ model: cartModel, as: 'carts' }]
        });

        if (userWithCart && userWithCart.carts.length > 0) {
          req.user.cartId = userWithCart.carts[0].id;
        } else {
          const newCart = await cartModel.create({
            user_id: userWithCart.id,
            fecha_de_creacion: new Date()
          });

          req.user.cartId = newCart.id;
          userWithCart.carts.push(newCart);
        }
        req.session.user = req.user;
        if (req.user.type === "Administrador") {
          const restrictedRoutesForAdmin = [
            "/cart/pageCart"
          ];

          if (
            restrictedRoutesForAdmin.some((route) => req.path.startsWith(route))
          ) {
            return res.status(401).render("error", {
              title: "Acceso Denegado",
              message: "No tienes permiso para acceder a esta página.",
            });
          }
          return next();
        } else if (req.user.type === "Registrado") {
          const restrictedRoutesForRegistered = [
            "/admiUsers/administrarUsers",
            "/admi/administrar",
          ];

          if (
            restrictedRoutesForRegistered.some((route) =>
              req.path.startsWith(route)
            )
          ) {
            return res.status(401).render("error", {
              title: "Acceso Denegado",
              message: "No tienes permiso para acceder a esta página.",
            });
          }
          return next();
        } else if (req.user.type === "guest") {
          return next();
        } else {
          return res.status(401).render("error", {
            title: "Acceso Denegado",
            message: "No tienes permiso para acceder a esta página.",
          });
        }
      } catch (error) {
        console.error('Error en MiddlewareAuth:', error);
        return res.status(500).render("error", {
          title: "Error de Servidor",
          message: "Hubo un error al procesar la solicitud.",
        });
      }
    } else {
      return res.redirect("/users/login");
    }
  },
};
const isAuthenticated = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'No has iniciado sesión' });
  }
  res.redirect('/login');
  next();
};

const isAdmin = (req, res, next) => {
  if (req.session.user.role !== 'admin') {
    return res.status(403).json({ message: 'Acceso denegado' });
  }
  res.redirect('/dashboard');
  next();
};

module.exports = {authMiddleware, isAuthenticated, isAdmin };