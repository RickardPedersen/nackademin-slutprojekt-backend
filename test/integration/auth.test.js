const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../app");
const db = require("../../database/db");
const { user, invalidUser } = require("../userTestData");
const UserModel = require("../../models/userModel");

chai.use(chaiHttp);
const { expect, request } = chai;

describe("Integration test - POST /api/auth", () => {
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

    it("Login a existing user", async () => {});
  });

  describe("Incorrect tests", () => {
    beforeEach(async () => {
      await UserModel.clear();
    });

    it("Invalid login of existing user (wrong password)", async () => {});
  });
});
