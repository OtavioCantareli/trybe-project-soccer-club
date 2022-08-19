import IntTeam from '../interfaces/Team';
import Team from '../database/models/TeamModel';

class TeamService {
  getAll = async (): Promise<IntTeam[]> => {
    const teams = await Team.findAll();
    return teams;
  };

  getById = async (id: number): Promise<IntTeam> => {
    const teams = await Team.findByPk(id);
    return teams as IntTeam;
  };
}

export default new TeamService();
