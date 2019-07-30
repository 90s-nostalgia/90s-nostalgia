const router = require('express').Router()
const {User, Order} = require('../db/models')
module.exports = router

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

router.get('/:id/cart', async (req, res, next) => {
  try {
    const user = await Order.findAll({
      where: {
        userId: req.params.id,
        fulfilled: false
      }
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})
