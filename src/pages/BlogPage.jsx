import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { format } from 'date-fns';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import useApi from '../hooks/useApi';
import LoadingSpinner from '../components/LoadingSpinner';

const { FiCalendar, FiClock, FiArrowRight } = FiIcons;

const BlogPage = () => {
  const { data: posts, loading, error } = useApi('https://api.fridaypr.com/wp-json/wp/v2/posts');
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch {
      return 'Recent';
    }
  };

  const stripHtml = (html) => {
    return html?.replace(/<[^>]*>/g, '') || '';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24"
    >
      {/* Hero Section */}
      <section className="hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl lg:text-6xl font-display font-bold text-navy-blue mb-6"
          >
            Our <span className="text-light-gold">Blog</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-sage-green max-w-3xl mx-auto"
          >
            Stay updated with the latest insights, trends, and tips in digital marketing, 
            web design, and business growth
          </motion.p>
        </div>
      </section>

      {/* Featured Post */}
      {posts && posts.length > 0 && (
        <section className="py-20 bg-off-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-display font-bold text-navy-blue mb-2">Featured Article</h2>
              <div className="w-24 h-1 bg-light-gold"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-3xl overflow-hidden shadow-xl card-hover"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="h-64 lg:h-full bg-gradient-to-br from-navy-blue via-sage-green to-light-gold"></div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center space-x-4 text-sm text-sage-green mb-4">
                    <div className="flex items-center space-x-1">
                      <SafeIcon icon={FiCalendar} className="w-4 h-4" />
                      <span>{formatDate(posts[0].date)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <SafeIcon icon={FiClock} className="w-4 h-4" />
                      <span>5 min read</span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl lg:text-3xl font-bold text-navy-blue mb-4 leading-tight">
                    {posts[0].title?.rendered}
                  </h3>
                  
                  <p className="text-sage-green leading-relaxed mb-6">
                    {stripHtml(posts[0].excerpt?.rendered)?.substring(0, 200)}...
                  </p>
                  
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="inline-flex items-center text-light-gold font-semibold hover:text-navy-blue 
                               transition-colors duration-300 self-start"
                  >
                    <span>Read Full Article</span>
                    <SafeIcon icon={FiArrowRight} className="w-5 h-5 ml-2" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section ref={ref} className="py-20 bg-sage-green/5">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-display font-bold text-navy-blue mb-2">Latest Articles</h2>
            <div className="w-24 h-1 bg-light-gold"></div>
          </motion.div>

          {loading ? (
            <LoadingSpinner className="py-20" />
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-500 mb-4">Failed to load blog posts</p>
              <p className="text-sage-green">Please try again later</p>
            </div>
          ) : posts && posts.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {posts.slice(1).map((post, index) => (
                <motion.article
                  key={post.id}
                  variants={itemVariants}
                  whileHover={{ 
                    y: -10,
                    boxShadow: "0 20px 40px rgba(80, 80, 104, 0.15)"
                  }}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg card-hover group"
                >
                  {/* Post Image */}
                  <div className="h-48 bg-gradient-to-br from-light-gold via-sage-green to-navy-blue relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                  </div>

                  {/* Post Content */}
                  <div className="p-6">
                    <div className="flex items-center space-x-4 text-xs text-sage-green mb-3">
                      <div className="flex items-center space-x-1">
                        <SafeIcon icon={FiCalendar} className="w-3 h-3" />
                        <span>{formatDate(post.date)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <SafeIcon icon={FiClock} className="w-3 h-3" />
                        <span>3 min read</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-navy-blue mb-3 line-clamp-2 group-hover:text-light-gold 
                                   transition-colors duration-300">
                      {post.title?.rendered}
                    </h3>

                    <p className="text-sage-green text-sm leading-relaxed mb-4 line-clamp-3">
                      {stripHtml(post.excerpt?.rendered)}
                    </p>

                    <motion.button
                      whileHover={{ x: 3 }}
                      className="inline-flex items-center text-sm text-light-gold font-semibold 
                                 hover:text-navy-blue transition-colors duration-300"
                    >
                      <span>Read More</span>
                      <SafeIcon icon={FiArrowRight} className="w-4 h-4 ml-1" />
                    </motion.button>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <p className="text-sage-green text-xl">No blog posts available at the moment</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-navy-blue text-off-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">
              Stay in the loop
            </h2>
            <p className="text-xl text-sage-green mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and get the latest insights delivered to your inbox
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full text-navy-blue placeholder-sage-green 
                           focus:outline-none focus:ring-2 focus:ring-light-gold"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-light-gold text-navy-blue px-8 py-4 rounded-full font-semibold 
                           hover:bg-opacity-90 transition-all duration-300 whitespace-nowrap"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default BlogPage;