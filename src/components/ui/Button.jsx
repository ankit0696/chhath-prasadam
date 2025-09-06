// src/components/ui/Button.jsx - Advanced Professional Button Component
'use client';

import React from 'react';
import { cn } from '../../lib/utils';

const buttonVariants = {
  variant: {
    primary: [
      'bg-gradient-to-r from-orange-500 to-amber-500 text-white border-transparent',
      'hover:from-orange-600 hover:to-amber-600 hover:shadow-lg hover:-translate-y-0.5',
      'active:translate-y-0 active:shadow-md',
      'focus:ring-4 focus:ring-orange-200',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none'
    ],
    secondary: [
      'bg-white text-orange-600 border-orange-200 shadow-sm',
      'hover:bg-orange-50 hover:border-orange-300 hover:shadow-md hover:-translate-y-0.5',
      'active:bg-orange-100 active:translate-y-0',
      'focus:ring-4 focus:ring-orange-100',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0'
    ],
    outline: [
      'bg-transparent text-gray-700 border-gray-300',
      'hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900 hover:shadow-sm hover:-translate-y-0.5',
      'active:bg-gray-100 active:translate-y-0',
      'focus:ring-4 focus:ring-gray-100',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0'
    ],
    ghost: [
      'bg-transparent text-gray-700 border-transparent',
      'hover:bg-gray-100 hover:text-gray-900',
      'active:bg-gray-200',
      'focus:ring-4 focus:ring-gray-100',
      'disabled:opacity-50 disabled:cursor-not-allowed'
    ],
    destructive: [
      'bg-gradient-to-r from-red-500 to-pink-500 text-white border-transparent',
      'hover:from-red-600 hover:to-pink-600 hover:shadow-lg hover:-translate-y-0.5',
      'active:translate-y-0 active:shadow-md',
      'focus:ring-4 focus:ring-red-200',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0'
    ],
    success: [
      'bg-gradient-to-r from-green-500 to-emerald-500 text-white border-transparent',
      'hover:from-green-600 hover:to-emerald-600 hover:shadow-lg hover:-translate-y-0.5',
      'active:translate-y-0 active:shadow-md',
      'focus:ring-4 focus:ring-green-200',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0'
    ]
  },
  size: {
    xs: 'px-2.5 py-1.5 text-xs font-medium rounded-md',
    sm: 'px-3 py-2 text-sm font-medium rounded-lg',
    md: 'px-4 py-2.5 text-sm font-semibold rounded-lg',
    lg: 'px-6 py-3 text-base font-semibold rounded-xl',
    xl: 'px-8 py-4 text-lg font-semibold rounded-xl',
    icon: 'p-2.5 rounded-lg'
  }
};

const Button = React.forwardRef(({
  className,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  children,
  icon: Icon,
  iconPosition = 'left',
  ...props
}, ref) => {
  const baseClasses = [
    'inline-flex items-center justify-center font-medium',
    'transition-all duration-200 ease-out',
    'border focus:outline-none',
    'relative overflow-hidden',
    'disabled:pointer-events-none'
  ];

  const variantClasses = buttonVariants.variant[variant] || buttonVariants.variant.primary;
  const sizeClasses = buttonVariants.size[size] || buttonVariants.size.md;

  const allClasses = cn(
    baseClasses,
    variantClasses,
    sizeClasses,
    {
      'cursor-not-allowed opacity-50': disabled || loading,
      'gap-2': Icon && children,
    },
    className
  );

  const shimmerEffect = (
    <span className="absolute inset-0 -top-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 transform -translate-x-full hover:translate-x-full transition-transform duration-700 ease-out" />
  );

  return (
    <button
      ref={ref}
      className={allClasses}
      disabled={disabled || loading}
      {...props}
    >
      {shimmerEffect}
      
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      
      {Icon && iconPosition === 'left' && !loading && (
        <Icon className={cn('h-4 w-4', { 'mr-2': children })} />
      )}
      
      {children}
      
      {Icon && iconPosition === 'right' && !loading && (
        <Icon className={cn('h-4 w-4', { 'ml-2': children })} />
      )}
    </button>
  );
});

Button.displayName = 'Button';

export { Button, buttonVariants };