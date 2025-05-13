import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, Tag, ArrowLeft, MessageCircle, ThumbsUp, Share2 } from 'lucide-react';
import axios from 'axios';

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

const PostDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5001/api/posts/${id}`);
        setPost(response.data);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load blog post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-[#202020] text-white transition-colors duration-200">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="inline-flex items-center text-[#31B4EF] hover:text-[#31B4EF]/80 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to all posts
          </Link>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#31B4EF]"></div>
            </div>
          ) : error ? (
            <motion.div 
              className="bg-red-900/20 border border-red-800 text-red-400 px-4 py-3 rounded-md max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.div>
          ) : post ? (
            <div className="max-w-4xl mx-auto">
              <motion.h1 
                className="text-4xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {post.title}
              </motion.h1>
              
              <motion.div 
                className="flex flex-wrap items-center text-gray-400 mb-8 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2 text-[#31B4EF]" />
                  <span>{post.author.name}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-[#31B4EF]" />
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
                {post.tags.length > 0 && (
                  <div className="flex items-center">
                    <Tag className="w-4 h-4 mr-2 text-[#31B4EF]" />
                    <div className="flex flex-wrap gap-1">
                      {post.tags.map(tag => (
                        <span 
                          key={tag}
                          className="bg-[#31B4EF]/20 text-[#31B4EF] text-xs px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
              
              <motion.div 
                className="bg-[#2A2A2A] p-8 rounded-lg shadow-lg border border-[#444444] mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                    {post.content}
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex justify-between items-center border-t border-[#444444] pt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="flex space-x-4">
                  <motion.button 
                    className="flex items-center text-gray-400 hover:text-[#31B4EF] transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ThumbsUp className="w-5 h-5 mr-2" />
                    Like
                  </motion.button>
                  <motion.button 
                    className="flex items-center text-gray-400 hover:text-[#31B4EF] transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Comment
                  </motion.button>
                </div>
                <motion.button 
                  className="flex items-center text-gray-400 hover:text-[#31B4EF] transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Share
                </motion.button>
              </motion.div>
            </div>
          ) : (
            <div className="text-center text-gray-400">Post not found</div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default PostDetailPage; 