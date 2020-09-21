const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
    user.password = bcrypt.hashSync(user.password, 10);
    const newUser = new this.userModel(user);
    const { _id, email, role, name } = await newUser.save();
    return {
      _id,
      email,
      role,
      name,
    };
  }

  async clear() {
    await this.userModel.deleteMany({});
  }
}

module.exports = new User();
