import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchesModel';

class MatchService {
  listMatches = async (): Promise<Match[]> => {
    const matches: Match[] = await Match.findAll({
      include: [
        {
          model: Team,
          as: 'teamHome',
          attributes: { exclude: ['id'] },
        },
        {
          model: Team,
          as: 'teamAway',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    return matches;
  };
}

export default new MatchService();
