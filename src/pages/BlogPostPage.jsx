import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import FeaturedImage from '../components/FeaturedImage';
import useApiWithImages from '../hooks/useApiWithImages';
import LoadingSpinner from '../components/LoadingSpinner';

const { FiCalendar, FiClock, FiArrowLeft, FiShare2, FiUser, FiTag } = FiIcons;

const BlogPostPage = () => {
  const { slug } = useParams();
  const { data: posts, loading, error } = useApiWithImages('https://api.fridaypr.com/wp-json/wp/v2/posts');
  const { data: allPosts } = useApiWithImages('https://api.fridaypr.com/wp-json/wp/v2/posts');

  // Find the specific post by slug or ID
  const post = posts?.find(p => 
    p.slug === slug || 
    p.id.toString() === slug
  );

  const relatedPosts = allPosts?.filter(p => 
    p.id !== post?.id
  )?.slice(0, 3);

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMMM dd, yyyy');
    } catch {
      return 'Recent';
    }
  };

  const stripHtml = (html) => {
    return html?.replace(/<[^>]*>/g, '') || '';
  };

  if (loading) {
    return <LoadingSpinner className="min-h-screen flex items-center justify-center" />;
  }

  if (error || !post) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-charcoal mb-4">Post Not Found</h1>
          <p className="text-charcoal/70 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link to="/blog">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-electric-teal text-pure-white px-6 py-3 rounded-full font-semibold"
            >
              Back to Blog
            </motion.button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24"
    >
      {/* Header Section */}
      <section className="py-12 bg-light-gray">
        <div className="max-w-4xl mx-auto px-6">
          <Link to="/blog">
            <motion.div
              whileHover={{ x: -5 }}
              className="inline-flex items-center text-electric-teal font-semibold mb-8 hover:text-bright-orange transition-colors"
            >
              <SafeIcon icon={FiArrowLeft} className="w-5 h-5 mr-2" />
              Back to Blog
            </motion.div>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center space-x-4 text-sm text-charcoal/60 mb-6">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiCalendar} className="w-4 h-4" />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiClock} className="w-4 h-4" />
                <span>5 min read</span>
              </div>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiUser} className="w-4 h-4" />
                <span>FridayPR Team</span>
              </div>
            </div>

            <h1 className="text-4xl lg:text-5xl font-display font-bold text-charcoal mb-6 leading-tight">
              {post.title?.rendered}
            </h1>

            <div className="flex items-center justify-between">
              <p className="text-xl text-charcoal/70 max-w-3xl">
                {stripHtml(post.excerpt?.rendered)}
              </p>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="bg-electric-teal/10 text-electric-teal p-3 rounded-full hover:bg-electric-teal hover:text-pure-white transition-all"
              >
                <SafeIcon icon={FiShare2} className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative rounded-3xl overflow-hidden"
          >
            <FeaturedImage
              imageUrl={post.featuredImageUrl}
              alt={post.title?.rendered}
              className="h-64 lg:h-96"
              showOverlay={true}
              overlayOpacity={0.2}
            >
              <div className="absolute bottom-6 left-6 text-pure-white">
                <div className="inline-flex items-center bg-pure-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <SafeIcon icon={FiTag} className="w-4 h-4 mr-2" />
                  <span>Digital Marketing</span>
                </div>
              </div>
            </FeaturedImage>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="prose prose-lg max-w-none"
          >
            <div 
              className="text-charcoal/80 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content?.rendered || post.excerpt?.rendered }}
            />
            
            {/* If content is limited, add sample content */}
            {(!post.content?.rendered || post.content.rendered.length < 500) && (
              <div className="mt-8 space-y-6 text-charcoal/80 leading-relaxed">
                <p className="text-lg">
                  In today's digital landscape, businesses need more than just a website to succeed. 
                  They need a comprehensive digital strategy that encompasses web design, SEO optimization, 
                  and strategic public relations to stay competitive and visible to their target audience.
                </p>
                
                <h2 className="text-2xl font-bold text-charcoal mt-8 mb-4">The Digital Transformation Challenge</h2>
                <p>
                  Many small businesses struggle with establishing a strong online presence. They often face 
                  challenges such as outdated websites, poor search engine rankings, and limited media visibility. 
                  This creates a gap between their potential and actual market reach.
                </p>
                
                <h2 className="text-2xl font-bold text-charcoal mt-8 mb-4">Strategic Solutions</h2>
                <p>
                  At FridayPR, we believe in a holistic approach to digital marketing. Our integrated services 
                  include responsive web design, comprehensive SEO strategies, and targeted PR distribution 
                  that work together to amplify your brand's message and drive meaningful business growth.
                </p>
                
                <div className="bg-electric-teal/5 border-l-4 border-electric-teal p-6 my-8 rounded-r-lg">
                  <p className="text-charcoal font-medium italic">
                    "Success in digital marketing isn't just about having the right tools – it's about 
                    having the right strategy that brings all elements together harmoniously."
                  </p>
                </div>
                
                <h2 className="text-2xl font-bold text-charcoal mt-8 mb-4">Looking Forward</h2>
                <p>
                  The digital landscape continues to evolve, and businesses that adapt quickly will thrive. 
                  By investing in comprehensive digital solutions today, you're positioning your business 
                  for sustained growth and success in tomorrow's competitive marketplace.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="py-20 bg-light-gray">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-display font-bold text-charcoal mb-4">Related Articles</h2>
              <p className="text-charcoal/70">Continue reading with these related posts</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <motion.div
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="bg-pure-white rounded-3xl overflow-hidden shadow-lg card-hover"
                >
                  <FeaturedImage
                    imageUrl={relatedPost.featuredImageUrl}
                    alt={relatedPost.title?.rendered}
                    className="h-48"
                    showOverlay={true}
                    overlayOpacity={0.1}
                  />
                  
                  <div className="p-6">
                    <div className="flex items-center text-xs text-charcoal/60 mb-3">
                      <SafeIcon icon={FiCalendar} className="w-3 h-3 mr-1" />
                      <span>{formatDate(relatedPost.date)}</span>
                    </div>
                    <h3 className="text-lg font-bold text-charcoal mb-3 line-clamp-2 hover:text-electric-teal transition-colors">
                      {relatedPost.title?.rendered}
                    </h3>
                    <p className="text-charcoal/70 text-sm line-clamp-3 mb-4">
                      {stripHtml(relatedPost.excerpt?.rendered)}
                    </p>
                    <Link to={`/blog/${relatedPost.slug || relatedPost.id}`}>
                      <motion.div
                        whileHover={{ x: 3 }}
                        className="inline-flex items-center text-electric-teal font-semibold hover:text-bright-orange transition-colors"
                      >
                        <span>Read More</span>
                        <SafeIcon icon={FiIcons.FiArrowRight} className="w-4 h-4 ml-1" />
                      </motion.div>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-charcoal text-pure-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-display font-bold mb-6">
              Ready to transform your business?
            </h2>
            <p className="text-xl text-medium-gray mb-8 max-w-2xl mx-auto">
              Let's discuss how our digital solutions can help your business grow
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-electric-teal text-charcoal px-8 py-4 rounded-full font-semibold transition-all duration-300 inline-flex items-center space-x-2"
              >
                <span>Get Started Today</span>
                <SafeIcon icon={FiIcons.FiArrowRight} className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default BlogPostPage;