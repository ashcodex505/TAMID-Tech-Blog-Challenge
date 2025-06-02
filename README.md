# TAMID Tech Blog

A modern, full-stack blog platform built for the TAMID organization, featuring user authentication, image uploads, responsive design, and comprehensive content management capabilities.

![TAMID Tech Blog](https://img.shields.io/badge/TAMID-Tech%20Blog-31B4EF?style=for-the-badge&logo=react)

## 🚀 Live Demo

- **Frontend**: Deployed on [Vercel](https://vercel.com)
- **Backend API**: Deployed on [Vercel](https://vercel.com)
- **Database**: [Supabase](https://supabase.com)

## 📋 Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Architecture](#architecture)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Development Process](#development-process)
- [Challenges Faced](#challenges-faced)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)

## 🎯 Overview

The TAMID Tech Blog is a sophisticated blogging platform designed specifically for the TAMID organization. It provides a seamless experience for users to create, share, and discover technical content while maintaining a professional and modern interface that reflects TAMID's brand identity.

### Key Highlights

- **Full-Stack TypeScript Application** with type safety throughout
- **Modern React Frontend** with Framer Motion animations
- **RESTful Express.js Backend** with comprehensive API endpoints
- **Supabase Integration** for authentication, database, and file storage
- **Responsive Design** optimized for all device sizes
- **Image Upload & Management** with cloud storage
- **Tag-based Content Organization** for easy discovery
- **Protected Routes** with JWT authentication
- **Real-time User Experience** with optimistic updates

## 🛠 Technologies Used

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe JavaScript for better development experience
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing and navigation
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful, customizable icons
- **Axios** - HTTP client for API requests
- **Zustand** - Lightweight state management (configured but not actively used)

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **TypeScript** - Type-safe server-side development
- **Supabase Client** - Database and authentication integration
- **Multer** - File upload middleware
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management
- **UUID** - Unique identifier generation

### Database & Services
- **Supabase** - Backend-as-a-Service providing:
  - PostgreSQL database
  - Authentication & user management
  - File storage (images)
  - Real-time subscriptions
  - Row Level Security (RLS)

### Deployment & Hosting
- **Vercel** - Frontend and backend deployment
- **Supabase Cloud** - Database and storage hosting
- **GitHub** - Version control and CI/CD integration

### Development Tools
- **ESLint** - Code linting and quality assurance
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing
- **ts-node-dev** - TypeScript development server

## 🏗 Architecture

The application follows a modern full-stack architecture with clear separation of concerns:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Client  │    │  Express API    │    │    Supabase     │
│                 │    │                 │    │                 │
│  • Components   │◄──►│  • Controllers  │◄──►│  • PostgreSQL   │
│  • Pages        │    │  • Routes       │    │  • Auth         │
│  • Context      │    │  • Middleware   │    │  • Storage      │
│  • Hooks        │    │  • Utils        │    │  • Real-time    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Frontend Architecture

The frontend follows a component-based architecture with:

- **Pages**: Route-level components (`HomePage`, `CreatePostPage`, etc.)
- **Components**: Reusable UI components (`Navbar`, `ImageUpload`, etc.)
- **Context**: Authentication state management with React Context
- **Hooks**: Custom hooks for data fetching and state management
- **Utils**: API client configuration and helper functions

### Backend Architecture

The backend implements a RESTful API with:

- **Controllers**: Business logic for handling requests
- **Routes**: API endpoint definitions and middleware application
- **Middleware**: Authentication, CORS, and error handling
- **Utils**: Database connection and utility functions
- **Types**: TypeScript type definitions

## ✨ Features

### 🔐 Authentication & User Management
- **Supabase Authentication** with email/password
- **JWT Token Management** with automatic refresh
- **Protected Routes** requiring authentication
- **User Profile Management** with automatic sync
- **Session Persistence** across browser sessions

### 📝 Content Management
- **Rich Text Blog Posts** with title and content
- **Tag System** for content categorization
- **Public/Private Post Visibility** control
- **Post CRUD Operations** (Create, Read, Update, Delete)
- **Author Attribution** with user profiles
- **Search and Filtering** by tags and content

### 🖼 Image Management
- **Multiple Image Upload** per post (up to 5 images)
- **Drag & Drop Interface** for easy uploading
- **Image Preview** with removal capabilities
- **Cloud Storage** via Supabase Storage
- **Automatic Image Optimization** and compression
- **Progress Indicators** during upload

### 🎨 User Interface
- **Responsive Design** for mobile, tablet, and desktop
- **Dark Theme** with TAMID brand colors
- **Smooth Animations** using Framer Motion
- **Loading States** and error handling
- **Intuitive Navigation** with breadcrumbs
- **Modern Card-based Layout** for content display

### 🏷 Content Discovery
- **Tag-based Filtering** for easy content discovery
- **Featured Content** sections
- **Recent Posts** with chronological ordering
- **Author-based Filtering** and profiles
- **Search Functionality** across titles and content

### 📱 TAMID-Specific Features
- **TAMID Tracks Page** showcasing organization programs
- **Brand-consistent Design** with TAMID colors and styling
- **Community Features** for member engagement
- **Professional Layout** suitable for organizational use

## 📁 Project Structure

```
TAMID-Tech-Blog-Challenge/
├── frontend/                    # React TypeScript frontend
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Navbar.tsx     # Navigation component
│   │   │   ├── ImageUpload.tsx # Image upload functionality
│   │   │   ├── ImageGallery.tsx # Image display component
│   │   │   ├── ProtectedRoute.tsx # Route protection
│   │   │   └── GoogleLogin.tsx # OAuth integration
│   │   ├── pages/             # Route-level components
│   │   │   ├── HomePage.tsx   # Main blog listing
│   │   │   ├── CreatePostPage.tsx # Post creation/editing
│   │   │   ├── PostDetailPage.tsx # Individual post view
│   │   │   ├── MyPostsPage.tsx # User's posts management
│   │   │   ├── LoginPage.tsx  # Authentication
│   │   │   ├── RegisterPage.tsx # User registration
│   │   │   ├── TracksPage.tsx # TAMID tracks information
│   │   │   └── NotFoundPage.tsx # 404 error page
│   │   ├── context/           # React Context providers
│   │   │   └── auth/          # Authentication context
│   │   │       ├── authProvider.tsx # Auth state management
│   │   │       └── supabaseClient.tsx # Supabase configuration
│   │   ├── lib/               # Utility libraries
│   │   │   └── api.ts         # Axios configuration
│   │   ├── assets/            # Static assets
│   │   ├── App.tsx            # Main application component
│   │   ├── main.tsx           # Application entry point
│   │   └── index.css          # Global styles
│   ├── package.json           # Frontend dependencies
│   ├── vite.config.ts         # Vite configuration
│   ├── tailwind.config.js     # Tailwind CSS configuration
│   └── tsconfig.json          # TypeScript configuration
├── backend/                    # Express TypeScript backend
│   ├── src/
│   │   ├── controllers/       # Request handlers
│   │   │   ├── authController.ts # Authentication logic
│   │   │   ├── postController.ts # Blog post operations
│   │   │   └── imageController.ts # Image upload handling
│   │   ├── routes/            # API route definitions
│   │   │   ├── authRoutes.ts  # Authentication endpoints
│   │   │   ├── postRoutes.ts  # Blog post endpoints
│   │   │   └── imageRoutes.ts # Image upload endpoints
│   │   ├── middleware/        # Express middleware
│   │   │   └── authMiddleware.ts # JWT verification
│   │   ├── utils/             # Utility functions
│   │   │   └── supabase.ts    # Supabase client configuration
│   │   ├── types/             # TypeScript type definitions
│   │   └── index.ts           # Server entry point
│   ├── package.json           # Backend dependencies
│   ├── vercel.json            # Vercel deployment configuration
│   └── tsconfig.json          # TypeScript configuration
└── README.md                   # Project documentation
```

## 🚀 Installation & Setup

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Supabase Account** for database and authentication
- **Vercel Account** for deployment (optional)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/TAMID-Tech-Blog-Challenge.git
cd TAMID-Tech-Blog-Challenge
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# Server Configuration
PORT=5001
NODE_ENV=development
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the frontend directory:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# API Configuration
VITE_API_BASE_URL=http://localhost:5001/api
```

### 4. Database Setup

Set up the following tables in your Supabase project:

#### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Posts Table
```sql
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES users(id) ON DELETE CASCADE,
  is_public BOOLEAN DEFAULT true,
  images TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Tags Table
```sql
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Post Tags Junction Table
```sql
CREATE TABLE post_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  UNIQUE(post_id, tag_id)
);
```

### 5. Storage Setup

Create a storage bucket named `blog-images` in your Supabase project for image uploads.

### 6. Run the Application

Start the backend server:
```bash
cd backend
npm run dev
```

Start the frontend development server:
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5001`

## 📚 API Documentation

### Authentication Endpoints

#### Sync User
```http
POST /api/auth/sync-user
Authorization: Bearer <jwt_token>
```
Synchronizes Supabase authenticated user with local database.

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <jwt_token>
```
Retrieves current user profile information.

### Blog Post Endpoints

#### Get All Public Posts
```http
GET /api/posts
Query Parameters:
  - tag: Filter by tag name
  - authorName: Filter by author name
  - title: Search in post titles
```

#### Get Post by ID
```http
GET /api/posts/:id
```

#### Create New Post
```http
POST /api/posts
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Post Title",
  "content": "Post content...",
  "tags": ["tag1", "tag2"],
  "isPublic": true,
  "images": ["image_url1", "image_url2"]
}
```

#### Update Post
```http
PUT /api/posts/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content...",
  "tags": ["updated_tag"],
  "isPublic": false
}
```

#### Delete Post
```http
DELETE /api/posts/:id
Authorization: Bearer <jwt_token>
```

#### Get User's Posts
```http
GET /api/posts/my-posts
Authorization: Bearer <jwt_token>
```

### Image Upload Endpoints

#### Upload Image
```http
POST /api/images/upload
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data

Form Data:
  - image: File (max 5MB, image formats only)
```

#### Delete Image
```http
DELETE /api/images/:fileName
Authorization: Bearer <jwt_token>
```

## 🗄 Database Schema

The application uses a PostgreSQL database hosted on Supabase with the following schema:

### Entity Relationship Diagram

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│    users    │    │    posts    │    │ post_tags   │    │    tags     │
├─────────────┤    ├─────────────┤    ├─────────────┤    ├─────────────┤
│ id (PK)     │◄──┐│ id (PK)     │◄──┐│ id (PK)     │┌──►│ id (PK)     │
│ name        │   └│ author_id   │   └│ post_id     ││   │ name        │
│ email       │    │ title       │    │ tag_id      │┘   │ created_at  │
│ created_at  │    │ content     │    └─────────────┘    └─────────────┘
│ updated_at  │    │ is_public   │
└─────────────┘    │ images      │
                   │ created_at  │
                   │ updated_at  │
                   └─────────────┘
```

### Table Descriptions

- **users**: Stores user account information synced from Supabase Auth
- **posts**: Contains blog post content with author relationships
- **tags**: Manages content categorization tags
- **post_tags**: Junction table for many-to-many post-tag relationships

## 💻 Development Process

### Design Philosophy

The development of this blog platform was guided by several key principles:

1. **Type Safety First**: Extensive use of TypeScript throughout the stack
2. **Component Reusability**: Modular React components for maintainability
3. **Performance Optimization**: Lazy loading, optimistic updates, and efficient queries
4. **User Experience**: Smooth animations, loading states, and intuitive navigation
5. **Security**: JWT authentication, input validation, and secure file uploads

### Code Organization

#### Frontend Code Structure

The frontend follows React best practices with:

- **Functional Components**: Using React hooks for state management
- **Custom Hooks**: Extracting reusable logic into custom hooks
- **Context API**: Managing global authentication state
- **Component Composition**: Building complex UIs from simple components
- **Type-Safe Props**: Comprehensive TypeScript interfaces

#### Backend Code Structure

The backend implements clean architecture principles:

- **Controller Pattern**: Separating business logic from route handling
- **Middleware Chain**: Modular request processing
- **Error Handling**: Comprehensive error catching and user-friendly responses
- **Input Validation**: Server-side validation for all endpoints
- **Database Abstraction**: Using Supabase client for consistent data access

### Development Workflow

1. **Planning**: Feature requirements and API design
2. **Backend Development**: API endpoints and database schema
3. **Frontend Development**: UI components and user interactions
4. **Integration**: Connecting frontend and backend
5. **Testing**: Manual testing and bug fixes
6. **Deployment**: Vercel deployment and environment configuration

## 🚧 Challenges Faced

### 1. Authentication Integration

**Challenge**: Integrating Supabase authentication with custom backend API while maintaining security.

**Solution**: Implemented JWT token verification middleware that validates Supabase tokens and syncs user data with the local database. This approach provides the flexibility of custom user management while leveraging Supabase's robust authentication system.

```typescript
// Authentication middleware implementation
export const protect = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  const { data: { user }, error } = await supabase.auth.getUser(token);
  
  if (error || !user) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  
  req.user = user;
  next();
};
```

### 2. Image Upload and Management

**Challenge**: Implementing a robust image upload system with progress tracking, validation, and cloud storage.

**Solution**: Created a comprehensive image upload component with:
- File type and size validation
- Progress tracking during upload
- Preview functionality with removal options
- Integration with Supabase Storage for cloud hosting

### 3. State Management Complexity

**Challenge**: Managing complex state across multiple components while maintaining performance.

**Solution**: Implemented a hybrid approach using React Context for authentication state and local component state for UI interactions. This keeps the global state minimal while providing necessary data sharing.

### 4. Responsive Design Implementation

**Challenge**: Creating a consistent, responsive design that works across all device sizes.

**Solution**: Utilized Tailwind CSS's responsive utilities with a mobile-first approach, implementing custom breakpoints and flexible grid layouts that adapt to different screen sizes.

### 5. Real-time User Experience

**Challenge**: Providing immediate feedback for user actions while ensuring data consistency.

**Solution**: Implemented optimistic updates for UI interactions combined with proper error handling and rollback mechanisms when server operations fail.

## 🔮 Future Enhancements

Given more time and resources, the following features would enhance the platform:

### 1. Advanced Content Features
- **Rich Text Editor**: WYSIWYG editor with formatting options
- **Code Syntax Highlighting**: Support for code blocks with language-specific highlighting
- **Draft System**: Save posts as drafts before publishing
- **Post Scheduling**: Schedule posts for future publication
- **Comment System**: User comments and discussions on posts

### 2. Enhanced User Experience
- **Real-time Notifications**: Live updates for new posts and interactions
- **Advanced Search**: Full-text search with filters and sorting options
- **Bookmarking**: Save favorite posts for later reading
- **Reading Progress**: Track reading progress on long posts
- **Dark/Light Theme Toggle**: User preference for theme selection

### 3. Social Features
- **User Profiles**: Detailed author profiles with bio and social links
- **Following System**: Follow favorite authors
- **Post Sharing**: Social media integration for sharing posts
- **Like/Reaction System**: User engagement metrics
- **Newsletter Subscription**: Email notifications for new content

### 4. Administrative Features
- **Admin Dashboard**: Content moderation and user management
- **Analytics**: Post views, user engagement metrics
- **Content Moderation**: Automated and manual content review
- **User Roles**: Different permission levels (admin, editor, author)
- **Bulk Operations**: Mass content management tools

### 5. Technical Improvements
- **Progressive Web App**: Offline reading capabilities
- **Performance Optimization**: Image lazy loading, code splitting
- **SEO Enhancement**: Meta tags, structured data, sitemap generation
- **API Rate Limiting**: Prevent abuse and ensure fair usage
- **Comprehensive Testing**: Unit tests, integration tests, E2E tests

### 6. Integration Features
- **Third-party Authentication**: Google, GitHub, LinkedIn login
- **Content Import/Export**: Migrate content from other platforms
- **Webhook Support**: Integration with external services
- **API Documentation**: Interactive API documentation with Swagger
- **Mobile App**: React Native mobile application

## 🤝 Contributing

This project was developed as part of the TAMID Tech Track application process. The codebase demonstrates proficiency in modern web development technologies and best practices.

### Code Quality Standards

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting for consistency
- **Component Documentation**: Clear prop interfaces and comments
- **Error Handling**: Comprehensive error catching and user feedback
- **Security**: Input validation and authentication checks

### Development Guidelines

1. Follow the established project structure
2. Maintain TypeScript type safety
3. Write reusable, modular components
4. Implement proper error handling
5. Ensure responsive design compatibility
6. Document complex functionality

---

## 📄 License

This project is developed for educational purposes as part of the TAMID Tech Track application.

## 🙏 Acknowledgments

- **TAMID Organization** for providing the opportunity to build this project
- **Supabase** for the excellent backend-as-a-service platform
- **Vercel** for seamless deployment and hosting
- **React Community** for the amazing ecosystem of tools and libraries

---

**Built with ❤️ for TAMID**

