const db = require("../../database/db");
const UserModel = require("../../models/userModel");
const chai = require("chai");
const { user } = require("../userTestData");
chai.should();

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
  });
});
