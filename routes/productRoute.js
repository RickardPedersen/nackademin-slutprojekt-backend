const productController = require('../controllers/productController')
const router = require('express').Router()

router.post('/', productController.createProduct.bind(productController))

module.exports = router
