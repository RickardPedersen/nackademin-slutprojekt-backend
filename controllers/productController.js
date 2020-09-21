const productModel = require('../models/productModel')

class ProductController {

    async createProduct(req, res, next) {
        try {
            let result = await productModel.createProduct(req.body)

            res.status(200).send({
                _id: result._id,
                title: result.title,
                price: result.price,
                shortDesc: result.shortDesc,
                longDesc: result.longDesc,
                imgFile: result.imgFile
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new ProductController()
