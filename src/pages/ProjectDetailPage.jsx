import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import FeaturedImage from '../components/FeaturedImage';
import usePortfolioWithImages from '../hooks/usePortfolioWithImages';
import LoadingSpinner from '../components/LoadingSpinner';

const { 
  FiArrowLeft, 
  FiExternalLink, 
  FiCalendar, 
  FiUser, 
  FiTool, 
  FiTarget, 
  FiTrendingUp, 
  FiCheckCircle, 
  FiGlobe, 
  FiZap, 
  FiAward 
} = FiIcons;

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const { data: projects, loading, error } = usePortfolioWithImages('https://api.fridaypr.com/wp-json/wp/v2/portfolio');

  // Find the specific project by slug or ID
  const project = projects?.find(p => 
    p.slug === slug || p.id.toString() === slug
  );

  const relatedProjects = projects?.filter(p => 
    p.id !== project?.id
  )?.slice(0, 3);

  const stripHtml = (html) => {
    return html?.replace(/<[^>]*>/g, '') || '';
  };

  const parseFeatures = (features) => {
    if (!features) return [];
    if (Array.isArray(features)) return features;
    
    // Handle comma-separated string
    if (typeof features === 'string') {
      return features.split(',').map(f => f.trim()).filter(f => f.length > 0);
    }
    
    return [];
  };

  const defaultTechnologies = [
    'React', 'WordPress', 'HTML5', 'CSS3', 'JavaScript', 'SEO Tools'
  ];

  if (loading) {
    return <LoadingSpinner className="min-h-screen flex items-center justify-center" />;
  }

  if (error || !project) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-charcoal mb-4">Project Not Found</h1>
          <p className="text-charcoal/70 mb-8">The project you're looking for doesn't exist.</p>
          <Link to="/portfolio">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-electric-teal text-pure-white px-6 py-3 rounded-full font-semibold"
            >
              Back to Portfolio
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
        <div className="max-w-7xl mx-auto px-6">
          <Link to="/portfolio">
            <motion.div
              whileHover={{ x: -5 }}
              className="inline-flex items-center text-electric-teal font-semibold mb-8 hover:text-bright-orange transition-colors"
            >
              <SafeIcon icon={FiArrowLeft} className="w-5 h-5 mr-2" />
              Back to Portfolio
            </motion.div>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center space-x-4 text-sm text-charcoal/60 mb-6">
                <div className="flex items-center space-x-2">
                  <SafeIcon icon={FiCalendar} className="w-4 h-4" />
                  <span>2024</span>
                </div>
                {project.acf?.client_name && (
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiUser} className="w-4 h-4" />
                    <span>{project.acf.client_name}</span>
                  </div>
                )}
              </div>

              <h1 className="text-4xl lg:text-5xl font-display font-bold text-charcoal mb-6 leading-tight">
                {project.title?.rendered}
              </h1>

              <div 
                className="text-xl text-charcoal/70 mb-8 prose"
                dangerouslySetInnerHTML={{ 
                  __html: project.content?.rendered || 
                  "A comprehensive digital transformation project that delivered exceptional results and exceeded client expectations." 
                }}
              />

              <div className="flex flex-col sm:flex-row gap-4">
                {project.acf?.project_url && (
                  <motion.a
                    href={project.acf.project_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="bg-electric-teal text-pure-white px-6 py-3 rounded-full font-semibold inline-flex items-center space-x-2"
                  >
                    <span>View Live Site</span>
                    <SafeIcon icon={FiExternalLink} className="w-5 h-5" />
                  </motion.a>
                )}
                
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="border-2 border-electric-teal text-electric-teal px-6 py-3 rounded-full font-semibold hover:bg-electric-teal hover:text-pure-white transition-all"
                  >
                    Start Similar Project
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <FeaturedImage
                imageUrl={project.projectImageUrl}
                alt={project.title?.rendered}
                className="h-64 lg:h-96 rounded-3xl shadow-xl"
                showOverlay={true}
                overlayOpacity={0.1}
              >
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-pure-white/90 backdrop-blur-sm rounded-2xl p-4">
                    <h3 className="font-bold text-charcoal mb-2">Project Highlights</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-electric-teal font-semibold">Client:</span>
                        <p className="text-charcoal">{project.acf?.client_name || 'Confidential'}</p>
                      </div>
                      <div>
                        <span className="text-electric-teal font-semibold">Tools:</span>
                        <p className="text-charcoal">{project.acf?.tools_used || 'Multiple Technologies'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </FeaturedImage>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-20 bg-pure-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* The Challenge */}
            {project.acf?.the_challenge && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-electric-teal/5 to-deep-purple/5 rounded-3xl p-8"
              >
                <div className="w-12 h-12 bg-electric-teal/20 rounded-2xl flex items-center justify-center mb-6">
                  <SafeIcon icon={FiTarget} className="w-6 h-6 text-electric-teal" />
                </div>
                <h3 className="text-2xl font-bold text-charcoal mb-4">The Challenge</h3>
                <div 
                  className="text-charcoal/70 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: project.acf.the_challenge }}
                />
              </motion.div>
            )}

            {/* Our Solution */}
            {project.acf?.our_solution && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-bright-orange/5 to-electric-teal/5 rounded-3xl p-8"
              >
                <div className="w-12 h-12 bg-bright-orange/20 rounded-2xl flex items-center justify-center mb-6">
                  <SafeIcon icon={FiZap} className="w-6 h-6 text-bright-orange" />
                </div>
                <h3 className="text-2xl font-bold text-charcoal mb-4">Our Solution</h3>
                <div 
                  className="text-charcoal/70 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: project.acf.our_solution }}
                />
              </motion.div>
            )}

            {/* Results Achieved */}
            {project.acf?.results_achieved && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-success-green/5 to-electric-teal/5 rounded-3xl p-8"
              >
                <div className="w-12 h-12 bg-success-green/20 rounded-2xl flex items-center justify-center mb-6">
                  <SafeIcon icon={FiTrendingUp} className="w-6 h-6 text-success-green" />
                </div>
                <h3 className="text-2xl font-bold text-charcoal mb-4">Results Achieved</h3>
                <div 
                  className="text-charcoal/70 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: project.acf.results_achieved }}
                />
              </motion.div>
            )}

            {/* Default sections if ACF fields are empty */}
            {!project.acf?.the_challenge && !project.acf?.our_solution && !project.acf?.results_achieved && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-electric-teal/5 to-deep-purple/5 rounded-3xl p-8"
                >
                  <div className="w-12 h-12 bg-electric-teal/20 rounded-2xl flex items-center justify-center mb-6">
                    <SafeIcon icon={FiTarget} className="w-6 h-6 text-electric-teal" />
                  </div>
                  <h3 className="text-2xl font-bold text-charcoal mb-4">Project Overview</h3>
                  <p className="text-charcoal/70 leading-relaxed">
                    This project showcases our commitment to delivering high-quality digital solutions 
                    that meet client objectives and exceed expectations through strategic design and development.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-bright-orange/5 to-electric-teal/5 rounded-3xl p-8"
                >
                  <div className="w-12 h-12 bg-bright-orange/20 rounded-2xl flex items-center justify-center mb-6">
                    <SafeIcon icon={FiZap} className="w-6 h-6 text-bright-orange" />
                  </div>
                  <h3 className="text-2xl font-bold text-charcoal mb-4">Our Approach</h3>
                  <p className="text-charcoal/70 leading-relaxed">
                    We implemented a comprehensive digital strategy combining modern design principles, 
                    advanced functionality, and optimization techniques to create an exceptional user experience.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-success-green/5 to-electric-teal/5 rounded-3xl p-8"
                >
                  <div className="w-12 h-12 bg-success-green/20 rounded-2xl flex items-center justify-center mb-6">
                    <SafeIcon icon={FiTrendingUp} className="w-6 h-6 text-success-green" />
                  </div>
                  <h3 className="text-2xl font-bold text-charcoal mb-4">Impact</h3>
                  <p className="text-charcoal/70 leading-relaxed">
                    The project delivered measurable improvements in user engagement, conversion rates, 
                    and overall business performance, establishing a strong digital foundation for growth.
                  </p>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features & Technologies */}
      <section className="py-20 bg-light-gray">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-charcoal mb-6">
              Project Features & Technologies
            </h2>
            <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
              Comprehensive solutions built with cutting-edge technologies and best practices
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Features */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-charcoal mb-8 flex items-center">
                <SafeIcon icon={FiAward} className="w-6 h-6 text-electric-teal mr-3" />
                Key Features
              </h3>
              
              {project.acf?.key_features ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {parseFeatures(project.acf.key_features).map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                      className="bg-pure-white rounded-2xl p-4 shadow-lg border border-medium-gray/10"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-electric-teal rounded-full"></div>
                        <span className="font-medium text-charcoal">{feature}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    'Responsive Design',
                    'Modern UI/UX',
                    'Fast Loading',
                    'SEO Optimized',
                    'Mobile Friendly',
                    'Cross-browser Compatible'
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                      className="bg-pure-white rounded-2xl p-4 shadow-lg border border-medium-gray/10"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-electric-teal rounded-full"></div>
                        <span className="font-medium text-charcoal">{feature}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Technologies */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-charcoal mb-8 flex items-center">
                <SafeIcon icon={FiTool} className="w-6 h-6 text-bright-orange mr-3" />
                Technologies Used
              </h3>
              
              <div className="space-y-4">
                {(project.acf?.tools_used ? 
                  project.acf.tools_used.split(',').map(t => t.trim()) : 
                  defaultTechnologies
                ).map((tech, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 5 }}
                    className="bg-pure-white rounded-2xl p-4 shadow-lg border border-medium-gray/10 flex items-center space-x-4"
                  >
                    <div className="w-10 h-10 bg-bright-orange/20 rounded-xl flex items-center justify-center">
                      <SafeIcon icon={FiGlobe} className="w-5 h-5 text-bright-orange" />
                    </div>
                    <span className="font-semibold text-charcoal">{tech}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects && relatedProjects.length > 0 && (
        <section className="py-20 bg-pure-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-display font-bold text-charcoal mb-4">
                Related Projects
              </h2>
              <p className="text-charcoal/70">Explore more of our successful projects</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProjects.map((relatedProject, index) => (
                <motion.div
                  key={relatedProject.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="bg-pure-white rounded-3xl overflow-hidden shadow-lg card-hover border border-medium-gray/10"
                >
                  <FeaturedImage
                    imageUrl={relatedProject.projectImageUrl}
                    alt={relatedProject.title?.rendered}
                    className="h-48"
                    showOverlay={true}
                    overlayOpacity={0.1}
                  />
                  
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-charcoal mb-3 line-clamp-2 hover:text-electric-teal transition-colors">
                      {relatedProject.title?.rendered}
                    </h3>
                    <p className="text-charcoal/70 text-sm mb-4">
                      Client: {relatedProject.acf?.client_name || 'Confidential'}
                    </p>
                    <Link to={`/portfolio/${relatedProject.slug || relatedProject.id}`}>
                      <motion.div
                        whileHover={{ x: 3 }}
                        className="inline-flex items-center text-electric-teal font-semibold hover:text-bright-orange transition-colors"
                      >
                        <span>View Project</span>
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
              Ready to start your own project?
            </h2>
            <p className="text-xl text-medium-gray mb-8 max-w-2xl mx-auto">
              Let's create something amazing together that drives real results for your business
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-electric-teal text-charcoal px-8 py-4 rounded-full font-semibold transition-all duration-300 inline-flex items-center space-x-2"
              >
                <span>Start Your Project</span>
                <SafeIcon icon={FiIcons.FiArrowRight} className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default ProjectDetailPage;