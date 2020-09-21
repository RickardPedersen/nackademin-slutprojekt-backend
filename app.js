const express = require('express')
const app = express()
const handleErrors = require('./middlewares/handleError')
const orders = require('./routes/orderRoutes')
app.use(express.json())
app.use( express.static('public') )

// Routes
app.use('/api/orders', orders)

app.use(handleErrors)

module.exports = app
