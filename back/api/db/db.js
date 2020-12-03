const Sequelize = require('sequelize');

const db = new Sequelize("postgres://postgres@localhost:3000/electrodomesticos", {
  logging: false,
});
module.exports = db;