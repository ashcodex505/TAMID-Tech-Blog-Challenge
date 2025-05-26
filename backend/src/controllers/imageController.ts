import { Request, Response } from 'express';
import { supabase } from '../utils/supabase';
import { v4 as uuidv4 } from 'uuid';

/**
 * @desc    Upload image to Supabase Storage
 * @route   POST /api/images/upload
 * @access  Private
 */
export const uploadImage = async (req: Request, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ message: 'User not authorized' });
    }

    try {
        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).json({ message: 'No image file provided' });
        }

        const file = req.file;
        const fileExt = file.originalname.split('.').pop();
        const fileName = `${userId}/${uuidv4()}.${fileExt}`;

        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
            .from('blog-images')
            .upload(fileName, file.buffer, {
                contentType: file.mimetype,
                upsert: false
            });

        if (error) {
            console.error('Supabase storage error:', error);
            return res.status(500).json({ message: 'Failed to upload image' });
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from('blog-images')
            .getPublicUrl(fileName);

        res.status(201).json({
            message: 'Image uploaded successfully',
            imageUrl: publicUrl,
            fileName: fileName
        });
    } catch (error: any) {
        console.error('Upload Image Error:', error);
        res.status(500).json({ message: 'Server error uploading image' });
    }
};

/**
 * @desc    Delete image from Supabase Storage
 * @route   DELETE /api/images/:fileName
 * @access  Private
 */
export const deleteImage = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const { fileName } = req.params;

    if (!userId) {
        return res.status(401).json({ message: 'User not authorized' });
    }

    try {
        // Verify the file belongs to the user (fileName should start with userId)
        if (!fileName.startsWith(userId)) {
            return res.status(403).json({ message: 'Not authorized to delete this image' });
        }

        // Delete from Supabase Storage
        const { error } = await supabase.storage
            .from('blog-images')
            .remove([fileName]);

        if (error) {
            console.error('Supabase storage delete error:', error);
            return res.status(500).json({ message: 'Failed to delete image' });
        }

        res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error: any) {
        console.error('Delete Image Error:', error);
        res.status(500).json({ message: 'Server error deleting image' });
    }
}; 