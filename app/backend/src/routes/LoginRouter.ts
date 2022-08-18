import { Router } from 'express';
import middlewares from '../middlewares/middlewares';
import validLogin from '../middlewares/validLogin';
import LoginController from '../controllers/LoginController';
import validToken from '../middlewares/validToken';

const router = Router();

router.post('/', middlewares(validLogin), LoginController.login);

router.get('/validate', validToken, LoginController.validate);

export default router;
