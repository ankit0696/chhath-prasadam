// src/app/layout.jsx - Fixed Viewport Issue
import { Inter } from 'next/font/google';
import { AuthProvider } from '../contexts/AuthContext';
import { CartProvider } from '../contexts/CartContext';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

// Separate viewport export (Next.js 14+ requirement)
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' }
  ],
  colorScheme: 'light dark'
};

// Metadata export (without viewport)
export const metadata = {
  title: 'Chhath Prasadam Portal',
  description: 'Online platform for Chhath Puja Prasad delivery across India',
  keywords: ['Chhath Puja', 'Prasad', 'Delivery', 'Bihar', 'Hindu Festival', 'Religious'],
  authors: [{ name: 'Chhath Prasadam Team' }],
  openGraph: {
    title: 'Chhath Prasadam Portal',
    description: 'Authentic Chhath Puja Prasad delivered to your doorstep',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Chhath Prasadam Portal'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chhath Prasadam Portal',
    description: 'Authentic Chhath Puja Prasad delivered to your doorstep'
  },
  robots: {
    index: true,
    follow: true
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png' }
    ]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            {children}
            <Toaster 
              position="top-right" 
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  style: {
                    background: '#059669',
                    color: '#fff',
                  },
                },
                error: {
                  duration: 4000,
                  style: {
                    background: '#DC2626',
                    color: '#fff',
                  },
                },
              }}
            />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}