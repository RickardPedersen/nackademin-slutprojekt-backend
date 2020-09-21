const mongoose = require('mongoose');
let mongodb;

switch(process.env.ENVIRONMENT) {
    case "test":
        const {MongoMemoryServer} = require('mongodb-memory-server');
        mongodb = new MongoMemoryServer();
        break;
    case "dev":
    case "prod":
    case "stage":
        let auth = '';
        if (process.env.DB_USER && process.env.DB_PASSWORD) {
            auth = `${process.env.DB_USER}:${process.env.DB_PASSWORD}@`
        }
        let tls = (process.env.DB_TLS.toLowerCase() == 'true')? '+srv' : ''
        mongodb = {
            getUri: async () =>
                `mongodb${tls}://${auth}${process.env.DB_HOST}:/${process.env.DB_DATABASE}_${process.env.ENVIRONMENT}`
        }
        break;
    default:
        throw new Error(`${process.env.ENVIRONMENT} is not a valid environment!`)
}

async function connect() {
    let uri = await mongodb.getUri();
    await mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
    if (!mongoose.connection) {
        throw new MongooseError("Could not connect to database!")
    }
}

async function disconnect() {
    try {
        await mongoose.connection.close(() => {
            console.log('Database connection closed')
        })
        if (process.env.ENVIRONMENT == 'test') {
            await mongodb.stop()
        }
    } catch (error) {
        console.error(error)
    }
}

module.exports = {connect, disconnect}
