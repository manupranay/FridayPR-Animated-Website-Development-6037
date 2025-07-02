import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import useApi from '../hooks/useApi';
import LoadingSpinner from '../components/LoadingSpinner';

const { FiTarget, FiHeart, FiZap, FiUsers, FiAward, FiTrendingUp } = FiIcons;

const AboutPage = () => {
  const { data: aboutData, loading, error } = useApi('https://api.fridaypr.com/wp-json/wp/v2/pages?slug=about');
  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [valuesRef, valuesInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [founderRef, founderInView] = useInView({ threshold: 0.2, triggerOnce: true });

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

  const values = [
    {
      icon: FiTarget,
      title: 'Strategic Focus',
      description: 'We believe in data-driven strategies that deliver measurable results for our clients.'
    },
    {
      icon: FiHeart,
      title: 'Client-Centered',
      description: 'Your success is our success. We build lasting partnerships based on trust and transparency.'
    },
    {
      icon: FiZap,
      title: 'Innovation',
      description: 'We stay ahead of digital trends to provide cutting-edge solutions that keep you competitive.'
    },
    {
      icon: FiUsers,
      title: 'Collaboration',
      description: 'We work closely with you throughout the process, ensuring your vision comes to life.'
    },
    {
      icon: FiAward,
      title: 'Excellence',
      description: 'We maintain the highest standards in everything we do, from design to delivery.'
    },
    {
      icon: FiTrendingUp,
      title: 'Growth Mindset',
      description: 'We help businesses scale and adapt in the ever-evolving digital landscape.'
    }
  ];

  const stats = [
    { number: '5+', label: 'Years Experience' },
    { number: '50+', label: 'Happy Clients' },
    { number: '100+', label: 'Projects Done' },
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
      <section ref={heroRef} className="hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={itemVariants} className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-display font-bold text-charcoal">
                About <span className="text-electric-teal">FridayPR</span>
              </h1>
              <p className="text-xl text-charcoal/70 leading-relaxed">
                We're a creative web agency based in Montreal, specializing in web design, SEO, 
                and PR distribution services for small businesses and entrepreneurs.
              </p>
              <p className="text-lg text-charcoal/70 leading-relaxed">
                Our mission is to keep your business in front of people through clean builds, 
                impactful branding, and strategic visibility solutions.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <motion.div
                animate={{ rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="bg-charcoal/10 rounded-3xl p-8 backdrop-blur-sm"
              >
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      className="bg-pure-white/90 rounded-2xl p-6 text-center"
                    >
                      <div className="text-3xl font-bold text-electric-teal mb-2">{stat.number}</div>
                      <div className="text-sm text-charcoal">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-pure-white">
        <div className="max-w-4xl mx-auto px-6">
          {loading ? (
            <LoadingSpinner className="py-20" />
          ) : error ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h2 className="text-4xl font-display font-bold text-charcoal mb-8">Our Story</h2>
              <div className="prose max-w-none">
                <p className="text-lg text-charcoal/70 leading-relaxed mb-6">
                  Founded in Montreal, FridayPR emerged from a simple belief: every business deserves 
                  to have a strong digital presence that truly represents their vision and values.
                </p>
                <p className="text-lg text-charcoal/70 leading-relaxed mb-6">
                  We started as a small team of passionate designers and developers who saw too many 
                  great businesses struggling to make their mark online. Our founders combined their 
                  expertise in web design, SEO, and public relations to create a comprehensive solution 
                  for small businesses and entrepreneurs.
                </p>
                <p className="text-lg text-charcoal/70 leading-relaxed">
                  Today, we continue to focus on what matters most: building clean, impactful websites 
                  that drive real results, optimizing for search engines that bring qualified traffic, 
                  and creating PR strategies that keep our clients visible in their markets.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h2 className="text-4xl font-display font-bold text-charcoal mb-8">Our Story</h2>
              <div 
                className="prose max-w-none text-charcoal/70"
                dangerouslySetInnerHTML={{ 
                  __html: aboutData?.[0]?.content?.rendered || `
                    <p>Founded in Montreal, FridayPR emerged from a simple belief: every business deserves to have a strong digital presence that truly represents their vision and values.</p>
                  `
                }}
              />
            </motion.div>
          )}
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="py-20 bg-light-gray">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-charcoal mb-6">
              Our Values
            </h2>
            <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
              The principles that guide our work and define our relationships with clients
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={valuesInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -5, 
                  scale: 1.02,
                  rotateY: 5,
                  boxShadow: "0 25px 50px rgba(0, 212, 204, 0.15)"
                }}
                className="bg-pure-white rounded-3xl p-8 shadow-lg card-hover text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 bg-electric-teal/20 rounded-2xl flex items-center justify-center mx-auto mb-6 
                             group-hover:bg-electric-teal/30 transition-colors duration-300"
                >
                  <SafeIcon icon={value.icon} className="w-8 h-8 text-electric-teal" />
                </motion.div>
                <h3 className="text-xl font-bold text-charcoal mb-4 group-hover:text-electric-teal transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-charcoal/70 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Founder Section */}
      <section ref={founderRef} className="py-20 bg-pure-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-charcoal mb-6">
              Meet the Creative Mind
            </h2>
            <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
              The visionary behind FridayPR's innovative approach to digital marketing
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={founderInView ? "visible" : "hidden"}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                rotateY: 5,
                boxShadow: "0 30px 60px rgba(0, 212, 204, 0.15)"
              }}
              className="bg-gradient-to-r from-electric-teal/5 to-deep-purple/5 rounded-3xl overflow-hidden shadow-xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="h-64 lg:h-full bg-gradient-to-br from-electric-teal via-deep-purple to-bright-orange relative">
                  <motion.div
                    animate={{ 
                      opacity: [0.3, 0.7, 0.3],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute inset-0 bg-white/20 backdrop-blur-sm"
                  />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <motion.h3 
                    className="text-3xl font-bold text-charcoal mb-2"
                    whileHover={{ color: "#00D4CC" }}
                  >
                    Sarah Chen
                  </motion.h3>
                  <p className="text-electric-teal font-semibold mb-4 text-lg">Founder & Creative Director</p>
                  <p className="text-charcoal/70 leading-relaxed mb-6">
                    With over 5 years of experience in digital marketing and web design, Sarah founded 
                    FridayPR with a vision to help small businesses compete in the digital landscape. 
                    Her expertise spans across brand strategy, web development, and digital PR.
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm text-charcoal/60">
                      <span className="font-semibold">Specialties:</span> Brand Strategy, UX/UI Design, Digital Marketing
                    </p>
                    <p className="text-sm text-charcoal/60">
                      <span className="font-semibold">Education:</span> Digital Marketing Certification, Google Analytics
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
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
              Ready to work with us?
            </h2>
            <p className="text-xl text-medium-gray mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help your business achieve its digital goals
            </p>
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 15px 40px rgba(0, 212, 204, 0.4)",
                rotateX: 10
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-electric-teal text-charcoal px-10 py-5 rounded-full text-lg font-semibold 
                         hover:bg-opacity-90 transition-all duration-300 inline-flex items-center space-x-3"
            >
              <span>Start a Conversation</span>
              <SafeIcon icon={FiIcons.FiArrowRight} className="w-6 h-6" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default AboutPage;