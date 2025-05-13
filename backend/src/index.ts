import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes'; // Import auth routes
import postRoutes from './routes/postRoutes'; // Import post routes
import { supabase } from './utils/supabase';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5001; // Use 5001 to avoid potential conflict with frontend

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse JSON bodies

// Routes
app.get('/', async (req: Request, res: Response) => {
  try {
    // Test Supabase connection
    const { data, error } = await supabase.from('health_check').select('*').limit(1);
    
    if (error) {
      throw error;
    }
    
    res.send('Technical Blog Backend API - Supabase connection successful');
  } catch (error) {
    console.error('Supabase connection error:', error);
    res.send('Technical Blog Backend API - Supabase connection may have issues');
  }
});

app.use('/api/auth', authRoutes); // Mount auth routes
app.use('/api/posts', postRoutes); // Mount post routes

// TODO: Add Tag routes (optional, tags are currently handled within post creation)

// Basic Error Handling Middleware
app.use((err: Error, req: Request, res: Response, next: Function) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app; // Export for potential testing
