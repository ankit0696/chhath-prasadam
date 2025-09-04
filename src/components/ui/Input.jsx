// src/components/ui/Input.jsx
'use client';

import React from 'react';
import { clsx } from 'clsx';

export const Input = ({ 
  error = false, 
  className, 
  ...props 
}) => {
  return (
    <input
      className={clsx(
        'w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
        {
          'border-gray-300': !error,
          'border-red-300 focus:ring-red-500': error
        },
        className
      )}
      {...props}
    />
  );
};