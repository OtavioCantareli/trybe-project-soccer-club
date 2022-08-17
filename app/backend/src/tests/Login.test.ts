import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";
import User from "../database/models/UserModel";
import IntUser from "../interfaces/User";

import { Response } from "superagent";

chai.use(chaiHttp);

const { expect } = chai;

chai.use(chaiHttp);

describe("LOGIN", () => {
  let chaiHttpResponse: Response;

  const userMock: IntUser = {
    id: 1,
    email: "email@test.com",
    password: "123456",
    role: "user",
    username: "username",
  };

  before(async () => {
    sinon.stub(User, "findOne").resolves(userMock as User);
  });

  after(() => {
    (User.findOne as sinon.SinonStub).restore();
  });

  it("Returns status 200", async () => {
    chaiHttpResponse = await chai.request(app).post("/login");

    expect(chaiHttpResponse.status).to.equal(200);
  });

  it("Returns token", async () => {
    chaiHttpResponse = await chai.request(app).post("/login");

    expect(chaiHttpResponse.body).to.be.an("object").with.key("token");
  });
});
function before(arg0: () => Promise<void>) {
  throw new Error("Function not implemented.");
}

function after(arg0: () => void) {
  throw new Error("Function not implemented.");
}
