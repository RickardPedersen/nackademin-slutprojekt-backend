require('dotenv').config()
const {connect, disconnect} = require('../../database/db')
const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
chai.should()
const {request} = require('chai')
const app = require('../../app')
const Order = require('../../models/orderModel')
const User = require('../../models/userModel')
const Product = require('../../models/productModel')
const {user} = require('../userTestData')
const {shouldSucceed} = require('../productTestData')

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

            // Create test admin
            await User.register(user)
            const admin = await User.login('johan.kivi@zocom.se', 'password123')
            this.currentTest.adminToken = admin.token

            // Create test customer
            let customerData = {
                ...user
            }
            customerData.email = 'customer@test.se'
            customerData.role = 'customer'
            await User.register(customerData)
            const customer = await User.login('customer@test.se', 'password123')
            this.currentTest.customerToken = customer.token
        })

        it('Should create an order as a guest', async function() {
            // Arrange
            const newProduct = await Product.createProduct(shouldSucceed.singleObject)
            const newOrder = {
                items: [newProduct._id, newProduct._id]
            }

            // Act
            const res = await request(app)
                .post('/api/orders')
                .set('Content-Type', 'application/json')
                .send(newOrder)
            
            // Assert
            res.should.have.status(201)
            res.should.be.json
            res.body.should.have.keys(['_id', 'timeStamp', 'status', 'items', 'orderValue'])
            res.body.items.should.deep.include(newProduct._id)
            res.body.orderValue.should.equal(newProduct.price * 2)
        })

        it('Should create an order as a customer', async function() {
            // Arrange
            const newProduct = await Product.createProduct(shouldSucceed.singleObject)
            const newOrder = {
                items: [newProduct._id, newProduct._id]
            }

            // Act
            const res = await request(app)
                .post('/api/orders')
                .set('Authorization', `Bearer ${this.test.customerToken}`)
                .set('Content-Type', 'application/json')
                .send(newOrder)
            
            // Assert
            res.should.have.status(201)
            res.should.be.json
            res.body.should.have.keys(['_id', 'timeStamp', 'status', 'items', 'orderValue'])
            res.body.items.should.deep.include(newProduct._id)
            res.body.orderValue.should.equal(newProduct.price * 2)
        })

        it('Should get all orders (admin)', async function() {
            // Arrange
            const newProduct = await Product.createProduct(shouldSucceed.singleObject)
            const newOrder = {
                items: [newProduct._id, newProduct._id],
                orderValue: 100
            }

            for (let i = 0; i < 15; i++) {
                await Order.createOrder(newOrder)
            }

            // Act
            const res = await request(app)
                .get('/api/orders')
                .set('Authorization', `Bearer ${this.test.adminToken}`)
                .set('Content-Type', 'application/json')

            res.should.have.status(200)
            res.should.be.json
            res.body.should.be.an('array')
            res.body.length.should.equal(15)
        })

        it('Should get all customers orders', async function() {
            // Arrange
            const newProduct = await Product.createProduct(shouldSucceed.singleObject)
            const newOrder = {
                items: [newProduct._id, newProduct._id],
                orderValue: 100
            }

            for (let i = 0, userOrders = 5; i < 15; i++) {
                if (i < userOrders) {
                    await request(app)
                        .post('/api/orders')
                        .set('Authorization', `Bearer ${this.test.customerToken}`)
                        .set('Content-Type', 'application/json')
                        .send(newOrder)
                } else {
                    await Order.createOrder(newOrder)
                }
            }

            // Act
            const res = await request(app)
                .get('/api/orders')
                .set('Authorization', `Bearer ${this.test.customerToken}`)
                .set('Content-Type', 'application/json')

            res.should.have.status(200)
            res.should.be.json
            res.body.should.be.an('array')
            res.body.length.should.equal(5)
        })
    })

    describe('Fail tests', function() {
        beforeEach(async function() {
            await Order.orderModel.deleteMany({})
        })

        it('Should send status 403', async function() {
            const res = await request(app)
                .get('/api/orders')
                .set('Content-Type', 'application/json')

            res.should.have.status(403)
        })
    })
})