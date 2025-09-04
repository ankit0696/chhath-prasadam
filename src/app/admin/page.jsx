// src/app/admin/page.jsx - Admin/Testing Page
'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/Button';
import DataManager from '../../components/admin/DataManager';
import FirebaseTest from '../../components/FirebaseTest';

export default function AdminPage() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

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
                <Button variant="outline">Products</Button>
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

      {/* Page Content */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🔧 Admin & Testing Panel
            </h1>
            <p className="text-lg text-gray-600">
              Manage your Chhath Prasadam Portal database and test functionality
            </p>
            <div className="mt-6">
              <Link href="/">
                <Button variant="outline" className="mr-4">
                  ← Back to Home
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="outline">
                  View Products
                </Button>
              </Link>
            </div>
          </div>

          <div className="space-y-12">
            {/* Firebase Connection Test */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Firebase Connection Status
              </h2>
              <FirebaseTest />
            </section>

            {/* Data Management */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Database Management
              </h2>
              <DataManager />
            </section>

            {/* Development Info */}
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                🚀 Day 2 Development Status
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">✅ Completed Features</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center">
                      <span className="text-green-600 mr-2">✓</span>
                      Firestore database setup
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-600 mr-2">✓</span>
                      Product data model with categories
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-600 mr-2">✓</span>
                      Product listing with filtering
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-600 mr-2">✓</span>
                      Product detail pages
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-600 mr-2">✓</span>
                      Sample data management
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-600 mr-2">✓</span>
                      Security rules configuration
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-600 mr-2">✓</span>
                      Responsive UI components
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">🔜 Coming in Day 3</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center">
                      <span className="text-orange-600 mr-2">○</span>
                      Shopping cart functionality
                    </li>
                    <li className="flex items-center">
                      <span className="text-orange-600 mr-2">○</span>
                      Add to cart operations
                    </li>
                    <li className="flex items-center">
                      <span className="text-orange-600 mr-2">○</span>
                      Cart persistence
                    </li>
                    <li className="flex items-center">
                      <span className="text-orange-600 mr-2">○</span>
                      Checkout flow
                    </li>
                    <li className="flex items-center">
                      <span className="text-orange-600 mr-2">○</span>
                      User profiles
                    </li>
                    <li className="flex items-center">
                      <span className="text-orange-600 mr-2">○</span>
                      Order management
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">💡 Testing Tips</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• First, add sample data using the Database Management section above</li>
                  <li>• Test product browsing on the home page and products page</li>
                  <li>• Click on individual products to test detail pages</li>
                  <li>• Try category filtering to ensure it works properly</li>
                  <li>• Check mobile responsiveness on different screen sizes</li>
                  <li>• Test authentication flow before accessing cart features</li>
                </ul>
              </div>
            </section>

            {/* Quick Links */}
            <section className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                🔗 Quick Navigation
              </h2>
              
              <div className="grid md:grid-cols-4 gap-4">
                <Link href="/" className="text-center">
                  <Button variant="outline" className="w-full">
                    🏠 Home
                  </Button>
                </Link>
                
                <Link href="/products" className="text-center">
                  <Button variant="outline" className="w-full">
                    📦 Products
                  </Button>
                </Link>
                
                <Link href="/login" className="text-center">
                  <Button variant="outline" className="w-full">
                    🔐 Login
                  </Button>
                </Link>
                
                <a 
                  href="https://console.firebase.google.com/project/chhath-prasadam" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-center"
                >
                  <Button variant="outline" className="w-full">
                    🔥 Firebase Console
                  </Button>
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-400">
            Chhath Prasadam Portal - Admin Panel © 2025
          </p>
        </div>
      </footer>
    </main>
  );
}