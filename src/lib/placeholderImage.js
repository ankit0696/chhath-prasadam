// src/lib/placeholderImage.js - Fixed Unicode Issue
// Generate SVG-based placeholder images to avoid 404 errors

// Unicode-safe Base64 encoding function
function toBase64Unicode(str) {
  try {
    // First encode to UTF-8, then to binary string (Latin1-safe)
    const utf8 = unescape(encodeURIComponent(str));
    return btoa(utf8);
  } catch (error) {
    console.warn('Base64 encoding fallback used:', error.message);
    // Fallback: remove emojis and special characters
    const cleanStr = str.replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '');
    return btoa(cleanStr);
  }
}

export const generatePlaceholderSVG = (width = 400, height = 400, text = 'Chhath Prasad', icon = 'Prasad') => {
  // Use text-based icons instead of emojis to avoid Unicode issues
  const iconMap = {
    'Prasad': 'Om',
    'Sweets': 'Sweet',
    'Fruits': 'Fruit', 
    'Flowers': 'Flower',
    'Puja': 'Diya',
    'Box': 'Gift'
  };
  
  const displayIcon = iconMap[icon] || 'Item';
  
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#FEF3C7;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#F59E0B;stop-opacity:0.3" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" />
      <rect x="2" y="2" width="${width-4}" height="${height-4}" fill="none" stroke="#F59E0B" stroke-width="2" stroke-dasharray="10,5" opacity="0.5"/>
      <text x="50%" y="40%" font-family="Arial, sans-serif" font-size="${Math.min(width, height) * 0.12}" text-anchor="middle" fill="#92400E" opacity="0.8" font-weight="bold">${displayIcon}</text>
      <text x="50%" y="60%" font-family="Arial, sans-serif" font-size="${Math.min(width, height) * 0.08}" text-anchor="middle" fill="#92400E" opacity="0.8">${text}</text>
      <text x="50%" y="70%" font-family="Arial, sans-serif" font-size="${Math.min(width, height) * 0.06}" text-anchor="middle" fill="#92400E" opacity="0.6">Authentic Prasad</text>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${toBase64Unicode(svg)}`;
};

// Common placeholder images for different use cases
export const placeholderImages = {
  product: generatePlaceholderSVG(400, 400, 'Prasad Item', 'Prasad'),
  productCard: generatePlaceholderSVG(300, 300, 'Prasad', 'Prasad'),
  productThumbnail: generatePlaceholderSVG(80, 80, '', 'Prasad'),
  thekua: generatePlaceholderSVG(400, 400, 'Traditional Thekua', 'Sweets'),
  kheer: generatePlaceholderSVG(400, 400, 'Rice Kheer', 'Sweets'),
  fruits: generatePlaceholderSVG(400, 400, 'Fresh Fruits', 'Fruits'),
  flowers: generatePlaceholderSVG(400, 400, 'Flowers', 'Flowers'),
  pujaItems: generatePlaceholderSVG(400, 400, 'Puja Items', 'Puja'),
  specialBox: generatePlaceholderSVG(400, 400, 'Complete Box', 'Box')
};

// Get placeholder based on category
export const getPlaceholderByCategory = (category) => {
  const categoryMap = {
    'Prasad Items': placeholderImages.product,
    'Sweets': placeholderImages.thekua,
    'Fruits': placeholderImages.fruits,
    'Flowers': placeholderImages.flowers,
    'Puja Items': placeholderImages.pujaItems,
    'Special Boxes': placeholderImages.specialBox
  };
  
  return categoryMap[category] || placeholderImages.product;
};

// Enhanced image component with better error handling
export const createImageWithFallback = (src, alt, category = 'Prasad Items') => {
  return {
    src: src || getPlaceholderByCategory(category),
    alt: alt || 'Chhath Prasad Item',
    onError: (e) => {
      e.target.src = getPlaceholderByCategory(category);
    }
  };
};