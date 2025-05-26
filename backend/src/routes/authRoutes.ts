import express, { RequestHandler } from 'express';
import { registerUser, loginUser, getMe } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', registerUser as RequestHandler);
router.post('/login', loginUser as RequestHandler);

// Example of a protected route
router.get('/me',  getMe as RequestHandler);

export default router; 