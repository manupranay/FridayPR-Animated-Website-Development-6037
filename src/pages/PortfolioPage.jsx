import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import useApi from '../hooks/useApi';
import LoadingSpinner from '../components/LoadingSpinner';

const { FiExternalLink, FiUser, FiTool } = FiIcons;

const PortfolioPage = () => {
  const { data: portfolio, loading, error } = useApi('https://api.fridaypr.com/wp-json/wp/v2/portfolio');
  const [portfolioWithImages, setPortfolioWithImages] = useState([]);
  const [imagesLoading, setImagesLoading] = useState(true);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    const fetchImages = async () => {
      if (!portfolio) return;

      const portfolioData = await Promise.all(
        portfolio.map(async (item) => {
          let imageUrl = null;
          
          if (item.acf?.project_images && item.acf.project_images.length > 0) {
            try {
              const imageId = item.acf.project_images[0];
              const imageResponse = await fetch(`https://api.fridaypr.com/wp-json/wp/v2/media/${imageId}`);
              if (imageResponse.ok) {
                const imageData = await imageResponse.json();
                imageUrl = imageData.source_url;
              }
            } catch (err) {
              console.error('Error fetching image:', err);
            }
          }

          return {
            ...item,
            imageUrl: imageUrl || `https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop`
          };
        })
      );

      setPortfolioWithImages(portfolioData);
      setImagesLoading(false);
    };

    if (portfolio && !loading) {
      fetchImages();
    }
  }, [portfolio, loading]);

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
            Our <span className="text-light-gold">Portfolio</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-sage-green max-w-3xl mx-auto"
          >
            Explore our collection of successful projects and discover how we've helped 
            businesses achieve their digital goals
          </motion.p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section ref={ref} className="py-20 bg-off-white">
        <div className="max-w-7xl mx-auto px-6">
          {loading || imagesLoading ? (
            <LoadingSpinner className="py-20" />
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-500 mb-4">Failed to load portfolio</p>
              <p className="text-sage-green">Please try again later</p>
            </div>
          ) : portfolioWithImages.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-sage-green text-xl">No portfolio items available at the moment</p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {portfolioWithImages.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  whileHover={{ 
                    y: -10,
                    boxShadow: "0 25px 50px rgba(80, 80, 104, 0.15)"
                  }}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg card-hover group"
                >
                  {/* Project Image */}
                  <div className="relative h-64 overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      src={project.imageUrl}
                      alt={project.title?.rendered}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-navy-blue/20 opacity-0 group-hover:opacity-100 
                                    transition-opacity duration-300 flex items-center justify-center">
                      {project.acf?.project_url && (
                        <motion.a
                          href={project.acf.project_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-light-gold text-navy-blue p-3 rounded-full hover:bg-opacity-90 
                                     transition-all duration-300"
                        >
                          <SafeIcon icon={FiExternalLink} className="w-6 h-6" />
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-navy-blue mb-3 group-hover:text-light-gold 
                                   transition-colors duration-300">
                      {project.title?.rendered}
                    </h3>

                    <div 
                      className="text-sage-green text-sm leading-relaxed mb-4 line-clamp-3"
                      dangerouslySetInnerHTML={{ 
                        __html: project.content?.rendered?.replace(/<[^>]*>/g, '')?.substring(0, 120) + '...' 
                      }}
                    />

                    {/* Client & Tools */}
                    <div className="space-y-2 mb-4">
                      {project.acf?.client_name && (
                        <div className="flex items-center text-sm text-navy-blue/70">
                          <SafeIcon icon={FiUser} className="w-4 h-4 mr-2" />
                          <span>Client: {project.acf.client_name}</span>
                        </div>
                      )}
                      
                      {project.acf?.tools_used && (
                        <div className="flex items-center text-sm text-navy-blue/70">
                          <SafeIcon icon={FiTool} className="w-4 h-4 mr-2" />
                          <span>Tools: {project.acf.tools_used}</span>
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    {project.acf?.project_url && (
                      <motion.a
                        href={project.acf.project_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ x: 5 }}
                        className="inline-flex items-center text-light-gold font-semibold hover:text-navy-blue 
                                   transition-colors duration-300"
                      >
                        <span>View Project</span>
                        <SafeIcon icon={FiExternalLink} className="w-4 h-4 ml-2" />
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-sage-green/10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-navy-blue mb-6">
              Our Impact
            </h2>
            <p className="text-xl text-sage-green max-w-3xl mx-auto">
              Numbers that reflect our commitment to delivering exceptional results
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '50+', label: 'Projects Completed' },
              { number: '98%', label: 'Client Satisfaction' },
              { number: '3x', label: 'Average ROI Increase' },
              { number: '24/7', label: 'Support Available' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="text-center bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="text-3xl lg:text-4xl font-bold text-light-gold mb-2">
                  {stat.number}
                </div>
                <div className="text-navy-blue font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-navy-blue text-off-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">
              Ready to start your project?
            </h2>
            <p className="text-xl text-sage-green mb-8 max-w-2xl mx-auto">
              Let's create something amazing together. Contact us to discuss your vision
            </p>
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 15px 40px rgba(219, 196, 142, 0.4)" 
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-light-gold text-navy-blue px-10 py-5 rounded-full text-lg font-semibold 
                         hover:bg-opacity-90 transition-all duration-300 inline-flex items-center space-x-3"
            >
              <span>Start Your Project</span>
              <SafeIcon icon={FiIcons.FiArrowRight} className="w-6 h-6" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default PortfolioPage;