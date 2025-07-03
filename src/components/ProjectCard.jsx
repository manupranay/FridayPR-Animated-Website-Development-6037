import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import FeaturedImage from './FeaturedImage';

const { FiExternalLink, FiUser, FiTool, FiChevronDown, FiChevronUp, FiTarget, FiZap, FiTrendingUp, FiCheckCircle } = FiIcons;

const ProjectCard = ({ project, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasOptionalFields = project.acf?.the_challenge || 
                           project.acf?.our_solution || 
                           project.acf?.results_achieved || 
                           project.acf?.key_features;

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10, boxShadow: "0 25px 50px rgba(0,212,204,0.15)" }}
      className="bg-pure-white rounded-3xl overflow-hidden shadow-lg border border-medium-gray/10 group"
    >
      {/* Project Image */}
      <div className="relative overflow-hidden">
        <FeaturedImage
          imageUrl={project.projectImageUrl}
          alt={project.title?.rendered}
          className="h-64"
          showOverlay={false}
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center p-6">
          {project.acf?.project_url && (
            <motion.a
              href={project.acf.project_url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-electric-teal text-pure-white px-6 py-3 rounded-full font-semibold hover:bg-bright-orange transition-all duration-300 inline-flex items-center space-x-2 shadow-xl"
            >
              <span>View Live Site</span>
              <SafeIcon icon={FiExternalLink} className="w-5 h-5" />
            </motion.a>
          )}
        </div>

        {/* Image Zoom Effect */}
        <motion.div
          className="absolute inset-0 bg-electric-teal/0 group-hover:bg-electric-teal/10 transition-all duration-500"
          whileHover={{ scale: 1.05 }}
        />
      </div>

      {/* Project Content */}
      <div className="p-8">
        {/* Title */}
        <h3 className="text-2xl font-bold text-charcoal mb-4 group-hover:text-electric-teal transition-colors duration-300">
          {project.title?.rendered}
        </h3>

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
              <SafeIcon icon={FiUser} className="w-4 h-4 mr-3 text-electric-teal" />
              <span><strong>Client:</strong> {project.acf.client_name}</span>
            </div>
          )}
          
          {project.acf?.tools_used && (
            <div className="flex items-center text-sm text-charcoal/70">
              <SafeIcon icon={FiTool} className="w-4 h-4 mr-3 text-electric-teal" />
              <span><strong>Tools:</strong> {project.acf.tools_used}</span>
            </div>
          )}
        </div>

        {/* Expandable Details */}
        {hasOptionalFields && (
          <div className="border-t border-medium-gray/20 pt-6">
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-between text-electric-teal font-semibold hover:text-bright-orange transition-colors duration-300 mb-4"
            >
              <span>Project Details</span>
              <SafeIcon 
                icon={isExpanded ? FiChevronUp : FiChevronDown} 
                className="w-5 h-5" 
              />
            </motion.button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* The Challenge */}
                    {project.acf?.the_challenge && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-gradient-to-br from-electric-teal/5 to-deep-purple/5 rounded-2xl p-6"
                      >
                        <div className="flex items-center mb-3">
                          <SafeIcon icon={FiTarget} className="w-5 h-5 text-electric-teal mr-2" />
                          <h4 className="font-bold text-charcoal">The Challenge</h4>
                        </div>
                        <p className="text-sm text-charcoal/70 leading-relaxed">
                          {stripHtml(project.acf.the_challenge)}
                        </p>
                      </motion.div>
                    )}

                    {/* Our Solution */}
                    {project.acf?.our_solution && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gradient-to-br from-bright-orange/5 to-electric-teal/5 rounded-2xl p-6"
                      >
                        <div className="flex items-center mb-3">
                          <SafeIcon icon={FiZap} className="w-5 h-5 text-bright-orange mr-2" />
                          <h4 className="font-bold text-charcoal">Our Solution</h4>
                        </div>
                        <p className="text-sm text-charcoal/70 leading-relaxed">
                          {stripHtml(project.acf.our_solution)}
                        </p>
                      </motion.div>
                    )}

                    {/* Results Achieved */}
                    {project.acf?.results_achieved && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-gradient-to-br from-success-green/5 to-electric-teal/5 rounded-2xl p-6"
                      >
                        <div className="flex items-center mb-3">
                          <SafeIcon icon={FiTrendingUp} className="w-5 h-5 text-success-green mr-2" />
                          <h4 className="font-bold text-charcoal">Results Achieved</h4>
                        </div>
                        <p className="text-sm text-charcoal/70 leading-relaxed">
                          {stripHtml(project.acf.results_achieved)}
                        </p>
                      </motion.div>
                    )}
                  </div>

                  {/* Key Features */}
                  {project.acf?.key_features && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="mt-6 bg-light-gray/50 rounded-2xl p-6"
                    >
                      <div className="flex items-center mb-4">
                        <SafeIcon icon={FiCheckCircle} className="w-5 h-5 text-deep-purple mr-2" />
                        <h4 className="font-bold text-charcoal">Key Features</h4>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {parseFeatures(project.acf.key_features).map((feature, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className="flex items-center space-x-2"
                          >
                            <div className="w-2 h-2 bg-deep-purple rounded-full"></div>
                            <span className="text-sm text-charcoal/70">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Action Button */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-medium-gray/20">
          {project.acf?.project_url ? (
            <motion.a
              href={project.acf.project_url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-primary text-pure-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 inline-flex items-center space-x-2"
            >
              <span>View Project</span>
              <SafeIcon icon={FiExternalLink} className="w-4 h-4" />
            </motion.a>
          ) : (
            <div className="bg-medium-gray/20 text-charcoal/50 px-6 py-3 rounded-full font-semibold inline-flex items-center space-x-2">
              <span>Project Confidential</span>
            </div>
          )}

          {/* Project Type Badge */}
          <div className="bg-electric-teal/10 text-electric-teal px-3 py-1 rounded-full text-xs font-semibold">
            {project.acf?.tools_used ? 'Custom Development' : 'Web Project'}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;