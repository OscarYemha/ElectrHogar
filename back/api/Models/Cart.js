const S = require("sequelize");
const db = require("../db/db");

class Cart extends S.Model {}

Cart.init(
  {
    isPaid: {
      type: S.BOOLEAN,
      defaultValue: false,
    },
    total: {
      type: S.FLOAT,
    },
    address: {
      type: S.STRING,
    },
    cardNumber: {
      type: S.INTEGER,
    },
    cardCvv: {
      type: S.INTEGER,
    },
    date: {
      type: S.DATE,
    },
  },
  { sequelize: db, modelName: "Cart" }
);

module.exports = Cart;
