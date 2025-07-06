import React from 'react';
import {motion} from 'framer-motion';
import {useInView} from 'react-intersection-observer';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const {FiMail,FiPhone,FiMapPin,FiCalendar,FiClock,FiUsers} = FiIcons;

const ContactPage = () => {
  const [ref, inView] = useInView({threshold: 0.1, triggerOnce: true});

  const containerVariants = {
    hidden: {opacity: 0},
    visible: {opacity: 1, transition: {staggerChildren: 0.2}}
  };

  const itemVariants = {
    hidden: {opacity: 0, y: 50},
    visible: {opacity: 1, y: 0, transition: {duration: 0.6, ease: "easeOut"}}
  };

  // Load TidyCal script
  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://asset-tidycal.b-cdn.net/js/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      const existingScript = document.querySelector('script[src="https://asset-tidycal.b-cdn.net/js/embed.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      className="pt-24"
    >
      {/* Hero Section */}
      <section className="hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{opacity: 0, y: 30}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8}}
            className="text-5xl lg:text-6xl font-display font-bold text-charcoal mb-6"
          >
            Get In <span className="text-electric-teal">Touch</span>
          </motion.h1>
          <motion.p
            initial={{opacity: 0, y: 30}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8, delay: 0.2}}
            className="text-xl text-charcoal/70 max-w-3xl mx-auto"
          >
            Ready to elevate your digital presence? Let's discuss how we can help your business achieve its goals
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section ref={ref} className="py-20 bg-pure-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16"
          >
            {/* Booking Section */}
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-display font-bold text-charcoal mb-8">
                Ready to Talk?
              </h2>
              <div className="bg-gradient-to-br from-electric-teal/5 to-deep-purple/5 rounded-3xl p-8 mb-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-electric-teal/20 rounded-2xl flex items-center justify-center mr-4">
                    <SafeIcon icon={FiCalendar} className="w-6 h-6 text-electric-teal" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-charcoal">60-Minute Discovery Meeting</h3>
                    <p className="text-charcoal/70">Let's discuss your project goals and vision</p>
                  </div>
                </div>
                
                <p className="text-lg text-charcoal/80 leading-relaxed mb-6">
                  Skip the inbox clutter — book a 60-minute discovery meeting directly on our calendar.
                </p>

                <div className="flex items-center space-x-4 text-sm text-charcoal/70 mb-6">
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiClock} className="w-4 h-4 text-electric-teal" />
                    <span>60 minutes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiUsers} className="w-4 h-4 text-electric-teal" />
                    <span>Virtual meeting</span>
                  </div>
                </div>

                <div className="bg-pure-white rounded-2xl p-6 shadow-lg">
                  <h4 className="font-bold text-charcoal mb-4 flex items-center">
                    <span className="text-2xl mr-2">👉</span>
                    Book a Call Now
                  </h4>
                  
                  {/* TidyCal Embed */}
                  <div 
                    className="tidycal-embed" 
                    data-path="fridaypr/discovery"
                    style={{minHeight: '600px'}}
                  ></div>
                </div>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h2 className="text-3xl font-display font-bold text-charcoal mb-8">
                  Let's connect
                </h2>
                <p className="text-lg text-charcoal/70 mb-8">
                  We're here to help you succeed. Reach out to us through any of the following channels, and we'll get back to you as soon as possible.
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
                    whileHover={{x: 5}}
                    className="flex items-start space-x-4 p-6 bg-light-gray rounded-2xl shadow-lg card-hover"
                  >
                    <div className="w-12 h-12 bg-electric-teal/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <SafeIcon icon={contact.icon} className="w-6 h-6 text-electric-teal" />
                    </div>
                    <div>
                      <h3 className="font-bold text-charcoal mb-1">{contact.title}</h3>
                      <p className="text-lg font-semibold text-electric-teal mb-1">{contact.info}</p>
                      <p className="text-sm text-charcoal/70">{contact.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Business Hours */}
              <motion.div
                whileHover={{scale: 1.02}}
                className="bg-charcoal text-pure-white p-8 rounded-3xl"
              >
                <h3 className="text-xl font-bold mb-4">Business Hours</h3>
                <div className="space-y-2 text-medium-gray">
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
                <p className="text-sm text-medium-gray mt-4">
                  *Emergency support available 24/7 for existing clients
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-20 bg-light-gray">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{opacity: 0, y: 30}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.8}}
            viewport={{once: true}}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-charcoal mb-6">
              What to Expect in Our Discovery Call
            </h2>
            <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
              Here's what we'll cover during our 60-minute conversation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Your Vision',
                description: 'We\'ll discuss your business goals, target audience, and project vision.',
                icon: '🎯'
              },
              {
                step: '02',
                title: 'Current Challenges',
                description: 'Identify pain points and opportunities for improvement in your digital presence.',
                icon: '🔍'
              },
              {
                step: '03',
                title: 'Solution Strategy',
                description: 'We\'ll outline potential solutions and strategies tailored to your needs.',
                icon: '💡'
              },
              {
                step: '04',
                title: 'Next Steps',
                description: 'Clear action items and timeline for moving forward with your project.',
                icon: '🚀'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{opacity: 0, y: 30}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.6, delay: index * 0.1}}
                viewport={{once: true}}
                whileHover={{y: -5, scale: 1.02}}
                className="bg-pure-white rounded-3xl p-8 text-center shadow-lg border border-medium-gray/10"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <div className="text-2xl font-bold text-electric-teal mb-2">{item.step}</div>
                <h3 className="text-xl font-bold text-charcoal mb-3">{item.title}</h3>
                <p className="text-charcoal/70">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-pure-white">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{opacity: 0, y: 30}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.8}}
            viewport={{once: true}}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-display font-bold text-charcoal mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-charcoal/70">
              Quick answers to common questions about our discovery calls
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                q: "What if I'm not ready to start a project immediately?",
                a: "No problem! Our discovery calls are designed to help you understand your options and plan for the future. There's no pressure to start immediately."
              },
              {
                q: "Do I need to prepare anything for the call?",
                a: "Just come with your ideas and questions! If you have existing materials (website, branding, etc.), feel free to share them, but it's not required."
              },
              {
                q: "Is there any cost for the discovery call?",
                a: "The discovery call is completely free. It's our way of getting to know you and understanding how we can best help your business."
              },
              {
                q: "What happens after our discovery call?",
                a: "We'll send you a detailed proposal with recommendations, timeline, and pricing. You can take time to review and decide what works best for you."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.6, delay: index * 0.1}}
                viewport={{once: true}}
                className="bg-light-gray rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-lg font-bold text-charcoal mb-3">{faq.q}</h3>
                <p className="text-charcoal/70">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default ContactPage;