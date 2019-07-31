const router = require('express').Router()
const {Product, Order, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: ['name', 'imageUrl', 'price']
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    console.log('HI')
    // const product = await Product.findById(req.params.productId)
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

router.post('/:id/add', async (req, res, next) => {
  try {
    let createfirstCart = await Order.create({
      items: [req.params.id]
    })
    res.status(201).send(createfirstCart)
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
