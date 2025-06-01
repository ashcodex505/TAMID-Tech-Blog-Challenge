import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PostDetailPage from './pages/PostDetailPage';
import CreatePostPage from './pages/CreatePostPage';
import MyPostsPage from './pages/MyPostsPage';
import ProtectedRoute from './components/ProtectedRoute';
import NotFoundPage from './pages/NotFoundPage';
import TracksPage from './pages/TracksPage';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#202020] text-white">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/post/:id" element={<PostDetailPage />} />
          <Route path="/tracks" element={<TracksPage />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/auth/Home" element={<HomePage />}/>
            <Route path="/create-post" element={<CreatePostPage />} />
            <Route path="/edit-post/:id" element={<CreatePostPage />} />
            <Route path="/my-posts" element={<MyPostsPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <footer className="bg-[#2A2A2A] text-center p-4 border-t border-[#444444] text-gray-400">
        © {new Date().getFullYear()} TechBlog. All rights reserved.
      </footer>
    </div>
  )
}

export default App
