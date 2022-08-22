import { Router } from 'express';
import MatchController from '../controllers/MatchController';

const router = Router();

router.get('/matches', MatchController.matches);

export default router;
