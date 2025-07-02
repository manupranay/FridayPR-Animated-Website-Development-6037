import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiArrowRight, FiMonitor, FiSmartphone, FiTablet, FiCode, FiPalette, FiZap, FiCheckCircle, FiUsers, FiTrendingUp } = FiIcons;

const WebDesignPage = () => {
  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [processRef, processInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [featuresRef, featuresInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [statsRef, statsInView] = useInView({ threshold: 0.2, triggerOnce: true });

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

  const processSteps = [
    {
      step: '01',
      title: 'Discovery & Research',
      description: 'Understanding your brand, audience, and goals',
      icon: FiUsers,
      color: 'bg-electric-teal'
    },
    {
      step: '02',
      title: 'Design & Prototype',
      description: 'Creating wireframes and visual designs',
      icon: FiPalette,
      color: 'bg-bright-orange'
    },
    {
      step: '03',
      title: 'Development',
      description: 'Building responsive, fast-loading websites',
      icon: FiCode,
      color: 'bg-deep-purple'
    },
    {
      step: '04',
      title: 'Launch & Optimize',
      description: 'Testing, launching, and ongoing improvements',
      icon: FiZap,
      color: 'bg-electric-teal'
    }
  ];

  const features = [
    { title: 'Responsive Design', description: 'Perfect on all devices', icon: FiMonitor },
    { title: 'Fast Loading', description: 'Optimized for speed', icon: FiZap },
    { title: 'SEO Ready', description: 'Built for search engines', icon: FiTrendingUp },
    { title: 'User Friendly', description: 'Intuitive navigation', icon: FiUsers },
    { title: 'Modern Code', description: 'Clean, maintainable code', icon: FiCode },
    { title: 'Brand Focused', description: 'Reflects your identity', icon: FiPalette }
  ];

  const stats = [
    { number: '98%', label: 'Client Satisfaction' },
    { number: '3.2s', label: 'Average Load Time' },
    { number: '100%', label: 'Mobile Responsive' },
    { number: '24/7', label: 'Support Available' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24"
    >
      {/* Hero Section */}
      <section ref={heroRef} className="bg-gradient-to-br from-electric-teal/10 via-pure-white to-bright-orange/10 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="inline-flex items-center bg-electric-teal/10 px-4 py-2 rounded-full text-electric-teal font-semibold">
                <SafeIcon icon={FiMonitor} className="w-5 h-5 mr-2" />
                Web Design Service
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-display font-bold text-charcoal leading-tight">
                Beautiful <span className="text-electric-teal">Web Design</span> That Converts
              </h1>
              
              <p className="text-xl text-charcoal/70 leading-relaxed">
                Create stunning, responsive websites that captivate your audience and drive business growth. 
                Our designs combine aesthetic appeal with functional excellence.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0, 212, 204, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-electric-teal text-pure-white px-8 py-4 rounded-full font-semibold 
                               transition-all duration-300 flex items-center space-x-2"
                  >
                    <span>Start Your Project</span>
                    <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
                  </motion.button>
                </Link>
                
                <Link to="/portfolio">
                  <motion.button
                    whileHover={{ scale: 1.05, borderColor: "#00D4CC", color: "#00D4CC" }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-charcoal text-charcoal px-8 py-4 rounded-full font-semibold 
                               hover:bg-electric-teal hover:text-pure-white transition-all duration-300"
                  >
                    View Our Work
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            {/* Device Showcase Infographic */}
            <motion.div variants={itemVariants} className="relative">
              <div className="relative z-10">
                {/* Desktop */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="bg-pure-white rounded-2xl p-6 shadow-xl border border-medium-gray/20 mb-8"
                >
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-3 h-3 bg-warning-red rounded-full"></div>
                    <div className="w-3 h-3 bg-bright-orange rounded-full"></div>
                    <div className="w-3 h-3 bg-success-green rounded-full"></div>
                  </div>
                  <div className="h-32 bg-gradient-to-br from-electric-teal to-deep-purple rounded-lg relative overflow-hidden">
                    <motion.div
                      animate={{ x: [0, 20, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute inset-0 bg-white/20"
                    />
                    <SafeIcon icon={FiMonitor} className="w-8 h-8 text-pure-white absolute bottom-4 right-4" />
                  </div>
                </motion.div>

                {/* Tablet & Mobile */}
                <div className="flex space-x-4">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                    className="bg-pure-white rounded-xl p-4 shadow-lg flex-1"
                  >
                    <div className="h-20 bg-gradient-to-br from-bright-orange to-electric-teal rounded-lg relative">
                      <SafeIcon icon={FiTablet} className="w-6 h-6 text-pure-white absolute bottom-2 right-2" />
                    </div>
                  </motion.div>
                  
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
                    className="bg-pure-white rounded-xl p-4 shadow-lg w-16"
                  >
                    <div className="h-20 bg-gradient-to-br from-deep-purple to-bright-orange rounded-lg relative">
                      <SafeIcon icon={FiSmartphone} className="w-4 h-4 text-pure-white absolute bottom-2 right-2" />
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Background Elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-10 -right-10 w-20 h-20 border-2 border-electric-teal/30 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-5 -left-5 w-16 h-16 border-2 border-bright-orange/30 rounded-full"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Process Infographic */}
      <section ref={processRef} className="py-20 bg-light-gray">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={processInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-charcoal mb-6">
              Our Design Process
            </h2>
            <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
              A proven methodology that ensures your website exceeds expectations
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={processInView ? "visible" : "hidden"}
            className="relative"
          >
            {/* Process Flow Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-electric-teal via-bright-orange to-deep-purple transform -translate-y-1/2 z-0"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ 
                    y: -10, 
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(0, 212, 204, 0.15)"
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
                  
                  <div className="text-3xl font-bold text-electric-teal mb-2">{step.step}</div>
                  <h3 className="text-xl font-bold text-charcoal mb-3">{step.title}</h3>
                  <p className="text-charcoal/70">{step.description}</p>
                  
                  {/* Connecting Arrow */}
                  {index < processSteps.length - 1 && (
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2"
                    >
                      <SafeIcon icon={FiArrowRight} className="w-6 h-6 text-electric-teal" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section ref={featuresRef} className="py-20 bg-pure-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-charcoal mb-6">
              What You Get
            </h2>
            <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
              Every website we create includes these essential features and more
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -5, 
                  rotateY: 5,
                  boxShadow: "0 25px 50px rgba(0, 212, 204, 0.15)"
                }}
                className="bg-gradient-to-br from-light-gray to-pure-white rounded-3xl p-8 border border-medium-gray/20 group"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 bg-electric-teal/20 rounded-2xl flex items-center justify-center mb-6 
                             group-hover:bg-electric-teal/30 transition-colors duration-300"
                >
                  <SafeIcon icon={feature.icon} className="w-8 h-8 text-electric-teal" />
                </motion.div>
                
                <h3 className="text-xl font-bold text-charcoal mb-3 group-hover:text-electric-teal transition-colors">
                  {feature.title}
                </h3>
                <p className="text-charcoal/70">{feature.description}</p>
                
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

      {/* Stats Infographic */}
      <section ref={statsRef} className="py-20 bg-gradient-to-br from-charcoal to-charcoal/90 text-pure-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">
              Proven Results
            </h2>
            <p className="text-xl text-medium-gray max-w-3xl mx-auto">
              Numbers that showcase our commitment to excellence in web design
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.1,
                  rotateY: 10,
                  boxShadow: "0 20px 40px rgba(0, 212, 204, 0.3)"
                }}
                className="text-center bg-pure-white/10 backdrop-blur-sm rounded-2xl p-6 border border-pure-white/20"
              >
                <motion.div 
                  className="text-4xl lg:text-5xl font-bold text-electric-teal mb-2"
                  whileHover={{ scale: 1.2 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-medium-gray font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
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
              Web Design Packages
            </h2>
            <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
              Choose the perfect package for your business needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Starter',
                price: '$2,499',
                description: 'Perfect for small businesses',
                features: ['5 Pages', 'Responsive Design', 'Basic SEO', 'Contact Form', '30 Days Support'],
                color: 'border-electric-teal'
              },
              {
                name: 'Professional',
                price: '$4,999',
                description: 'Most popular choice',
                features: ['10 Pages', 'Advanced Design', 'Full SEO Setup', 'CMS Integration', '90 Days Support', 'Analytics Setup'],
                color: 'border-bright-orange',
                popular: true
              },
              {
                name: 'Enterprise',
                price: '$9,999',
                description: 'For growing businesses',
                features: ['Unlimited Pages', 'Custom Features', 'E-commerce Ready', 'Advanced Integration', '1 Year Support', 'Priority Updates'],
                color: 'border-deep-purple'
              }
            ].map((package_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 25px 50px rgba(0, 212, 204, 0.15)"
                }}
                className={`bg-pure-white rounded-3xl p-8 border-2 ${package_.color} relative ${
                  package_.popular ? 'scale-105' : ''
                }`}
              >
                {package_.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-bright-orange text-pure-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-charcoal mb-2">{package_.name}</h3>
                  <div className="text-4xl font-bold text-electric-teal mb-2">{package_.price}</div>
                  <p className="text-charcoal/70">{package_.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {package_.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center space-x-3">
                      <SafeIcon icon={FiCheckCircle} className="w-5 h-5 text-success-green" />
                      <span className="text-charcoal/70">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-4 px-6 rounded-full font-semibold transition-all duration-300 ${
                      package_.popular
                        ? 'bg-bright-orange text-pure-white hover:bg-opacity-90'
                        : 'bg-electric-teal text-pure-white hover:bg-opacity-90'
                    }`}
                  >
                    Get Started
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-pure-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">
              Ready to Create Your Dream Website?
            </h2>
            <p className="text-xl text-pure-white/80 mb-8 max-w-2xl mx-auto">
              Let's bring your vision to life with a stunning, conversion-focused website
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 15px 40px rgba(255, 107, 53, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-bright-orange text-pure-white px-10 py-5 rounded-full text-lg font-semibold 
                           hover:bg-opacity-90 transition-all duration-300 inline-flex items-center space-x-3"
              >
                <span>Start Your Web Design Project</span>
                <SafeIcon icon={FiArrowRight} className="w-6 h-6" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default WebDesignPage;