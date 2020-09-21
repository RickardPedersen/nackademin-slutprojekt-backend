const Order = require('../models/orderModel')
const Product = require('../models/productModel')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

class OrderController {
    async addOrder(req, res, next) {
        try {
            const { items } = req.body
            let orderValue = 0
            for (let productId of items) {
                const product = await Product.getSpecificProduct(productId)
                orderValue += product.price
            }

            const order = await Order.createOrder({items, orderValue})
            if (!req.headers.authorization) { return res.status(201).json(order) }
            const token = req.headers.authorization.replace("Bearer ", "")
            let payload;

            try {
                payload = jwt.verify(token, process.env.SECRET)
            } catch (error) {
                return res.status(201).json(order)
            }

            const orderId = order._id.toString()
            await User.addOrderHistory(payload.id, orderId)

            res.status(201).json(order)
        } catch (error) {
            next(error)
        }
    }

    async getOrders(req, res, next) {
        try {
            if (req.user.isAdmin()) {
                res.status(200).json(await Order.getAllOrders())
            } else {
                const user = await User.getUser(req.user.id)
                res.status(200).json(await Order.getCustomerOrders(user.orderHistory))
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new OrderController()
