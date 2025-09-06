// src/app/products/page.jsx - Updated Products Page with New Navigation
'use client';

import React from 'react';
import ProductList from '../../components/products/ProductList';
import Layout from '../../components/layout/Layout';

export default function ProductsPage() {
  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <a href="/" className="text-gray-700 hover:text-gray-900">
                  Home
                </a>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="text-gray-500">Products</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Authentic Chhath Prasad Collection
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our complete range of traditional prasad items, blessed sweets, 
            and puja essentials for your Chhath celebrations
          </p>
        </div>
      </div>

      {/* Products Section */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto">
          <ProductList />
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Why Choose Our Prasad?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-left">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <span className="text-orange-600 mr-2">✓</span>
                Traditional Preparation
              </h3>
              <p className="text-gray-600">
                All our prasad items are prepared following authentic traditional methods 
                and recipes that have been passed down through generations.
              </p>
            </div>
            
            <div className="text-left">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <span className="text-orange-600 mr-2">✓</span>
                Fresh & Blessed
              </h3>
              <p className="text-gray-600">
                Every item is freshly prepared and blessed during authentic Chhath Puja 
                ceremonies by experienced priests in Bihar.
              </p>
            </div>
            
            <div className="text-left">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <span className="text-orange-600 mr-2">✓</span>
                Pan-India Delivery
              </h3>
              <p className="text-gray-600">
                We deliver across all major cities in India with secure packaging 
                to ensure your prasad reaches you in perfect condition.
              </p>
            </div>
            
            <div className="text-left">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <span className="text-orange-600 mr-2">✓</span>
                Quality Guaranteed
              </h3>
              <p className="text-gray-600">
                We use only the finest ingredients and maintain the highest standards 
                of hygiene and quality in all our preparations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}