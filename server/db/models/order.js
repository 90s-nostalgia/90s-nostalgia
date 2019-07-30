const Sequelize = require('sequelize')
const db = require('../db')

//link to user, one user has many orders, a one to many relationship establishes a userId column
const Order = db.define('order', {
  items: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  orderShipping: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  orderBilling: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  fulfilled: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Order
