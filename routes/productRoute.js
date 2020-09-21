const productController = require('../controllers/productController')
const router = require('express').Router()

router.post('/', productController.createProduct.bind(productController))
router.get('/', productController.getAllProducts.bind(productController))
router.get('/:id', productController.getSpecificProduct.bind(productController))

module.exports = router
