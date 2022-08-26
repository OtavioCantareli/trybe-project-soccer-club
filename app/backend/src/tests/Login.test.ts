import * as chai from "chai";
import * as sinon from "sinon";
import { app } from "../app";
// @ts-ignore
import chaiHttp = require("chai-http");

import User from "../database/models/UserModel";
import IntUser from "../interfaces/User";

chai.use(chaiHttp);
const { expect } = chai;
chai.use(chaiHttp);

describe("LOGIN", () => {
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

  const wrongEmail = {
    email: "lolololol",
    password: "xablau",
  };

  const wrongPass = {
    email: "xablau@xablau.com",
    password: "HUEHUEHUE",
  };

  beforeEach(async () => {
    sinon.stub(User, "findOne").resolves(userMock as User);
  });

  afterEach(() => {
    (User.findOne as sinon.SinonStub).restore();
  });

  it("Returns status 200", async () => {
    const response = await chai.request(app).post("/login");
    expect(response.status).to.equal(200);
  });

  it("Returns token", async () => {
    const response = await chai.request(app).post("/login");
    expect(response.body).to.be.an("object").with.key("token");
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

  it("Returns 401 with wrong password", async () => {
    const response = await chai.request(app).post("/login").send(wrongPass);
    const body = response.body;
    expect(response.status).to.equal(401);
    expect(body.message).to.equal("Incorrect email or password");
  });

  it("Returns 401 with wrong email", async () => {
    const response = await chai.request(app).post("/login").send(wrongEmail);
    const body = response.body;
    expect(response.status).to.equal(401);
    expect(body.message).to.equal("Incorrect email or password");
  });
});
