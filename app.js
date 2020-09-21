const express = require('express')
const app = express()
const productRouter = require('./routes/productRoute');
const handleErrors = require('./middlewares/handleError')

app.use(express.json());
app.use( express.static('public') )

// Routes
app.use('/api/products', productRouter)

app.use(handleErrors)

module.exports = app
