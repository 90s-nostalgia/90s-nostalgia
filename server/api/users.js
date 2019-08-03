const router = require('express').Router()
const {User, Order, OrderProduct} = require('../db/models')
module.exports = router

// router.use('/:id/orders', require('./orders'))

router.get(
  '/',
  (req, res, next) => {
    if (req.user.isAdmin) next()
  },
  async (req, res, next) => {
    try {
      const users = await User.findAll({
        // explicitly select only the id and email fields - even though
        // users' passwords are encrypted, it won't help if we just
        // send everything to anyone who asks!
        attributes: ['id', 'email']
      })
      res.json(users)
    } catch (err) {
      next(err)
    }
  }
)

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findOne({
      attributes: ['name', 'email', 'defaultShipping', 'defaultBilling'],
      where: {
        id: req.params.id
      }
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.put('/:id/orders', async (req, res, next) => {
  try {
    // checks if user already has an unfulfilled cart
    const newOrder = await Order.findOrCreate({
      where: {
        userId: req.user.id,
        fulfilled: false
      }
    })
    // checks if productId is already in order
    const isOrderProduct = await OrderProduct.findOne({
      where: {
        orderId: newOrder[0].dataValues.id,
        productId: req.body.productId
      }
    })
    // if not in order, add to order
    if (!isOrderProduct) {
      const newOrderProductInstance = await OrderProduct.create({
        orderId: newOrder[0].dataValues.id,
        productId: req.body.productId,
        quantity: 1
      })
      res.status(201).json(newOrderProductInstance)
      // if the product already is in the order, increment quantity by 1
    } else {
      const incrementedQuantity = isOrderProduct.quantity + 1
      const updatedOrderProductInstance = await isOrderProduct.update({
        quantity: incrementedQuantity
      })
      res.json(updatedOrderProductInstance)
    }
  } catch (error) {
    next(error)
  }
})

router.get('/:id/orders', async (req, res, next) => {
  try {
    // checks if user already has an unfulfilled cart
    const unfulfilledOrder = await Order.findAll({
      where: {
        userId: req.user.id,
        fulfilled: false
      }
    })
    res.json(unfulfilledOrder)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/history', async (req, res, next) => {
  try {
    const user = await Order.findAll({
      where: {
        userId: req.params.id,
        fulfilled: true
      }
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})
