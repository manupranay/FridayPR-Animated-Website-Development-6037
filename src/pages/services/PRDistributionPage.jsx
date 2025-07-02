import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiArrowRight, FiMegaphone, FiGlobe, FiUsers, FiTrendingUp, FiTarget, FiZap, FiCheckCircle, FiEye, FiShare2, FiSend } = FiIcons;

const PRDistributionPage = () => {
  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [networkRef, networkInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [processRef, processInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [resultsRef, resultsInView] = useInView({ threshold: 0.2, triggerOnce: true });

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

  const distributionNetwork = [
    { name: 'Google News', reach: '4B+', icon: '📰' },
    { name: 'Yahoo News', reach: '1.8B+', icon: '📺' },
    { name: 'Bing News', reach: '900M+', icon: '🔍' },
    { name: 'Apple News', reach: '125M+', icon: '📱' },
    { name: 'Industry Publications', reach: '500M+', icon: '📖' },
    { name: 'Financial Sites', reach: '300M+', icon: '💼' }
  ];

  const prProcess = [
    {
      step: '01',
      title: 'Content Creation',
      description: 'Crafting compelling press releases and news content',
      icon: FiSend,
      color: 'bg-deep-purple'
    },
    {
      step: '02',
      title: 'Strategic Distribution',
      description: 'Targeting relevant media outlets and platforms',
      icon: FiShare2,
      color: 'bg-bright-orange'
    },
    {
      step: '03',
      title: 'Media Outreach',
      description: 'Direct engagement with journalists and influencers',
      icon: FiUsers,
      color: 'bg-electric-teal'
    },
    {
      step: '04',
      title: 'Performance Tracking',
      description: 'Monitoring coverage and measuring impact',
      icon: FiTrendingUp,
      color: 'bg-success-green'
    }
  ];

  const benefits = [
    { title: 'Brand Awareness', description: 'Increase visibility and recognition', icon: FiEye },
    { title: 'Media Coverage', description: 'Get featured in top publications', icon: FiMegaphone },
    { title: 'SEO Boost', description: 'High-quality backlinks and mentions', icon: FiTrendingUp },
    { title: 'Credibility', description: 'Build trust and authority', icon: FiTarget },
    { title: 'Reach Expansion', description: 'Access new audiences', icon: FiGlobe },
    { title: 'Crisis Management', description: 'Control your narrative', icon: FiZap }
  ];

  const results = [
    { number: '500+', label: 'Media Outlets' },
    { number: '2.5B+', label: 'Total Reach' },
    { number: '48hrs', label: 'Average Distribution Time' },
    { number: '95%', label: 'Publication Success Rate' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24"
    >
      {/* Hero Section */}
      <section ref={heroRef} className="bg-gradient-to-br from-deep-purple/10 via-pure-white to-bright-orange/10 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="inline-flex items-center bg-deep-purple/10 px-4 py-2 rounded-full text-deep-purple font-semibold">
                <SafeIcon icon={FiMegaphone} className="w-5 h-5 mr-2" />
                PR Distribution Service
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-display font-bold text-charcoal leading-tight">
                Amplify Your <span className="text-deep-purple">Message</span> Across Media
              </h1>
              
              <p className="text-xl text-charcoal/70 leading-relaxed">
                Get your news and announcements in front of millions through our extensive 
                network of premium media outlets, journalists, and industry publications.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(108, 99, 255, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-deep-purple text-pure-white px-8 py-4 rounded-full font-semibold 
                               transition-all duration-300 flex items-center space-x-2"
                  >
                    <span>Distribute Your News</span>
                    <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
                  </motion.button>
                </Link>
                
                <Link to="/portfolio">
                  <motion.button
                    whileHover={{ scale: 1.05, borderColor: "#6C63FF", color: "#6C63FF" }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-charcoal text-charcoal px-8 py-4 rounded-full font-semibold 
                               hover:bg-deep-purple hover:text-pure-white transition-all duration-300"
                  >
                    See Coverage
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            {/* PR Network Infographic */}
            <motion.div variants={itemVariants} className="relative">
              <div className="relative z-10">
                {/* Central Hub */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="bg-deep-purple text-pure-white rounded-full w-32 h-32 flex items-center justify-center 
                             mx-auto mb-8 relative z-20 shadow-xl"
                >
                  <div className="text-center">
                    <SafeIcon icon={FiMegaphone} className="w-8 h-8 mx-auto mb-1" />
                    <div className="text-sm font-bold">Your News</div>
                  </div>
                </motion.div>

                {/* Distribution Nodes */}
                <div className="relative">
                  {distributionNetwork.map((outlet, index) => {
                    const angle = (index * 60) - 90; // Distribute in circle
                    const radius = 120;
                    const x = Math.cos(angle * Math.PI / 180) * radius;
                    const y = Math.sin(angle * Math.PI / 180) * radius;
                    
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.2, repeat: Infinity, repeatDelay: 3 }}
                        style={{
                          position: 'absolute',
                          left: '50%',
                          top: '50%',
                          transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                        }}
                        className="bg-pure-white rounded-2xl p-4 shadow-lg border border-medium-gray/20 w-24 text-center"
                      >
                        <div className="text-2xl mb-1">{outlet.icon}</div>
                        <div className="text-xs font-bold text-charcoal truncate">{outlet.name}</div>
                        <div className="text-xs text-deep-purple">{outlet.reach}</div>
                      </motion.div>
                    );
                  })}

                  {/* Connecting Lines */}
                  {distributionNetwork.map((_, index) => {
                    const angle = (index * 60) - 90;
                    const radius = 80;
                    
                    return (
                      <motion.div
                        key={`line-${index}`}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: index * 0.3, duration: 0.8, repeat: Infinity, repeatDelay: 3 }}
                        style={{
                          position: 'absolute',
                          left: '50%',
                          top: '50%',
                          transformOrigin: '0 0',
                          transform: `rotate(${angle}deg)`,
                          width: `${radius}px`,
                          height: '2px',
                          background: 'linear-gradient(to right, #6C63FF, transparent)'
                        }}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Background Elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-deep-purple/20 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 border border-bright-orange/20 rounded-full"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Distribution Network */}
      <section ref={networkRef} className="py-20 bg-light-gray">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={networkInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-charcoal mb-6">
              Our Distribution Network
            </h2>
            <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
              Reach millions of readers through our premium media partnerships
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={networkInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {distributionNetwork.map((outlet, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -10, 
                  scale: 1.05,
                  boxShadow: "0 25px 50px rgba(108, 99, 255, 0.15)"
                }}
                className="bg-pure-white rounded-3xl p-8 text-center shadow-lg border border-medium-gray/10"
              >
                <div className="text-4xl mb-4">{outlet.icon}</div>
                <h3 className="text-xl font-bold text-charcoal mb-2">{outlet.name}</h3>
                <div className="text-3xl font-bold text-deep-purple mb-2">{outlet.reach}</div>
                <p className="text-charcoal/70">Monthly Reach</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PR Process */}
      <section ref={processRef} className="py-20 bg-pure-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={processInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-charcoal mb-6">
              Our PR Process
            </h2>
            <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
              From content creation to media coverage, we handle every aspect of your PR campaign
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={processInView ? "visible" : "hidden"}
            className="relative"
          >
            {/* Process Flow Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-deep-purple via-bright-orange to-electric-teal transform -translate-y-1/2 z-0"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
              {prProcess.map((step, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ 
                    y: -10, 
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(108, 99, 255, 0.15)"
                  }}
                  className="bg-pure-white rounded-3xl p-8 text-center shadow-lg relative border border-medium-gray/10"
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 relative z-10`}
                  >
                    <SafeIcon icon={step.icon} className="w-8 h-8 text-pure-white" />
                  </motion.div>
                  
                  <div className="text-3xl font-bold text-deep-purple mb-2">{step.step}</div>
                  <h3 className="text-xl font-bold text-charcoal mb-3">{step.title}</h3>
                  <p className="text-charcoal/70">{step.description}</p>
                  
                  {/* Connecting Arrow */}
                  {index < prProcess.length - 1 && (
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2"
                    >
                      <SafeIcon icon={FiArrowRight} className="w-6 h-6 text-deep-purple" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-light-gray">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-charcoal mb-6">
              PR Distribution Benefits
            </h2>
            <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
              Transform your business visibility with strategic media coverage
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -5, 
                  rotateY: 5,
                  boxShadow: "0 25px 50px rgba(108, 99, 255, 0.15)"
                }}
                className="bg-pure-white rounded-3xl p-8 border border-medium-gray/20 group"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 bg-deep-purple/20 rounded-2xl flex items-center justify-center mb-6 
                             group-hover:bg-deep-purple/30 transition-colors duration-300"
                >
                  <SafeIcon icon={benefit.icon} className="w-8 h-8 text-deep-purple" />
                </motion.div>
                
                <h3 className="text-xl font-bold text-charcoal mb-3 group-hover:text-deep-purple transition-colors">
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

      {/* Results Section */}
      <section ref={resultsRef} className="py-20 bg-gradient-to-br from-deep-purple to-bright-orange text-pure-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={resultsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">
              Distribution Results
            </h2>
            <p className="text-xl text-pure-white/80 max-w-3xl mx-auto">
              Real numbers from our PR distribution campaigns
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {results.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={resultsInView ? { opacity: 1, scale: 1 } : {}}
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
                  {result.number}
                </motion.div>
                <div className="text-pure-white/80 font-medium">{result.label}</div>
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
              Ready to Make Headlines?
            </h2>
            <p className="text-xl text-medium-gray mb-8 max-w-2xl mx-auto">
              Get your story in front of millions with our premium PR distribution service
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 15px 40px rgba(108, 99, 255, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-deep-purple text-pure-white px-10 py-5 rounded-full text-lg font-semibold 
                           hover:bg-opacity-90 transition-all duration-300 inline-flex items-center space-x-3"
              >
                <span>Distribute Your News</span>
                <SafeIcon icon={FiArrowRight} className="w-6 h-6" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default PRDistributionPage;