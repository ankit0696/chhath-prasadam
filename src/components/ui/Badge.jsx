// src/components/ui/Badge.jsx - Professional Badge Component System
'use client';

import React from 'react';
import { cn } from '../../lib/utils';

const badgeVariants = {
  variant: {
    default: [
      'bg-gray-100 text-gray-800 border-gray-200',
      'hover:bg-gray-200 hover:border-gray-300'
    ],
    primary: [
      'bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 border-orange-200',
      'hover:from-orange-200 hover:to-amber-200 hover:border-orange-300'
    ],
    secondary: [
      'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-700 border-gray-200',
      'hover:from-gray-200 hover:to-slate-200 hover:border-gray-300'
    ],
    success: [
      'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border-emerald-200',
      'hover:from-emerald-200 hover:to-green-200 hover:border-emerald-300'
    ],
    warning: [
      'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border-yellow-200',
      'hover:from-yellow-200 hover:to-amber-200 hover:border-yellow-300'
    ],
    error: [
      'bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border-red-200',
      'hover:from-red-200 hover:to-rose-200 hover:border-red-300'
    ],
    info: [
      'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200',
      'hover:from-blue-200 hover:to-cyan-200 hover:border-blue-300'
    ],
    premium: [
      'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-200',
      'hover:from-purple-200 hover:to-pink-200 hover:border-purple-300'
    ],
    outline: [
      'bg-transparent text-gray-700 border-gray-300',
      'hover:bg-gray-50 hover:border-gray-400'
    ]
  },
  size: {
    xs: 'px-2 py-0.5 text-xs font-medium rounded-md',
    sm: 'px-2.5 py-0.5 text-xs font-semibold rounded-lg',
    md: 'px-3 py-1 text-sm font-semibold rounded-lg',
    lg: 'px-3.5 py-1.5 text-sm font-semibold rounded-xl',
    xl: 'px-4 py-2 text-base font-semibold rounded-xl'
  }
};

const Badge = React.forwardRef(({
  className,
  variant = 'default',
  size = 'sm',
  icon: Icon,
  iconPosition = 'left',
  dot = false,
  animated = false,
  children,
  ...props
}, ref) => {
  const baseClasses = [
    'inline-flex items-center justify-center',
    'border transition-all duration-200 ease-out',
    'font-medium uppercase tracking-wide',
    'whitespace-nowrap select-none'
  ];

  const variantClasses = badgeVariants.variant[variant] || badgeVariants.variant.default;
  const sizeClasses = badgeVariants.size[size] || badgeVariants.size.sm;

  const animatedClasses = animated ? [
    'animate-pulse hover:animate-none'
  ] : [];

  return (
    <span
      ref={ref}
      className={cn(
        baseClasses,
        variantClasses,
        sizeClasses,
        animatedClasses,
        {
          'gap-1.5': (Icon || dot) && children,
        },
        className
      )}
      {...props}
    >
      {dot && (
        <span className={cn(
          'w-1.5 h-1.5 rounded-full',
          {
            'bg-orange-500': variant === 'primary',
            'bg-emerald-500': variant === 'success',
            'bg-yellow-500': variant === 'warning',
            'bg-red-500': variant === 'error',
            'bg-blue-500': variant === 'info',
            'bg-purple-500': variant === 'premium',
            'bg-gray-500': variant === 'default' || variant === 'outline'
          },
          animated && 'animate-ping'
        )} />
      )}
      
      {Icon && iconPosition === 'left' && (
        <Icon className={cn(
          'flex-shrink-0',
          {
            'w-3 h-3': size === 'xs' || size === 'sm',
            'w-3.5 h-3.5': size === 'md',
            'w-4 h-4': size === 'lg' || size === 'xl'
          }
        )} />
      )}
      
      {children}
      
      {Icon && iconPosition === 'right' && (
        <Icon className={cn(
          'flex-shrink-0',
          {
            'w-3 h-3': size === 'xs' || size === 'sm',
            'w-3.5 h-3.5': size === 'md',
            'w-4 h-4': size === 'lg' || size === 'xl'
          }
        )} />
      )}
    </span>
  );
});

Badge.displayName = 'Badge';

export { Badge, badgeVariants };