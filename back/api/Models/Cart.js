const S = require ('sequelize');
const db = require('../db/db');

class Cart extends S.Model {}

Cart.init(
    {
        state: {
            type: S.BOOLEAN,
            defaultValue: false,
        },
        totalPrice: {
            type: S.FLOAT,
        }
    },
    {sequelize: db, modelName: 'Cart'}
);

module.exports = Cart;
