# TechBlog Backend with Supabase

This is the backend for the TechBlog application, using Express.js and Supabase as the database.

## Setup Instructions

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file based on the `.env.example` template
4. Set up your Supabase project:
   - Create a new project on [Supabase](https://supabase.com)
   - Create the following tables in Supabase:
     - `users` - For user accounts
     - `posts` - For blog posts
     - `tags` - For post tags
     - `post_tags` - Junction table for many-to-many relationship

## Supabase Schema

### users
- `id` (uuid, primary key)
- `name` (text, not null)
- `email` (text, not null, unique)
- `password` (text, not null)
- `created_at` (timestamp with time zone, not null)
- `updated_at` (timestamp with time zone, not null)

### posts
- `id` (uuid, primary key)
- `title` (text, not null)
- `content` (text, not null)
- `author_id` (uuid, not null, foreign key to users.id)
- `is_public` (boolean, not null, default true)
- `created_at` (timestamp with time zone, not null)
- `updated_at` (timestamp with time zone, not null)

### tags
- `id` (uuid, primary key)
- `name` (text, not null, unique)
- `created_at` (timestamp with time zone, not null)

### post_tags
- `id` (uuid, primary key)
- `post_id` (uuid, not null, foreign key to posts.id)
- `tag_id` (uuid, not null, foreign key to tags.id)

## Running the Application

- Development mode: `npm run dev`
- Production build: `npm run build`
- Start production server: `npm start`

## API Endpoints

- Authentication:
  - `POST /api/auth/register` - Register a new user
  - `POST /api/auth/login` - Login a user
  - `GET /api/auth/me` - Get current user profile

- Posts:
  - `GET /api/posts` - Get all public posts
  - `GET /api/posts/:id` - Get a specific post
  - `POST /api/posts` - Create a new post
  - `PUT /api/posts/:id` - Update a post
  - `DELETE /api/posts/:id` - Delete a post
  - `GET /api/posts/my-posts` - Get all posts by the logged-in user 