import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

class LoginController {
  login = async (request: Request, response: Response) => {
    const { code, message, token } = await LoginService.login(request.body);
    if (message) return response.status(code).json({ message });
    return response.status(code).json({ token });
  };

  validate = async (request: Request, response: Response) => {
    const { auth } = request.body.tokenData;
    if (!auth) return response.status(401).json({ message: 'unauthorized' });
    const { role } = auth;
    return response.status(200).json({ role });
  };
}

export default new LoginController();
