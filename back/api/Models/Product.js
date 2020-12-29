const S = require('sequelize');
const db = require('../db/db');

class Product extends S.Model {}

Product.init(
    {
        name: {
            type: S.STRING,
            allowNull: false,
        },
        price: {
            type: S.DOUBLE,
            allowNull: false,
            defaultValue: 0,
        },
        imgUrl: {
            type: S.TEXT,
        },
        stock: {
            type: S.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        description: {
            type: S.TEXT,
            allowNull: false
        }
    },{sequelize: db, modelName: 'Product'}
);

module.exports = Product;