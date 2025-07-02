import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiArrowRight, FiSearch, FiTrendingUp, FiTarget, FiBarChart, FiGlobe, FiZap, FiCheckCircle, FiEye, FiMousePointer } = FiIcons;

const SEOPage = () => {
  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [processRef, processInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [benefitsRef, benefitsInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [metricsRef, metricsInView] = useInView({ threshold: 0.2, triggerOnce: true });

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

  const seoProcess = [
    {
      step: '01',
      title: 'SEO Audit',
      description: 'Comprehensive analysis of your current SEO performance',
      icon: FiSearch,
      color: 'bg-electric-teal'
    },
    {
      step: '02',
      title: 'Keyword Research',
      description: 'Finding high-value keywords for your business',
      icon: FiTarget,
      color: 'bg-bright-orange'
    },
    {
      step: '03',
      title: 'On-Page Optimization',
      description: 'Optimizing content, meta tags, and site structure',
      icon: FiZap,
      color: 'bg-deep-purple'
    },
    {
      step: '04',
      title: 'Monitoring & Reporting',
      description: 'Tracking performance and providing detailed reports',
      icon: FiBarChart,
      color: 'bg-success-green'
    }
  ];

  const benefits = [
    { title: 'Increased Visibility', description: 'Rank higher in search results', icon: FiEye },
    { title: 'More Traffic', description: 'Drive qualified organic traffic', icon: FiTrendingUp },
    { title: 'Better Conversions', description: 'Turn visitors into customers', icon: FiMousePointer },
    { title: 'Brand Authority', description: 'Build trust and credibility', icon: FiGlobe },
    { title: 'Long-term Results', description: 'Sustainable growth strategy', icon: FiBarChart },
    { title: 'ROI Focused', description: 'Measurable business impact', icon: FiTarget }
  ];

  const metrics = [
    { number: '150%', label: 'Average Traffic Increase' },
    { number: '85%', label: 'First Page Rankings' },
    { number: '3-6', label: 'Months to See Results' },
    { number: '24/7', label: 'Monitoring & Support' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24"
    >
      {/* Hero Section */}
      <section ref={heroRef} className="bg-gradient-to-br from-success-green/10 via-pure-white to-electric-teal/10 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="inline-flex items-center bg-success-green/10 px-4 py-2 rounded-full text-success-green font-semibold">
                <SafeIcon icon={FiSearch} className="w-5 h-5 mr-2" />
                SEO Optimization Service
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-display font-bold text-charcoal leading-tight">
                Dominate <span className="text-success-green">Search Results</span> & Drive Growth
              </h1>
              
              <p className="text-xl text-charcoal/70 leading-relaxed">
                Boost your online visibility with strategic SEO that gets you found by customers 
                actively searching for your products and services.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(16, 185, 129, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-success-green text-pure-white px-8 py-4 rounded-full font-semibold 
                               transition-all duration-300 flex items-center space-x-2"
                  >
                    <span>Get SEO Audit</span>
                    <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
                  </motion.button>
                </Link>
                
                <Link to="/portfolio">
                  <motion.button
                    whileHover={{ scale: 1.05, borderColor: "#10B981", color: "#10B981" }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-charcoal text-charcoal px-8 py-4 rounded-full font-semibold 
                               hover:bg-success-green hover:text-pure-white transition-all duration-300"
                  >
                    View Results
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            {/* SEO Growth Infographic */}
            <motion.div variants={itemVariants} className="relative">
              <div className="relative z-10">
                {/* Search Results Visualization */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="bg-pure-white rounded-2xl p-6 shadow-xl border border-medium-gray/20 mb-6"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-success-green rounded-full flex items-center justify-center">
                      <SafeIcon icon={FiSearch} className="w-4 h-4 text-pure-white" />
                    </div>
                    <div className="h-3 bg-light-gray rounded-full flex-1">
                      <motion.div
                        animate={{ width: ['0%', '75%'] }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                        className="h-full bg-success-green rounded-full"
                      />
                    </div>
                  </div>
                  
                  {/* Search Results */}
                  <div className="space-y-3">
                    {[1, 2, 3].map((rank, index) => (
                      <motion.div
                        key={rank}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.3, repeat: Infinity, repeatDelay: 3 }}
                        className={`p-3 rounded-lg ${rank === 1 ? 'bg-success-green/20 border-2 border-success-green' : 'bg-light-gray'}`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className={`text-sm font-bold ${rank === 1 ? 'text-success-green' : 'text-charcoal/60'}`}>
                            #{rank}
                          </span>
                          <div className="flex-1">
                            <div className={`h-2 rounded-full ${rank === 1 ? 'bg-success-green' : 'bg-charcoal/30'} mb-1`} />
                            <div className={`h-2 rounded-full ${rank === 1 ? 'bg-success-green/70' : 'bg-charcoal/20'} w-3/4`} />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Traffic Growth Chart */}
                <motion.div
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="bg-pure-white rounded-2xl p-6 shadow-lg border border-medium-gray/20"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-charcoal">Traffic Growth</h3>
                    <SafeIcon icon={FiTrendingUp} className="w-6 h-6 text-success-green" />
                  </div>
                  <div className="relative h-20">
                    <svg className="w-full h-full" viewBox="0 0 200 80">
                      <motion.path
                        d="M10,70 Q50,50 100,30 T190,10"
                        stroke="#10B981"
                        strokeWidth="3"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#10B981" stopOpacity="0.3"/>
                          <stop offset="100%" stopColor="#10B981" stopOpacity="0"/>
                        </linearGradient>
                      </defs>
                      <motion.path
                        d="M10,70 Q50,50 100,30 T190,10 L190,80 L10,80 Z"
                        fill="url(#gradient)"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                      />
                    </svg>
                  </div>
                </motion.div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-5 -right-5 w-16 h-16 border-2 border-success-green/30 rounded-full 
                           flex items-center justify-center"
              >
                <SafeIcon icon={FiTarget} className="w-6 h-6 text-success-green" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SEO Process */}
      <section ref={processRef} className="py-20 bg-light-gray">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={processInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-charcoal mb-6">
              Our SEO Process
            </h2>
            <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
              A systematic approach to improving your search engine rankings and online visibility
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={processInView ? "visible" : "hidden"}
            className="relative"
          >
            {/* Process Flow Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-success-green via-electric-teal to-bright-orange transform -translate-y-1/2 z-0"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
              {seoProcess.map((step, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ 
                    y: -10, 
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(16, 185, 129, 0.15)"
                  }}
                  className="bg-pure-white rounded-3xl p-8 text-center shadow-lg relative"
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 relative z-10`}
                  >
                    <SafeIcon icon={step.icon} className="w-8 h-8 text-pure-white" />
                  </motion.div>
                  
                  <div className="text-3xl font-bold text-success-green mb-2">{step.step}</div>
                  <h3 className="text-xl font-bold text-charcoal mb-3">{step.title}</h3>
                  <p className="text-charcoal/70">{step.description}</p>
                  
                  {/* Connecting Arrow */}
                  {index < seoProcess.length - 1 && (
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2"
                    >
                      <SafeIcon icon={FiArrowRight} className="w-6 h-6 text-success-green" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section ref={benefitsRef} className="py-20 bg-pure-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-charcoal mb-6">
              SEO Benefits for Your Business
            </h2>
            <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
              Discover how strategic SEO optimization can transform your online presence
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={benefitsInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -5, 
                  rotateY: 5,
                  boxShadow: "0 25px 50px rgba(16, 185, 129, 0.15)"
                }}
                className="bg-gradient-to-br from-light-gray to-pure-white rounded-3xl p-8 border border-medium-gray/20 group"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 bg-success-green/20 rounded-2xl flex items-center justify-center mb-6 
                             group-hover:bg-success-green/30 transition-colors duration-300"
                >
                  <SafeIcon icon={benefit.icon} className="w-8 h-8 text-success-green" />
                </motion.div>
                
                <h3 className="text-xl font-bold text-charcoal mb-3 group-hover:text-success-green transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-charcoal/70">{benefit.description}</p>
                
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="mt-4"
                >
                  <SafeIcon icon={FiCheckCircle} className="w-6 h-6 text-success-green" />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Metrics Section */}
      <section ref={metricsRef} className="py-20 bg-gradient-to-br from-success-green to-electric-teal text-pure-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={metricsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">
              SEO Performance Metrics
            </h2>
            <p className="text-xl text-pure-white/80 max-w-3xl mx-auto">
              Real results from our SEO optimization strategies
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={metricsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.1,
                  rotateY: 10,
                  boxShadow: "0 20px 40px rgba(255, 255, 255, 0.1)"
                }}
                className="text-center bg-pure-white/10 backdrop-blur-sm rounded-2xl p-6 border border-pure-white/20"
              >
                <motion.div 
                  className="text-4xl lg:text-5xl font-bold mb-2"
                  whileHover={{ scale: 1.2 }}
                >
                  {metric.number}
                </motion.div>
                <div className="text-pure-white/80 font-medium">{metric.label}</div>
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
              Ready to Dominate Search Results?
            </h2>
            <p className="text-xl text-medium-gray mb-8 max-w-2xl mx-auto">
              Get a free SEO audit and discover how to boost your search rankings
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 15px 40px rgba(16, 185, 129, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-success-green text-pure-white px-10 py-5 rounded-full text-lg font-semibold 
                           hover:bg-opacity-90 transition-all duration-300 inline-flex items-center space-x-3"
              >
                <span>Start Your SEO Journey</span>
                <SafeIcon icon={FiArrowRight} className="w-6 h-6" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default SEOPage;