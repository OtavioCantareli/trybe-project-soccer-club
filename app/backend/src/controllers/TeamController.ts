import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

class TeamController {
  getAll = async (request: Request, response: Response) => {
    const teams = await TeamService.getAll();
    return response.status(200).json(teams);
  };
}

export default new TeamController();
