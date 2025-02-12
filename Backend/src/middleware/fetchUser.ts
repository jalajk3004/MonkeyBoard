import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

interface DecodedToken {
  user: {
    id: string;
    username: string;
  };
}

interface CustomRequest extends Request {
  user?: DecodedToken['user'];
}

const fetchUser = (req: CustomRequest, res: Response, next: NextFunction): void => {
  const token = req.header('auth-token');

  if (!token) {
    res.status(401).json({ error: 'Please authenticate using a valid token' });
    return;
  }


  try {
    const data = jwt.verify(token, JWT_SECRET) as DecodedToken;
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
    return;
  }
};

export default fetchUser;