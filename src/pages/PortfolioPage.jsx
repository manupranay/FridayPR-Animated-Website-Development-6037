import React from 'react';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import {useInView} from 'react-intersection-observer';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import FeaturedImage from '../components/FeaturedImage';
import usePortfolioWithImages from '../hooks/usePortfolioWithImages';
import LoadingSpinner from '../components/LoadingSpinner';

const {FiArrowRight,FiEye,FiUsers,FiTrendingUp,FiAward,FiExternalLink} = FiIcons;

const PortfolioPage = () => {
  const {data: portfolio, loading, error} = usePortfolioWithImages('https://api.fridaypr.com/wp-json/wp/v2/portfolio');
  const [ref, inView] = useInView({threshold: 0.1, triggerOnce: true});

  const containerVariants = {
    hidden: {opacity: 0},
    visible: {opacity: 1, transition: {staggerChildren: 0.2}}
  };

  const itemVariants = {
    hidden: {opacity: 0, y: 50},
    visible: {opacity: 1, y: 0, transition: {duration: 0.6, ease: "easeOut"}}
  };

  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      className="pt-24"
    >
      {/* Hero Section */}
      <section className="hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{opacity: 0, y: 30}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8}}
            className="text-5xl lg:text-6xl font-display font-bold text-charcoal mb-6"
          >
            Our <span className="text-electric-teal">Portfolio</span>
          </motion.h1>
          <motion.p
            initial={{opacity: 0, y: 30}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8, delay: 0.2}}
            className="text-xl text-charcoal/70 max-w-3xl mx-auto"
          >
            Explore our collection of successful projects and discover how we've helped businesses achieve their digital goals through strategic design and development
          </motion.p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section ref={ref} className="py-20 bg-light-gray">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <motion.div
            initial={{opacity: 0, y: 30}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8}}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-charcoal mb-6">
              Featured Projects
            </h2>
            <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
              Each project represents our commitment to delivering exceptional digital experiences that drive real business results
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <LoadingSpinner className="w-12 h-12" />
              <span className="ml-4 text-charcoal/70">Loading amazing projects...</span>
            </div>
          ) : error ? (
            <motion.div
              initial={{opacity: 0, scale: 0.9}}
              animate={{opacity: 1, scale: 1}}
              className="text-center py-20 bg-pure-white rounded-3xl shadow-lg"
            >
              <div className="text-6xl mb-6">🚧</div>
              <h3 className="text-2xl font-bold text-charcoal mb-4">Portfolio Temporarily Unavailable</h3>
              <p className="text-charcoal/70 mb-8">We're updating our portfolio with fresh projects. Please check back soon!</p>
              <Link to="/contact">
                <motion.button
                  whileHover={{scale: 1.05}}
                  className="bg-electric-teal text-pure-white px-6 py-3 rounded-full font-semibold"
                >
                  Discuss Your Project
                </motion.button>
              </Link>
            </motion.div>
          ) : portfolio && portfolio.length === 0 ? (
            <motion.div
              initial={{opacity: 0, scale: 0.9}}
              animate={{opacity: 1, scale: 1}}
              className="text-center py-20 bg-pure-white rounded-3xl shadow-lg"
            >
              <div className="text-6xl mb-6">🎨</div>
              <h3 className="text-2xl font-bold text-charcoal mb-4">New Projects Coming Soon</h3>
              <p className="text-charcoal/70 mb-8">We're working on exciting new projects to showcase. Stay tuned!</p>
              <Link to="/contact">
                <motion.button
                  whileHover={{scale: 1.05}}
                  className="bg-electric-teal text-pure-white px-6 py-3 rounded-full font-semibold"
                >
                  Start Your Project
                </motion.button>
              </Link>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {portfolio?.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  whileHover={{y: -10, scale: 1.02, boxShadow: "0 25px 50px rgba(0,212,204,0.15)"}}
                  className="bg-pure-white rounded-3xl overflow-hidden shadow-lg border border-medium-gray/10 group"
                >
                  {/* Project Image with Overlay */}
                  <div className="relative overflow-hidden">
                    <FeaturedImage
                      imageUrl={project.projectImageUrl}
                      alt={project.title?.rendered}
                      className="h-64"
                      showOverlay={false}
                    />
                    
                    {/* Hover Overlay with Actions */}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                      <div className="flex space-x-4">
                        {/* View Project Details Button */}
                        <Link to={`/portfolio/${project.slug || project.id}`}>
                          <motion.button
                            whileHover={{scale: 1.1, rotate: 5}}
                            whileTap={{scale: 0.95}}
                            className="bg-electric-teal text-pure-white px-6 py-3 rounded-full font-semibold hover:bg-bright-orange transition-all duration-300 inline-flex items-center space-x-2 shadow-xl"
                          >
                            <span>View Details</span>
                            <SafeIcon icon={FiEye} className="w-5 h-5" />
                          </motion.button>
                        </Link>

                        {/* Live Site Button (if available) */}
                        {project.acf?.project_url && (
                          <motion.a
                            href={project.acf.project_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{scale: 1.1, rotate: -5}}
                            whileTap={{scale: 0.95}}
                            className="bg-deep-purple text-pure-white px-6 py-3 rounded-full font-semibold hover:bg-bright-orange transition-all duration-300 inline-flex items-center space-x-2 shadow-xl"
                          >
                            <span>Live Site</span>
                            <SafeIcon icon={FiExternalLink} className="w-5 h-5" />
                          </motion.a>
                        )}
                      </div>
                    </div>

                    {/* Project Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-electric-teal/90 text-pure-white px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">
                        {project.acf?.project_category || 'Web Design'}
                      </span>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-8">
                    {/* Title */}
                    <Link to={`/portfolio/${project.slug || project.id}`}>
                      <h3 className="text-2xl font-bold text-charcoal mb-4 group-hover:text-electric-teal transition-colors duration-300 cursor-pointer">
                        {project.title?.rendered}
                      </h3>
                    </Link>

                    {/* Description */}
                    <div 
                      className="text-charcoal/70 leading-relaxed mb-6 line-clamp-3"
                      dangerouslySetInnerHTML={{
                        __html: project.content?.rendered || 'Professional project showcasing modern design and development practices.'
                      }}
                    />

                    {/* Project Meta */}
                    <div className="space-y-3 mb-6">
                      {project.acf?.client_name && (
                        <div className="flex items-center text-sm text-charcoal/70">
                          <SafeIcon icon={FiUsers} className="w-4 h-4 mr-3 text-electric-teal" />
                          <span><strong>Client:</strong> {project.acf.client_name}</span>
                        </div>
                      )}
                      
                      {project.acf?.tools_used && (
                        <div className="flex items-center text-sm text-charcoal/70">
                          <SafeIcon icon={FiTrendingUp} className="w-4 h-4 mr-3 text-electric-teal" />
                          <span><strong>Tools:</strong> {project.acf.tools_used}</span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between">
                      <Link to={`/portfolio/${project.slug || project.id}`}>
                        <motion.button
                          whileHover={{scale: 1.05, x: 5}}
                          whileTap={{scale: 0.95}}
                          className="bg-gradient-primary text-pure-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 inline-flex items-center space-x-2"
                        >
                          <span>View Project</span>
                          <SafeIcon icon={FiArrowRight} className="w-4 h-4" />
                        </motion.button>
                      </Link>

                      {/* Project Status Badge */}
                      <div className="bg-success-green/10 text-success-green px-3 py-1 rounded-full text-xs font-semibold">
                        ✓ Completed
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Portfolio Stats */}
      <section className="py-20 bg-pure-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{opacity: 0, y: 30}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.8}}
            viewport={{once: true}}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-charcoal mb-6">
              Portfolio Impact
            </h2>
            <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
              Numbers that reflect our commitment to delivering exceptional results for every client
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {icon: FiEye, number: portfolio?.length || '12+', label: 'Projects Completed', color: 'text-electric-teal'},
              {icon: FiUsers, number: '98%', label: 'Client Satisfaction', color: 'text-bright-orange'},
              {icon: FiTrendingUp, number: '3.2x', label: 'Average ROI Increase', color: 'text-success-green'},
              {icon: FiAward, number: '24/7', label: 'Support Available', color: 'text-deep-purple'}
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{opacity: 0, scale: 0.5}}
                whileInView={{opacity: 1, scale: 1}}
                transition={{duration: 0.6, delay: index * 0.1}}
                viewport={{once: true}}
                whileHover={{scale: 1.05, rotateY: 5, boxShadow: "0 20px 40px rgba(0,212,204,0.15)"}}
                className="text-center bg-gradient-to-br from-light-gray/50 to-pure-white rounded-2xl p-6 shadow-lg border border-medium-gray/10 group cursor-pointer"
              >
                <motion.div
                  whileHover={{scale: 1.2, rotate: 360}}
                  transition={{duration: 0.6}}
                  className={`w-12 h-12 ${stat.color.replace('text-', 'bg-')}/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg`}
                >
                  <SafeIcon icon={stat.icon} className={`w-6 h-6 ${stat.color}`} />
                </motion.div>
                <motion.div
                  className={`text-3xl lg:text-4xl font-bold mb-2 ${stat.color}`}
                  whileHover={{scale: 1.1}}
                >
                  {stat.number}
                </motion.div>
                <div className="text-charcoal/70 font-medium group-hover:text-charcoal transition-colors">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 bg-light-gray">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{opacity: 0, y: 30}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.8}}
            viewport={{once: true}}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-charcoal mb-6">
              Technologies We Master
            </h2>
            <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
              We leverage cutting-edge technologies to build exceptional digital experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              {name: 'React', icon: '⚛️', color: 'from-blue-400 to-blue-600'},
              {name: 'WordPress', icon: '📝', color: 'from-blue-500 to-indigo-600'},
              {name: 'Node.js', icon: '🟢', color: 'from-green-400 to-green-600'},
              {name: 'Figma', icon: '🎨', color: 'from-purple-400 to-pink-500'},
              {name: 'Webflow', icon: '🌊', color: 'from-cyan-400 to-blue-500'},
              {name: 'Shopify', icon: '🛍️', color: 'from-green-500 to-emerald-600'}
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.6, delay: index * 0.1}}
                viewport={{once: true}}
                whileHover={{scale: 1.05, y: -5}}
                className="bg-pure-white rounded-2xl p-6 text-center shadow-lg border border-medium-gray/10 group"
              >
                <motion.div
                  whileHover={{scale: 1.2, rotate: [0, -10, 10, 0]}}
                  transition={{duration: 0.6}}
                  className="text-4xl mb-3 group-hover:scale-110 transition-transform"
                >
                  {tech.icon}
                </motion.div>
                <h3 className="font-semibold text-charcoal group-hover:text-electric-teal transition-colors">
                  {tech.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-charcoal to-charcoal/90 text-pure-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            animate={{scale: [1, 1.2, 1], rotate: [0, 180, 360]}}
            transition={{duration: 20, repeat: Infinity, ease: "linear"}}
            className="absolute -top-20 -right-20 w-40 h-40 bg-electric-teal/10 rounded-full"
          />
          <motion.div
            animate={{scale: [1.2, 1, 1.2], rotate: [360, 180, 0]}}
            transition={{duration: 25, repeat: Infinity, ease: "linear"}}
            className="absolute -bottom-20 -left-20 w-60 h-60 bg-bright-orange/10 rounded-full"
          />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{opacity: 0, y: 30}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.8}}
            viewport={{once: true}}
          >
            <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">
              Ready to start your{' '}
              <span className="bg-gradient-to-r from-electric-teal to-bright-orange bg-clip-text text-transparent">
                next project?
              </span>
            </h2>
            <p className="text-xl text-medium-gray mb-8 max-w-2xl mx-auto">
              Let's create something amazing together. Our team is ready to bring your vision to life with cutting-edge design and development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <motion.button
                  whileHover={{scale: 1.05, boxShadow: "0 15px 40px rgba(0,212,204,0.4)"}}
                  whileTap={{scale: 0.95}}
                  className="bg-electric-teal text-charcoal px-8 py-4 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-all duration-300 inline-flex items-center space-x-3 shadow-xl"
                >
                  <span>Start Your Project</span>
                  <SafeIcon icon={FiArrowRight} className="w-6 h-6" />
                </motion.button>
              </Link>
              <Link to="/services">
                <motion.button
                  whileHover={{scale: 1.05}}
                  whileTap={{scale: 0.95}}
                  className="border-2 border-electric-teal text-electric-teal px-8 py-4 rounded-full text-lg font-semibold hover:bg-electric-teal hover:text-charcoal transition-all duration-300"
                >
                  View Our Services
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default PortfolioPage;