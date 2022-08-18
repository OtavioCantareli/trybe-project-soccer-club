import { sign } from 'jsonwebtoken';
import IntUser from '../interfaces/User';
import 'dotenv/config';

const SECRET = process.env.JWT_SECRET || 'xablau';

const Token = (auth: IntUser) => sign({ auth }, SECRET);

export default Token;
