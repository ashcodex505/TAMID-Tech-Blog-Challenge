const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Import the compiled JavaScript routes (they export as default)
const authRoutes = require('../dist/routes/authRoutes').default;
const postRoutes = require('../dist/routes/postRoutes').default;
const imageRoutes = require('../dist/routes/imageRoutes').default;

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get('/', async (req, res) => {
  try {
    const { supabase } = require('../dist/utils/supabase');
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

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/images', imageRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app; 