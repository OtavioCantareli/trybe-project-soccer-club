import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

class MatchController {
  matches = async (request: Request, response: Response) => {
    const { inProgress } = request.query;
    const matches = await MatchService.matches();
    if (inProgress !== undefined) {
      if (inProgress) {
        const inProgressMatches = matches.filter((match) => match.inProgress);
        return response.status(200).json(inProgressMatches);
      }
      const finishedMatches = matches.filter((match) => !match.inProgress);
      return response.status(200).json(finishedMatches);
    }
    return response.status(200).json(matches);
  };
}

export default new MatchController();
