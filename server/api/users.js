const router = require('express').Router()
const {User, Order, OrderProduct} = require('../db/models')
module.exports = router

// router.use('/:id/orders', require('./orders'))

router.get('/', async (req, res, next) => {
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
})

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
    let newOrder = await Order.findOrCreate({
      where: {
        userId: req.user.id,
        fulfilled: false
      }
    })
    //this can work for adding to the cart one time, the next time you try to addto cart it says orderProducts has a validation of needing a unique order id and product id. so we need to do something that handles quantity
    let orderProductInstance = await OrderProduct.create({
      orderId: newOrder[0].dataValues.id,
      productId: req.body.productId
    })

    res.status(201).send(orderProductInstance)
  } catch (error) {
    next(error)
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
