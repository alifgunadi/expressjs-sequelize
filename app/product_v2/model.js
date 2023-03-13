const sequelize = require('../../config/sequelize.js');
const { Sequelize, DataTypes } = require('sequelize');

const ProductV2 = sequelize.define('product', {
  // Model attributes are defined here
  users_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  image_url: {
    type: DataTypes.TEXT
  }

});

module.exports = ProductV2;