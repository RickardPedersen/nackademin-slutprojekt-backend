const UserModel = require('../models/userModel')

class AuthController {
	async loginUser(req, res, next) {
		const { email, password } = req.body
		try {
			const user = await UserModel.login(email, password)
			return res.status(200).send(user)
		} catch (e) {
			next(e)
		}
	}
}

module.exports = new AuthController()
