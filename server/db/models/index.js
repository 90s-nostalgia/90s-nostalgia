const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const OrderProduct = require('./orderProduct')

User.hasMany(Order)
Order.belongsTo(User)

Order.belongsToMany(Product, {through: OrderProduct})
Product.belongsToMany(Order, {through: OrderProduct, as: 'items'})

module.exports = {
  User,
  Product,
  Order
}
