# TAMID Tech Blog

A modern, full-stack blog platform built for the TAMID Tech Challenge, featuring user authentication, image uploads, responsive design, and comprehensive content management capabilities.

![TAMID Tech Blog](https://img.shields.io/badge/TAMID-Tech%20Blog-31B4EF?style=for-the-badge&logo=react)

## 🚀 Live Demo

- **Frontend**: Deployed on [Vercel](https://vercel.com) at https://tamid-tech-blog-challenge.vercel.app
- **Backend API**: Deployed on [Vercel](https://vercel.com)
- **Database**: [Supabase](https://supabase.com)

## 📋 Table of Contents

- [🎯 Overview](#-overview)
- [🛠 Technologies Used](#-technologies-used)
- [🏗 Architecture](#-architecture)
- [✨ Features](#-features)
- [📁 Project Structure](#-project-structure)
- [🚀 Installation & Setup](#-installation--setup)
- [📚 API Documentation](#-api-documentation)
- [🗄 Database Schema](#-database-schema)
- [💻 Development Process](#-development-process)
- [🚧 Challenges Faced](#-challenges-faced)
- [🔮 Future Enhancements](#-future-enhancements)
- [🤝 Contributing](#-contributing)

## 🎯 Overview

The TAMID Tech Blog is a full-stack blogging platform I built for the TAMID Tech Challenge. This blog app includes features such as the ability for a user to upload images, assign tags, make descriptions & titles, and filter out the blogs by tags. The home page is dynamic as well as the category cards update dynamically according to new tags made by the users. The Blog application has Google Auth configured meaning that all sign-ins are made through google using supabase's Google OAuth for extra security instead of storing passwords in the database. The entire application is also responsive meaning you can use the application on your phone, and everything is scaled appropriately. I spent a lot of time on this app especially configuring the supabase backend, object storage, auth, and trying to fix the vercel hosting issues for both backend and frontend. I learned a lot and gained a whole new view into full-stack development especially by using new UI libraries like framer-motion which made the UI animation sleek and clean. I have everything documented in this README.md. If you want to host the app yourself locally or if you’re interested in how I made the app feel free to explore this documentation file. Hopefully you like it 😁
 

### Key Highlights

- **Full-Stack TypeScript Application** with type safety throughout
- **Modern React Frontend** with Framer Motion animations and tailwind css 
- **RESTful Express.js Backend** with API endpoints
- **Supabase Integration** for authentication, database, and file storage
- **Responsive Design** optimized for all device sizes (mobile and desktop) 
- **Image Upload & Management** with cloud storage using supabase
- **Tag-based Content Organization** for easy discovery
- **Protected Routes** with supabase access tokens to enable authorization of pages logged in and logged out users can access

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
  - Row Level Security (RLS) policies

### Deployment & Hosting
- **Vercel** - Frontend and backend deployment
- **Supabase Cloud** - Database and storage hosting
- **GitHub** - Version control and CI/CD integration

### Development Tools
- **ESLint** - Code linting and quality assurance (Very useful)
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
│  • Hooks        │    │  • Utils        │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Frontend Architecture

The frontend follows a component-based architecture with:

- **Pages**: Route-level components (`HomePage`, `CreatePostPage`, etc.)
- **Components**: Reusable UI components (`Navbar`, `ImageUpload`, etc.)
- **Context**: Authentication state management with React Context for authorization of users
- **Hooks**: Custom hooks for data fetching and state management
- **Utils**: API client configuration and helper functions

### Backend Architecture

The backend implements a RESTful API with:

- **Controllers**: Business logic for handling requests
- **Routes**: API endpoint definitions and middleware application
- **Middleware**: Authentication, CORS, and error handling (CORS meaning that if a another website tries accessing the database CORS will not allow it and only allow specified websites) 
- **Utils**: Database connection and utility functions
- **Types**: TypeScript type definitions

## ✨ Features

### 🔐 Authentication & User Management
- **Supabase Authentication** with email/password
- **Token Management** with automatic refresh
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

1. **Type Safety First**: Extensive use of TypeScript throughout the stack so that I can keep track of what variable is what (VERY HARD TO DO IN JAVASCRIPT)
2. **Component Reusability**: Modular React components for maintainability
3. **Performance Optimization**: Lazy loading, optimistic updates, and efficient queries
4. **User Experience**: Smooth animations, loading states, and intuitive navigation
5. **Security**: token authentication, input validation, and secure file uploads with multer

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

**Challenge**: Integrating Supabase authentication with custom backend API in a production environment while maintaining security.

**Solution**: This was a bit of tedious task in my opinion as I had the authentication set up on my local machine, but it wasn’t working on vercel which I was very confused with at first. But the solution was actually very simple it was basically having envs for the BASE_URL for the backend api route so all I had to do was in vercel in the env section I just had to change those envs. The same thing I had to do with Google cloud console and configure the redirect URLs and do it in supabase as well (which took me a bit of time to notice). Also, another thing was that the redirect url in the code had to be saved to local storage that way all the application had to do was getItem in localStorage and would have the link ready and redirect to that.


### 2. Image Upload and Management

**Challenge**: Implementing a robust image upload system with progress tracking, validation, and cloud storage.

**Solution**: I had to create an image upload component with:
- File type and size validation
- Progress tracking during upload
- Preview functionality with removal options
- Integration with Supabase Storage for cloud hosting
- Very hard to do especially configuring wit supabase storage buckets had to look through supabase documentation to figure it out

  

### 4. Responsive Design Implementation

**Challenge**: Creating a consistent, responsive design that works across all device sizes.

**Solution**: Utilized Tailwind CSS's responsive utilities with a mobile-first approach, implementing custom breakpoints and flexible grid layouts that adapt to different screen sizes. Used keywords such as md: sm: and lg: to do this. Sort of annoying to have to format everything on the website since I was using framer-motion libraries as well.


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

This project was developed as part of the TAMID Tech Track application process. This codebase demonstrates my proficiency in modern web development technologies and best practices. Hopefully you enjoyed reading through this :) 

### Code Quality Standards

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting for consistency
- **Component Documentation**: Clear prop interfaces and comments
- **Error Handling**: Comprehensive error catching and user feedback
- **Security**: Input validation and authentication checks

---

## 🙏 Acknowledgments

- **TAMID Organization** for providing the opportunity to build this project
- **Supabase** for the excellent backend-as-a-service platform (really grateful for this service honestly) 
- **Vercel** for seamless deployment and hosting
- **React Community** for the amazing ecosystem of tools and libraries

---

**Built with ❤️ for TAMID Tech**

