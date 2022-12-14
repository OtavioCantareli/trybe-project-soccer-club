import { Router } from "express";
import LeaderboardController from "../controllers/LeaderboardController";

const router = Router();

router.get("/home", LeaderboardController.getLeaderboardHome);

export default router;
