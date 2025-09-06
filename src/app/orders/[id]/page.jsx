// src/app/orders/[id]/page.jsx - Order Confirmation Page
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../../../contexts/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '../../../components/ui/Button';
import { formatCurrency, formatDate } from '../../../lib/utils';
import { orderOperations, orderStatusConfig, paymentStatusConfig } from '../../../lib/orders';
import toast from 'react-hot-toast';

export default function OrderConfirmationPage({ params }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = params.id;
  const isNewOrder = searchParams.get('new') === 'true';

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (orderId) {
      loadOrder();
    }
  }, [user, orderId]);

  const loadOrder = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const fetchedOrder = await orderOperations.getOrderById(orderId);
      
      // Verify order belongs to current user
      if (fetchedOrder.userId !== user.uid) {
        setError('Order not found or access denied');
        return;
      }
      
      setOrder(fetchedOrder);
      
      if (isNewOrder) {
        toast.success('Order placed successfully!');
      }
    } catch (err) {
      console.error('Error loading order:', err);
      setError(err.message || 'Failed to load order details');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  const getStatusConfig = (status) => {
    return orderStatusConfig[status] || orderStatusConfig.pending;
  };

  const getPaymentConfig = (status) => {
    return paymentStatusConfig[status] || paymentStatusConfig.pending;
  };

  const getEstimatedDelivery = (createdAt) => {
    const orderDate = createdAt.toDate ? createdAt.toDate() : new Date(createdAt);
    const deliveryDate = new Date(orderDate);
    deliveryDate.setDate(orderDate.getDate() + 3);
    return deliveryDate;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <span className="text-6xl">❌</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-x-4">
            <Button onClick={loadOrder}>Try Again</Button>
            <Link href="/">
              <Button variant="outline">Go Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  const statusConfig = getStatusConfig(order.status);
  const paymentConfig = getPaymentConfig(order.paymentStatus);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/">
                <h1 className="text-2xl font-bold text-gray-900 cursor-pointer">
                  🙏 Chhath Prasadam Portal
                </h1>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link href="/products">
                <Button variant="outline">Products</Button>
              </Link>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Welcome, {user.phoneNumber}
                </span>
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        {isNewOrder && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <div className="flex items-center">
              <div className="text-green-600 mr-4">
                <span className="text-4xl">✅</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-green-900 mb-2">
                  Order Placed Successfully!
                </h2>
                <p className="text-green-700">
                  Thank you for your order. Your authentic Chhath prasad will be prepared with care and delivered to you soon.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Order Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Order #{order.orderNumber}
              </h1>
              <p className="text-gray-600">
                Placed on {formatDate(order.createdAt.toDate ? order.createdAt.toDate() : new Date(order.createdAt))}
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex flex-col items-end">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${statusConfig.color}`}>
                {statusConfig.label}
              </div>
              <div className={`mt-2 px-2 py-1 rounded-full text-xs font-medium ${paymentConfig.color}`}>
                {paymentConfig.icon} {paymentConfig.label}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Order Items ({order.items.length} items)
              </h2>
              
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 pb-4 border-b border-gray-100 last:border-b-0">
                    <img
                      src={item.imageURL || '/images/placeholder-prasad.jpg'}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-md font-semibold text-gray-900">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Category: {item.category}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-900">
                            {formatCurrency(item.price)}
                          </span>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <span className="text-sm text-gray-500 line-through">
                              {formatCurrency(item.originalPrice)}
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-gray-600">
                          Qty: {item.quantity}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <span className="text-md font-semibold text-gray-900">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Delivery Address
              </h2>
              
              <div className="text-gray-700">
                <p className="font-medium">{order.customerDetails.fullName}</p>
                <p>{order.customerDetails.phoneNumber}</p>
                {order.customerDetails.email && (
                  <p>{order.customerDetails.email}</p>
                )}
                <div className="mt-3">
                  <p>{order.deliveryAddress.address}</p>
                  <p>
                    {order.deliveryAddress.city}, {order.deliveryAddress.state} - {order.deliveryAddress.postalCode}
                  </p>
                  {order.deliveryAddress.landmark && (
                    <p className="text-sm text-gray-600 mt-1">
                      Landmark: {order.deliveryAddress.landmark}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary & Status */}
          <div className="lg:col-span-1">
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    Subtotal ({order.orderSummary.itemCount} items)
                  </span>
                  <span>{formatCurrency(order.orderSummary.subtotal)}</span>
                </div>

                {order.orderSummary.savings > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>You Saved</span>
                    <span>-{formatCurrency(order.orderSummary.savings)}</span>
                  </div>
                )}

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Charges</span>
                  <span>
                    {order.orderSummary.deliveryCharges === 0 
                      ? 'FREE' 
                      : formatCurrency(order.orderSummary.deliveryCharges)
                    }
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (5% GST)</span>
                  <span>{formatCurrency(order.orderSummary.tax)}</span>
                </div>

                <div className="border-t pt-2 mt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Amount</span>
                    <span className="text-gray-900">
                      {formatCurrency(order.orderSummary.total)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Delivery Information
              </h2>
              
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-600">Estimated Delivery:</span>
                  <p className="font-medium text-gray-900">
                    {formatDate(getEstimatedDelivery(order.createdAt))}
                  </p>
                </div>
                
                {order.preferredDeliveryTime !== 'any' && (
                  <div>
                    <span className="text-gray-600">Preferred Time:</span>
                    <p className="font-medium text-gray-900 capitalize">
                      {order.preferredDeliveryTime}
                    </p>
                  </div>
                )}
                
                {order.deliveryInstructions && (
                  <div>
                    <span className="text-gray-600">Instructions:</span>
                    <p className="font-medium text-gray-900">
                      {order.deliveryInstructions}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Order Status:</strong> {statusConfig.description}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <div className="space-y-3">
                <Button className="w-full" onClick={() => router.push('/products')}>
                  Continue Shopping
                </Button>
                
                <Button variant="outline" className="w-full" onClick={() => window.print()}>
                  Print Order Details
                </Button>
                
                <div className="pt-3 border-t">
                  <p className="text-xs text-gray-500 text-center">
                    Need help? Contact us for support
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-400">
            © 2025 Chhath Prasadam Portal. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}