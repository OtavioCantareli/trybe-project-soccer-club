import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

import 'dotenv/config';

const SECRET = process.env.JWT_SECRET || 'xablau';

export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const decoded = jwt.verify(authorization, SECRET);
    req.body.tokenData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};
