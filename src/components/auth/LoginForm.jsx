// src/components/auth/LoginForm.jsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { RecaptchaVerifier } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import toast from 'react-hot-toast';

const LoginForm = ({ onOTPSent }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithPhone, error, clearError } = useAuth();
  const recaptchaRef = useRef(null);
  const verifierRef = useRef(null);

  useEffect(() => {
    // Initialize reCAPTCHA
    if (!verifierRef.current && recaptchaRef.current) {
      try {
        verifierRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'normal',
          callback: () => {
            console.log('reCAPTCHA solved');
          },
          'expired-callback': () => {
            toast.error('reCAPTCHA expired. Please try again.');
          }
        });
      } catch (error) {
        console.error('Error initializing reCAPTCHA:', error);
      }
    }

    return () => {
      if (verifierRef.current) {
        verifierRef.current.clear();
        verifierRef.current = null;
      }
    };
  }, []);

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    return phoneRegex.test(phone);
  };

  const formatPhoneNumber = (phone) => {
    // Add +91 if not present for Indian numbers
    if (phone.length === 10 && /^\d{10}$/.test(phone)) {
      return `+91${phone}`;
    }
    return phone;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!phoneNumber.trim()) {
      toast.error('Please enter your phone number');
      return;
    }

    const formattedPhone = formatPhoneNumber(phoneNumber.trim());
    
    if (!validatePhoneNumber(formattedPhone)) {
      toast.error('Please enter a valid phone number with country code');
      return;
    }

    if (!verifierRef.current) {
      toast.error('Please complete the reCAPTCHA verification');
      return;
    }

    setIsLoading(true);
    clearError();

    try {
      const confirmationResult = await signInWithPhone(formattedPhone, verifierRef.current);
      if (confirmationResult) {
        onOTPSent(confirmationResult, formattedPhone);
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <Input
            id="phone"
            type="tel"
            placeholder="XXXXXXXXXX "
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full"
            disabled={isLoading}
          />
          <p className="mt-2 text-xs text-gray-500">
            Enter your 10-digit mobile number don't include country code.
          </p>
        </div>

        <div id="recaptcha-container" ref={recaptchaRef} className="flex justify-center"></div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading}
          loading={isLoading}
        >
          {isLoading ? 'Sending OTP...' : 'Send OTP'}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;