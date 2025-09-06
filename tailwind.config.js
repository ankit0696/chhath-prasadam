// tailwind.config.js - Professional 20-Year Designer Configuration
/** @type {import('tailwindcss').Config} */

const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2rem',
        '2xl': '2rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px',
      },
    },
    extend: {
      // Professional Color System - 20-Year Designer Palette
      colors: {
        // Border and ring colors
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        
        // Background colors
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        
        // Primary Palette - Sacred Fire Theme
        primary: {
          50: '#fef7ee',   // Lightest sunrise glow
          100: '#feedd6',  // Morning sky
          200: '#fed7ac',  // Dawn light
          300: '#fcba77',  // Early morning
          400: '#f99540',  // Rising sun
          500: '#f6761a',  // Sacred fire (main)
          600: '#e85a10',  // Intense flame
          700: '#c14510',  // Deep fire
          800: '#9a3916',  // Embers
          900: '#7c3015',  // Sacred ash
          DEFAULT: '#f6761a',
          foreground: '#ffffff',
        },
        
        // Secondary Palette - Golden Offerings
        secondary: {
          50: '#fefce8',   // Light gold
          100: '#fef9c3',  // Soft amber
          200: '#fef08a',  // Morning gold
          300: '#fde047',  // Bright offerings
          400: '#facc15',  // Golden prasad (main)
          500: '#eab308',  // Rich amber
          600: '#ca8a04',  // Deep gold
          700: '#a16207',  // Ancient gold
          800: '#854d0e',  // Aged brass
          900: '#713f12',  // Sacred bronze
          DEFAULT: '#facc15',
          foreground: '#713f12',
        },
        
        // Semantic Colors
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',   // Main success
          600: '#16a34a',   // Hover state
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          DEFAULT: '#22c55e',
          foreground: '#ffffff',
        },
        
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',   // Main warning
          600: '#d97706',   // Hover state
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          DEFAULT: '#f59e0b',
          foreground: '#ffffff',
        },
        
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',   // Main error
          600: '#dc2626',   // Hover state
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          DEFAULT: '#ef4444',
          foreground: '#ffffff',
        },
        
        info: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',   // Main info
          600: '#2563eb',   // Hover state
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          DEFAULT: '#3b82f6',
          foreground: '#ffffff',
        },
        
        // Neutral Palette - Professional Grays
        neutral: {
          50: '#fafaf9',
          100: '#f4f4f3',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        },
        
        // Muted colors for subtle UI elements
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        
        // Accent colors for highlights
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        
        // Destructive colors for dangerous actions
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        
        // Card colors
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        
        // Popover colors
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
      },
      
      // Professional Border Radius System
      borderRadius: {
        'none': '0px',
        'sm': '0.125rem',    // 2px
        'md': '0.375rem',    // 6px
        'lg': '0.5rem',      // 8px
        'xl': '0.75rem',     // 12px
        '2xl': '1rem',       // 16px
        '3xl': '1.5rem',     // 24px
        'full': '9999px',
      },
      
      // Advanced Typography System
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
        serif: ['Playfair Display', ...fontFamily.serif],
        mono: ['JetBrains Mono', ...fontFamily.mono],
      },
      
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],      // 12px
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
        'base': ['1rem', { lineHeight: '1.5rem' }],     // 16px
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],      // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px
        '5xl': ['3rem', { lineHeight: '1' }],           // 48px
        '6xl': ['3.75rem', { lineHeight: '1' }],        // 60px
        '7xl': ['4.5rem', { lineHeight: '1' }],         // 72px
        '8xl': ['6rem', { lineHeight: '1' }],           // 96px
        '9xl': ['8rem', { lineHeight: '1' }],           // 128px
      },
      
      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0em',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
      },
      
      // Professional Shadow System
      boxShadow: {
        'xs': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'sm': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        'inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
        
        // Custom professional shadows
        'soft': '0 2px 15px 0 rgb(0 0 0 / 0.08)',
        'medium': '0 4px 25px 0 rgb(0 0 0 / 0.12)',
        'hard': '0 8px 40px 0 rgb(0 0 0 / 0.16)',
        'glow': '0 0 30px 0 rgb(246 118 26 / 0.15)',
        'glow-lg': '0 0 50px 0 rgb(246 118 26 / 0.25)',
      },
      
      // Professional Spacing Scale
      spacing: {
        '0.5': '0.125rem',   // 2px
        '1.5': '0.375rem',   // 6px
        '2.5': '0.625rem',   // 10px
        '3.5': '0.875rem',   // 14px
        '4.5': '1.125rem',   // 18px
        '5.5': '1.375rem',   // 22px
        '6.5': '1.625rem',   // 26px
        '7.5': '1.875rem',   // 30px
        '8.5': '2.125rem',   // 34px
        '9.5': '2.375rem',   // 38px
        '18': '4.5rem',      // 72px
        '22': '5.5rem',      // 88px
        '26': '6.5rem',      // 104px
        '30': '7.5rem',      // 120px
      },
      
      // Advanced Animation System
      transitionTimingFunction: {
        'out-cubic': 'cubic-bezier(0.33, 1, 0.68, 1)',
        'in-cubic': 'cubic-bezier(0.32, 0, 0.67, 0)',
        'in-out-cubic': 'cubic-bezier(0.65, 0, 0.35, 1)',
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'in-quart': 'cubic-bezier(0.5, 0, 0.75, 0)',
        'in-out-quart': 'cubic-bezier(0.76, 0, 0.24, 1)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'in-out-expo': 'cubic-bezier(1, 0, 0, 1)',
        'bouncy': 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      
      transitionDuration: {
        '50': '50ms',
        '75': '75ms',
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '900': '900ms',
      },
      
      // Professional Animation Keyframes
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'slide-in-up': {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(20px)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0)' 
          },
        },
        'slide-in-down': {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(-20px)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0)' 
          },
        },
        'slide-in-left': {
          '0%': { 
            opacity: '0', 
            transform: 'translateX(-20px)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateX(0)' 
          },
        },
        'slide-in-right': {
          '0%': { 
            opacity: '0', 
            transform: 'translateX(20px)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateX(0)' 
          },
        },
        'scale-in': {
          '0%': { 
            opacity: '0', 
            transform: 'scale(0.9)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'scale(1)' 
          },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px 0 rgb(246 118 26 / 0.1)' 
          },
          '50%': { 
            boxShadow: '0 0 40px 0 rgb(246 118 26 / 0.3)' 
          },
        },
        'bounce-subtle': {
          '0%, 100%': { 
            transform: 'translateY(0)' 
          },
          '50%': { 
            transform: 'translateY(-4px)' 
          },
        },
        'wiggle': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-1deg)' },
          '75%': { transform: 'rotate(1deg)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'fade-out': 'fade-out 0.3s ease-in',
        'slide-in-up': 'slide-in-up 0.4s ease-out',
        'slide-in-down': 'slide-in-down 0.4s ease-out',
        'slide-in-left': 'slide-in-left 0.4s ease-out',
        'slide-in-right': 'slide-in-right 0.4s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
        'shimmer': 'shimmer 2s infinite linear',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'bounce-subtle': 'bounce-subtle 1s ease-in-out infinite',
        'wiggle': 'wiggle 0.5s ease-in-out',
        'float': 'float 3s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      
      // Advanced Backdrop Blur
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '40px',
        '3xl': '64px',
      },
      
      // Professional Z-Index Scale
      zIndex: {
        '-1': '-1',
        '1': '1',
        '10': '10',
        '20': '20',
        '30': '30',
        '40': '40',
        '50': '50',
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
        'auto': 'auto',
      },
      
      // Advanced Screen Sizes for Fine-Tuned Responsiveness
      screens: {
        'xs': '475px',
        '3xl': '1600px',
        '4xl': '1920px',
      },
      
      // Professional Aspect Ratios
      aspectRatio: {
        auto: 'auto',
        square: '1 / 1',
        video: '16 / 9',
        portrait: '3 / 4',
        landscape: '4 / 3',
        ultrawide: '21 / 9',
        golden: '1.618 / 1',
      },
    },
  },
  
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    
    // Custom Plugin for Advanced Utilities
    function({ addUtilities, addComponents, theme }) {
      // Professional Gradient Utilities
      const gradients = {
        '.gradient-primary': {
          background: `linear-gradient(135deg, ${theme('colors.primary.500')} 0%, ${theme('colors.primary.600')} 100%)`,
        },
        '.gradient-secondary': {
          background: `linear-gradient(135deg, ${theme('colors.secondary.400')} 0%, ${theme('colors.secondary.500')} 100%)`,
        },
        '.gradient-warm': {
          background: `linear-gradient(135deg, ${theme('colors.primary.50')} 0%, ${theme('colors.secondary.50')} 100%)`,
        },
        '.gradient-cool': {
          background: `linear-gradient(135deg, ${theme('colors.neutral.50')} 0%, ${theme('colors.neutral.100')} 100%)`,
        },
        '.gradient-radial': {
          background: `radial-gradient(circle, ${theme('colors.primary.500')} 0%, ${theme('colors.primary.600')} 100%)`,
        },
      };
      
      // Glass Morphism Utilities
      const glass = {
        '.glass': {
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
        '.glass-dark': {
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
        '.glass-primary': {
          background: `rgba(${theme('colors.primary.500').replace('#', '').match(/\w\w/g).map(x => parseInt(x, 16)).join(', ')}, 0.1)`,
          backdropFilter: 'blur(12px)',
          border: `1px solid rgba(${theme('colors.primary.500').replace('#', '').match(/\w\w/g).map(x => parseInt(x, 16)).join(', ')}, 0.2)`,
        },
      };
      
      // Professional Text Utilities
      const textUtilities = {
        '.text-balance': {
          textWrap: 'balance',
        },
        '.text-pretty': {
          textWrap: 'pretty',
        },
      };
      
      // Advanced Interaction Utilities
      const interactions = {
        '.hover-lift': {
          transition: 'transform 0.2s ease-out, box-shadow 0.2s ease-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: theme('boxShadow.lg'),
          },
        },
        '.hover-glow': {
          transition: 'box-shadow 0.3s ease-out',
          '&:hover': {
            boxShadow: `0 0 30px 0 rgba(${theme('colors.primary.500').replace('#', '').match(/\w\w/g).map(x => parseInt(x, 16)).join(', ')}, 0.3)`,
          },
        },
        '.focus-ring-primary': {
          '&:focus': {
            outline: 'none',
            boxShadow: `0 0 0 3px ${theme('colors.primary.200')}`,
            borderColor: theme('colors.primary.500'),
          },
        },
      };
      
      addUtilities({
        ...gradients,
        ...glass,
        ...textUtilities,
        ...interactions,
      });
      
      // Professional Component Classes
      const components = {
        '.btn-shimmer': {
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
            transition: 'left 0.7s ease-out',
          },
          '&:hover::before': {
            left: '100%',
          },
        },
      };
      
      addComponents(components);
    },
  ],
};