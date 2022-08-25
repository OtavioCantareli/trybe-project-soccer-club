import * as chai from "chai";
import * as sinon from "sinon";
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
    email: "xablau@xablau.com",
    password: "xablau",
    role: "user",
    username: "xablau",
  };

  beforeEach(async () => {
    sinon.stub(User, "findOne").resolves(userMock as User);
  });

  afterEach(() => {
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
