const server = require('./app')
const {connect} = require('./database/db');

connect().then( () => {
    server.listen(process.env.PORT || 5000, () => console.log("It's running birch!"))
});

module.exports = server;