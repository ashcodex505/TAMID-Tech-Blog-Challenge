import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import supabase from '../utils/supabase';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error('FATAL ERROR: JWT_SECRET is not defined.');
  process.exit(1);
}

// Helper function to generate JWT
const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, JWT_SECRET!, {
    expiresIn: '30d', // Token expires in 30 days
  });
};

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Current timestamp for created_at and updated_at
    const now = new Date().toISOString();

    // Insert user into Supabase
    const { data: user, error } = await supabase
      .from('users')
      .insert([
        { 
          name, 
          email, 
          password: hashedPassword,
          created_at: now,
          updated_at: now
        }
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }

    // Exclude password from the response
    if (user) {
      const { password: _, ...userResponse } = user;

      res.status(201).json({
        ...userResponse,
        token: generateToken(user.id),
      });
    } else {
      throw new Error('User creation failed');
    }
  } catch (error: any) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  try {
    // Find user by email
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (isPasswordMatch) {
      // Exclude password from the response
      const { password: _, ...userResponse } = user;

      res.json({
        ...userResponse,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

/**
 * @desc    Get current user profile (Example of a protected route)
 * @route   GET /api/auth/me
 * @access  Private
 */
export const getMe = async (req: Request, res: Response) => {
  // req.user should be populated by the authMiddleware
  if (!req.user) {
    return res.status(401).json({ message: 'Not authorized, user data missing' });
  }

  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('id, name, email, created_at, updated_at')
      .eq('id', req.user.id)
      .single();

    if (error || !user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Get User Error:', error);
    res.status(500).json({ message: 'Server error while fetching user data' });
  }
}; 