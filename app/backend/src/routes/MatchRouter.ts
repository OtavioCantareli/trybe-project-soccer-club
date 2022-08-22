import { Router } from 'express';
import validToken from '../middlewares/validToken';
import MatchController from '../controllers/MatchController';

const router = Router();

router.post('/matches', validToken, MatchController.create);
router.get('/matches', MatchController.matches);

export default router;
