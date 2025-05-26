import express from 'express';
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
router.get('/', getPublicPosts as any);

// Private route to get posts authored by the logged-in user
router.get('/my-posts', protect as any, getMyPosts as any);

// Public/Private route to get a single post by ID
// Access control (for private posts) is handled within the controller
router.get('/:id', getPostById as any);

// Private route to create a new post
router.post('/', protect as any, createPost as any);

// Private route to update a post (only author)
router.put('/:id', protect as any, updatePost as any);

// Private route to delete a post (only author)
router.delete('/:id', protect as any, deletePost as any);

export default router; 