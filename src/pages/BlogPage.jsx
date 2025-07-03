import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { format } from 'date-fns';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import FeaturedImage from '../components/FeaturedImage';
import useApiWithImages from '../hooks/useApiWithImages';
import LoadingSpinner from '../components/LoadingSpinner';

const { FiCalendar, FiClock, FiArrowRight } = FiIcons;

const BlogPage = () => {
  const { data: posts, loading, error } = useApiWithImages('https://api.fridaypr.com/wp-json/wp/v2/posts');
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
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
            className="text-5xl lg:text-6xl font-display font-bold text-charcoal mb-6"
          >
            Our <span className="text-electric-teal">Blog</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-charcoal/70 max-w-3xl mx-auto"
          >
            Stay updated with the latest insights, trends, and tips in digital marketing, web design, and business growth
          </motion.p>
        </div>
      </section>

      {/* Featured Post */}
      {posts && posts.length > 0 && (
        <section className="py-20 bg-light-gray">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-display font-bold text-charcoal mb-2">Featured Article</h2>
              <div className="w-24 h-1 bg-electric-teal"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-pure-white rounded-3xl overflow-hidden shadow-xl card-hover"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <FeaturedImage
                  imageUrl={posts[0].featuredImageUrl}
                  alt={posts[0].title?.rendered}
                  className="h-64 lg:h-full"
                  showOverlay={true}
                  overlayOpacity={0.1}
                />
                
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center space-x-4 text-sm text-charcoal/60 mb-4">
                    <div className="flex items-center space-x-1">
                      <SafeIcon icon={FiCalendar} className="w-4 h-4" />
                      <span>{formatDate(posts[0].date)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <SafeIcon icon={FiClock} className="w-4 h-4" />
                      <span>5 min read</span>
                    </div>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-charcoal mb-4 leading-tight">
                    {posts[0].title?.rendered}
                  </h3>
                  <p className="text-charcoal/70 leading-relaxed mb-6">
                    {stripHtml(posts[0].excerpt?.rendered)?.substring(0, 200)}...
                  </p>
                  <Link to={`/blog/${posts[0].slug || posts[0].id}`}>
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="inline-flex items-center text-electric-teal font-semibold hover:text-bright-orange transition-colors duration-300 self-start"
                    >
                      <span>Read Full Article</span>
                      <SafeIcon icon={FiArrowRight} className="w-5 h-5 ml-2" />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section ref={ref} className="py-20 bg-pure-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-display font-bold text-charcoal mb-2">Latest Articles</h2>
            <div className="w-24 h-1 bg-electric-teal"></div>
          </motion.div>

          {loading ? (
            <LoadingSpinner className="py-20" />
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-500 mb-4">Failed to load blog posts</p>
              <p className="text-charcoal/70">Please try again later</p>
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
                  whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0, 212, 204, 0.15)" }}
                  className="bg-pure-white rounded-3xl overflow-hidden shadow-lg card-hover group"
                >
                  <FeaturedImage
                    imageUrl={post.featuredImageUrl}
                    alt={post.title?.rendered}
                    className="h-48"
                    showOverlay={true}
                    overlayOpacity={0.2}
                  >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                  </FeaturedImage>

                  <div className="p-6">
                    <div className="flex items-center space-x-4 text-xs text-charcoal/60 mb-3">
                      <div className="flex items-center space-x-1">
                        <SafeIcon icon={FiCalendar} className="w-3 h-3" />
                        <span>{formatDate(post.date)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <SafeIcon icon={FiClock} className="w-3 h-3" />
                        <span>3 min read</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-charcoal mb-3 line-clamp-2 group-hover:text-electric-teal transition-colors duration-300">
                      {post.title?.rendered}
                    </h3>
                    <p className="text-charcoal/70 text-sm leading-relaxed mb-4 line-clamp-3">
                      {stripHtml(post.excerpt?.rendered)}
                    </p>
                    <Link to={`/blog/${post.slug || post.id}`}>
                      <motion.button
                        whileHover={{ x: 3 }}
                        className="inline-flex items-center text-sm text-electric-teal font-semibold hover:text-bright-orange transition-colors duration-300"
                      >
                        <span>Read More</span>
                        <SafeIcon icon={FiArrowRight} className="w-4 h-4 ml-1" />
                      </motion.button>
                    </Link>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <p className="text-charcoal/70 text-xl">No blog posts available at the moment</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-charcoal text-pure-white">
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
            <p className="text-xl text-medium-gray mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and get the latest insights delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full text-charcoal placeholder-charcoal/60 focus:outline-none focus:ring-2 focus:ring-electric-teal"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-electric-teal text-charcoal px-8 py-4 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300 whitespace-nowrap"
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