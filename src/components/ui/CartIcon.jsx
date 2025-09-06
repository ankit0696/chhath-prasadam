// src/components/ui/CartIcon.jsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '../../contexts/CartContext';
import { Button } from './Button';

const CartIcon = ({ className = '', showText = true }) => {
  const { cartItems, getCartTotals } = useCart();
  const totals = getCartTotals();

  return (
    <Link href="/cart" className={`relative ${className}`}>
      {showText ? (
        <Button variant="outline" className="flex items-center space-x-2">
          <div className="relative">
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5a1 1 0 00.9 1.1h9.4a1 1 0 00.9-1.1L7 13m0 0l1-4m8 0v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4"
              />
            </svg>
            {totals.itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totals.itemCount > 99 ? '99+' : totals.itemCount}
              </span>
            )}
          </div>
          <span className="hidden sm:inline">
            Cart {totals.itemCount > 0 && `(${totals.itemCount})`}
          </span>
        </Button>
      ) : (
        <div className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <svg 
            className="w-6 h-6 text-gray-700" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5a1 1 0 00.9 1.1h9.4a1 1 0 00.9-1.1L7 13m0 0l1-4m8 0v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4"
            />
          </svg>
          {totals.itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {totals.itemCount > 99 ? '99+' : totals.itemCount}
            </span>
          )}
        </div>
      )}
    </Link>
  );
};

export default CartIcon;