const express = require('express')
const app = express()
const handleErrors = require('./middlewares/handleError')
app.use( express.static('public') )

// Routes

app.use(handleErrors)

module.exports = app
