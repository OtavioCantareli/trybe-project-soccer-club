import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

class MatchController {
  matches = async (request: Request, response: Response) => {
    const matches = await MatchService.matches();
    return response.status(200).json(matches);
  };
}

export default new MatchController();
