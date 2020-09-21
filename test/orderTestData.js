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

module.exports = {generateFakeOrder, generateFailOrder}
