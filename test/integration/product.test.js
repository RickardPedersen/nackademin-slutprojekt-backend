require('dotenv').config()
const chai = require('chai')
const expect = chai.expect
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const app = require('../../app');
const server = require('../../start');
let {connect, disconnect} = require('../../database/db')
let {shouldFail, shouldSucceed} = require('../productTestData');
const product = require('../../models/productModel')

describe('Integration against productModel', function () {
    before( async() => {
        await connect();
    })

    after(async () => {
        await product.productModel.deleteMany({})
        await disconnect()
        await server.close()
    });

    describe('Successful tests', function () {

        beforeEach(async function() {
            await product.productModel.deleteMany({})
        });

        it('Should be able to create many products', async function() {
            /**
             * Arrange
             */
            let promises = []
            /**
             * Act
             */
            shouldSucceed.multipleObjects.forEach(object => {
                promises.push(chai.request(app)
                    .post('/api/products')
                    .send(object))
            })

            let results = await Promise.all(promises)
            /**
             * Assert
             */

            for (let index = 0; index < results.length; index++) {
                expect(results[index].body).to.includes(shouldSucceed.multipleObjects[index])
                expect(results[index]).to.have.status(200)
            }
        })

        it('Should be able to get specific product', async function () {

        })

        it('Should be able to get all products', async function () {

        })

        it('Should be able to update specific product', async function () {

        })

        it('Should be able to delete specific product', async function() {

        });
    })

    describe('Should fail', function () {
        it('Should fail to create products', async function() {
            /**
             * Arrange
             */
            let promises = []
            /**
             * Act
             */
            for(let [key, object] of Object.entries(shouldFail)) {
                promises.push(chai.request(app)
                    .post('/api/products')
                    .send(object))
            }
            let results = await Promise.all(promises)
            /**
             * Assert
             */
            for (let index = 0; index < results.length; index++) {
                expect(results[index]).to.have.status(401)
            }
        })
    })
})