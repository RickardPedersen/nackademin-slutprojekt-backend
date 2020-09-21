require("dotenv").config();
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../app");
const db = require("../../database/db");
const { user, invalidUser } = require("../userTestData");
const UserModel = require("../../models/userModel");

chai.use(chaiHttp);
const { expect, request } = chai;

describe("Integration test - POST /api/register", () => {
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
      const res = await request(app)
        .post("/api/register")
        .set("Content-type", `application/json`)
        .send(user);

      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.have.keys(
        "_id",
        "email",
        "role",
        "name",
        "adress",
        "orderHistory"
      );
    });
  });

  describe("Incorrect tests", () => {
    beforeEach(async () => {
      await UserModel.clear();
    });

    it("Invalid registration a new user (missing input data)", async () => {
      const res = await request(app)
        .post("/api/register")
        .set("Content-type", `application/json`)
        .send(invalidUser);

      res.should.have.status(500);
    });
  });
});
