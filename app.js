require('dotenv').config()
const express = require('express')
const app = express()
const productRouter = require('./routes/productRoute')
const registerRouter = require('./routes/registerRoute')
const orderRouter = require('./routes/orderRoutes')
const authRouter = require('./routes/authRoute')
const handleErrors = require('./middlewares/handleError')

app.use(express.json())
app.use(express.static('public'))

// Routes
app.use('/api/products', productRouter)
app.use('/api/register', registerRouter)
app.use('/api/orders', orderRouter)
app.use('/api/auth', authRouter)

app.use(handleErrors)

module.exports = app
