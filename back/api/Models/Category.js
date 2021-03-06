const S = require("sequelize");
const db = require("../db/db");

class Category extends S.Model {}

Category.init(
  {
    name: {
      type: S.STRING,
      allowNull: false,
    },
    imgUrl: {
      type: S.STRING,
    }
  },
  { sequelize: db, modelName: "Category" }
);

module.exports = Category;
