module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('product', {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.DECIMAL(10, 2),
      stock: DataTypes.INTEGER
    });
  
    Product.associate = models => {
      Product.belongsTo(models.Category);
    };
  
    return Product;
  };
