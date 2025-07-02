import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiArrowRight, FiPenTool, FiHeart, FiTarget, FiTrendingUp, FiZap, FiCheckCircle, FiEye, FiUsers, FiStar } = FiIcons;

const BrandingPage = () => {
  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [elementsRef, elementsInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [processRef, processInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [impactRef, impactInView] = useInView({ threshold: 0.2, triggerOnce: true });

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

  const brandElements = [
    { name: 'Logo Design', description: 'Memorable visual identity', icon: '🎨', color: 'bg-bright-orange' },
    { name: 'Color Palette', description: 'Strategic color psychology', icon: '🌈', color: 'bg-electric-teal' },
    { name: 'Typography', description: 'Brand voice in letters', icon: '✍️', color: 'bg-deep-purple' },
    { name: 'Brand Voice', description: 'Consistent messaging tone', icon: '💬', color: 'bg-success-green' },
    { name: 'Visual Assets', description: 'Complete design system', icon: '📐', color: 'bg-bright-orange' },
    { name: 'Brand Guidelines', description: 'Usage standards & rules', icon: '📋', color: 'bg-electric-teal' }
  ];

  const brandingProcess = [
    {
      step: '01',
      title: 'Brand Discovery',
      description: 'Understanding your values, mission, and target audience',
      icon: FiTarget,
      color: 'bg-bright-orange'
    },
    {
      step: '02',
      title: 'Strategy Development',
      description: 'Creating positioning and messaging frameworks',
      icon: FiZap,
      color: 'bg-electric-teal'
    },
    {
      step: '03',
      title: 'Visual Identity',
      description: 'Designing logos, colors, and visual elements',
      icon: FiPenTool,
      color: 'bg-deep-purple'
    },
    {
      step: '04',
      title: 'Brand Implementation',
      description: 'Applying brand across all touchpoints',
      icon: FiStar,
      color: 'bg-success-green'
    }
  ];

  const brandBenefits = [
    { title: 'Recognition', description: 'Stand out in the market', icon: FiEye },
    { title: 'Trust Building', description: 'Establish credibility', icon: FiHeart },
    { title: 'Customer Loyalty', description: 'Create emotional connections', icon: FiUsers },
    { title: 'Premium Pricing', description: 'Command higher values', icon: FiTrendingUp },
    { title: 'Consistency', description: 'Unified brand experience', icon: FiTarget },
    { title: 'Growth Engine', description: 'Drive business expansion', icon: FiZap }
  ];

  const impact = [
    { number: '73%', label: 'Brand Recognition Increase' },
    { number: '2.5x', label: 'Customer Engagement Boost' },
    { number: '40%', label: 'Revenue Growth Average' },
    { number: '90%', label: 'Client Satisfaction Rate' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24"
    >
      {/* Hero Section */}
      <section ref={heroRef} className="bg-gradient-to-br from-bright-orange/10 via-pure-white to-electric-teal/10 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="inline-flex items-center bg-bright-orange/10 px-4 py-2 rounded-full text-bright-orange font-semibold">
                <SafeIcon icon={FiPenTool} className="w-5 h-5 mr-2" />
                Brand Identity & Design
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-display font-bold text-charcoal leading-tight">
                Build a <span className="text-bright-orange">Memorable Brand</span> That Connects
              </h1>
              
              <p className="text-xl text-charcoal/70 leading-relaxed">
                Create a powerful brand identity that resonates with your audience and drives business growth. 
                From logo design to complete brand systems, we craft authentic brand experiences.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(255, 107, 53, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-bright-orange text-pure-white px-8 py-4 rounded-full font-semibold 
                               transition-all duration-300 flex items-center space-x-2"
                  >
                    <span>Start Your Brand</span>
                    <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
                  </motion.button>
                </Link>
                
                <Link to="/portfolio">
                  <motion.button
                    whileHover={{ scale: 1.05, borderColor: "#FF6B35", color: "#FF6B35" }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-charcoal text-charcoal px-8 py-4 rounded-full font-semibold 
                               hover:bg-bright-orange hover:text-pure-white transition-all duration-300"
                  >
                    View Brands
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            {/* Brand Elements Infographic */}
            <motion.div variants={itemVariants} className="relative">
              <div className="relative z-10">
                {/* Central Brand Core */}
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="bg-bright-orange text-pure-white rounded-full w-32 h-32 flex items-center justify-center 
                             mx-auto mb-8 relative z-20 shadow-xl"
                >
                  <div className="text-center">
                    <SafeIcon icon={FiHeart} className="w-8 h-8 mx-auto mb-1" />
                    <div className="text-sm font-bold">Brand Core</div>
                  </div>
                </motion.div>

                {/* Brand Elements Orbit */}
                <div className="relative">
                  {brandElements.slice(0, 4).map((element, index) => {
                    const angle = index * 90; // 4 elements in cross pattern
                    const radius = 100;
                    const x = Math.cos(angle * Math.PI / 180) * radius;
                    const y = Math.sin(angle * Math.PI / 180) * radius;
                    
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.3 }}
                        whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                        style={{
                          position: 'absolute',
                          left: '50%',
                          top: '50%',
                          transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                        }}
                        className="bg-pure-white rounded-2xl p-4 shadow-lg border border-medium-gray/20 w-24 h-24 
                                   flex flex-col items-center justify-center text-center"
                      >
                        <div className="text-2xl mb-1">{element.icon}</div>
                        <div className="text-xs font-bold text-charcoal">{element.name.split(' ')[0]}</div>
                      </motion.div>
                    );
                  })}

                  {/* Orbital Rings */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-2 border-bright-orange/20 rounded-full"
                    style={{ width: '280px', height: '280px', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border border-electric-teal/20 rounded-full"
                    style={{ width: '240px', height: '240px', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
                  />
                </div>

                {/* Brand Values Floating */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="absolute -top-5 -left-5 bg-electric-teal/10 px-3 py-1 rounded-full text-electric-teal text-sm font-semibold"
                >
                  Authentic
                </motion.div>
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 2 }}
                  className="absolute -bottom-5 -right-5 bg-success-green/10 px-3 py-1 rounded-full text-success-green text-sm font-semibold"
                >
                  Memorable
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Brand Elements Section */}
      <section ref={elementsRef} className="py-20 bg-light-gray">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={elementsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-charcoal mb-6">
              Complete Brand Identity System
            </h2>
            <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
              Every element designed to work together harmoniously for maximum impact
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={elementsInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {brandElements.map((element, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -10, 
                  scale: 1.05,
                  boxShadow: "0 25px 50px rgba(255, 107, 53, 0.15)"
                }}
                className="bg-pure-white rounded-3xl p-8 text-center shadow-lg border border-medium-gray/10 group"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: [0, -15, 15, 0] }}
                  transition={{ duration: 0.6 }}
                  className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300"
                >
                  {element.icon}
                </motion.div>
                
                <h3 className="text-xl font-bold text-charcoal mb-3 group-hover:text-bright-orange transition-colors">
                  {element.name}
                </h3>
                <p className="text-charcoal/70">{element.description}</p>
                
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

      {/* Branding Process */}
      <section ref={processRef} className="py-20 bg-pure-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={processInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-charcoal mb-6">
              Our Branding Process
            </h2>
            <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
              A strategic approach to building brands that resonate and endure
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={processInView ? "visible" : "hidden"}
            className="relative"
          >
            {/* Process Flow Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-bright-orange via-electric-teal to-success-green transform -translate-y-1/2 z-0"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
              {brandingProcess.map((step, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ 
                    y: -10, 
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(255, 107, 53, 0.15)"
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
                  
                  <div className="text-3xl font-bold text-bright-orange mb-2">{step.step}</div>
                  <h3 className="text-xl font-bold text-charcoal mb-3">{step.title}</h3>
                  <p className="text-charcoal/70">{step.description}</p>
                  
                  {/* Connecting Arrow */}
                  {index < brandingProcess.length - 1 && (
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2"
                    >
                      <SafeIcon icon={FiArrowRight} className="w-6 h-6 text-bright-orange" />
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
              The Power of Strong Branding
            </h2>
            <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
              Transform your business with a brand that drives recognition, trust, and growth
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {brandBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -5, 
                  rotateY: 5,
                  boxShadow: "0 25px 50px rgba(255, 107, 53, 0.15)"
                }}
                className="bg-pure-white rounded-3xl p-8 border border-medium-gray/20 group"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 bg-bright-orange/20 rounded-2xl flex items-center justify-center mb-6 
                             group-hover:bg-bright-orange/30 transition-colors duration-300"
                >
                  <SafeIcon icon={benefit.icon} className="w-8 h-8 text-bright-orange" />
                </motion.div>
                
                <h3 className="text-xl font-bold text-charcoal mb-3 group-hover:text-bright-orange transition-colors">
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

      {/* Impact Section */}
      <section ref={impactRef} className="py-20 bg-gradient-to-br from-bright-orange to-electric-teal text-pure-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={impactRef ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">
              Branding Impact
            </h2>
            <p className="text-xl text-pure-white/80 max-w-3xl mx-auto">
              Measurable results from strategic brand development
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impact.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={impactInView ? { opacity: 1, scale: 1 } : {}}
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
                  {stat.number}
                </motion.div>
                <div className="text-pure-white/80 font-medium">{stat.label}</div>
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
              Ready to Build Your Brand?
            </h2>
            <p className="text-xl text-medium-gray mb-8 max-w-2xl mx-auto">
              Let's create a brand identity that captures your essence and drives business growth
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
                <span>Start Your Brand Journey</span>
                <SafeIcon icon={FiArrowRight} className="w-6 h-6" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default BrandingPage;