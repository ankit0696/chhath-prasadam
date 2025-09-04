// src/components/FirebaseTest.jsx
'use client';

import React, { useState } from 'react';
import { Button } from './ui/Button';

const FirebaseTest = () => {
  const [status, setStatus] = useState('');

  const testFirebase = () => {
    try {
      setStatus('Testing Firebase connection...');
      
      // Check environment variables
      const hasEnvVars = !!(
        process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
        process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
      );
      
      if (hasEnvVars) {
        setStatus('✅ Firebase configured successfully!');
        console.log('Project ID:', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
        console.log('Auth Domain:', process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN);
        console.log('🎉 All environment variables are set correctly');
      } else {
        setStatus('❌ Environment variables missing');
        console.error('Missing environment variables. Check your .env.local file');
      }
    } catch (error) {
      setStatus('❌ Firebase connection failed');
      console.error('Firebase test error:', error);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">🔥 Firebase Connection Test</h2>
      <Button onClick={testFirebase} className="w-full mb-4">
        Test Firebase Setup
      </Button>
      {status && (
        <div className={`p-3 rounded text-sm ${
          status.includes('✅') 
            ? 'bg-green-100 text-green-800 border border-green-200' 
            : status.includes('❌')
            ? 'bg-red-100 text-red-800 border border-red-200'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {status}
        </div>
      )}
      
      {status.includes('✅') && (
        <div className="mt-4 p-3 bg-blue-100 text-blue-800 rounded text-sm border border-blue-200">
          <p className="font-semibold">🎉 Ready for next steps:</p>
          <ul className="mt-2 space-y-1 text-xs">
            <li>✅ Firebase connection working</li>
            <li>🔜 Enable Phone Authentication in Firebase Console</li>
            <li>🔜 Test phone OTP login</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default FirebaseTest;