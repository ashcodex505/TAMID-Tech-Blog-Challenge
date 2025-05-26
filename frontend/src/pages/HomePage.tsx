import React, { useState, useEffect } from 'react';
import apiClient from '../lib/api';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Code, Tag, Users, TrendingUp, ChevronRight, Zap, Globe, Smartphone, Database, Shield, Cpu, Lightbulb, Trophy } from 'lucide-react';
import ImageGallery from '../components/ImageGallery';

// Blog post interface
interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
  } | null;
  tags: Array<{
    tag: {
      id: string;
      name: string;
    };
  }>;
  images: string[] | null;
  created_at: string;
  updated_at: string;
  is_public: boolean;
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

  // Function to get appropriate icon for each tag
  const getTagIcon = (tagName: string) => {
    const tag = tagName.toLowerCase();
    if (tag.includes('programming') || tag.includes('code') || tag.includes('development')) return Code;
    if (tag.includes('trend') || tag.includes('innovation') || tag.includes('future')) return TrendingUp;
    if (tag.includes('community') || tag.includes('team') || tag.includes('collaboration')) return Users;
    if (tag.includes('tutorial') || tag.includes('guide') || tag.includes('learn')) return BookOpen;
    if (tag.includes('hackathon') || tag.includes('competition') || tag.includes('contest')) return Trophy;
    if (tag.includes('web') || tag.includes('internet') || tag.includes('online')) return Globe;
    if (tag.includes('mobile') || tag.includes('app') || tag.includes('ios') || tag.includes('android')) return Smartphone;
    if (tag.includes('data') || tag.includes('database') || tag.includes('sql')) return Database;
    if (tag.includes('security') || tag.includes('cyber') || tag.includes('privacy')) return Shield;
    if (tag.includes('ai') || tag.includes('machine') || tag.includes('algorithm')) return Cpu;
    if (tag.includes('startup') || tag.includes('innovation') || tag.includes('idea')) return Lightbulb;
    if (tag.includes('performance') || tag.includes('speed') || tag.includes('optimization')) return Zap;
    // Default icon
    return Tag;
  };

  // Function to get post count for each tag
  const getTagPostCount = (tagName: string) => {
    return posts.filter(post => post.tags.some(t => t.tag.name === tagName)).length;
  };

  // Function to generate description for tags
  const getTagDescription = (tagName: string, postCount: number) => {
    const tag = tagName.toLowerCase();
    if (tag.includes('hackathon')) return `Explore ${postCount} post${postCount !== 1 ? 's' : ''} about hackathons, competitions, and coding challenges`;
    if (tag.includes('programming') || tag.includes('code')) return `Discover ${postCount} post${postCount !== 1 ? 's' : ''} about programming languages and coding techniques`;
    if (tag.includes('tutorial')) return `Learn from ${postCount} tutorial${postCount !== 1 ? 's' : ''} and step-by-step guides`;
    if (tag.includes('web')) return `Browse ${postCount} post${postCount !== 1 ? 's' : ''} about web development and technologies`;
    if (tag.includes('mobile')) return `Check out ${postCount} post${postCount !== 1 ? 's' : ''} about mobile app development`;
    if (tag.includes('ai') || tag.includes('machine')) return `Explore ${postCount} post${postCount !== 1 ? 's' : ''} about artificial intelligence and machine learning`;
    if (tag.includes('data')) return `Dive into ${postCount} post${postCount !== 1 ? 's' : ''} about data science and analytics`;
    if (tag.includes('security')) return `Learn from ${postCount} post${postCount !== 1 ? 's' : ''} about cybersecurity and privacy`;
    // Default description
    return `Explore ${postCount} post${postCount !== 1 ? 's' : ''} about ${tagName}`;
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
          
          {allTags.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {allTags.slice(0, 8).map(tag => {
                const IconComponent = getTagIcon(tag);
                const postCount = getTagPostCount(tag);
                const description = getTagDescription(tag, postCount);
                
                return (
                  <motion.div 
                    key={tag}
                    whileHover={{ y: -5 }}
                    className="bg-[#333333] border border-[#444444] p-6 rounded-lg cursor-pointer hover:border-[#31B4EF] transition-colors duration-200"
                    onClick={() => setSelectedTag(tag)}
                  >
                    <div className="mb-4 text-[#31B4EF]">
                      <IconComponent className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 capitalize">{tag}</h3>
                    <p className="text-gray-400 text-sm mb-3">{description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#31B4EF] font-medium">
                        {postCount} post{postCount !== 1 ? 's' : ''}
                      </span>
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
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
          )}
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
                    key={post.id}
                    variants={itemVariants}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="bg-[#2A2A2A] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-[#444444]"
                  >
                    <div className="p-6">
                      <Link to={`/post/${post.id}`}>
                        <h3 className="text-xl font-semibold mb-2 hover:text-[#31B4EF] transition-colors">
                          {post.title}
                        </h3>
                      </Link>
                      <p className="text-gray-400 mb-4 line-clamp-3">
                        {post.content.substring(0, 150)}...
                      </p>
                      
                      {/* Display images if available */}
                      {post.images && post.images.length > 0 && (
                        <div className="mb-4">
                          <ImageGallery images={post.images} />
                        </div>
                      )}
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {post.tags.map(t => (
                          <span 
                            key={`${post.id}-${t.tag.name}`}
                            className="inline-block bg-[#333333] rounded-md px-3 py-1 text-xs font-semibold text-gray-300"
                          >
                            {t.tag.name}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>By {post.author?.name || 'Unknown Author'}</span>
                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                      </div>
                      <Link 
                        to={`/post/${post.id}`}
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