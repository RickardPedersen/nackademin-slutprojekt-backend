const productController = require('../controllers/productController')
const router = require('express').Router()
const {admin} = require('../middlewares/handleAuth')

router.post('/', admin, productController.createProduct.bind(productController))
router.get('/', productController.getAllProducts.bind(productController))
router.get('/:id', productController.getSpecificProduct.bind(productController))
router.patch('/:id', admin, productController.updateProduct.bind(productController))
router.delete('/:id', admin, productController.deleteProduct.bind(productController))

module.exports = router
