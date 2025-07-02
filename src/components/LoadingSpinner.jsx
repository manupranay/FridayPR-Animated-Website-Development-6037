import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ className = '' }) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="loading-spinner"
      />
    </div>
  );
};

export default LoadingSpinner;