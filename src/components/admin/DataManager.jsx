// src/components/admin/DataManager.jsx - For Testing and Sample Data Management
'use client';

import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { addSampleDataToFirestore, clearSampleData } from '../../lib/sampleData';
import toast from 'react-hot-toast';

const DataManager = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleAddSampleData = async () => {
    if (!confirm('This will add sample products to your Firestore database. Continue?')) {
      return;
    }

    setIsLoading(true);
    setStatus('Adding sample data...');
    
    try {
      const result = await addSampleDataToFirestore();
      if (result.success) {
        toast.success('Sample data added successfully!');
        setStatus('✅ Sample data added successfully!');
      } else {
        toast.error(`Failed to add sample data: ${result.message}`);
        setStatus(`❌ Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error adding sample data:', error);
      toast.error('Failed to add sample data');
      setStatus(`❌ Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearData = async () => {
    if (!confirm('⚠️ This will DELETE ALL products and categories from your database. This action cannot be undone. Are you sure?')) {
      return;
    }

    setIsLoading(true);
    setStatus('Clearing all data...');
    
    try {
      const result = await clearSampleData();
      if (result.success) {
        toast.success('All data cleared successfully!');
        setStatus('✅ All data cleared successfully!');
      } else {
        toast.error(`Failed to clear data: ${result.message}`);
        setStatus(`❌ Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error clearing data:', error);
      toast.error('Failed to clear data');
      setStatus(`❌ Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          🔧 Database Management
        </h2>
        <p className="text-gray-600">
          Manage sample data for testing your Chhath Prasadam Portal
        </p>
      </div>

      <div className="space-y-6">
        {/* Sample Data Section */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Sample Products</h3>
          <p className="text-sm text-gray-600 mb-4">
            Add authentic Chhath prasad products with images, categories, and pricing for testing.
            Includes 12 products across 6 categories.
          </p>
          
          <div className="flex space-x-4">
            <Button 
              onClick={handleAddSampleData}
              disabled={isLoading}
              loading={isLoading && status.includes('Adding')}
              className="flex-1"
            >
              Add Sample Data
            </Button>
            
            <Button 
              onClick={handleClearData}
              disabled={isLoading}
              loading={isLoading && status.includes('Clearing')}
              variant="outline"
              className="flex-1 text-red-600 border-red-300 hover:bg-red-50"
            >
              Clear All Data
            </Button>
          </div>
        </div>

        {/* Status Display */}
        {status && (
          <div className={`p-4 rounded-lg text-sm ${
            status.includes('✅') 
              ? 'bg-green-50 text-green-800 border border-green-200'
              : status.includes('❌')
              ? 'bg-red-50 text-red-800 border border-red-200' 
              : 'bg-blue-50 text-blue-800 border border-blue-200'
          }`}>
            {status}
          </div>
        )}

        {/* Instructions */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 className="text-md font-semibold text-gray-900 mb-3">📋 Setup Instructions</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p><strong>1. First time setup:</strong></p>
            <ul className="ml-4 space-y-1 text-xs">
              <li>• Click "Add Sample Data" to populate your database</li>
              <li>• This creates products and categories for testing</li>
              <li>• All data includes authentic Chhath prasad items</li>
            </ul>
            
            <p><strong>2. Testing your app:</strong></p>
            <ul className="ml-4 space-y-1 text-xs">
              <li>• Browse products on home page and products page</li>
              <li>• Test product detail pages</li>
              <li>• Try category filtering</li>
              <li>• Test authentication and cart (coming in Day 3)</li>
            </ul>

            <p><strong>3. Before production:</strong></p>
            <ul className="ml-4 space-y-1 text-xs">
              <li>• Clear sample data using "Clear All Data"</li>
              <li>• Add your actual products through admin panel</li>
              <li>• Update Firestore security rules for production</li>
            </ul>
          </div>
        </div>

        {/* Sample Data Preview */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <h3 className="text-md font-semibold text-orange-900 mb-3">📦 Sample Data Includes</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-orange-800">
            <div>
              <strong>Products (12 items):</strong>
              <ul className="mt-1 space-y-1 text-xs">
                <li>• Complete Chhath Prasad Box</li>
                <li>• Traditional Thekua</li>
                <li>• Rice Kheer</li>
                <li>• Mixed Dry Fruits</li>
                <li>• Fresh Fruits (Banana, Coconut)</li>
                <li>• Puja Items (Diyas, Incense)</li>
              </ul>
            </div>
            <div>
              <strong>Categories (6 types):</strong>
              <ul className="mt-1 space-y-1 text-xs">
                <li>• Prasad Items</li>
                <li>• Sweets</li>
                <li>• Fruits</li>
                <li>• Flowers</li>
                <li>• Puja Items</li>
                <li>• Special Boxes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataManager;