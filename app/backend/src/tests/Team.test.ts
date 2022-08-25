import * as chai from "chai";
import * as sinon from "sinon";
import { app } from "../app";

import Team from "../database/models/TeamModel";
import IntTeam from "../interfaces/Team";

// @ts-ignore
import chaiHttp = require("chai-http");

const { expect } = chai;
chai.use(chaiHttp);

describe("TEAMS", () => {
  const teamMock: IntTeam = {
    id: 1,
    teamName: "valid",
  };

  const teamByIdMock: IntTeam = {
    id: 7,
    teamName: "team-seven",
  };

  beforeEach(() => {
    sinon.stub(Team, "findAll").resolves([teamMock as Team]);
    sinon.stub(Team, "findOne").resolves(teamByIdMock as Team);
  });

  afterEach(() => {
    sinon.restore();
  });

  it("Returns HTTP 200", async () => {
    const response = await chai.request(app).get("/teams");
    expect(response.status).to.equal(200);
  });

  it("Returns teams", async () => {
    const response = await chai.request(app).get("/teams");
    const [team] = response.body as IntTeam[];
    expect(team.id).to.equal(teamMock.id);
    expect(team.teamName).to.equal(teamMock.teamName);
  });

  it("Return HTTP 200 by id", async () => {
    const response = await chai.request(app).get("/teams/5");
    expect(response.status).to.equal(200);
  });
  
  it("Return correct team by id", async () => {
    const response = await chai.request(app).get("/teams/5");
    const team = response.body as IntTeam;
    expect(team.id).to.equal(teamByIdMock.id);
    expect(team.teamName).to.equal(teamByIdMock.teamName);
  });
});
