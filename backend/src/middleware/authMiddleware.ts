import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import supabase from '../utils/supabase';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// Extend Express Request type to include 'user' property
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        name: string;
        email: string;
        created_at: string;
        updated_at: string;
      };
    }
  }
}

interface JwtPayload {
  id: string;
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

      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET!) as JwtPayload;

      // Get user from Supabase (excluding password)
      const { data: user, error } = await supabase
        .from('users')
        .select('id, name, email, created_at, updated_at')
        .eq('id', decoded.id)
        .single();

      if (error || !user) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      // Attach user to the request object
      req.user = user;

      next();
    } catch (error) {
      console.error('Token verification failed:', error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
    return;
  }
}; 