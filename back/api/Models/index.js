const Product = require('./Product');
const User = require('./User');
const Category = require('./Category');
const Cart = require('./Cart');
const CartProductQuantity = require('./CartProductQuantity');



//Relaciones entre tablas

Cart.belongsTo(User);
Product.belongsToMany(Cart, {through: CartProductQuantity});
Cart.belongsToMany(Product, {through: CartProductQuantity});
Category.belongsToMany(Product, {through: 'Category_Product'});
Product.belongsToMany(Category, {through: 'Category_Product'});


module.exports = { Cart, Product, User, Category, CartProductQuantity};