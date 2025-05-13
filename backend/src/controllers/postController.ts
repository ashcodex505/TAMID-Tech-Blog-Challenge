import { Request, Response } from 'express';
import supabase from '../utils/supabase';

/**
 * Helper function to find or create tags
 * @param tagNames Array of tag names (strings)
 * @returns Array of tag ids
 */
const findOrCreateTags = async (tagNames: string[]): Promise<string[]> => {
    const tagIds: string[] = [];
    
    for (const name of tagNames) {
        const tagName = name.toLowerCase().trim();
        if (!tagName) continue; // Skip empty tags

        // Check if tag exists
        const { data: existingTag } = await supabase
            .from('tags')
            .select('id')
            .eq('name', tagName)
            .single();

        if (existingTag) {
            tagIds.push(existingTag.id);
        } else {
            // Create new tag
            const { data: newTag, error } = await supabase
                .from('tags')
                .insert({ name: tagName, created_at: new Date().toISOString() })
                .select('id')
                .single();

            if (error) {
                console.error('Error creating tag:', error);
                continue;
            }

            if (newTag) {
                tagIds.push(newTag.id);
            }
        }
    }
    
    return tagIds;
};

/**
 * @desc    Create a new blog post
 * @route   POST /api/posts
 * @access  Private
 */
export const createPost = async (req: Request, res: Response) => {
    const { title, content, tags, isPublic } = req.body;
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ message: 'User not authorized' });
    }
    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required' });
    }

    try {
        // Current timestamp
        const now = new Date().toISOString();
        
        // Create post
        const { data: post, error } = await supabase
            .from('posts')
            .insert({
                title,
                content,
                author_id: userId,
                is_public: isPublic !== undefined ? isPublic : true,
                created_at: now,
                updated_at: now
            })
            .select()
            .single();

        if (error) {
            throw error;
        }

        // Handle tags if provided
        if (tags && Array.isArray(tags) && tags.length > 0) {
            const tagIds = await findOrCreateTags(tags);
            
            // Create post-tag relationships
            if (tagIds.length > 0) {
                const postTagsData = tagIds.map(tagId => ({
                    post_id: post.id,
                    tag_id: tagId
                }));
                
                const { error: tagLinkError } = await supabase
                    .from('post_tags')
                    .insert(postTagsData);
                
                if (tagLinkError) {
                    console.error('Error linking tags to post:', tagLinkError);
                }
            }
        }

        // Fetch the post with author and tags
        const { data: postWithDetails, error: fetchError } = await supabase
            .from('posts')
            .select(`
                *,
                author:users(id, name, email),
                tags:post_tags(tag:tags(id, name))
            `)
            .eq('id', post.id)
            .single();

        if (fetchError) {
            throw fetchError;
        }

        res.status(201).json(postWithDetails);
    } catch (error: any) {
        console.error('Create Post Error:', error);
        res.status(500).json({ message: 'Server error creating post' });
    }
};

/**
 * @desc    Get all public blog posts (with filtering and pagination)
 * @route   GET /api/posts
 * @access  Public
 */
export const getPublicPosts = async (req: Request, res: Response) => {
    const { tag, authorName, title } = req.query; // Filter options

    try {
        let query = supabase
            .from('posts')
            .select(`
                *,
                author:users(id, name, email),
                tags:post_tags(tag:tags(id, name))
            `)
            .eq('is_public', true)
            .order('created_at', { ascending: false });

        // Filter by title
        if (title && typeof title === 'string') {
            query = query.ilike('title', `%${title}%`);
        }

        // Filter by author name
        if (authorName && typeof authorName === 'string') {
            query = query.textSearch('author.name', authorName, {
                config: 'english'
            });
        }

        // Filter by tag
        if (tag && typeof tag === 'string') {
            const tagName = tag.toLowerCase().trim();
            
            // First find the tag ID
            const { data: tagData } = await supabase
                .from('tags')
                .select('id')
                .eq('name', tagName)
                .single();

            if (tagData) {
                // Find posts with this tag
                const { data: postIdsWithTag } = await supabase
                    .from('post_tags')
                    .select('post_id')
                    .eq('tag_id', tagData.id);

                if (postIdsWithTag && postIdsWithTag.length > 0) {
                    const postIds = postIdsWithTag.map((item: { post_id: string }) => item.post_id);
                    query = query.in('id', postIds);
                } else {
                    // No posts with this tag
                    return res.status(200).json([]);
                }
            } else {
                // Tag doesn't exist
                return res.status(200).json([]);
            }
        }

        const { data: posts, error } = await query;

        if (error) {
            throw error;
        }

        res.status(200).json(posts || []);
    } catch (error) {
        console.error('Get Public Posts Error:', error);
        res.status(500).json({ message: 'Server error fetching posts' });
    }
};

/**
 * @desc    Get a single post by ID
 * @route   GET /api/posts/:id
 * @access  Public (if post is public), Private (if post is private, requires auth and ownership)
 */
export const getPostById = async (req: Request, res: Response) => {
    const postId = req.params.id;
    const userId = req.user?.id;

    try {
        const { data: post, error } = await supabase
            .from('posts')
            .select(`
                *,
                author:users(id, name, email),
                tags:post_tags(tag:tags(id, name))
            `)
            .eq('id', postId)
            .single();

        if (error || !post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // If post is private, check if the requester is the author
        if (!post.is_public) {
            if (!userId || post.author.id !== userId) {
                return res.status(403).json({ message: 'Not authorized to view this post' });
            }
        }

        res.status(200).json(post);
    } catch (error) {
        console.error('Get Post By ID Error:', error);
        res.status(500).json({ message: 'Server error fetching post' });
    }
};

/**
 * @desc    Get all posts by the logged-in user
 * @route   GET /api/posts/my-posts
 * @access  Private
 */
export const getMyPosts = async (req: Request, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ message: 'User not authorized' });
    }

    try {
        const { data: posts, error } = await supabase
            .from('posts')
            .select(`
                *,
                tags:post_tags(tag:tags(id, name))
            `)
            .eq('author_id', userId)
            .order('created_at', { ascending: false });

        if (error) {
            throw error;
        }

        res.status(200).json(posts || []);
    } catch (error) {
        console.error('Get My Posts Error:', error);
        res.status(500).json({ message: 'Server error fetching user posts' });
    }
};

/**
 * @desc    Update a blog post
 * @route   PUT /api/posts/:id
 * @access  Private (Author only)
 */
export const updatePost = async (req: Request, res: Response) => {
    const postId = req.params.id;
    const { title, content, tags, isPublic } = req.body;
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ message: 'User not authorized' });
    }

    try {
        // Check if post exists and belongs to user
        const { data: existingPost, error: fetchError } = await supabase
            .from('posts')
            .select('id, author_id')
            .eq('id', postId)
            .single();

        if (fetchError || !existingPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (existingPost.author_id !== userId) {
            return res.status(403).json({ message: 'Not authorized to update this post' });
        }

        // Update the post
        const { error: updateError } = await supabase
            .from('posts')
            .update({
                title: title,
                content: content,
                is_public: isPublic !== undefined ? isPublic : true,
                updated_at: new Date().toISOString()
            })
            .eq('id', postId);

        if (updateError) {
            throw updateError;
        }

        // Handle tags if provided
        if (tags && Array.isArray(tags)) {
            // First remove existing tag associations
            await supabase
                .from('post_tags')
                .delete()
                .eq('post_id', postId);

            // Then create new ones
            if (tags.length > 0) {
                const tagIds = await findOrCreateTags(tags);
                
                if (tagIds.length > 0) {
                    const postTagsData = tagIds.map(tagId => ({
                        post_id: postId,
                        tag_id: tagId
                    }));
                    
                    await supabase
                        .from('post_tags')
                        .insert(postTagsData);
                }
            }
        }

        // Fetch the updated post with all details
        const { data: updatedPost, error: getError } = await supabase
            .from('posts')
            .select(`
                *,
                author:users(id, name, email),
                tags:post_tags(tag:tags(id, name))
            `)
            .eq('id', postId)
            .single();

        if (getError) {
            throw getError;
        }

        res.status(200).json(updatedPost);
    } catch (error) {
        console.error('Update Post Error:', error);
        res.status(500).json({ message: 'Server error updating post' });
    }
};

/**
 * @desc    Delete a blog post
 * @route   DELETE /api/posts/:id
 * @access  Private (Author only)
 */
export const deletePost = async (req: Request, res: Response) => {
    const postId = req.params.id;
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ message: 'User not authorized' });
    }

    try {
        // Check if post exists and belongs to user
        const { data: post, error: fetchError } = await supabase
            .from('posts')
            .select('author_id')
            .eq('id', postId)
            .single();

        if (fetchError || !post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.author_id !== userId) {
            return res.status(403).json({ message: 'Not authorized to delete this post' });
        }

        // First delete related tags in post_tags junction table
        await supabase
            .from('post_tags')
            .delete()
            .eq('post_id', postId);

        // Then delete the post
        const { error: deleteError } = await supabase
            .from('posts')
            .delete()
            .eq('id', postId);

        if (deleteError) {
            throw deleteError;
        }

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Delete Post Error:', error);
        res.status(500).json({ message: 'Server error deleting post' });
    }
}; 