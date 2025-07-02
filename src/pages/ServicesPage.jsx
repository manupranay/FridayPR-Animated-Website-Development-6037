import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiGlobe, FiTrendingUp, FiTarget, FiPenTool, FiCode, FiMegaphone, FiArrowRight } = FiIcons;

const ServicesPage = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

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

  const services = [
    {
      title: 'Web Design & Development',
      description: 'Beautiful, responsive websites that convert visitors into customers',
      icon: FiGlobe,
      color: 'bg-electric-teal',
      link: '/services/web-design',
      features: ['Responsive Design', 'Fast Loading', 'SEO Optimized', 'User Friendly']
    },
    {
      title: 'SEO Optimization',
      description: 'Dominate search results and drive organic traffic to your website',
      icon: FiTrendingUp,
      color: 'bg-success-green',
      link: '/services/seo',
      features: ['Keyword Research', 'On-Page SEO', 'Technical SEO', 'Performance Tracking']
    },
    {
      title: 'PR Distribution',
      description: 'Get your news featured in top media outlets and publications',
      icon: FiMegaphone,
      color: 'bg-deep-purple',
      link: '/services/pr-distribution',
      features: ['Media Outreach', 'Press Releases', 'News Distribution', 'Coverage Tracking']
    },
    {
      title: 'Brand Identity',
      description: 'Create memorable brands that resonate with your target audience',
      icon: FiPenTool,
      color: 'bg-bright-orange',
      link: '/services/branding',
      features: ['Logo Design', 'Brand Strategy', 'Visual Identity', 'Brand Guidelines']
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Discovery',
      description: 'Understanding your business goals and target audience'
    },
    {
      step: '02',
      title: 'Strategy',
      description: 'Developing a comprehensive digital strategy'
    },
    {
      step: '03',
      title: 'Creation',
      description: 'Bringing your vision to life with expert execution'
    },
    {
      step: '04',
      title: 'Growth',
      description: 'Ongoing optimization and performance monitoring'
    }
  ];

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
            Our <span className="text-electric-teal">Services</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-charcoal/70 max-w-3xl mx-auto"
          >
            Comprehensive digital solutions designed to elevate your business presence and drive meaningful results
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section ref={ref} className="py-20 bg-pure-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -10, 
                  boxShadow: "0 25px 50px rgba(0, 212, 204, 0.15)",
                  scale: 1.02
                }}
                className="bg-pure-white rounded-3xl p-8 shadow-lg card-hover group border border-medium-gray/10"
              >
                <motion.div
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: [0, -10, 10, 0]
                  }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-6 
                             group-hover:shadow-lg transition-all duration-300`}
                >
                  <SafeIcon icon={service.icon} className="w-8 h-8 text-pure-white" />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-charcoal mb-4 group-hover:text-electric-teal transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-charcoal/70 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Service Features */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {service.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-electric-teal rounded-full"></div>
                      <span className="text-sm text-charcoal/70">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Link to={service.link}>
                  <motion.div
                    whileHover={{ x: 5, scale: 1.05 }}
                    className="flex items-center text-electric-teal font-semibold cursor-pointer group"
                  >
                    <span className="group-hover:text-bright-orange transition-colors">Learn More</span>
                    <motion.div
                      whileHover={{ x: 3 }}
                      className="ml-2"
                    >
                      <SafeIcon icon={FiArrowRight} className="w-4 h-4 group-hover:text-bright-orange transition-colors" />
                    </motion.div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
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
              Our Process
            </h2>
            <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
              A streamlined approach that ensures exceptional results for every project
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {processSteps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -5,
                  scale: 1.05
                }}
                className="text-center group"
              >
                <motion.div 
                  whileHover={{ 
                    rotate: 360,
                    backgroundColor: "#00D4CC"
                  }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 bg-electric-teal/20 rounded-full flex items-center justify-center 
                             text-electric-teal font-bold text-xl mx-auto mb-4 group-hover:text-pure-white"
                >
                  {item.step}
                </motion.div>
                <h3 className="text-xl font-bold text-charcoal mb-3 group-hover:text-electric-teal transition-colors">
                  {item.title}
                </h3>
                <p className="text-charcoal/70">{item.desc}</p>
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
              Ready to get started?
            </h2>
            <p className="text-xl text-medium-gray mb-8 max-w-2xl mx-auto">
              Let's discuss how our services can help your business achieve its digital goals
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 15px 40px rgba(0, 212, 204, 0.4)",
                  rotateX: 10
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-electric-teal text-charcoal px-10 py-5 rounded-full text-lg font-semibold 
                           hover:bg-opacity-90 transition-all duration-300 inline-flex items-center space-x-3
                           relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-white/10"
                  animate={{ x: [-100, 100] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span>Contact Us Today</span>
                <SafeIcon icon={FiArrowRight} className="w-6 h-6" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default ServicesPage;