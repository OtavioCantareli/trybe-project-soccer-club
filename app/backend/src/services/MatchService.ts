import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchesModel';

class MatchService {
  matches = async (inProgress: string): Promise<Match[]> => {
    if (!inProgress) {
      const matches: Match[] = await Match.findAll({
        include: [
          { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: Team, as: 'teamAway', attributes: { exclude: ['id'] },
          },
        ],
      });
      return matches;
    }
    const finished = JSON.parse(inProgress);
    const filtered = await Match.findAll({
      where: { inProgress: finished },
      include: [{ model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return filtered;
  };

  create = async (data: Match): Promise<Match> => {
    const match = await Match.create(data);
    return match;
  };

  end = async (inProgress: boolean, id: number) => {
    const updatedMatch = await Match.update({ inProgress }, { where: { id } });
    return updatedMatch;
  };

  update = async (id: number, homeTeamGoals: string, awayTeamGoals: string) => {
    const updatedMatch = await Match.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
    return updatedMatch;
  };
}

export default new MatchService();
