import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: {id: string};
}

export const  protect = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    let token;

    // check header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token'});
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    
    // attach user to request
    req.user = { id: decoded.id };

    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error', error});
  }
}