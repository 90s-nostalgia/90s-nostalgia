const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const Sequelize = require('sequelize')
const db = require('../db')

User.hasMany(Order)
Order.belongsTo(User)

Order.belongsToMany(Product, {through: 'orderProduct'})
Product.belongsToMany(Order, {through: 'orderProduct', as: 'items'})

module.exports = {
  User,
  Product,
  Order
}
