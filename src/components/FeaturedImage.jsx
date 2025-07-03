import React from 'react';
import { motion } from 'framer-motion';

const FeaturedImage = ({ 
  imageUrl, 
  alt, 
  className = '', 
  overlayOpacity = 0.2,
  showOverlay = false,
  children,
  ...props 
}) => {
  const isGradient = imageUrl?.type === 'gradient';
  
  if (isGradient) {
    return (
      <div 
        className={`relative overflow-hidden ${className}`}
        style={{ background: imageUrl.gradient }}
        {...props}
      >
        {showOverlay && (
          <div 
            className="absolute inset-0 bg-black transition-opacity duration-300"
            style={{ opacity: overlayOpacity }}
          />
        )}
        {children && (
          <div className="absolute inset-0 flex items-center justify-center">
            {children}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`} {...props}>
      <motion.img
        src={imageUrl}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
        onError={(e) => {
          // Fallback to gradient if image fails to load
          e.target.style.display = 'none';
          e.target.parentElement.style.background = 'linear-gradient(135deg, #00D4CC 0%, #6C63FF 100%)';
        }}
      />
      {showOverlay && (
        <div 
          className="absolute inset-0 bg-black transition-opacity duration-300"
          style={{ opacity: overlayOpacity }}
        />
      )}
      {children && (
        <div className="absolute inset-0">
          {children}
        </div>
      )}
    </div>
  );
};

export default FeaturedImage;