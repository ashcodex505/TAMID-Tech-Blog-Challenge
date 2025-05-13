import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Pencil, Trash2, Eye, Plus, FolderOpen, Lock, Filter } from 'lucide-react';
import axios from 'axios';
import useAuthStore from '../store/authStore';

interface Post {
  _id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    name: string;
  };
  tags: string[];
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
}

const MyPostsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'public' | 'private'>('all');
  const token = useAuthStore(state => state.token);
  
  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        setLoading(true);
        // Assuming there's an API endpoint for fetching the current user's posts
        const response = await axios.get('http://localhost:5001/api/posts/my-posts', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPosts(response.data);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load your posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMyPosts();
  }, [token]);

  const filteredPosts = filter === 'all' 
    ? posts 
    : posts.filter(post => filter === 'public' ? post.isPublic : !post.isPublic);

  const handleDeletePost = async (postId: string) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    
    try {
      await axios.delete(`http://localhost:5001/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPosts(posts.filter(post => post._id !== postId));
    } catch (err) {
      console.error('Error deleting post:', err);
      alert('Failed to delete post. Please try again.');
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 50 }
    }
  };

  return (
    <div className="min-h-screen bg-[#202020] text-white transition-colors duration-200">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold flex items-center">
              <FolderOpen className="w-7 h-7 mr-3 text-[#31B4EF]" />
              My Blog Posts
            </h1>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/create-post" 
                className="bg-[#31B4EF] hover:bg-[#31B4EF]/90 text-white font-medium py-2 px-4 rounded-md inline-flex items-center shadow-lg transition-all duration-200"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create New Post
              </Link>
            </motion.div>
          </div>

          {/* Filter Options */}
          <div className="mb-8 bg-[#2A2A2A] p-4 rounded-lg border border-[#444444]">
            <div className="flex items-center">
              <Filter className="w-5 h-5 mr-2 text-[#31B4EF]" />
              <span className="font-medium mr-4">Filter by:</span>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1 rounded-md ${filter === 'all' ? 'bg-[#31B4EF] text-white' : 'bg-[#333333] text-gray-300 hover:bg-[#444444]'}`}
                >
                  All Posts
                </button>
                <button 
                  onClick={() => setFilter('public')}
                  className={`px-3 py-1 rounded-md ${filter === 'public' ? 'bg-[#31B4EF] text-white' : 'bg-[#333333] text-gray-300 hover:bg-[#444444]'}`}
                >
                  Public
                </button>
                <button 
                  onClick={() => setFilter('private')}
                  className={`px-3 py-1 rounded-md ${filter === 'private' ? 'bg-[#31B4EF] text-white' : 'bg-[#333333] text-gray-300 hover:bg-[#444444]'}`}
                >
                  Private
                </button>
              </div>
            </div>
          </div>
          
          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#31B4EF]"></div>
            </div>
          ) : error ? (
            <motion.div 
              className="bg-red-900/20 border border-red-800 text-red-400 px-4 py-3 rounded-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-16 bg-[#2A2A2A] rounded-lg border border-[#444444]">
              <FolderOpen className="w-16 h-16 mx-auto text-gray-500 mb-4" />
              <h2 className="text-xl font-medium text-gray-300 mb-2">No Posts Found</h2>
              <p className="text-gray-400 mb-6">
                {filter === 'all' 
                  ? "You haven't created any posts yet." 
                  : filter === 'public' 
                    ? "You don't have any public posts yet."
                    : "You don't have any private posts yet."}
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/create-post" 
                  className="bg-[#31B4EF] hover:bg-[#31B4EF]/90 text-white font-medium py-2 px-4 rounded-md inline-flex items-center"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create Your First Post
                </Link>
              </motion.div>
            </div>
          ) : (
            <motion.div 
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredPosts.map(post => (
                <motion.div
                  key={post._id}
                  variants={itemVariants}
                  className="bg-[#2A2A2A] rounded-lg border border-[#444444] overflow-hidden flex flex-col md:flex-row"
                >
                  <div className="p-6 flex-grow">
                    <div className="flex items-center mb-2">
                      {post.isPublic ? (
                        <Eye className="w-4 h-4 text-green-400 mr-2" />
                      ) : (
                        <Lock className="w-4 h-4 text-amber-400 mr-2" />
                      )}
                      <span className={`text-xs px-2 py-0.5 rounded ${post.isPublic ? 'bg-green-900/40 text-green-400' : 'bg-amber-900/40 text-amber-400'}`}>
                        {post.isPublic ? 'Public' : 'Private'}
                      </span>
                    </div>
                    <Link to={`/post/${post._id}`}>
                      <h2 className="text-xl font-semibold mb-2 hover:text-[#31B4EF] transition-colors">
                        {post.title}
                      </h2>
                    </Link>
                    <p className="text-gray-400 mb-3 line-clamp-2">
                      {post.content.substring(0, 150)}...
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {post.tags.map(tag => (
                        <span 
                          key={`${post._id}-${tag}`}
                          className="inline-block bg-[#333333] rounded-md px-2 py-0.5 text-xs font-medium text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="text-sm text-gray-500">
                      Last updated: {new Date(post.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="bg-[#333333] p-4 flex md:flex-col justify-center items-center gap-2 md:w-24">
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Link 
                        to={`/edit-post/${post._id}`}
                        className="w-10 h-10 rounded-full bg-[#444444] hover:bg-[#31B4EF]/20 text-[#31B4EF] flex items-center justify-center transition-colors"
                        title="Edit post"
                      >
                        <Pencil className="w-5 h-5" />
                      </Link>
                    </motion.div>
                    <motion.button 
                      whileHover={{ scale: 1.1 }} 
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDeletePost(post._id)}
                      className="w-10 h-10 rounded-full bg-[#444444] hover:bg-red-500/20 text-red-400 hover:text-red-500 flex items-center justify-center transition-colors"
                      title="Delete post"
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MyPostsPage; 