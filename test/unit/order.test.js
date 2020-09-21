require('dotenv').config()
const {connect, disconnect} = require('../../database/db')
const chai = require('chai')
chai.should()
const Order = require('../../models/orderModel')
const {generateFakeOrder} = require('../orderTestData')

describe('Unit tests against order model', function() {
    before(async function() {
        await connect()
    })

    after(async function() {
        await disconnect()
    })

    describe('Success tests', function() {
        beforeEach(async function() {
            await Order.orderModel.deleteMany({})
        })

        it('Should create an order', async function() {
            // Arrange
            const newOrder = generateFakeOrder()

            // Act
            const result = await Order.createOrder(newOrder)

            // Assert
            result.should.be.an('object')
            result.toJSON().should.have.keys(['_id', 'timeStamp', 'status', 'items', 'orderValue'])
            result._id.should.be.an('object')
            result.timeStamp.should.be.a('date')
            result.status.should.be.a('string')
            result.items.should.be.an('array')
            result.orderValue.should.be.a('number')
            result.status.should.equal('inProcess')
            result.items.should.deep.equal(newOrder.items)
            result.orderValue.should.equal(newOrder.orderValue)
        })
    })

    describe('Fail tests', function() {

    })
})
