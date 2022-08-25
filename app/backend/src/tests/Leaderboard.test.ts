import * as chai from "chai";
import * as sinon from "sinon";
import { app } from "../app";
import Team from "../database/models/TeamModel";
import IntTeam from "../interfaces/Team";
// @ts-ignore
import chaiHttp = require("chai-http");

const { expect } = chai;

chai.use(chaiHttp);

describe("LEADERBOARD", () => {

  const teamMock: IntTeam = {
    id: 4,
    teamName: "Corinthians",
  };

  beforeEach(() => {
    sinon.stub(Team, "findAll").resolves([teamMock as Team]);
  });

  afterEach(() => {
    sinon.restore();
  });

  it("Home path returns 200", async () => {
    const response = await chai.request(app).get("/leaderboard/home");
    expect(response.status).to.equal(200);
  });

  it("Away path returns 200", async () => {
    const response = await chai.request(app).get("/leaderboard/away");
    expect(response.status).to.equal(200);
  });

  it("Leaderboard returns 200", async () => {
    const response = await chai.request(app).get("/leaderboard");
    expect(response.status).to.equal(200);
  });
});
