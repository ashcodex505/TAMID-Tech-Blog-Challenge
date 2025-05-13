import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PenSquare, Tag, Eye, Lock, ArrowLeft, Hash } from 'lucide-react';
import axios from 'axios';
import useAuthStore from '../store/authStore';

interface FormData {
  title: string;
  content: string;
  tags: string;
  isPublic: boolean;
}

const CreatePostPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const token = useAuthStore(state => state.token);
  
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    tags: '',
    isPublic: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const postData = {
        title: formData.title,
        content: formData.content,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        isPublic: formData.isPublic
      };

      if (isEditMode) {
        await axios.put(`http://localhost:5001/api/posts/${id}`, postData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('http://localhost:5001/api/posts', postData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      // Redirect to My Posts page
      navigate('/my-posts');
    } catch (err) {
      console.error('Error submitting post:', err);
      setError('Failed to save post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Function to handle radio button changes
  const handleVisibilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, isPublic: e.target.value === 'public' }));
  };

  return (
    <div className="min-h-screen bg-[#202020] text-white">
      <div className="container mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <button 
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-[#31B4EF] hover:text-[#31B4EF]/80 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>

          <div className="bg-[#2A2A2A] p-8 rounded-lg shadow-lg border border-[#444444]">
            <div className="flex items-center mb-6">
              <PenSquare className="w-6 h-6 text-[#31B4EF] mr-3" />
              <h1 className="text-2xl font-bold">
                {isEditMode ? 'Edit Post' : 'Create New Post'}
              </h1>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-900/20 border border-red-800 text-red-400 px-4 py-3 rounded-md mb-6"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center" htmlFor="title">
                  Title
                </label>
                <input
                  className="w-full bg-[#333333] border border-[#444444] rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#31B4EF] focus:border-transparent transition-all"
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Enter a descriptive title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-5">
                <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center" htmlFor="content">
                  Content
                </label>
                <textarea
                  className="w-full bg-[#333333] border border-[#444444] rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#31B4EF] focus:border-transparent transition-all h-40 resize-y"
                  id="content"
                  name="content"
                  placeholder="Write your post content here..."
                  value={formData.content}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-5">
                <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center" htmlFor="tags">
                  <Hash className="w-4 h-4 mr-2 text-[#31B4EF]" />
                  Tags (comma-separated)
                </label>
                <input
                  className="w-full bg-[#333333] border border-[#444444] rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#31B4EF] focus:border-transparent transition-all"
                  id="tags"
                  name="tags"
                  type="text"
                  placeholder="e.g., react, typescript, webdev"
                  value={formData.tags}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Visibility
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      className="sr-only" 
                      name="visibility" 
                      value="public" 
                      checked={formData.isPublic}
                      onChange={handleVisibilityChange} 
                    />
                    <div className={`w-5 h-5 mr-2 rounded-full border ${formData.isPublic ? 'border-[#31B4EF] bg-[#31B4EF]/20' : 'border-[#444444]'} flex items-center justify-center`}>
                      {formData.isPublic && <div className="w-2.5 h-2.5 rounded-full bg-[#31B4EF]"></div>}
                    </div>
                    <div className="flex items-center">
                      <Eye className={`w-4 h-4 mr-2 ${formData.isPublic ? 'text-[#31B4EF]' : 'text-gray-500'}`} />
                      <span className={formData.isPublic ? 'text-white' : 'text-gray-500'}>Public</span>
                    </div>
                  </label>
                  <label className="inline-flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      className="sr-only" 
                      name="visibility" 
                      value="private" 
                      checked={!formData.isPublic}
                      onChange={handleVisibilityChange} 
                    />
                    <div className={`w-5 h-5 mr-2 rounded-full border ${!formData.isPublic ? 'border-[#31B4EF] bg-[#31B4EF]/20' : 'border-[#444444]'} flex items-center justify-center`}>
                      {!formData.isPublic && <div className="w-2.5 h-2.5 rounded-full bg-[#31B4EF]"></div>}
                    </div>
                    <div className="flex items-center">
                      <Lock className={`w-4 h-4 mr-2 ${!formData.isPublic ? 'text-[#31B4EF]' : 'text-gray-500'}`} />
                      <span className={!formData.isPublic ? 'text-white' : 'text-gray-500'}>Private</span>
                    </div>
                  </label>
                </div>
              </div>
              <div className="flex items-center justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`bg-[#31B4EF] hover:bg-[#31B4EF]/90 text-white font-medium py-2 px-4 rounded-md focus:outline-none transition-all duration-200 flex items-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>
                      {isEditMode ? 'Update Post' : 'Create Post'}
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CreatePostPage; 