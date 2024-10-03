module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('product', {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.DECIMAL(10, 2),
      stock: DataTypes.INTEGER,
      colors:  DataTypes.STRING
    });
  
    Product.associate = models => {
      Product.belongsTo(models.Category);
      
Product.belongsToMany(Category, { through: 'ProductCategories', as: 'categories' });
Product.belongsToMany(Color, { through: 'ProductColors', as: 'colors' });

Category.belongsToMany(Product, { through: 'ProductCategories', as: 'products' });
Color.belongsToMany(Product, { through: 'ProductColors', as: 'products' });
    };
  
    return Product;
  };
