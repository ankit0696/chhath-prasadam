// src/app/page.jsx - Updated Home Page with Products
'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import ProductList from '../components/products/ProductList';

export default function Home() {
  const { user, logout, loading } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/">
                <h1 className="text-2xl font-bold text-gray-900 cursor-pointer">
                  🙏 Chhath Prasadam Portal
                </h1>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link href="/products">
                <Button variant="outline">All Products</Button>
              </Link>
              
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    Welcome, {user.phoneNumber}
                  </span>
                  <Button variant="outline" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <Link href="/login">
                  <Button>Login</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

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
              <Link href="/login">
                <Button size="lg">
                  Login with Phone Number
                </Button>
              </Link>
            </div>
          )}

          {/* CTA Button */}
          <div className="mt-8">
            <Link href="/products">
              <Button size="lg" className="text-lg px-8 py-4">
                Shop Prasad Items
              </Button>
            </Link>
          </div>
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

          {/* View All Link */}
          <div className="text-center mt-12">
            <Link href="/products">
              <Button variant="outline" size="lg">
                View All Products
              </Button>
            </Link>
          </div>
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

      {/* Testimonials or Trust Indicators */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Trusted by Thousands of Families
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700 mb-4">
                "The prasad arrived fresh and on time for Chhath Puja. My family was very happy with the quality and authenticity."
              </p>
              <p className="text-sm text-gray-600">- Priya S., Delhi</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700 mb-4">
                "Excellent service! The prasad box had everything we needed for our Chhath celebration. Highly recommended."
              </p>
              <p className="text-sm text-gray-600">- Rajesh K., Mumbai</p>
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
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Chhath Prasadam Portal</h3>
              <p className="text-gray-400 text-sm">
                Bringing the blessings of Chhath Puja to your home with authentic prasad delivery across India.
              </p>
            </div>
            
            <div>
              <h4 className="text-md font-semibold mb-4">Quick Links</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><Link href="/products" className="hover:text-white">All Products</Link></li>
                <li><Link href="/categories" className="hover:text-white">Categories</Link></li>
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-md font-semibold mb-4">Categories</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>Prasad Items</li>
                <li>Traditional Sweets</li>
                <li>Fresh Fruits</li>
                <li>Puja Essentials</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-md font-semibold mb-4">Support</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>Help Center</li>
                <li>Shipping Info</li>
                <li>Returns</li>
                <li>Track Order</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-sm text-gray-400">
              © 2025 Chhath Prasadam Portal. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}