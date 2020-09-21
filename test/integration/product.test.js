require('dotenv').config()
const chai = require('chai')
const expect = chai.expect
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const app = require('../../app');
const server = require('../../start');
let {connect, disconnect} = require('../../database/db')
let {shouldFail, shouldSucceed, updateData} = require('../productTestData');
const { user, invalidUser } = require("../userTestData");
const product = require('../../models/productModel')
const userModel = require('../../models/userModel')

describe('Integration against productModel', function () {
    before( async() => {
        await connect()
    })

    after(async () => {
        await userModel.userModel.deleteMany({})
        await product.productModel.deleteMany({})
        await disconnect()
        await server.close()
    });

    describe('Successful tests', function () {
        let token
        beforeEach(async function() {
            await product.productModel.deleteMany({})
            await userModel.userModel.deleteMany({})
            await userModel.register(JSON.parse(JSON.stringify(user)))
            const res = await userModel.login(user.email, user.password)
            token = res.token
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
                    .set('Authorization', `Bearer ${token}`)
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
            /**
             * Arrange
             */
            let promises = []
            shouldSucceed.multipleObjects.forEach(object => {
                promises.push(product.createProduct(object))
            })
            let allProducts = await Promise.all(promises)
            /**
             * Act
             */

            let resultsPromises = []
            allProducts.forEach(object => {
                resultsPromises.push(chai.request(app)
                    .get(`/api/products/${object._id}`)
                    .send())
            })
            let results = await Promise.all(resultsPromises)
            /**
             * Assert
             */
            for (let index = 0; index < results.length; index++) {
                expect(results[index].body).to.includes(allProducts[index])
                expect(results[index]).to.have.status(200)
            }
        })

        it('Should be able to get all products', async function () {
            /**
             * Arrange
             */
            let allProducts = []
            for(let object of shouldSucceed.multipleObjects) {
                allProducts.push(await product.createProduct(object))
            }

            /**
             * Act
             */
            let results = await chai.request(app)
                .get('/api/products')
                .send()
            /**
             * Assert
             */
            expect(results.body).to.have.length(allProducts.length);
            expect(results).to.have.status(200)
        })

        it('Should be able to update specific product', async function () {
            /**
             * Arrange
             */
            const productToBeUpdated = await product.createProduct(shouldSucceed.multipleObjects[0])
            /**
             * Act
             */
            let result = await chai.request(app)
                .patch(`/api/products/${productToBeUpdated._id}`)
                .send(updateData)
            /**
             * Assert
             */
            expect(result).to.have.status(200)
            expect(result.body).to.include(updateData)
        })

        it('Should be able to delete specific product', async function() {
            /**
             * Arrange
             */
            const productToBeDeleted = await product.createProduct(shouldSucceed.multipleObjects[0])
            /**
             * Act
             */
            const result =await chai.request(app)
                .delete(`/api/products/${productToBeDeleted._id}`)
                .send()
            /**
             * Assert
             */
            expect(result).to.have.status(200)
            expect(result.body.totalRemoved).to.equal(1)
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
                expect(results[index]).to.have.status(400)
            }
        })
    })
})