import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Get JWT secret from environment variable or use default
const JWT_SECRET = process.env.JWT_SECRET || 'XiaoLongBao';

interface JwtPayload {
  id: string;
  username: string;
}

// Extend Express Request to include `user`
declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload;
  }
}

// Middleware to fetch user from JWT
const fetchUser = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('auth-token');
  

  if (!token) {
    
    res.status(401).json({ error: "Please authenticate using a valid token" });
    return;
  }

  try {
    
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    
    req.user = decoded; // ✅ Now TypeScript recognizes this
    
    next();
  } catch (error) {
    
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

export default fetchUser;
