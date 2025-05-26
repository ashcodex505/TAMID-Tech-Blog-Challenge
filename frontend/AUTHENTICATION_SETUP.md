# Google Authentication Setup with Supabase

This guide will walk you through setting up Google OAuth authentication using Supabase for this React/Vite application.

## Prerequisites

1. A Supabase account and project
2. A Google Cloud Platform account
3. Basic knowledge of React and environment variables

## Step 1: Supabase Project Setup

### 1.1 Create a Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Fill in your project details and create the project

### 1.2 Get Supabase Credentials
1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL**
   - **anon public** key

## Step 2: Google Cloud Platform Setup

### 2.1 Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API (if not already enabled)

### 2.2 Configure OAuth Consent Screen
1. Go to **APIs & Services** → **OAuth consent screen**
2. Choose **External** user type
3. Fill in the required information:
   - App name
   - User support email
   - Developer contact information
4. Under **Authorized domains**, add your Supabase project domain:
   - `your-project-ref.supabase.co`
5. Configure the following scopes:
   - `../auth/userinfo.email`
   - `../auth/userinfo.profile`
   - `openid`

### 2.3 Create OAuth Credentials
1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **OAuth Client ID**
3. Choose **Web application** as the application type
4. Configure the following:
   - **Authorized JavaScript origins**: 
     - `http://localhost:5173` (for development)
     - Your production domain (if applicable)
   - **Authorized redirect URIs**:
     - Get this from your Supabase dashboard (see step 2.4)

### 2.4 Get Supabase OAuth Callback URL
1. In your Supabase dashboard, go to **Authentication** → **Providers**
2. Find **Google** in the list and expand it
3. Copy the **Callback URL** (it looks like: `https://your-project-ref.supabase.co/auth/v1/callback`)
4. Add this URL to your Google OAuth credentials as an authorized redirect URI

### 2.5 Complete Google OAuth Setup
1. Save your OAuth credentials
2. Copy the **Client ID** and **Client Secret**

## Step 3: Configure Supabase Authentication

### 3.1 Enable Google Provider
1. In your Supabase dashboard, go to **Authentication** → **Providers**
2. Find **Google** and toggle it to **Enabled**
3. Enter your Google **Client ID** and **Client Secret**
4. Click **Save**

## Step 4: Environment Variables Setup

### 4.1 Create Environment File
1. Create a `.env` file in the `frontend` directory
2. Add the following variables:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Environment State (development/production)
VITE_ENV_STATE=development

# Backend URL (optional, if you have a separate backend)
VITE_BACKEND_URL=your_backend_url_here
```

### 4.2 Replace Placeholder Values
- Replace `your_supabase_project_url_here` with your Supabase Project URL
- Replace `your_supabase_anon_key_here` with your Supabase anon public key
- Set `VITE_ENV_STATE` to `development` for local development or `production` for production
- Set `VITE_BACKEND_URL` only if you have a separate backend API (optional)

## Step 5: Test the Authentication

### 5.1 Start the Development Server
```bash
npm run dev
```

### 5.2 Test the Login Flow
1. Navigate to `http://localhost:5173/login`
2. Click the "Continue with Google" button
3. Complete the Google OAuth flow
4. You should be redirected back to your application and logged in

## Step 6: Production Deployment

### 6.1 Update Environment Variables
- Set `VITE_ENV_STATE=production`
- Update any production-specific URLs

### 6.2 Update Google OAuth Credentials
- Add your production domain to authorized JavaScript origins
- Add your production Supabase callback URL to authorized redirect URIs

## Features Implemented

✅ **Google OAuth Login**: Users can sign in with their Google accounts
✅ **Session Management**: User sessions are automatically managed by Supabase
✅ **Protected Routes**: Routes like `/create-post`, `/my-posts`, and `/edit-post/:id` require authentication
✅ **Automatic Redirects**: Users are redirected to saved paths after login
✅ **Logout Functionality**: Users can securely log out
✅ **Loading States**: Proper loading indicators during authentication
✅ **User Information Display**: User's name/email is shown in the navbar when logged in

## Authentication Flow

1. **Login Process**:
   - User clicks "Continue with Google" on `/login` page
   - Redirected to Google OAuth consent screen
   - Upon approval, Google redirects back to Supabase
   - Supabase processes the OAuth response and creates a session
   - User is redirected back to the application (home page or saved path)

2. **Protected Routes**:
   - `ProtectedRoute` component checks for valid Supabase session
   - If no session exists, user is redirected to `/login`
   - If session exists, user can access protected pages

3. **Session Persistence**:
   - Sessions are automatically stored in localStorage by Supabase
   - Sessions persist across browser refreshes and tabs
   - Sessions automatically refresh when needed

## Troubleshooting

### Common Issues

1. **"redirect_uri_mismatch" Error**:
   - Check that your callback URL in Google OAuth matches the one from Supabase
   - Ensure the URL doesn't have a trailing slash

2. **Environment Variables Not Working**:
   - Make sure all environment variables start with `VITE_`
   - Restart the development server after changing `.env` file
   - Check that `.env` file is in the correct directory (`frontend/.env`)

3. **Authentication Not Working**:
   - Check browser console for error messages
   - Verify Supabase project URL and anon key are correct
   - Ensure Google OAuth credentials are properly configured

4. **Loading Forever**:
   - Check if backend URL is configured but backend is not running
   - The app will work without a backend by using default user roles

### Getting Help

If you encounter issues:
1. Check the browser console for error messages
2. Verify all environment variables are set correctly
3. Test with a fresh incognito/private browser window
4. Check Supabase dashboard logs for authentication errors

## Security Notes

- Never commit your `.env` file to version control
- Use different Google OAuth credentials for development and production
- Regularly rotate your Supabase API keys
- Monitor authentication logs in your Supabase dashboard 