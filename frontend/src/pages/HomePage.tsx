import React, { useState, useEffect } from 'react';
import apiClient from '../lib/api';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Code, Tag, Users, TrendingUp, ChevronRight } from 'lucide-react';

// Blog post interface
interface Post {
  _id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    name: string;
  } | null;
  tags: Array<{
    tag: {
      id: string;
      name: string;
    };
  }>;
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
}

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get('/posts/');
        setPosts(response.data);
        
        // Extract all unique tags
        const tags = new Set<string>();
        response.data.forEach((post: Post) => {
          post.tags.forEach(tag => tags.add(tag.tag.name));
        });
        setAllTags(Array.from(tags));
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts by tag if one is selected
  const filteredPosts = selectedTag 
    ? posts.filter(post => post.tags.some(t => t.tag.name === selectedTag))
    : posts;

  const clearTagFilter = () => setSelectedTag(null);

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

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-[#202020] text-white transition-colors duration-200">
      {/* Hero Section */}
      <motion.section 
        className="relative py-20 px-4 mb-16 overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[#31B4EF]/5" />
          <div className="absolute top-20 left-20 w-72 h-72 bg-[#31B4EF]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#31B4EF]/10 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto relative z-10">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold mb-6">
              TAMID Tech<span className="text-[#31B4EF]">Blog</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Discover the latest insights, tutorials, and opinions on technology, programming, and digital innovation.
            </p>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/register" 
                className="bg-[#31B4EF] hover:bg-[#31B4EF]/90 text-white font-bold py-3 px-8 rounded-md inline-block shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Join the Community
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Categories Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-12 bg-[#2A2A2A]"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Explore Topics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-[#333333] border border-[#444444] p-6 rounded-lg"
            >
              <div className="mb-4 text-[#31B4EF]">
                <Code className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Programming</h3>
              <p className="text-gray-400">Coding tutorials, best practices, and language deep-dives</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-[#333333] border border-[#444444] p-6 rounded-lg"
            >
              <div className="mb-4 text-[#31B4EF]">
                <TrendingUp className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Technology Trends</h3>
              <p className="text-gray-400">Latest developments and innovations in the tech world</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-[#333333] border border-[#444444] p-6 rounded-lg"
            >
              <div className="mb-4 text-[#31B4EF]">
                <Users className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-gray-400">Stories, interviews, and insights from the tech community</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-[#333333] border border-[#444444] p-6 rounded-lg"
            >
              <div className="mb-4 text-[#31B4EF]">
                <BookOpen className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Tutorials</h3>
              <p className="text-gray-400">Step-by-step guides to learn new skills and technologies</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        {/* Tags Filter */}
        {allTags.length > 0 && (
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-center mb-4">
              <Tag className="w-5 h-5 mr-2 text-[#31B4EF]" />
              <h2 className="text-2xl font-semibold">Browse by Topic</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
              {selectedTag && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearTagFilter}
                  className="bg-[#31B4EF] text-white py-1 px-4 rounded-md text-sm font-medium flex items-center"
                >
                  {selectedTag} <span className="ml-2">×</span>
                </motion.button>
              )}
              
              {allTags.map(tag => (
                <motion.button
                  key={tag}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedTag(tag)}
                  className={`py-1 px-4 rounded-md text-sm font-medium ${
                    selectedTag === tag 
                      ? 'bg-[#31B4EF] text-white' 
                      : 'bg-[#333333] text-gray-200 hover:bg-[#444444]'
                  }`}
                >
                  {tag}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Posts Grid */}
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
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-8 border-b border-[#444444] pb-2 max-w-6xl mx-auto">
              {selectedTag ? `Posts about ${selectedTag}` : 'Latest Articles'}
            </h2>
            
            {filteredPosts.length === 0 ? (
              <p className="text-gray-400 text-center py-10">No posts found. Check back soon!</p>
            ) : (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredPosts.map(post => (
                  <motion.div 
                    key={post._id}
                    variants={itemVariants}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="bg-[#2A2A2A] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-[#444444]"
                  >
                    <div className="p-6">
                      <Link to={`/post/${post._id}`}>
                        <h3 className="text-xl font-semibold mb-2 hover:text-[#31B4EF] transition-colors">
                          {post.title}
                        </h3>
                      </Link>
                      <p className="text-gray-400 mb-4 line-clamp-3">
                        {post.content.substring(0, 150)}...
                      </p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {post.tags.map(t => (
                          <span 
                            key={`${post._id}-${t.tag.name}`}
                            className="inline-block bg-[#333333] rounded-md px-3 py-1 text-xs font-semibold text-gray-300"
                          >
                            {t.tag.name}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>By {post.author?.name || 'Unknown Author'}</span>
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      </div>
                      <Link 
                        to={`/post/${post._id}`}
                        className="mt-4 inline-flex items-center text-[#31B4EF] hover:underline"
                      >
                        Read more
                        <ChevronRight className="ml-1 w-4 h-4" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* Call to Action */}
      <motion.section 
        className="bg-[#2A2A2A] py-16 px-4 text-white text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Share Your Knowledge?</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Join our community of tech enthusiasts and share your expertise with the world.
          </p>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/register" 
              className="bg-[#31B4EF] hover:bg-[#31B4EF]/90 text-white font-bold py-3 px-8 rounded-md inline-block shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Start Writing Today
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage; 