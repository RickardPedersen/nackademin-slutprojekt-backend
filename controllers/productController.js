const productModel = require('../models/productModel')

class ProductController {

    async createProduct(req, res, next) {
        try {
            res.status(200).send(await productModel.createProduct(req.body))
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new ProductController()
