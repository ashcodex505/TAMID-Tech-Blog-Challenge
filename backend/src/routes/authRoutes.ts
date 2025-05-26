import express from 'express';
import { syncSupabaseUser, getMe } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// Route to sync/create user in database after Supabase authentication


// Protected route to get current user info
router.get('/me', protect as any, getMe as any);

export default router; 