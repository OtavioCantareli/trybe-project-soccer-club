import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchesModel';

class MatchService {
  matches = async (): Promise<Match[]> => {
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

  create = async (data: Match): Promise<Match> => {
    const match = await Match.create(data);
    return match;
  };

  end = async (inProgress: boolean, id: number) => {
    const updatedMatch = await Match.update({ inProgress }, { where: { id } });
    return updatedMatch;
  };
}

export default new MatchService();
