const S = require('sequelize');
const db = require('../db/db');

class CartProductQuantity extends S.Model {}

CartProductQuantity.init(
    {
        quantity: {
            type: S.INTEGER
        },
    },{sequelize: db, modelName: 'CartProductQuantity'}
);

module.exports = CartProductQuantity;