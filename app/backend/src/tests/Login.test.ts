import * as chai from "chai";
import * as sinon from "sinon";
import { app } from "../app";
// @ts-ignore
import chaiHttp = require("chai-http");

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

  const noEmail = {
    email: "",
    password: "xablau",
  };

  const noPassword = {
    email: "xablau@xablau.com",
    password: "",
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

  it("Returns 400 HTTP with no email", async () => {
    const response = await chai.request(app).post("/login").send(noEmail);
    const body = response.body;
    expect(response.status).to.equal(400);
    expect(body.message).to.equal("All fields must be filled");
  });

  it("Returns 400 HTTP with no password", async () => {
    const response = await chai.request(app).post("/login").send(noPassword);
    const body = response.body;
    expect(response.status).to.equal(400);
    expect(body.message).to.equal("All fields must be filled");
  });
});
