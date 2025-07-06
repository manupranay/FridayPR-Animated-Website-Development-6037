import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiMenu, FiX } = FiIcons;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      
      if (currentScrollY > prevScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollY]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const WaveText = ({ text, isHovered }) => {
    return (
      <span className="inline-block">
        {text.split('').map((char, index) => (
          <motion.span
            key={index}
            animate={isHovered ? {
              y: [0, -8, 0],
              transition: {
                duration: 0.6,
                delay: index * 0.1,
                repeat: Infinity,
                repeatType: 'reverse'
              }
            } : { y: 0 }}
            className="inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </span>
    );
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ 
        y: isVisible ? 0 : -100,
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0)'
      }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-md ${
        isScrolled ? 'shadow-lg border-b border-medium-gray' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/">
          <motion.div
            whileHover={{ 
              scale: 1.05,
              rotateY: 10,
            }}
            className="text-2xl font-display font-bold text-charcoal"
          >
            Friday<span className="text-electric-teal">PR</span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <Link key={item.path} to={item.path}>
              <motion.div
                onHoverStart={() => setHoveredItem(index)}
                onHoverEnd={() => setHoveredItem(null)}
                className={`relative font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'text-electric-teal'
                    : 'text-charcoal hover:text-electric-teal'
                }`}
              >
                <WaveText text={item.name} isHovered={hoveredItem === index} />
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-bright-orange"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.div>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          whileHover={{ rotate: 90, scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-charcoal"
        >
          <SafeIcon 
            icon={isMenuOpen ? FiX : FiMenu} 
            className="w-6 h-6" 
          />
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      <motion.nav
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isMenuOpen ? 1 : 0, 
          height: isMenuOpen ? 'auto' : 0 
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-pure-white/95 backdrop-blur-md mt-4 rounded-lg shadow-xl"
      >
        <div className="px-4 py-4 space-y-4">
          {navItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ x: -20, opacity: 0 }}
              animate={{ 
                x: isMenuOpen ? 0 : -20, 
                opacity: isMenuOpen ? 1 : 0 
              }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'text-electric-teal'
                    : 'text-charcoal hover:text-electric-teal'
                }`}
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.nav>
    </motion.header>
  );
};

export default Header;