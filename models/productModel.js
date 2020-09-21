const mongoose = require('mongoose')
const {BadRequestError} = require('../utilities/error')

class Product {
    productSchema = new mongoose.Schema({
        title: {required: true, type: String},
        price: {required: true, type: Number},
        shortDesc: {required: true, type: String},
        longDesc: {required: true, type: String},
        imgFile: {required: true, type: String}
    }, {versionKey:false, strict: "throw"})
    productModel = new mongoose.model('product', this.productSchema)

    async createProduct(newObject) {
        try {
            let result = await this.productModel.create(newObject)

            return {
                _id: result._id.toString(),
                title: result.title,
                price: result.price,
                shortDesc: result.shortDesc,
                longDesc: result.longDesc,
                imgFile: result.imgFile
            }
        } catch (error) {
            throw new BadRequestError(error.message)
        }
    }

    async getSpecificProduct(_id) {
        try {
            let result = await this.productModel.findById({_id})
            return {
                _id: result._id.toString(),
                title: result.title,
                price: result.price,
                shortDesc: result.shortDesc,
                longDesc: result.longDesc,
                imgFile: result.imgFile
            }
        } catch(error) {
            throw new BadRequestError(error.message)
        }
    }
}

module.exports = new Product()
