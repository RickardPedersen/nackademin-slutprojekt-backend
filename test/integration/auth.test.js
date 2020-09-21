const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../app");
const db = require("../../database/db");
const { user, invalidUser } = require("../userTestData");
const UserModel = require("../../models/userModel");

chai.use(chaiHttp);
chai.should();
const { request } = chai;

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

    it("Login a existing user", async () => {
      await UserModel.register(user);
      const res = await request(app)
        .post("/api/auth")
        .set("Content-type", `application/json`)
        .send({ username: user.email, password: user.password });

      res.should.have.status(200);
      res.should.be.json;
      res.body.should.have.keys("token", "user");
    });
  });

  describe("Incorrect tests", () => {
    beforeEach(async () => {
      await UserModel.clear();
      await UserModel.register(user);
    });

    it("Invalid input data (missing username field)", async () => {
      const res = await request(app)
        .post("/api/auth")
        .set("Content-type", `application/json`)
        .send({ password: user.password });

      res.should.have.status(404);
      res.body.should.include({ message: "Username or password is incorrect" });
    });

    it("Invalid input data (missing password field)", async () => {
      const res = await request(app)
        .post("/api/auth")
        .set("Content-type", `application/json`)
        .send({ username: user.email });

      res.should.have.status(500);
      res.body.should.include({
        message: "Illegal arguments: undefined, string",
      });
    });
  });
});
