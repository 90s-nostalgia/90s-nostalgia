const router = require('express').Router()
const {User, Order, OrderProduct, Product} = require('../db/models')
const adminPrivileges = require('../admin/utils')
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
        attributes: ['id', 'name', 'email']
      })
      res.status(200).send(users)
    } catch (err) {
      next(err)
    }
  }
)

router.get(
  '/:id',
  (req, res, next) => {
    if (req.user.isAdmin || req.user.id == req.params.id) next()
  },
  async (req, res, next) => {
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
  }
)

router.put(
  '/:id/orders', //to orders/1
  (req, res, next) => {
    if (req.user.isAdmin || req.user.id == req.params.id) next()
  },
  async (req, res, next) => {
    try {
      // checks if user already has an unfulfilled cart
      console.log('route:', req.body.updateQuantity)
      //make sure this is an integer, so put a plus for type coercion
      const updateQuantity = +req.body.updateQuantity
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
      // if not in order & updateQuantity is truthy, add to order
      console.log(isOrderProduct)

      if (!isOrderProduct && updateQuantity > 0) {
        const newOrderProductInstance = await OrderProduct.create({
          orderId: newOrder[0].dataValues.id,
          productId: req.body.productId,
          quantity: 1
        })
        res.status(201).json(newOrderProductInstance)
        // if the product already is in the order, increment quantity by 1
      } else {
        const incrementedQuantity = isOrderProduct.quantity + updateQuantity
        if (incrementedQuantity > 0) {
          const updatedOrderProductInstance = await isOrderProduct.update({
            quantity: incrementedQuantity
          })
          res.json(updatedOrderProductInstance)
        } else {
          const deletedOrderProductInstance = await isOrderProduct.destroy({
            where: {
              productId: req.body.productId,
              quantity: 0
            }
          })
          res.send(deletedOrderProductInstance)
        } //instance method on the model that would be called on the order, containsProduct(productId)
      }
    } catch (error) {
      next(error)
    }
  }
)

router.put(
  '/:id/orders/checkout',
  (req, res, next) => {
    if (req.user.isAdmin || req.user.id == req.params.id) next()
  },
  async (req, res, next) => {
    try {
      const fulfilledOrder = await Order.update(
        {
          fulfilled: true
        },
        {
          where: {
            userId: req.user.id,
            fulfilled: false
          }
        }
      )

      console.log(fulfilledOrder)
      res.json(fulfilledOrder)
    } catch (err) {
      next(err)
    }
  }
)

router.get(
  '/:id/orders',
  (req, res, next) => {
    if (req.user.isAdmin || req.user.id == req.params.id) next()
  },
  async (req, res, next) => {
    try {
      // checks if user already has an unfulfilled cart
      const unfulfilledOrder = await Order.findAll({
        where: {
          userId: req.user.id,
          fulfilled: false
        },
        include: {
          model: Product
        }
      })
      res.json(unfulfilledOrder)
    } catch (err) {
      next(err)
    }
  }
)

router.get(
  '/:id/history',
  (req, res, next) => {
    if (req.user.isAdmin || req.user.id == req.params.id) next()
  },
  async (req, res, next) => {
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
  }
)
