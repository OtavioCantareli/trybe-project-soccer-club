import { Router } from 'express';
import LoginController from '../controllers/LoginController';

const router = Router();

router.post('/', LoginController.login);

router.get('/validate', LoginController.validate);

export default router;
