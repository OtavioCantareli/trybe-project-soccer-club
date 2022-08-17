import * as sinon from "sinon";
import * as chai from "chai";
import chaiHttp from "chai-http";
import { app } from "../app";
import User from "../database/models/UserModel";
import userLogin from "./mocks/userLogin";
import * as jwt from "jsonwebtoken";
import userMock from "./mocks/user";
const { expect } = chai;

chai.use(chaiHttp);

describe("LOGIN", () => {
  describe("Works", () => {
    it("Returns status 200", async () => {
      sinon.stub(User, "findOne").resolves(userMock as unknown as User);
      const reponse = await chai.request(app).post("/login").send(userLogin);
    });
    it("Returns token", () => {
      sinon.stub(jwt, "sign").returnsThis();
    });
  });
});
