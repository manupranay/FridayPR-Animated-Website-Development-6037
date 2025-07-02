import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiMail, FiPhone, FiMapPin, FiSend, FiCheck, FiAlertCircle } = FiIcons;

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: '', message: '' });

    try {
      const response = await fetch('https://api.fridaypr.com/wp-json/fluentform/v1/forms/1/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormStatus({
          type: 'success',
          message: 'Thank you for your message! We\'ll get back to you soon.'
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: 'Sorry, there was an error sending your message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
            className="text-5xl lg:text-6xl font-display font-bold text-navy-blue mb-6"
          >
            Get In <span className="text-light-gold">Touch</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-sage-green max-w-3xl mx-auto"
          >
            Ready to elevate your digital presence? Let's discuss how we can help 
            your business achieve its goals
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section ref={ref} className="py-20 bg-off-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16"
          >
            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-display font-bold text-navy-blue mb-8">
                Send us a message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="relative"
                >
                  <label htmlFor="name" className="block text-sm font-semibold text-navy-blue mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-4 border-2 border-sage-green/20 rounded-2xl 
                               focus:border-light-gold focus:outline-none transition-colors duration-300
                               bg-white text-navy-blue placeholder-sage-green"
                    placeholder="Enter your full name"
                  />
                </motion.div>

                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="relative"
                >
                  <label htmlFor="email" className="block text-sm font-semibold text-navy-blue mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-4 border-2 border-sage-green/20 rounded-2xl 
                               focus:border-light-gold focus:outline-none transition-colors duration-300
                               bg-white text-navy-blue placeholder-sage-green"
                    placeholder="Enter your email address"
                  />
                </motion.div>

                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="relative"
                >
                  <label htmlFor="message" className="block text-sm font-semibold text-navy-blue mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-6 py-4 border-2 border-sage-green/20 rounded-2xl 
                               focus:border-light-gold focus:outline-none transition-colors duration-300
                               bg-white text-navy-blue placeholder-sage-green resize-none"
                    placeholder="Tell us about your project..."
                  />
                </motion.div>

                {/* Form Status */}
                {formStatus.message && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center space-x-2 p-4 rounded-2xl ${
                      formStatus.type === 'success' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    <SafeIcon 
                      icon={formStatus.type === 'success' ? FiCheck : FiAlertCircle} 
                      className="w-5 h-5" 
                    />
                    <span>{formStatus.message}</span>
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 px-8 rounded-2xl font-semibold text-lg transition-all duration-300 
                              flex items-center justify-center space-x-3 ${
                    isSubmitting
                      ? 'bg-sage-green/50 text-off-white cursor-not-allowed'
                      : 'bg-light-gold text-navy-blue hover:bg-opacity-90 hover:shadow-lg'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-off-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <SafeIcon icon={FiSend} className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h2 className="text-3xl font-display font-bold text-navy-blue mb-8">
                  Let's connect
                </h2>
                <p className="text-lg text-sage-green mb-8">
                  We're here to help you succeed. Reach out to us through any of the 
                  following channels, and we'll get back to you as soon as possible.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                {[
                  {
                    icon: FiMail,
                    title: 'Email Us',
                    info: 'hello@fridaypr.com',
                    description: 'Send us an email anytime'
                  },
                  {
                    icon: FiPhone,
                    title: 'Call Us',
                    info: '+1 (514) 555-0123',
                    description: 'Mon-Fri from 9am to 6pm EST'
                  },
                  {
                    icon: FiMapPin,
                    title: 'Visit Us',
                    info: 'Montreal, Quebec',
                    description: 'Available for in-person meetings'
                  }
                ].map((contact, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5 }}
                    className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-lg card-hover"
                  >
                    <div className="w-12 h-12 bg-light-gold/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <SafeIcon icon={contact.icon} className="w-6 h-6 text-light-gold" />
                    </div>
                    <div>
                      <h3 className="font-bold text-navy-blue mb-1">{contact.title}</h3>
                      <p className="text-lg font-semibold text-light-gold mb-1">{contact.info}</p>
                      <p className="text-sm text-sage-green">{contact.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Business Hours */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-navy-blue text-off-white p-8 rounded-3xl"
              >
                <h3 className="text-xl font-bold mb-4">Business Hours</h3>
                <div className="space-y-2 text-sage-green">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
                <p className="text-sm text-sage-green/80 mt-4">
                  *Emergency support available 24/7 for existing clients
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-sage-green/10">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-display font-bold text-navy-blue mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-sage-green">
              Quick answers to common questions about our services
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                q: "How long does a typical project take?",
                a: "Project timelines vary based on scope and complexity. A standard website typically takes 2-4 weeks, while more complex projects may take 6-8 weeks."
              },
              {
                q: "Do you offer ongoing support after project completion?",
                a: "Yes! We provide ongoing maintenance, updates, and support packages to ensure your website continues to perform optimally."
              },
              {
                q: "What's included in your SEO services?",
                a: "Our SEO services include keyword research, on-page optimization, technical SEO, content strategy, and monthly performance reporting."
              },
              {
                q: "Can you help with existing websites?",
                a: "Absolutely! We can redesign, optimize, or enhance existing websites to improve performance and user experience."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-lg font-bold text-navy-blue mb-3">{faq.q}</h3>
                <p className="text-sage-green">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default ContactPage;