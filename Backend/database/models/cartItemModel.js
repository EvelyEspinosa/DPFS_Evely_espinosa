module.exports = (sequelize, DataTypes) => {
    const CartItem = sequelize.define('CartItem', {
      quantity: DataTypes.INTEGER
    });
  
    CartItem.associate = models => {
      CartItem.belongsTo(models.CartModel);
      CartItem.belongsTo(models.ProductModel);
    };
  
    return CartItem;
  };