const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
} = require("../utilities/error");

class User {
  userSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      email: { type: String, required: true },
      role: {
        type: String,
        lowercase: true,
        default: "customer",
        enum: ["customer", "admin"],
      },
      password: { type: String, required: true },
      address: {
        street: { type: String, required: true },
        zip: { type: String, required: true },
        city: { type: String, required: true },
      },
      orderHistory: [String],
    },
    { versionKey: false, strict: "throw" }
  );

  userModel = new mongoose.model("user", this.userSchema);

  async register(user) {
    const newUser = { ...user };
    if (newUser.repeatPassword !== newUser.password)
      throw new BadRequestError("Password's don't match!");

    delete newUser.repeatPassword;

    const password = bcrypt.hashSync(newUser.password, 10);
    const { _id, email, role, name } = await this.userModel.create({
      ...newUser,
      password: password,
    });

    return {
      _id,
      email,
      role,
      name,
    };
  }

  generateToken(user) {
    return jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.SECRET,
      { expiresIn: "1h" }
    );
  }

  async login(username, password) {
    const user = await this.userModel.findOne({ email: username });
    if (!user) throw new NotFoundError("Username or password is incorrect");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      throw new UnauthorizedError("Username or password is incorrect");

    delete user.password;

    return {
      user,
      token: this.generateToken(user),
    };
  }

  async addOrderHistory(userId, orderId) {
    return await this.userModel.findByIdAndUpdate(
      userId,
      { $push: { orderHistory: orderId } },
      { useFindAndModify: false, new: true }
    );
  }

  async getUser(userId) {
    return await this.userModel.findById(userId)
  }

  async clear() {
    await this.userModel.deleteMany({});
  }
}

module.exports = new User();
