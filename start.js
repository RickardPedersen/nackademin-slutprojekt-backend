require('dotenv').config()
const server = require('./app')
const { connect } = require('./database/db')

const listener = server.listen(process.env.PORT || 5000, async () => {
	await connect()
	console.log("It's running birch!")
})
module.exports = listener
