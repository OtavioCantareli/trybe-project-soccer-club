import Matches from "../database/models/MatchesModel";
import Team from "../database/models/TeamModel";
import IntFilterTeam from "../interfaces/Filter";
import IntLeaderboard from "../interfaces/Leaderboard";

const initialValue = 0;

const goalsFavor = (filterTeam: IntFilterTeam[]) =>
  filterTeam.reduce((acc, cur) => acc + cur.homeTeamGoals, initialValue);

const totalVictories = (filterTeam: IntFilterTeam[]) =>
  filterTeam.reduce(
    (acc, cur) => (cur.homeTeamGoals > cur.awayTeamGoals ? acc + 1 : acc + 0),
    initialValue
  );

const totalDraws = (filterTeam: IntFilterTeam[]) =>
  filterTeam.reduce(
    (acc, cur) => (cur.homeTeamGoals === cur.awayTeamGoals ? acc + 1 : acc + 0),
    initialValue
  );

const totalPoints = (filterTeam: IntFilterTeam[]) =>
  totalVictories(filterTeam) * 3 + totalDraws(filterTeam) * 1;

const totalLosses = (filterTeam: IntFilterTeam[]) =>
  filterTeam.reduce(
    (acc, cur) => (cur.homeTeamGoals < cur.awayTeamGoals ? acc - 1 : acc + 0),
    initialValue
  );

const goalsOwn = (filterTeam: IntFilterTeam[]) =>
  filterTeam.reduce((acc, cur) => acc - cur.awayTeamGoals, initialValue);

const returnLeaderboard = (name: string, filterTeam: IntFilterTeam[]) => {
  const efficiency = (totalPoints(filterTeam) / (filterTeam.length * 3)) * 100;

  return {
    name,
    totalPoints: totalPoints(filterTeam),
    totalGames: filterTeam.length,
    totalVictories: totalVictories(filterTeam),
    totalDraws: totalDraws(filterTeam),
    totalLosses: Math.abs(totalLosses(filterTeam)),
    goalsFavor: goalsFavor(filterTeam),
    goalsOwn: Math.abs(goalsOwn(filterTeam)),
    goalsBalance: goalsFavor(filterTeam) - Math.abs(goalsOwn(filterTeam)),
    efficiency: +efficiency.toFixed(2),
  };
};

const sortArray = (array: IntLeaderboard[]) =>
  array.sort((a, b) => {
    if (a.totalPoints < b.totalPoints) return 1;
    if (a.totalPoints > b.totalPoints) return -1;
    if (a.goalsBalance < b.goalsBalance) return 1;
    if (a.goalsBalance > b.goalsBalance) return -1;
    if (a.goalsFavor < b.goalsFavor) return 1;
    if (a.goalsFavor > b.goalsFavor) return -1;
    return 0;
  });

class LeaderboardService {
  getLeaderboardHome = async () => {
    const getAllTeams = await Team.findAll();
    const getAllMatches = await Matches.findAll();
    const getAllFinishedMatches = getAllMatches.filter(
      ({ inProgress }) => inProgress === false
    );

    const filter = getAllTeams.map((team) => {
      const filterTeam = getAllFinishedMatches.filter(
        (matches) => matches.homeTeam === team.id
      );

      return returnLeaderboard(team.teamName, filterTeam);
    });

    const leaderboard = sortArray(filter);

    return leaderboard;
  };
}

export default new LeaderboardService();
