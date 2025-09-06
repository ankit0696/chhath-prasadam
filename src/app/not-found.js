// src/app/not-found.js
import Link from 'next/link';
import { Button } from '../components/ui/Button';

// Fixed viewport export (separate from metadata)
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true
};

export const metadata = {
  title: '404 - Page Not Found | Chhath Prasadam Portal',
  description: 'The page you are looking for could not be found.'
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="text-center">
        {/* Icon */}
        <div className="text-6xl mb-6">🪔</div>
        
        {/* Error Message */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <Link href="/">
            <Button size="lg" className="w-full sm:w-auto">
              🏠 Go Home
            </Button>
          </Link>
          
          <Link href="/products">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              📦 Browse Products
            </Button>
          </Link>
        </div>

        {/* Help Text */}
        <p className="text-sm text-gray-500 mt-8">
          Looking for authentic Chhath Puja prasad? 
          <br />
          Visit our <Link href="/products" className="text-blue-600 hover:underline">products page</Link> to explore our offerings.
        </p>
      </div>
    </div>
  );
}