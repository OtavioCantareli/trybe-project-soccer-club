import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import TeamService from '../services/TeamService';

class MatchController {
  matches = async (request: Request, response: Response) => {
    const { inProgress } = request.query;
    const matches = await MatchService.matches();
    if (inProgress !== undefined) {
      if (inProgress === 'true') {
        const ongoing = matches.filter((match) => match.inProgress);
        return response.status(200).json(ongoing);
      }
      const finished = matches.filter((match) => !match.inProgress);
      return response.status(200).json(finished);
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

  end = async (request: Request, response: Response) => {
    const { id } = request.params;
    const finishMatch = false;
    await MatchService.end(finishMatch, Number(id));
    return response.status(200).json({ message: 'Finished' });
  };

  update = async (request: Request, response: Response) => {
    const { id } = request.params;
    const { homeTeamGoals, awayTeamGoals } = request.body;
    await MatchService.update(Number(id), homeTeamGoals, awayTeamGoals);
    return response.status(200).json({ message: 'Done' });
  };
}

export default new MatchController();
