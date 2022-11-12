const sequelize = require("../util/database");

const Sequelize = require("sequelize");

const Product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  name: Sequelize.STRING,
  category: Sequelize.STRING,
  price: Sequelize.DOUBLE,
});

module.exports = Product;
