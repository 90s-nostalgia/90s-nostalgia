const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
// router.use('/orders', require('./orders'))
router.use('/products', require('./products'))

router.use((req, res, next) => {
  const error = new Error('API route not found')
  error.status = 404
  next(error)
})
