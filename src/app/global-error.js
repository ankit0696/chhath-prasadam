// src/app/global-error.js
'use client';

import { Button } from '../components/ui/Button';

export default function GlobalError({ error, reset }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
          <div className="text-center max-w-md">
            {/* Error Icon */}
            <div className="text-6xl mb-6">⚠️</div>
            
            {/* Error Message */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Something went wrong!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              We encountered an unexpected error. Please try refreshing the page.
            </p>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button 
                onClick={() => reset()}
                size="lg" 
                className="w-full"
              >
                🔄 Try Again
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => window.location.href = '/'}
                size="lg" 
                className="w-full"
              >
                🏠 Go Home
              </Button>
            </div>

            {/* Debug Info (only in development) */}
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-8 text-left">
                <summary className="cursor-pointer text-sm text-gray-500">
                  Error Details (Development Only)
                </summary>
                <pre className="mt-2 p-4 bg-red-50 border border-red-200 rounded text-xs text-red-800 overflow-auto">
                  {error?.message || 'Unknown error'}
                  {error?.stack && (
                    <>
                      {'\n\nStack trace:\n'}
                      {error.stack}
                    </>
                  )}
                </pre>
              </details>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}