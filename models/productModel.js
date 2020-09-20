const mongoose = require('mongoose')

class Product {
    productSchema = new mongoose.Schema({
        title: {required: true, type: String},
        price: {required: true, type: Number},
        shortDesc: {required: true, type: String},
        category: {required: true, type: String},
        longDesc: {required: true, type: String},
        imgFile: {required: true, type: String}
    }, {versionKey:false, strict: "throw"})
    productModel = new mongoose.model('product', this.productSchema)

    createProduct(newObject) {
        return this.productModel.create(newObject);
    }
}

module.exports = new Product()
