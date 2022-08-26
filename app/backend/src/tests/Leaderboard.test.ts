import * as chai from "chai";
import * as sinon from "sinon";
import { app } from "../app";
import Match from "../database/models/MatchesModel";
import Team from "../database/models/TeamModel";
import IntTeam from "../interfaces/Team";
// @ts-ignore
import chaiHttp = require("chai-http");

const { expect } = chai;

chai.use(chaiHttp);

import IntLeaderboard from "../interfaces/Leaderboard";
import IntMatch from "../interfaces/Match";

describe("LEADERBOARD", () => {
  const leaderboardMock: IntLeaderboard = {
    name: "Corinthians",
    totalPoints: 3,
    totalGames: 1,
    totalVictories: 1,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 3,
    goalsOwn: 2,
    goalsBalance: 1,
    efficiency: "100.00",
  };

  const teamMock: IntTeam = {
    id: 4,
    teamName: "Corinthians",
  };

  const matchMock: IntMatch = {
    id: 1,
    homeTeam: 4,
    homeTeamGoals: 3,
    awayTeam: 2,
    awayTeamGoals: 2,
    inProgress: false,
  };

  beforeEach(() => {
    sinon.stub(Team, "findAll").resolves([teamMock as Team]);
    sinon.stub(Match, "findAll").resolves([matchMock as unknown as Match]);
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

  it("Returns correct leaderboard", async () => {
    const response = await chai.request(app).get("/leaderboard/home");
    const [leaderboard] = response.body as IntLeaderboard[];
    expect(leaderboard.name).to.equal(leaderboardMock.name);
    expect(leaderboard.totalPoints).to.equal(leaderboardMock.totalPoints);
    expect(leaderboard.totalGames).to.equal(leaderboardMock.totalGames);
    expect(leaderboard.totalVictories).to.equal(leaderboardMock.totalVictories);
    expect(leaderboard.totalDraws).to.equal(leaderboardMock.totalDraws);
    expect(leaderboard.totalLosses).to.equal(leaderboardMock.totalLosses);
    expect(leaderboard.goalsFavor).to.equal(leaderboardMock.goalsFavor);
    expect(leaderboard.goalsOwn).to.equal(leaderboardMock.goalsOwn);
    expect(leaderboard.goalsBalance).to.equal(leaderboardMock.goalsBalance);
    expect(leaderboard.efficiency).to.equal(leaderboardMock.efficiency);
  });
});
