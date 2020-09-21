require('dotenv').config()
const chai = require('chai')
const expect = chai.expect
let {connect, disconnect} = require('../../database/db')
let {shouldFail, shouldSucceed, updateData} = require('../productTestData');
const product = require('../../models/productModel')

describe('Unittest against productModel', function () {
    before( async() => {
        await connect();
    })

    after(async () => {
        await product.productModel.deleteMany({})
        await disconnect()
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
                promises.push(product.createProduct(object))
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
            allProducts.forEach(productObject => {
                 resultsPromises.push(product.getSpecificProduct(productObject._id))
            })

            let allSpecificProducts = await Promise.all(resultsPromises)
            /**
             * Assert
             */
            expect(allSpecificProducts).to.have.length(allProducts.length)
            for (let index = 0; index < allProducts.length; index++) {
                expect(allSpecificProducts[index]).to.include(allProducts[index])
            }
        })

        it('Should be able to get all products', async function () {
            /**
             * Arrange
             */
            let promises = []
            shouldSucceed.multipleObjects.forEach(object => {
                promises.push(product.createProduct(object))
            });
            let allProducts = await Promise.all(promises)
            /**
             * Act
             */
            let results = await product.getAllProducts()
            /**
             * Assert
             */
            expect(results).to.have.length(allProducts.length)

        })
        it('Should be able to update specific product', async function () {
            /**
             * Arrange
             */
            const productToBeUpdated = await product.createProduct(shouldSucceed.multipleObjects[0])
            /**
             * Act
             */
            const result = await product.updateProduct(productToBeUpdated._id, updateData)
            /**
             * Assert
             */
            expect(result).to.include(updateData)
        })

        it('Should be able to delete specific product', async function() {
            /**
             * Arrange
             */
            const productToBeUpdated = await product.createProduct(shouldSucceed.multipleObjects[0])
            /**
             * Act
             */
            const result = await product.deleteProduct(productToBeUpdated._id,)
            /**
             * Assert
             */
            expect(result.totalRemoved).to.equal(1)
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
                promises.push(product.createProduct(object))
            }
            let results = await Promise.allSettled(promises)
            /**
             * Assert
             */
            for (let index = 0; index < results.length; index++) {
                expect(results[index].status).to.equals('rejected')
            }
        })

        it('Should fail to get specific product', async function () {
            /**
             * Arrange
             */
            const fake_id = "01238979sad7as89d79af"
            /**
             * Act
             */
            let result = await Promise.allSettled([product.getSpecificProduct(fake_id)])
            /**
             * Assert
             */
            expect(result[0].status).to.equals('rejected')
        })
    })
})