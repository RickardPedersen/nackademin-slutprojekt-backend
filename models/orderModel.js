const mongoose = require('mongoose')

class Order {
    orderSchema = new mongoose.Schema({
        timeStamp: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            required: true
        },
        items: {
            type: Array,
            required: true,
            validate: [this.arrayLimit, 'Items must include at least 1 product id']
        },
        orderValue: {
            type: Number,
            required: true
        }
    }, {versionKey:false, strict: "throw"})

    arrayLimit(val) {
        return val.length > 0
    }

    orderModel = new mongoose.model('order', this.orderSchema)

    async createOrder(itemsAndOrderValue) {
        const orderObject = {
            timeStamp: Date.now(),
            status: 'inProcess',
            ...itemsAndOrderValue
        }
        return await this.orderModel.create(orderObject)
    }
}

module.exports = new Order()
