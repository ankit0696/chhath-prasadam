// src/components/ui/PlaceholderImage.jsx
'use client';

import React, { useState } from 'react';

const PlaceholderImage = ({ 
  src, 
  alt, 
  className = '', 
  width, 
  height,
  fallbackIcon = '🪔',
  fallbackText = 'Image not available'
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // If image failed to load or no src provided, show placeholder
  if (!src || imageError) {
    return (
      <div 
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-dashed border-orange-200 ${className}`}
        style={{ width, height }}
      >
        <span className="text-4xl mb-2 opacity-70">
          {fallbackIcon}
        </span>
        <span className="text-xs text-gray-500 text-center px-2 leading-tight">
          {fallbackText}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {/* Loading placeholder */}
      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
          <span className="text-2xl opacity-50">🪔</span>
        </div>
      )}
      
      {/* Actual image */}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onError={handleImageError}
        onLoad={handleImageLoad}
        loading="lazy"
      />
    </div>
  );
};

export default PlaceholderImage;