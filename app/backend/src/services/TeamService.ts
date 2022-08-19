import IntTeam from '../interfaces/Team';
import Team from '../database/models/TeamModel';

class TeamService {
  getAll = async (): Promise<IntTeam[]> => {
    const teams = await Team.findAll();
    return teams;
  };
}

export default new TeamService();
