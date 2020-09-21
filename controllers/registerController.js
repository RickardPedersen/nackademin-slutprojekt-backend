const UserModel = require("../models/userModel");

class RegisterController {
  async registerUser(req, res, next) {
    try {
      const user = await UserModel.register(req.body);
      return res.status(200).send(user);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new RegisterController();
