const Sequelize = require('sequelize')
const db = require('../db')

//link to user, one user has many orders, a one to many relationship establishes a userId column
const Order = db.define('order', {
  orderShipping: {
    type: Sequelize.STRING
  },
  orderBilling: {
    type: Sequelize.STRING
  },
  fulfilled: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Order
