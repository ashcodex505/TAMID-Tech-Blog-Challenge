import express from 'express';
import multer from 'multer';
import { uploadImage, deleteImage } from '../controllers/imageController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        // Check if file is an image
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'));
        }
    }
});

// Routes
router.post('/upload', protect as any, upload.single('image'), uploadImage as any);
router.delete('/:fileName', protect as any, deleteImage as any);

export default router; 