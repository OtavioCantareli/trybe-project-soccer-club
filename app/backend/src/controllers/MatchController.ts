import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

class MatchController {
  matches = async (req: Request, res: Response) => {
    const matches = await MatchService.listMatches();
    return res.status(200).json(matches);
  };
}

export default new MatchController();
