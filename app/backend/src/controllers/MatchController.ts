import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import TeamService from '../services/TeamService';

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

  create = async (request: Request, response: Response) => {
    const data = request.body;
    if (data.homeTeam === data.awayTeam) {
      return response.status(401).json({
        message: 'It is not possible to create a match with two equal teams',
      });
    }
    const homeTeam = await TeamService.getById(data.homeTeam);
    const awayTeam = await TeamService.getById(data.awayTeam);

    if (!homeTeam || !awayTeam) {
      return response
        .status(404)
        .json({ message: 'There is no team with such id!' });
    }
    const completeData = { ...data, inProgress: true };
    const match = await MatchService.create(completeData);
    return response.status(201).json(match);
  };

  update = async (request: Request, response: Response) => {
    const { id } = request.params;
    const finishMatch = false;
    await MatchService.update(finishMatch, Number(id));
    return response.status(200).json({ message: 'Finished' });
  };
}

export default new MatchController();
