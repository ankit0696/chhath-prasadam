// src/components/auth/OTPVerification.jsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const OTPVerification = ({ 
  confirmationResult, 
  phoneNumber, 
  onBack 
}) => {
  const [otp, setOTP] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const { verifyOTP, error, clearError } = useAuth();
  const router = useRouter();
  const timerRef = useRef(null);

  useEffect(() => {
    // Start countdown timer
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!otp.trim()) {
      toast.error('Please enter the OTP');
      return;
    }

    if (otp.length !== 6) {
      toast.error('OTP must be 6 digits');
      return;
    }

    setIsLoading(true);
    clearError();

    try {
      const user = await verifyOTP(confirmationResult, otp);
      if (user) {
        router.push('/'); // Redirect to home after successful login
      }
    } catch (error) {
      console.error('OTP verification error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = () => {
    if (timeLeft > 0) {
      toast.error(`Please wait ${timeLeft} seconds before requesting a new OTP`);
      return;
    }
    
    // Reset timer and go back to phone input
    setTimeLeft(60);
    onBack();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify OTP</h2>
        <p className="text-gray-600">
          Enter the 6-digit code sent to{' '}
          <span className="font-semibold">{phoneNumber}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
            OTP Code
          </label>
          <Input
            id="otp"
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '');
              if (value.length <= 6) {
                setOTP(value);
              }
            }}
            className="w-full text-center text-2xl tracking-widest"
            disabled={isLoading}
            maxLength={6}
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading || otp.length !== 6}
          loading={isLoading}
        >
          {isLoading ? 'Verifying...' : 'Verify OTP'}
        </Button>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            {timeLeft > 0 ? (
              <>Resend OTP in {formatTime(timeLeft)}</>
            ) : (
              <button
                type="button"
                onClick={handleResendOTP}
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Resend OTP
              </button>
            )}
          </p>
          
          <button
            type="button"
            onClick={onBack}
            className="mt-4 text-sm text-gray-600 hover:text-gray-800 underline"
          >
            Change phone number
          </button>
        </div>
      </form>
    </div>
  );
};

export default OTPVerification;