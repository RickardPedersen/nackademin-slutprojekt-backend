const orderController = require('../controllers/orderController')
const router = require('express').Router()
const { user } = require('../middlewares/handleAuth')

router.get('/', user, orderController.getOrders)
router.post('/', orderController.addOrder)

module.exports = router
