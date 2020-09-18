const mongoose = require('mongoose')

class Order {
    orderSchema = new mongoose.Schema({

    })
    orderModel = new mongoose.model('order', this.orderSchema)
}

module.exports = new Order()
