const productModel = require('../models/productModel')

class ProductController {

    async createProduct(req, res, next) {
        try {
            res.status(200).send(await productModel.createProduct(req.body))
        } catch (error) {
            next(error)
        }
    }

    async getSpecificProduct(req, res, next) {
        try {
            res.status(200).send(await productModel.getSpecificProduct(req.params.id))
        } catch (error) {
            next(error)
        }
    }

    async getAllProducts(req, res, next) {
        try {
            res.status(200).send(await productModel.getAllProducts())
        } catch (error) {
            next(error)
        }
    }

    async updateProduct(req, res, next) {
        try {
            res.status(200).send(await productModel.updateProduct(req.params.id, req.body))
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new ProductController()
