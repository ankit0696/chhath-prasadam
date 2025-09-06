// src/components/products/ProductCard.jsx - Fixed Image Issues
'use client';

import React from 'react';
import Link from 'next/link';
import { formatCurrency } from '../../lib/utils';
import { Button } from '../ui/Button';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { getPlaceholderByCategory } from '../../lib/placeholderImage';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addToCart, isInCart, getItemQuantity, updateQuantity } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const handleAddToCart = () => {
    if (!user) {
      toast.error('Please login to add items to cart');
      router.push('/login');
      return;
    }

    if (!product.availability) {
      toast.error('This item is currently out of stock');
      return;
    }

    addToCart(product, 1);
  };

  const handleUpdateQuantity = (newQuantity) => {
    if (newQuantity <= 0) {
      return;
    }
    updateQuantity(product.id, newQuantity);
  };

  const handleImageError = (e) => {
    e.target.src = getPlaceholderByCategory(product.category);
  };

  const itemQuantity = getItemQuantity(product.id);
  const inCart = isInCart(product.id);

  if (!product) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
        <div className="h-48 bg-gray-300"></div>
        <div className="p-4">
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-3 bg-gray-300 rounded mb-2"></div>
          <div className="h-6 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Product Image */}
      <div className="relative h-48 bg-gray-200">
        <img
          src={product.imageURL || getPlaceholderByCategory(product.category)}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={handleImageError}
          loading="lazy"
        />
        
        {/* Category Badge */}
        {product.category && (
          <div className="absolute top-2 left-2">
            <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded-full">
              {product.category}
            </span>
          </div>
        )}

        {/* Availability Badge */}
        {!product.availability && (
          <div className="absolute top-2 right-2">
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
              Out of Stock
            </span>
          </div>
        )}

        {/* In Cart Badge */}
        {inCart && product.availability && (
          <div className="absolute top-2 right-2">
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
              In Cart ({itemQuantity})
            </span>
          </div>
        )}

        {/* Discount Badge */}
        {product.originalPrice && product.originalPrice > product.price && (
          <div className="absolute bottom-2 right-2">
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900">
              {formatCurrency(product.price)}
            </span>
            
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Stock Info */}
          {product.stock && product.stock < 10 && product.availability && (
            <span className="text-xs text-orange-600 font-medium">
              Only {product.stock} left!
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="space-y-2">
          {inCart ? (
            /* In Cart - Quantity Controls */
            <div className="flex items-center justify-between">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => handleUpdateQuantity(itemQuantity - 1)}
                  disabled={itemQuantity <= 1}
                  className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="text-lg">−</span>
                </button>
                <span className="px-3 py-2 font-semibold min-w-[3rem] text-center">
                  {itemQuantity}
                </span>
                <button
                  onClick={() => handleUpdateQuantity(itemQuantity + 1)}
                  disabled={itemQuantity >= product.stock}
                  className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="text-lg">+</span>
                </button>
              </div>
              
              <Link href="/cart">
                <Button variant="outline" className="text-sm">
                  View Cart
                </Button>
              </Link>
            </div>
          ) : (
            /* Not in Cart - Add to Cart Button */
            <div className="flex space-x-2">
              <Link 
                href={`/products/${product.id}`}
                className="flex-1"
              >
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </Link>
              
              {product.availability ? (
                <Button 
                  onClick={handleAddToCart}
                  className="flex-1"
                >
                  Add to Cart
                </Button>
              ) : (
                <Button 
                  disabled 
                  className="flex-1"
                >
                  Out of Stock
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Quick Add Options */}
        {product.availability && !inCart && user && (
          <div className="mt-3 flex justify-center">
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <button
                onClick={() => addToCart(product, 2)}
                className="hover:text-blue-600 hover:underline"
              >
                Add 2
              </button>
              <span>•</span>
              <button
                onClick={() => addToCart(product, 5)}
                className="hover:text-blue-600 hover:underline"
              >
                Add 5
              </button>
            </div>
          </div>
        )}

        {/* Product Features */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="text-xs text-gray-600 space-y-1">
            {product.category === 'Prasad Items' && (
              <p>✅ Traditional Recipe</p>
            )}
            {product.category === 'Special Boxes' && (
              <p>✅ Complete Set</p>
            )}
            {product.availability && (
              <p>✅ Fresh & Blessed</p>
            )}
            <p>✅ Authentic Quality</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;