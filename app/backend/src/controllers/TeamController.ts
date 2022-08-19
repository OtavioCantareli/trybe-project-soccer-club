import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

class TeamController {
  getAll = async (request: Request, response: Response) => {
    const teams = await TeamService.getAll();
    return response.status(200).json(teams);
  };

  getById = async (request: Request, response: Response) => {
    const id = parseInt(request.params.id, 10);
    const team = await TeamService.getById(id);
    return response.status(200).json(team);
  };
}

export default new TeamController();
