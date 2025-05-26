import express, { RequestHandler } from 'express';
import {
  createPost,
  getPublicPosts,
  getPostById,
  getMyPosts,
  updatePost,
  deletePost,
} from '../controllers/postController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// Public route to get all public posts (with potential filters)
router.get('/', getPublicPosts as RequestHandler);

// Private route to get posts authored by the logged-in user
router.get('/my-posts', getMyPosts as RequestHandler);

// Public/Private route to get a single post by ID
// Access control (for private posts) is handled within the controller
router.get('/:id', getPostById as RequestHandler);

// Private route to create a new post
router.post('/', createPost as RequestHandler);

// Private route to update a post (only author)
router.put('/:id', updatePost as RequestHandler);

// Private route to delete a post (only author)
router.delete('/:id',  deletePost as RequestHandler);

export default router; 