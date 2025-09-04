// src/app/page.jsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';

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
              <h1 className="text-2xl font-bold text-gray-900">
                🙏 Chhath Prasadam Portal
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
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
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Authentic Chhath Puja Prasad
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Get blessed prasad from authentic Chhath Puja ceremonies delivered to your doorstep across India
          </p>
          
          {user ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
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
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
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

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🪔</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Authentic Prasad</h3>
              <p className="text-gray-600">
                Made following traditional Chhath Puja rituals and recipes
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Pan-India delivery ensuring prasad reaches you fresh and blessed
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🙏</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Blessed Items</h3>
              <p className="text-gray-600">
                Each prasad item is blessed during authentic Chhath ceremonies
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Chhath Prasadam Portal</h3>
            <p className="text-gray-400 mb-4">
              Bringing the blessings of Chhath Puja to your home
            </p>
            <p className="text-sm text-gray-500">
              © 2025 Chhath Prasadam Portal. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}