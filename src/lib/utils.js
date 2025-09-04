// src/lib/utils.js
import { clsx } from 'clsx';

/**
 * Utility function to combine CSS classes using clsx
 */
export function cn(...inputs) {
  return clsx(inputs);
}

/**
 * Format phone number for display
 */
export function formatPhoneNumber(phone) {
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, '');
  
  // Handle Indian numbers
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  
  // Handle international format
  if (cleaned.length > 10) {
    const countryCode = cleaned.slice(0, cleaned.length - 10);
    const number = cleaned.slice(-10);
    return `+${countryCode} ${number.slice(0, 5)} ${number.slice(5)}`;
  }
  
  return phone;
}

/**
 * Validate phone number
 */
export function isValidPhoneNumber(phone) {
  const phoneRegex = /^\+[1-9]\d{1,14}$/;
  return phoneRegex.test(phone);
}

/**
 * Format Indian phone number to international format
 */
export function formatToInternational(phone) {
  const cleaned = phone.replace(/\D/g, '');
  
  // If it's a 10-digit Indian number, add +91
  if (cleaned.length === 10 && !phone.startsWith('+')) {
    return `+91${cleaned}`;
  }
  
  return phone;
}

/**
 * Truncate text to specified length
 */
export function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * Generate random ID
 */
export function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

/**
 * Format currency for Indian Rupees
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount);
}

/**
 * Format date for display
 */
export function formatDate(date) {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Debounce function for search inputs
 */
export function debounce(func, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Check if code is running on client side
 */
export function isClient() {
  return typeof window !== 'undefined';
}

/**
 * Get error message from Firebase auth error
 */
export function getAuthErrorMessage(error) {
  const errorMessages = {
    'auth/invalid-phone-number': 'Invalid phone number format',
    'auth/missing-phone-number': 'Phone number is required',
    'auth/quota-exceeded': 'SMS quota exceeded. Please try again later',
    'auth/user-disabled': 'This account has been disabled',
    'auth/operation-not-allowed': 'Phone authentication is not enabled',
    'auth/network-request-failed': 'Network error. Please check your connection',
    'auth/too-many-requests': 'Too many requests. Please wait before trying again',
    'auth/invalid-verification-code': 'Invalid OTP code',
    'auth/invalid-verification-id': 'Invalid verification ID',
    'auth/code-expired': 'OTP code has expired. Please request a new one',
    'auth/missing-verification-code': 'Please enter the OTP code',
    'auth/missing-verification-id': 'Verification ID is missing',
    'auth/captcha-check-failed': 'reCAPTCHA verification failed'
  };

  if (error?.code && errorMessages[error.code]) {
    return errorMessages[error.code];
  }

  return error?.message || 'An unexpected error occurred';
}

/**
 * Storage utilities for client-side data
 */
export const storage = {
  get: (key) => {
    if (!isClient()) return null;
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },

  set: (key, value) => {
    if (!isClient()) return;
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  },

  remove: (key) => {
    if (!isClient()) return;
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('Failed to remove from localStorage:', error);
    }
  },

  clear: () => {
    if (!isClient()) return;
    try {
      localStorage.clear();
    } catch (error) {
      console.warn('Failed to clear localStorage:', error);
    }
  }
};

/**
 * Validate OTP format
 */
export function isValidOTP(otp) {
  return /^\d{6}$/.test(otp);
}

/**
 * Generate loading state utilities
 */
export const loadingStates = {
  isLoading: (state) => state === 'loading',
  isSuccess: (state) => state === 'success',
  isError: (state) => state === 'error',
  isIdle: (state) => state === 'idle'
};