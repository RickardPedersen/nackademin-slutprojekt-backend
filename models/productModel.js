const mongoose = require('mongoose')
const { BadRequestError, NotFoundError } = require('../utilities/error')

class Product {
	productSchema = new mongoose.Schema(
		{
			title: { required: true, type: String },
			price: { required: true, type: Number },
			shortDesc: { required: true, type: String },
			longDesc: { required: true, type: String },
			imgFile: { required: true, type: String },
			serial: { type: String },
		},
		{ versionKey: false, strict: 'throw' }
	)
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
				imgFile: result.imgFile,
				serial: result.serial,
			}
		} catch (error) {
			throw new BadRequestError(error.message)
		}
	}

	async getSpecificProduct(_id) {
		try {
			let result = await this.productModel.findById({ _id })
			return {
				_id: result._id.toString(),
				title: result.title,
				price: result.price,
				shortDesc: result.shortDesc,
				longDesc: result.longDesc,
				imgFile: result.imgFile,
				serial: result.serial,
			}
		} catch (error) {
			throw new BadRequestError(error.message)
		}
	}

	async getAllProducts() {
		try {
			let result = await this.productModel.find({})
			return result.map((doc) => {
				return {
					_id: doc._id.toString(),
					title: doc.title,
					price: doc.price,
					shortDesc: doc.shortDesc,
					longDesc: doc.longDesc,
					imgFile: doc.imgFile,
					serial: doc.serial,
				}
			})
		} catch (error) {
			throw new NotFoundError(error.message)
		}
	}

	updateProduct(_id, objectToUpdateWith) {
		try {
			return this.productModel.findOneAndUpdate(
				{ _id },
				{ $set: objectToUpdateWith },
				{ new: true, useFindAndModify: false }
			)
		} catch (error) {
			throw new BadRequestError(error.message)
		}
	}

	async deleteProduct(_id) {
		try {
			let result = await this.productModel.deleteOne({ _id })
			return { totalRemoved: result.n }
		} catch (error) {
			throw new BadRequestError(error.message)
		}
	}
}

module.exports = new Product()
