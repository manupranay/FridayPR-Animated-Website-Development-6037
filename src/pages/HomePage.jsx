import React from 'react';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import {useInView} from 'react-intersection-observer';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import ParallaxSection from '../components/ParallaxSection';
import FeaturedImage from '../components/FeaturedImage';
import usePortfolioWithImages from '../hooks/usePortfolioWithImages';
import useApiWithImages from '../hooks/useApiWithImages';
import LoadingSpinner from '../components/LoadingSpinner';
import { FaWordpress, FaReact, FaHtml5, FaCss3Alt } from 'react-icons/fa';
import { SiVite, SiFigma, SiWebflow, SiFramer, SiWix } from 'react-icons/si';

const {FiArrowRight,FiZap,FiTrendingUp,FiTarget,FiUsers,FiGlobe,FiPenTool,FiMegaphone,FiEye} = FiIcons;

const HomePage = () => {
  const {data: services, loading: servicesLoading} = useApiWithImages('https://api.fridaypr.com/wp-json/wp/v2/services');
  const {data: portfolio, loading: portfolioLoading} = usePortfolioWithImages('https://api.fridaypr.com/wp-json/wp/v2/portfolio');
  const {data: posts, loading: postsLoading} = useApiWithImages('https://api.fridaypr.com/wp-json/wp/v2/posts');

  const [heroRef, heroInView] = useInView({threshold: 0.3, triggerOnce: true});
  const [servicesRef, servicesInView] = useInView({threshold: 0.2, triggerOnce: true});
  const [portfolioRef, portfolioInView] = useInView({threshold: 0.2, triggerOnce: true});
  const [blogRef, blogInView] = useInView({threshold: 0.2, triggerOnce: true});
  const [toolsRef, toolsInView] = useInView({threshold: 0.2, triggerOnce: true});

  const containerVariants = {
    hidden: {opacity: 0},
    visible: {opacity: 1, transition: {staggerChildren: 0.2}}
  };

  const itemVariants = {
    hidden: {opacity: 0, y: 50},
    visible: {opacity: 1, y: 0, transition: {duration: 0.6, ease: "easeOut"}}
  };

  const tools = [
  { name: 'WordPress', icon: <FaWordpress /> },
  { name: 'React', icon: <FaReact /> },
  { name: 'Vite', icon: <SiVite /> },
  { name: 'Figma', icon: <SiFigma /> },
  { name: 'HTML5', icon: <FaHtml5 /> },
  { name: 'CSS3', icon: <FaCss3Alt /> },
  { name: 'Webflow', icon: <SiWebflow /> },
  { name: 'Framer', icon: <SiFramer /> },
  { name: 'Wix', icon: <SiWix /> },
];

  const mainServices = [
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

  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      className="overflow-hidden"
    >
      {/* Hero Section */}
      <ParallaxSection speed={0.3}>
        <section ref={heroRef} className="bg-gradient-hero min-h-screen flex items-center relative">
          <div className="max-w-7xl mx-auto px-6 py-20">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <motion.div variants={itemVariants} className="space-y-8">
                <motion.h1
                  className="text-5xl lg:text-7xl font-display font-bold text-charcoal leading-tight"
                  variants={itemVariants}
                >
                  We keep your business{' '}
                  <span className="text-gradient">in front of people</span>
                </motion.h1>

                <motion.p
                  className="text-xl text-charcoal/70 leading-relaxed max-w-2xl"
                  variants={itemVariants}
                >
                  FridayPR specializes in web design, SEO, and PR distribution services that help small businesses and entrepreneurs build impactful brands and strategic visibility.
                </motion.p>

                <motion.div className="flex flex-col sm:flex-row gap-4" variants={itemVariants}>
                  <Link to="/contact">
                    <motion.button
                      whileHover={{scale: 1.05, boxShadow: "0 10px 30px rgba(0,212,204,0.4)"}}
                      whileTap={{scale: 0.95}}
                      className="bg-electric-teal text-pure-white px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 relative overflow-hidden group"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-neon opacity-0 group-hover:opacity-20"
                        animate={{x: [-100, 100]}}
                        transition={{duration: 1.5, repeat: Infinity}}
                      />
                      <span>Start Your Project</span>
                      <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
                    </motion.button>
                  </Link>
                  <Link to="/portfolio">
                    <motion.button
                      whileHover={{scale: 1.05, borderColor: "#00D4CC"}}
                      whileTap={{scale: 0.95}}
                      className="border-2 border-electric-teal text-electric-teal px-8 py-4 rounded-full font-semibold hover:bg-electric-teal hover:text-pure-white transition-all duration-300"
                    >
                      View Our Work
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div variants={itemVariants} className="relative">
                <motion.div
                  animate={{y: [0, -10, 0]}}
                  transition={{duration: 4, repeat: Infinity, ease: "easeInOut"}}
                  className="bg-pure-white/60 rounded-3xl p-8 backdrop-blur-sm shadow-xl border border-medium-gray/20"
                >
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      {icon: FiGlobe, label: 'Web Design', color: 'text-electric-teal'},
                      {icon: FiTrendingUp, label: 'SEO Strategy', color: 'text-bright-orange'},
                      {icon: FiTarget, label: 'PR Distribution', color: 'text-deep-purple'},
                      {icon: FiUsers, label: 'Brand Building', color: 'text-electric-teal'}
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        whileHover={{scale: 1.1, rotate: [0, -5, 5, 0], transition: {duration: 0.3}}}
                        className="bg-pure-white rounded-2xl p-6 text-center card-hover shadow-lg"
                      >
                        <SafeIcon icon={item.icon} className={`w-8 h-8 mx-auto mb-2 ${item.color}`} />
                        <p className="font-semibold text-charcoal">{item.label}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </ParallaxSection>

      {/* Tools Section */}
      <section ref={toolsRef} className="py-16 bg-charcoal overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{opacity: 0, y: 30}}
            animate={toolsInView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.8}}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-display font-bold text-pure-white mb-4">
              Tools We <span className="text-electric-teal">Master</span>
            </h2>
            <p className="text-medium-gray">Technologies and platforms we use to create amazing experiences</p>
          </motion.div>

          <div className="relative">
            <motion.div
              animate={{x: [0, -1000]}}
              transition={{duration: 20, repeat: Infinity, ease: "linear"}}
              className="flex space-x-8 items-center whitespace-nowrap"
            >
              {[...tools, ...tools, ...tools].map((tool, index) => (
                <motion.div
                  key={index}
                  whileHover={{scale: 1.1, y: -5}}
                  className="flex items-center space-x-3 bg-pure-white/10 px-6 py-3 rounded-full backdrop-blur-sm min-w-max"
                >
                  <span className="text-2xl">{tool.icon}</span>
                  <span className="text-pure-white font-semibold">{tool.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-20 bg-pure-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={servicesInView ? "visible" : "hidden"}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-4xl lg:text-5xl font-display font-bold text-charcoal mb-6">
              Our Services
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-charcoal/70 max-w-3xl mx-auto">
              Comprehensive digital solutions designed to elevate your business presence and drive meaningful results
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={servicesInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {mainServices.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{y: -10, boxShadow: "0 25px 50px rgba(0,212,204,0.15)", scale: 1.02}}
                className="bg-pure-white rounded-3xl p-8 shadow-lg card-hover group border border-medium-gray/10"
              >
                <motion.div
                  whileHover={{scale: 1.2, rotate: [0, -10, 10, 0]}}
                  transition={{duration: 0.6}}
                  className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg transition-all duration-300`}
                >
                  <SafeIcon icon={service.icon} className="w-8 h-8 text-pure-white" />
                </motion.div>

                <h3 className="text-2xl font-bold text-charcoal mb-4 group-hover:text-electric-teal transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="text-charcoal/70 leading-relaxed mb-6">
                  {service.description}
                </p>

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
                    whileHover={{x: 5, scale: 1.05}}
                    className="flex items-center text-electric-teal font-semibold cursor-pointer group"
                  >
                    <span className="group-hover:text-bright-orange transition-colors">Learn More</span>
                    <motion.div whileHover={{x: 3}} className="ml-2">
                      <SafeIcon icon={FiArrowRight} className="w-4 h-4 group-hover:text-bright-orange transition-colors" />
                    </motion.div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={servicesInView ? {opacity: 1, y: 0} : {}}
            transition={{delay: 0.6}}
            className="text-center mt-12"
          >
            <Link to="/services">
              <motion.button
                whileHover={{scale: 1.05, boxShadow: "0 15px 30px rgba(0,212,204,0.3)"}}
                whileTap={{scale: 0.95}}
                className="bg-gradient-primary text-pure-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 inline-flex items-center space-x-2"
              >
                <span>View All Services</span>
                <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Highlights */}
      <section ref={portfolioRef} className="py-20 bg-light-gray">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={portfolioInView ? "visible" : "hidden"}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-4xl lg:text-5xl font-display font-bold text-charcoal mb-6">
              Featured Work
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-charcoal/70 max-w-3xl mx-auto">
              Discover how we've helped businesses achieve their digital goals
            </motion.p>
          </motion.div>

          {portfolioLoading ? (
            <LoadingSpinner className="py-20" />
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={portfolioInView ? "visible" : "hidden"}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {portfolio?.slice(0, 3).map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  whileHover={{scale: 1.02, rotateY: 5, boxShadow: "0 25px 50px rgba(0,212,204,0.15)"}}
                  className="bg-pure-white rounded-3xl overflow-hidden shadow-lg card-hover border border-medium-gray/20 group"
                >
                  <div className="relative">
                    <FeaturedImage
                      imageUrl={project.projectImageUrl}
                      alt={project.title?.rendered}
                      className="h-48"
                      showOverlay={true}
                      overlayOpacity={0.1}
                    />
                    
                    {/* Hover overlay with View Details button */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Link to={`/portfolio/${project.slug || project.id}`}>
                        <motion.button
                          whileHover={{scale: 1.1}}
                          whileTap={{scale: 0.95}}
                          className="bg-electric-teal text-pure-white px-4 py-2 rounded-full font-semibold inline-flex items-center space-x-2"
                        >
                          <SafeIcon icon={FiEye} className="w-4 h-4" />
                          <span>View Details</span>
                        </motion.button>
                      </Link>
                    </div>
                  </div>

                  <div className="p-6">
                    <Link to={`/portfolio/${project.slug || project.id}`}>
                      <h3 className="text-xl font-bold text-charcoal mb-2 hover:text-electric-teal transition-colors">
                        {project.title?.rendered}
                      </h3>
                    </Link>
                    <p className="text-electric-teal mb-4 font-semibold">
                      Client: {project.acf?.client_name || 'Confidential'}
                    </p>
                    <p className="text-sm text-charcoal/60">
                      Tools: {project.acf?.tools_used || 'Various technologies'}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={portfolioInView ? {opacity: 1, y: 0} : {}}
            transition={{delay: 0.6}}
            className="text-center mt-12"
          >
            <Link to="/portfolio">
              <motion.button
                whileHover={{scale: 1.05, boxShadow: "0 15px 30px rgba(255,107,53,0.3)"}}
                whileTap={{scale: 0.95}}
                className="bg-bright-orange text-pure-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 inline-flex items-center space-x-2"
              >
                <span>View Full Portfolio</span>
                <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section ref={blogRef} className="py-20 bg-pure-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={blogInView ? "visible" : "hidden"}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-4xl lg:text-5xl font-display font-bold text-charcoal mb-6">
              Latest Insights
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-charcoal/70 max-w-3xl mx-auto">
              Stay updated with the latest trends in digital marketing and web design
            </motion.p>
          </motion.div>

          {postsLoading ? (
            <LoadingSpinner className="py-20" />
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={blogInView ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {posts?.slice(0, 3).map((post, index) => (
                <motion.div
                  key={post.id}
                  variants={itemVariants}
                  whileHover={{y: -5, boxShadow: "0 20px 40px rgba(108,99,255,0.15)"}}
                  className="bg-pure-white rounded-3xl overflow-hidden shadow-lg card-hover"
                >
                  <FeaturedImage
                    imageUrl={post.featuredImageUrl}
                    alt={post.title?.rendered}
                    className="h-48"
                    showOverlay={true}
                    overlayOpacity={0.1}
                  />

                  <div className="p-6">
                    <Link to={`/blog/${post.slug || post.id}`}>
                      <h3 className="text-lg font-bold text-charcoal mb-3 line-clamp-2 hover:text-deep-purple transition-colors">
                        {post.title?.rendered}
                      </h3>
                    </Link>
                    <div 
                      className="text-charcoal/70 text-sm line-clamp-3"
                      dangerouslySetInnerHTML={{
                        __html: post.excerpt?.rendered?.replace(/<[^>]*>/g, '')
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={blogInView ? {opacity: 1, y: 0} : {}}
            transition={{delay: 0.6}}
            className="text-center mt-12"
          >
            <Link to="/blog">
              <motion.button
                whileHover={{scale: 1.05, boxShadow: "0 15px 30px rgba(108,99,255,0.3)"}}
                whileTap={{scale: 0.95}}
                className="bg-deep-purple text-pure-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 inline-flex items-center space-x-2"
              >
                <span>Read More Articles</span>
                <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <ParallaxSection speed={0.2}>
        <section className="py-20 bg-charcoal text-pure-white relative overflow-hidden">
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
              initial={{opacity: 0, y: 50}}
              whileInView={{opacity: 1, y: 0}}
              transition={{duration: 0.8}}
              viewport={{once: true}}
            >
              <motion.h2
                className="text-4xl lg:text-5xl font-display font-bold mb-6"
                whileInView={{opacity: 1}}
                transition={{duration: 0.8}}
                viewport={{once: true}}
              >
                Ready to elevate your{' '}
                <span className="bg-gradient-to-r from-electric-teal to-bright-orange bg-clip-text text-transparent">
                  digital presence?
                </span>
              </motion.h2>

              <motion.p
                className="text-xl text-medium-gray mb-8 max-w-2xl mx-auto"
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.8, delay: 0.2}}
                viewport={{once: true}}
              >
                Let's discuss how we can help your business stand out in the digital landscape
              </motion.p>

              <Link to="/contact">
                <motion.button
                  whileHover={{scale: 1.05, boxShadow: "0 15px 40px rgba(0,212,204,0.4)"}}
                  whileTap={{scale: 0.95}}
                  className="bg-electric-teal text-charcoal px-10 py-5 rounded-full text-lg font-semibold hover:bg-electric-teal transition-all duration-300 inline-flex items-center space-x-3 shadow-xl relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-white/10"
                    animate={{x: [-100, 100]}}
                    transition={{duration: 2, repeat: Infinity}}
                  />
                  <span className="relative z-10">Get Started Today</span>
                  <SafeIcon icon={FiArrowRight} className="w-6 h-6 relative z-10" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>
      </ParallaxSection>
    </motion.div>
  );
};

export default HomePage;