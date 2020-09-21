require('dotenv').config()
const {connect, disconnect} = require('../../database/db')
const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
chai.should()
const {expect, request} = require('chai')
const app = require('../../app')
const Order = require('../../models/orderModel')
const {generateFakeOrder, generateFailOrder, generateFakeCustomer} = require('../orderTestData')

describe('Integration tests for order endpoint', function() {
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
            const res = await request(app)
                .post('/api/orders')
                .set('Content-Type', 'application/json')
                .send(newOrder)
            
            // Assert
            res.should.have.status(201)
            res.should.be.json
            console.log(res.body)
        })
    })

    describe('Fail tests', function() {

    })
})