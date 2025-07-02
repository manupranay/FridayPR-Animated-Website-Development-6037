import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiMail, FiPhone, FiMapPin, FiLinkedin, FiTwitter, FiInstagram } = FiIcons;

const Footer = () => {
  return (
    <footer className="bg-charcoal text-pure-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="col-span-1 md:col-span-2"
          >
            <div className="text-3xl font-display font-bold mb-4">
              Friday<span className="text-electric-teal">PR</span>
            </div>
            <p className="text-medium-gray mb-6 max-w-md">
              We keep your business in front of people through strategic web design, 
              SEO optimization, and effective PR distribution.
            </p>
            <div className="flex space-x-4">
              {[FiLinkedin, FiTwitter, FiInstagram].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ 
                    scale: 1.2, 
                    y: -3,
                    rotate: [0, -10, 10, 0]
                  }}
                  transition={{ duration: 0.3 }}
                  className="text-medium-gray hover:text-bright-orange transition-colors duration-200"
                >
                  <SafeIcon icon={Icon} className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="font-semibold mb-4 text-electric-teal">Quick Links</h3>
            <ul className="space-y-2">
              {['Services', 'Portfolio', 'Projects', 'Blog', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className="text-medium-gray hover:text-pure-white transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-semibold mb-4 text-electric-teal">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiMapPin} className="w-4 h-4 text-bright-orange" />
                <span className="text-medium-gray text-sm">Montreal, QC</span>
              </div>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiMail} className="w-4 h-4 text-bright-orange" />
                <span className="text-medium-gray text-sm">hello@fridaypr.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiPhone} className="w-4 h-4 text-bright-orange" />
                <span className="text-medium-gray text-sm">+1 (514) 555-0123</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-medium-gray/20 mt-12 pt-8 text-center"
        >
          <p className="text-medium-gray text-sm">
            © 2024 FridayPR. All rights reserved. Built with care in Montreal.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;