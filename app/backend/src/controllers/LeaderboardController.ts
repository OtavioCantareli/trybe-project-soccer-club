import { Request, Response } from "express";
import LeaderboardService from "../services/LeaderboardService";

class LeaderboardControllers {
  getLeaderboardHome = async (_request: Request, response: Response) => {
    const leaderboard = await LeaderboardService.getLeaderboardHome();
    return response.status(200).json(leaderboard);
  };
}

export default new LeaderboardControllers();
