import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import FeaturedImage from '../components/FeaturedImage';
import useApiWithImages from '../hooks/useApiWithImages';
import LoadingSpinner from '../components/LoadingSpinner';

const { FiExternalLink, FiUser, FiTool, FiCalendar, FiArrowRight } = FiIcons;

const ProjectsPage = () => {
  const { data: projects, loading, error } = useApiWithImages('https://api.fridaypr.com/wp-json/wp/v2/portfolio');
  const [filter, setFilter] = useState('all');
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const categories = ['all', 'web-design', 'seo', 'branding', 'e-commerce'];

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

  // Add category to projects (for filtering)
  const projectsWithCategories = projects?.map(project => ({
    ...project,
    category: project.acf?.project_category || 'web-design'
  }));

  const filteredProjects = projectsWithCategories?.filter(project =>
    filter === 'all' || project.category === filter
  );

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
            Our <span className="text-electric-teal">Projects</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-charcoal/70 max-w-3xl mx-auto"
          >
            Explore our detailed project case studies and see how we've transformed businesses through strategic digital solutions
          </motion.p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-pure-white border-b border-medium-gray/20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setFilter(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  filter === category
                    ? 'bg-electric-teal text-pure-white shadow-lg'
                    : 'bg-light-gray text-charcoal hover:bg-electric-teal/10 hover:text-electric-teal'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section ref={ref} className="py-20 bg-light-gray">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <LoadingSpinner className="py-20" />
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-500 mb-4">Failed to load projects</p>
              <p className="text-charcoal/70">Please try again later</p>
            </div>
          ) : filteredProjects && filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-charcoal/70 text-xl">No projects available for this category</p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects?.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  whileHover={{
                    y: -15,
                    boxShadow: "0 30px 60px rgba(0, 212, 204, 0.15)",
                    rotateY: 5
                  }}
                  className="bg-pure-white rounded-3xl overflow-hidden shadow-lg card-hover group"
                >
                  <div className="relative">
                    <FeaturedImage
                      imageUrl={project.featuredImageUrl}
                      alt={project.title?.rendered}
                      className="h-64"
                      showOverlay={false}
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      {project.acf?.project_url && (
                        <motion.a
                          href={project.acf.project_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          whileTap={{ scale: 0.9 }}
                          className="bg-electric-teal text-pure-white p-4 rounded-full hover:bg-bright-orange transition-all duration-300 shadow-xl mr-4"
                        >
                          <SafeIcon icon={FiExternalLink} className="w-6 h-6" />
                        </motion.a>
                      )}
                      <Link to={`/projects/${project.slug || project.id}`}>
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          className="bg-deep-purple text-pure-white p-4 rounded-full hover:bg-bright-orange transition-all duration-300 shadow-xl"
                        >
                          <SafeIcon icon={FiArrowRight} className="w-6 h-6" />
                        </motion.button>
                      </Link>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-electric-teal/10 text-electric-teal px-3 py-1 rounded-full text-xs font-semibold">
                        {project.category.replace('-', ' ').toUpperCase()}
                      </span>
                      <div className="flex items-center text-xs text-charcoal/60">
                        <SafeIcon icon={FiCalendar} className="w-3 h-3 mr-1" />
                        <span>2024</span>
                      </div>
                    </div>

                    <Link to={`/projects/${project.slug || project.id}`}>
                      <h3 className="text-xl font-bold text-charcoal mb-3 group-hover:text-electric-teal transition-colors duration-300 line-clamp-2">
                        {project.title?.rendered}
                      </h3>
                    </Link>

                    <div
                      className="text-charcoal/70 text-sm leading-relaxed mb-4 line-clamp-3"
                      dangerouslySetInnerHTML={{
                        __html: project.content?.rendered?.replace(/<[^>]*>/g, '')?.substring(0, 120) + '...'
                      }}
                    />

                    <div className="space-y-2 mb-4">
                      {project.acf?.client_name && (
                        <div className="flex items-center text-sm text-charcoal/70">
                          <SafeIcon icon={FiUser} className="w-4 h-4 mr-2 text-electric-teal" />
                          <span>Client: {project.acf.client_name}</span>
                        </div>
                      )}
                      {project.acf?.tools_used && (
                        <div className="flex items-center text-sm text-charcoal/70">
                          <SafeIcon icon={FiTool} className="w-4 h-4 mr-2 text-electric-teal" />
                          <span>Tools: {project.acf.tools_used}</span>
                        </div>
                      )}
                    </div>

                    <Link to={`/projects/${project.slug || project.id}`}>
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="inline-flex items-center text-electric-teal font-semibold hover:text-bright-orange transition-colors duration-300"
                      >
                        <span>View Case Study</span>
                        <SafeIcon icon={FiArrowRight} className="w-4 h-4 ml-2" />
                      </motion.div>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-pure-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-charcoal mb-6">
              Project Impact
            </h2>
            <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
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
                whileHover={{
                  scale: 1.1,
                  rotateY: 10,
                  boxShadow: "0 20px 40px rgba(0, 212, 204, 0.15)"
                }}
                className="text-center bg-gradient-to-br from-electric-teal/5 to-deep-purple/5 rounded-2xl p-6 shadow-lg border border-medium-gray/10"
              >
                <motion.div
                  className="text-3xl lg:text-4xl font-bold text-electric-teal mb-2"
                  whileHover={{ scale: 1.2, color: "#FF6B35" }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-charcoal font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-charcoal text-pure-white">
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
            <p className="text-xl text-medium-gray mb-8 max-w-2xl mx-auto">
              Let's create something amazing together. Contact us to discuss your vision
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 15px 40px rgba(0, 212, 204, 0.4)",
                  rotateX: 10
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-electric-teal text-charcoal px-10 py-5 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-all duration-300 inline-flex items-center space-x-3 relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-white/10"
                  animate={{ x: [-100, 100] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span>Start Your Project</span>
                <SafeIcon icon={FiArrowRight} className="w-6 h-6" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default ProjectsPage;