// src/app/cart/page.jsx - Updated Cart Page with New Navigation
'use client';

import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { Button } from '../../components/ui/Button';
import { formatCurrency } from '../../lib/utils';
import { useRouter } from 'next/navigation';
import Layout from '../../components/layout/Layout';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function CartPage() {
  const { user } = useAuth();
  const { 
    cartItems, 
    loading, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getCartTotals 
  } = useCart();
  const router = useRouter();

  const totals = getCartTotals();

  const handleQuantityChange = (productId, change) => {
    const currentItem = cartItems.find(item => item.id === productId);
    if (currentItem) {
      const newQuantity = currentItem.quantity + change;
      if (newQuantity > 0) {
        updateQuantity(productId, newQuantity);
      }
    }
  };

  const handleProceedToCheckout = () => {
    if (!user) {
      toast.error('Please login to proceed with checkout');
      router.push('/login');
      return;
    }

    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    router.push('/checkout');
  };

  const handleContinueShopping = () => {
    router.push('/products');
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading cart...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/" className="text-gray-700 hover:text-gray-900">
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="text-gray-500">Shopping Cart</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Shopping Cart ({totals.itemCount} items)
          </h1>
          
          {cartItems.length > 0 && (
            <Button 
              variant="outline" 
              onClick={clearCart}
              className="text-red-600 border-red-300 hover:bg-red-50"
            >
              Clear Cart
            </Button>
          )}
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <span className="text-8xl">🛒</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Add some authentic Chhath prasad items to your cart to get started.
            </p>
            <Button onClick={handleContinueShopping} size="lg">
              Continue Shopping
            </Button>
          </div>
        ) : (
          /* Cart with Items */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Cart Items</h2>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-6">
                      <div className="flex items-start space-x-4">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <img
                            src={item.imageURL || '/images/placeholder-prasad.jpg'}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg"
                            onError={(e) => {
                              e.target.src = '/images/placeholder-prasad.jpg';
                            }}
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">
                                <Link 
                                  href={`/products/${item.id}`}
                                  className="hover:text-blue-600"
                                >
                                  {item.name}
                                </Link>
                              </h3>
                              
                              {item.category && (
                                <p className="text-sm text-gray-500 mt-1">
                                  Category: {item.category}
                                </p>
                              )}
                            </div>

                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-700 text-sm font-medium"
                            >
                              Remove
                            </button>
                          </div>

                          {/* Price and Quantity */}
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <span className="text-lg font-bold text-gray-900">
                                  {formatCurrency(item.price)}
                                </span>
                                {item.originalPrice && item.originalPrice > item.price && (
                                  <span className="text-sm text-gray-500 line-through">
                                    {formatCurrency(item.originalPrice)}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center space-x-3">
                              <span className="text-sm text-gray-600">Qty:</span>
                              <div className="flex items-center border border-gray-300 rounded-lg">
                                <button
                                  onClick={() => handleQuantityChange(item.id, -1)}
                                  disabled={item.quantity <= 1}
                                  className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <span className="text-lg">−</span>
                                </button>
                                <span className="px-4 py-2 font-semibold min-w-[3rem] text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => handleQuantityChange(item.id, 1)}
                                  disabled={item.quantity >= item.stock}
                                  className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <span className="text-lg">+</span>
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Item Total */}
                          <div className="mt-3 text-right">
                            <span className="text-lg font-bold text-gray-900">
                              Total: {formatCurrency(item.price * item.quantity)}
                            </span>
                          </div>

                          {/* Stock Warning */}
                          {item.quantity >= item.stock && (
                            <div className="mt-2 text-right">
                              <span className="text-sm text-red-600">
                                Max quantity reached
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Order Summary
                </h2>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal ({totals.itemCount} items)</span>
                    <span className="font-medium">{formatCurrency(totals.subtotal)}</span>
                  </div>

                  {totals.savings > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>You Save</span>
                      <span className="font-medium">-{formatCurrency(totals.savings)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery Charges</span>
                    <span className={`font-medium ${totals.deliveryCharges === 0 ? 'text-green-600' : ''}`}>
                      {totals.deliveryCharges === 0 ? 'FREE' : formatCurrency(totals.deliveryCharges)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (5% GST)</span>
                    <span className="font-medium">{formatCurrency(totals.tax)}</span>
                  </div>

                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Amount</span>
                      <span className="text-gray-900">{formatCurrency(totals.total)}</span>
                    </div>
                  </div>
                </div>

                {/* Free Delivery Notice */}
                {totals.subtotal < 500 && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      Add {formatCurrency(500 - totals.subtotal)} more for FREE delivery!
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-6 space-y-3">
                  <Button 
                    onClick={handleProceedToCheckout}
                    className="w-full text-lg py-3"
                    size="lg"
                  >
                    Proceed to Checkout
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={handleContinueShopping}
                    className="w-full"
                  >
                    Continue Shopping
                  </Button>
                </div>

                {/* Trust Indicators */}
                <div className="mt-6 pt-6 border-t">
                  <div className="text-sm text-gray-600 space-y-2">
                    <p>✅ 100% Authentic Prasad</p>
                    <p>✅ Secure Payment</p>
                    <p>✅ Pan-India Delivery</p>
                    <p>✅ Fresh & Blessed Items</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}