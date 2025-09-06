// src/app/page.jsx - Updated Home Page with New Navigation
'use client';

import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import ProductList from '../components/products/ProductList';
import Layout from '../components/layout/Layout';

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-50 to-yellow-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Authentic Chhath Puja Prasad
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Get blessed prasad from authentic Chhath Puja ceremonies delivered to your doorstep across India
          </p>
          
          {user ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                Welcome back! 🎉
              </h3>
              <p className="text-green-700">
                You are logged in with phone number: <strong>{user.phoneNumber}</strong>
              </p>
              <p className="text-green-700 mt-2">
                Ready to order authentic Chhath prasad for your family!
              </p>
            </div>
          ) : (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                Get Started Today
              </h3>
              <p className="text-blue-700 mb-4">
                Login with your phone number to start ordering authentic Chhath prasad
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Prasad Items
            </h2>
            <p className="text-lg text-gray-600">
              Handpicked authentic prasad items for your Chhath Puja celebrations
            </p>
          </div>

          {/* Featured Products List - Limited to 8 items */}
          <ProductList limit={8} />
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🪔</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Authentic Prasad</h3>
              <p className="text-gray-600">
                Made following traditional Chhath Puja rituals and recipes passed down through generations
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Pan-India delivery ensuring prasad reaches you fresh and blessed for your celebrations
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🙏</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Blessed Items</h3>
              <p className="text-gray-600">
                Each prasad item is blessed during authentic Chhath ceremonies by experienced priests
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Shopping Benefits */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Why Shop With Us?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">🛒</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Online Shopping</h3>
              <p className="text-gray-700">
                Browse our complete catalog, add items to cart, and checkout with ease. 
                Your cart is saved even if you log out.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Free Delivery Over ₹500</h3>
              <p className="text-gray-700">
                Enjoy free delivery on orders above ₹500. Below that, only ₹50 delivery charges 
                to anywhere in India.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Shopping</h3>
              <p className="text-gray-700">
                Your personal information and payment details are completely secure with 
                end-to-end encryption.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Mobile Friendly</h3>
              <p className="text-gray-700">
                Shop on the go with our mobile-optimized platform. Perfect for busy 
                Indian families preparing for festivals.
              </p>
            </div>
          </div>

          <div className="flex justify-center items-center space-x-8 text-gray-600">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">5000+</div>
              <div className="text-sm">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">50+</div>
              <div className="text-sm">Cities Served</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">100%</div>
              <div className="text-sm">Authentic Products</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">24/7</div>
              <div className="text-sm">Customer Support</div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}