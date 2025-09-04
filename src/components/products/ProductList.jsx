// src/components/products/ProductList.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { productOperations } from '../../lib/firestore';
import ProductCard from './ProductCard';
import { Button } from '../ui/Button';
import toast from 'react-hot-toast';

const ProductList = ({ category = null, limit = null }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(category);

  // Categories for filtering
  const categories = [
    'All',
    'Prasad Items',
    'Sweets',
    'Fruits',
    'Flowers',
    'Puja Items',
    'Special Boxes'
  ];

  useEffect(() => {
    loadProducts();
  }, [selectedCategory]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      let fetchedProducts;
      if (selectedCategory && selectedCategory !== 'All') {
        fetchedProducts = await productOperations.getProductsByCategory(selectedCategory);
      } else {
        fetchedProducts = await productOperations.getAllProducts();
      }

      // Apply limit if specified
      if (limit) {
        fetchedProducts = fetchedProducts.slice(0, limit);
      }

      setProducts(fetchedProducts);
    } catch (err) {
      console.error('Error loading products:', err);
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    // This will be implemented in Day 3 with cart functionality
    toast.success(`${product.name} added to cart!`);
  };

  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory === 'All' ? null : newCategory);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4">
        {/* Loading skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-300"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 rounded mb-2"></div>
                <div className="h-6 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4">
        <div className="text-center py-12">
          <div className="text-red-500 mb-4">
            <span className="text-4xl">❌</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={loadProducts}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                (selectedCategory === cat) || (cat === 'All' && !selectedCategory)
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <span className="text-6xl">🪔</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No products found
          </h3>
          <p className="text-gray-600 mb-4">
            {selectedCategory 
              ? `No products available in "${selectedCategory}" category.`
              : 'No products are currently available.'
            }
          </p>
          {selectedCategory && (
            <Button onClick={() => handleCategoryChange('All')}>
              View All Products
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;