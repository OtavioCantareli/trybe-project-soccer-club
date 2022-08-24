import { Router } from 'express';
import validToken from '../middlewares/validToken';
import MatchController from '../controllers/MatchController';

const router = Router();

router.patch('/:id/finish', MatchController.end);
router.post('/', validToken, MatchController.create);
router.get('/', MatchController.matches);

export default router;
