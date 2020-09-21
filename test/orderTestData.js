const faker = require('faker')
const {Types} = require('mongoose')

function generateFakeOrder() {
    const items = [...Array(Math.floor(Math.random() * 9) + 1)].map(() => Types.ObjectId())
    const orderValue = Math.ceil(faker.commerce.price())
    return {
        items,
        orderValue
    }
}

function generateFailOrder() {
    return {
        items: [],
        orderValue: 'asdasd'
    }
}

function generateFakeCustomer() {
    return {
        _id: Types.ObjectId(),
        email: 'blabla@test.se',
        password: '$$$hashed password$$$',
        name: 'Test Customer',
        role: 'customer',
        adress: {
            street: 'Tokitokvägen 3',
            zip: '123 45',
            city: 'Tokberga'
        },
        orderHistory: []
    }
}

module.exports = {generateFakeOrder, generateFailOrder, generateFakeCustomer}
