require('dotenv').config()
const chai = require('chai')
const expect = chai.expect
let {connect, disconnect} = require('../../database/db')
let {shouldSucceed} = require('../productTestData');
const productModel = require('../../models/productModel')

describe('Unittest against productModel', function () {
    before( async() => {
        await connect();
    })

    after(async () => {
        server.close()
        await productModel.productModel.deleteMany({})
        await disconnect()
    });

    describe('Successful tests', function () {

        beforeEach(async function() {
            await productModel.productModel.deleteMany({})
        });

        it('Should be able to create a product', async function() {
            /**
             * Arrange
             */
            let promises = []
            /**
             * Act
             */
            shouldSucceed.multipleObjects.forEach(object => {
                promises.push(productModel.createProduct(object))
            });

            let results = await Promise.all(promises)
            /**
             * Assert
             */

            for (let index = 0; index < results.length; index++) {
                expect(results[index]).to.includes(shouldSucceed.multipleObjects[index])
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

    })
})