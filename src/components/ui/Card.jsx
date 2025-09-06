// src/components/ui/Card.jsx - Professional Card Component System
'use client';

import React from 'react';
import { cn } from '../../lib/utils';

const cardVariants = {
  variant: {
    default: [
      'bg-white border border-gray-200/60 shadow-sm',
      'hover:border-gray-300/80 hover:shadow-md',
      'transition-all duration-300 ease-out'
    ],
    elevated: [
      'bg-white border border-gray-100 shadow-lg',
      'hover:shadow-xl hover:-translate-y-1',
      'transition-all duration-300 ease-out'
    ],
    glass: [
      'bg-white/80 backdrop-blur-xl border border-white/20 shadow-lg',
      'hover:bg-white/90 hover:border-white/30',
      'transition-all duration-300 ease-out'
    ],
    gradient: [
      'bg-gradient-to-br from-orange-50 via-white to-amber-50',
      'border border-orange-100/50 shadow-sm',
      'hover:from-orange-100 hover:to-amber-100 hover:shadow-md',
      'transition-all duration-300 ease-out'
    ],
    premium: [
      'bg-gradient-to-br from-white via-gray-50 to-white',
      'border border-gray-200 shadow-md ring-1 ring-gray-100',
      'hover:shadow-lg hover:-translate-y-0.5 hover:ring-gray-200',
      'transition-all duration-300 ease-out'
    ]
  },
  size: {
    sm: 'p-4 rounded-lg',
    md: 'p-6 rounded-xl',
    lg: 'p-8 rounded-2xl',
    xl: 'p-10 rounded-3xl'
  }
};

const Card = React.forwardRef(({
  className,
  variant = 'default',
  size = 'md',
  interactive = false,
  children,
  ...props
}, ref) => {
  const baseClasses = ['relative overflow-hidden'];
  
  const variantClasses = cardVariants.variant[variant] || cardVariants.variant.default;
  const sizeClasses = cardVariants.size[size] || cardVariants.size.md;

  const interactiveClasses = interactive ? [
    'cursor-pointer group',
    'active:scale-[0.98] active:shadow-sm'
  ] : [];

  return (
    <div
      ref={ref}
      className={cn(
        baseClasses,
        variantClasses,
        sizeClasses,
        interactiveClasses,
        className
      )}
      {...props}
    >
      {/* Subtle shine effect on hover */}
      {interactive && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
      )}
      {children}
    </div>
  );
});

Card.displayName = 'Card';

const CardHeader = React.forwardRef(({
  className,
  children,
  ...props
}, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-col space-y-1.5 pb-6',
      className
    )}
    {...props}
  >
    {children}
  </div>
));

CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef(({
  className,
  children,
  ...props
}, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-xl font-semibold leading-none tracking-tight text-gray-900',
      'group-hover:text-orange-600 transition-colors duration-200',
      className
    )}
    {...props}
  >
    {children}
  </h3>
));

CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef(({
  className,
  children,
  ...props
}, ref) => (
  <p
    ref={ref}
    className={cn(
      'text-sm text-gray-600 leading-relaxed',
      className
    )}
    {...props}
  >
    {children}
  </p>
));

CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef(({
  className,
  children,
  ...props
}, ref) => (
  <div
    ref={ref}
    className={cn(
      'pt-0',
      className
    )}
    {...props}
  >
    {children}
  </div>
));

CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef(({
  className,
  children,
  ...props
}, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex items-center pt-6',
      className
    )}
    {...props}
  >
    {children}
  </div>
));

CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants
};