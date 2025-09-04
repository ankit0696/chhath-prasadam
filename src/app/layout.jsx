// src/app/layout.jsx
import { Inter } from 'next/font/google';
import { AuthProvider } from '../contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Chhath Prasadam Portal',
  description: 'Online platform for Chhath Puja Prasad delivery across India',
  keywords: ['Chhath Puja', 'Prasad', 'Delivery', 'Bihar', 'Hindu Festival', 'Religious'],
  authors: [{ name: 'Chhath Prasadam Team' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster 
            position="top-right" 
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}