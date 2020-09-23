const authController = require('../controllers/authController')
const router = require('express').Router()

// LOGIN A EXISTING USER
router.post('/', authController.loginUser)

module.exports = router
