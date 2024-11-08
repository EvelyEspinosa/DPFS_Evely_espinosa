module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart', {});
  
    Cart.associate = models => {
      Cart.belongsTo(models.UserModel);
      Cart.hasMany(models.CartItemModel);
    };
  
    return Cart;
  };