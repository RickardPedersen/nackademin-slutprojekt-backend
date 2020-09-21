const Order = require('../models/orderModel')

class OrderController {
    async addOrder(req, res, next) {
        try {
            const { items, orderValue } = req.body
            res.status(201).json(await Order.createOrder({items, orderValue}))
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new OrderController()
