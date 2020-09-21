require("dotenv").config();
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
      newUser.should.have.keys(
        "_id",
        "email",
        "role",
        "name",
        "adress",
        "orderHistory"
      );
    });

    it("Login a existing user", async () => {
      await UserModel.register(user);
      const res = await UserModel.login(user.email, user.password);
      res.should.be.a("object");
      res.should.have.keys("token", "user");
    });
  });

  describe("Incorrect tests", () => {
    beforeEach(async () => {
      await UserModel.clear();
    });

    it("Invalid registration a new user (missing input data)", async () => {
      await UserModel.register(invalidUser).should.be.rejectedWith(Error);
    });

    it("Invalid login of existing user (wrong password)", (done) => {
      UserModel.login(user.email, "123")
        .should.eventually.be.rejectedWith("Username or password is incorrect")
        .notify(done);
    });

    it("Invalid login of existing user (wrong username)", (done) => {
      UserModel.register(user).then(() => {
        UserModel.login("test@test.com", user.password)
          .should.eventually.be.rejectedWith(
            "Username or password is incorrect"
          )
          .notify(done);
      });
    });
  });
});
