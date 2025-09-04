// src/contexts/AuthContext.jsx
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signOut,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from 'firebase/auth';
import { auth } from '../firebase/config';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const clearError = () => {
    setError(null);
  };

  const signInWithPhone = async (phoneNumber, recaptchaVerifier) => {
    try {
      setError(null);
      setLoading(true);
      
      const confirmationResult = await signInWithPhoneNumber(
        auth, 
        phoneNumber, 
        recaptchaVerifier
      );
      
      setLoading(false);
      toast.success('OTP sent successfully!');
      return confirmationResult;
    } catch (err) {
      const errorMessage = err.message || 'Failed to send OTP';
      setError(errorMessage);
      setLoading(false);
      toast.error(errorMessage);
      return null;
    }
  };

  const verifyOTP = async (confirmationResult, otp) => {
    try {
      setError(null);
      setLoading(true);
      
      const result = await confirmationResult.confirm(otp);
      const user = result.user;
      
      setUser(user);
      setLoading(false);
      toast.success('Login successful!');
      return user;
    } catch (err) {
      const errorMessage = err.message || 'Invalid OTP';
      setError(errorMessage);
      setLoading(false);
      toast.error(errorMessage);
      return null;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast.success('Logged out successfully');
    } catch (err) {
      const errorMessage = err.message || 'Failed to logout';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const value = {
    user,
    loading,
    error,
    signInWithPhone,
    verifyOTP,
    logout,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};