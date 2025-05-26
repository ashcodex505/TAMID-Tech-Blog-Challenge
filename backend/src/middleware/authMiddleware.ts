import { Request, Response, NextFunction } from 'express';
import { supabase } from '../utils/supabase';

// Extend Express Request type to include 'user' property
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name?: string;
        user_metadata?: any;
      };
    }
  }
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify Supabase JWT token
      const { data: { user }, error } = await supabase.auth.getUser(token);

      if (error || !user) {
        return res.status(401).json({ message: 'Not authorized, invalid token' });
      }

      // Attach Supabase user to the request object
      req.user = {
        id: user.id,
        email: user.email!,
        name: user.user_metadata?.full_name || user.email,
        user_metadata: user.user_metadata
      };

      next();
    } catch (error) {
      console.error('Token verification failed:', error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
    return;
  }
}; 