import { Request, Response } from 'express';
import { supabase } from '../utils/supabase';

/**
 * @desc    Sync Supabase authenticated user with local database
 * @route   POST /api/auth/sync-user
 * @access  Private (requires Supabase JWT)
 */
export const syncSupabaseUser = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }

    const { id, email, name } = req.user;

    // Check if user already exists in our database
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    let user;

    if (fetchError && fetchError.code === 'PGRST116') {
      // User doesn't exist, create new user
      const now = new Date().toISOString();
      
      const { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert([
          {
            id,
            email,
            name: name || email,
            created_at: now,
            updated_at: now
          }
        ])
        .select()
        .single();

      if (insertError) {
        throw insertError;
      }
      user = newUser;
    } else if (fetchError) {
      throw fetchError;
    } else {
      // User exists, update if needed
      const updateData: any = { updated_at: new Date().toISOString() };
      
      if (existingUser.name !== name && name) {
        updateData.name = name;
      }

      const { data: updatedUser, error: updateError } = await supabase
        .from('users')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (updateError) {
        throw updateError;
      }
      user = updatedUser;
    }

    res.status(200).json({
      id: user.id,
      email: user.email,
      name: user.name,
      created_at: user.created_at,
      updated_at: user.updated_at,
      role: 'user' // Default role
    });
  } catch (error: any) {
    console.error('Sync user error:', error);
    res.status(500).json({ message: 'Server error during user sync' });
  }
};

/**
 * @desc    Get current user profile
 * @route   GET /api/auth/me
 * @access  Private (requires Supabase JWT)
 */
export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Not authorized, user data missing' });
      return;
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('id, name, email, created_at, updated_at')
      .eq('id', req.user.id)
      .single();

    if (error || !user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({
      ...user,
      role: 'user' // Default role
    });
  } catch (error) {
    console.error('Get User Error:', error);
    res.status(500).json({ message: 'Server error while fetching user data' });
  }
}; 