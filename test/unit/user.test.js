const db = require("../../database/db");
const UserModel = require("../../models/userModel");
const chai = require("chai");
const { user, invalidUser } = require("../userTestData");
chai.should();
chai.use(require("chai-as-promised"));

describe("Unit test - User model", () => {
  before(async () => {
    await db.connect();
  });

  after(async () => {
    await db.disconnect();
  });

  describe("Successful tests", () => {
    beforeEach(async () => {
      await UserModel.clear();
    });

    it("Register a new user", async () => {
      const newUser = await UserModel.register(user);
      newUser.should.be.a("object");
      newUser.should.have.keys("_id", "email", "role", "name");
    });

    it("Login a existing user", async () => {
      await UserModel.register(user);
      const loggedInUser = await UserModel.login(user.email, user.password);
      console.log(loggedInUser);
      loggedInUser.should.be.a("object");
      loggedInUser.should.have.keys("token", "user");
    });
  });

  describe("Incorrect tests", () => {
    beforeEach(async () => {
      await UserModel.clear();
    });

    it("Invalid registration a new user (missing input data)", async () => {
      await UserModel.register(invalidUser).should.be.rejectedWith(Error);
    });
  });
});
