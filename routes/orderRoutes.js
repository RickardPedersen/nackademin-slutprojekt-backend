const orderController = require('../controllers/orderController')
const router = require('express').Router()
const {user} = require('../middlewares/handleAuth')

//router.get('/', orderController.example)
router.post('/', orderController.addOrder)

module.exports = router
