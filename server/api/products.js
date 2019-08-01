const router = require('express').Router()
const {Product, Order, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: ['name', 'imageUrl', 'price', 'id']
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.productId
      }
    })
    if (!product) {
      res.sendStatus(404)
    } else {
      res.json(product)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/:productId', async (req, res, next) => {
  try {
    console.log('New Order:')

    let newOrder = await Order.create({
      fulfilled: false
      // userId: req.session.id
    })
    res.status(201).send(newOrder)
  } catch (error) {
    next(error)
  }
})

// router.post('/:id/edit', async (req, res, next) => {
//   try {
//     let editCart = await Order.update({
//       items: [req.params.id] nothing yet
//     })
//     res.status(201).send(createfirstCart)
//   } catch (error) {
//     next(error)
//   }
// })
