// src/app/order-confirmation/[orderId]/page.jsx - Order Confirmation Page
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext';
import Layout from '../../../components/layout/Layout';
import { Button } from '../../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { formatCurrency } from '../../../lib/utils';
import Link from 'next/link';
import toast from 'react-hot-toast';
import {
  CheckCircleIcon,
  TruckIcon,
  CalendarIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  PrinterIcon,
  ShareIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';

export default function OrderConfirmationPage({ params }) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const router = useRouter();
  const { orderId } = params;

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    loadOrderDetails();
  }, [user, orderId]);

  const loadOrderDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      // Import Firebase functions
      const { getFunctions, httpsCallable } = await import('firebase/functions');
      const functions = getFunctions();
      const getOrderDetails = httpsCallable(functions, 'getOrderDetails');

      const result = await getOrderDetails({ orderId });

      if (result.data.success) {
        setOrder(result.data.order);
      } else {
        setError('Order not found');
      }

    } catch (err) {
      console.error('Error loading order:', err);
      setError(err.message || 'Failed to load order details');
    } finally {
      setLoading(false);
    }
  };

  const handlePrintOrder = () => {
    window.print();
  };

  const handleShareOrder = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Chhath Prasad Order Confirmation',
          text: `My order #${orderId} has been confirmed! Total: ${formatCurrency(order.amount / 100)}`,
          url: window.location.href
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          fallbackShare();
        }
      }
    } else {
      fallbackShare();
    }
  };

  const fallbackShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      toast.success('Order link copied to clipboard!');
    }).catch(() => {
      toast.error('Failed to copy link');
    });
  };

  const handleDownloadReceipt = async () => {
    try {
      // Create a simple receipt content
      const receiptContent = `
CHHATH PRASADAM PORTAL
Order Receipt
========================

Order ID: ${orderId}
Date: ${new Date(order.createdAt).toLocaleDateString()}
Status: ${order.status.toUpperCase()}

Items:
${order.items.map(item => 
  `${item.name} x ${item.quantity} - ${formatCurrency(item.price * item.quantity)}`
).join('\n')}

Total: ${formatCurrency(order.amount / 100)}

Delivery Address:
${order.deliveryAddress.fullAddress}
${order.deliveryAddress.city}, ${order.deliveryAddress.state}
PIN: ${order.deliveryAddress.pincode}

Thank you for choosing Chhath Prasadam Portal!
🙏 May your Chhath celebrations be blessed!
      `;

      // Create and download file
      const blob = new Blob([receiptContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `chhath-prasad-order-${orderId}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success('Receipt downloaded successfully!');
    } catch (err) {
      toast.error('Failed to download receipt');
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading order details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
          <Card variant="elevated" className="max-w-md mx-auto text-center">
            <CardContent className="p-8">
              <div className="text-red-500 mb-4">
                <span className="text-6xl">❌</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h1>
              <p className="text-gray-600 mb-6">{error}</p>
              <div className="space-x-4">
                <Button onClick={loadOrderDetails}>Try Again</Button>
                <Link href="/">
                  <Button variant="outline">Go Home</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  if (!order) {
    return null;
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'success';
      case 'pending': return 'warning';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  const getDeliveryEstimate = () => {
    const orderDate = new Date(order.createdAt);
    const estimatedDelivery = new Date(orderDate.getTime() + (2 * 24 * 60 * 60 * 1000)); // 2 days
    return estimatedDelivery.toLocaleDateString();
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-8">
        <div className="container mx-auto px-4">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="mb-4">
              <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto animate-bounce-subtle" />
            </div>
            <h1 className="heading-1 text-green-800 mb-2">
              Order Confirmed! 🎉
            </h1>
            <p className="body-large text-green-700">
              Thank you for your order! Your authentic Chhath prasad is being prepared.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Order Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Summary Card */}
              <Card variant="elevated">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Order Summary</CardTitle>
                    <Badge variant={getStatusColor(order.status)} size="lg" dot animated>
                      {order.status === 'paid' ? 'Payment Successful' : order.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="text-gray-600">
                    Order ID: <strong>#{orderId}</strong>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4 py-3 border-b border-gray-100 last:border-b-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-lg flex items-center justify-center">
                          <span className="text-2xl">🪔</span>
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{item.name}</h4>
                          <p className="text-gray-600 text-sm">{item.category}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
                            <span className="text-sm text-gray-500">×</span>
                            <span className="text-sm font-medium">{formatCurrency(item.price)}</span>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            {formatCurrency(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}

                    {/* Pricing Breakdown */}
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span>{formatCurrency((order.amount / 100) - (order.amount * 0.05 / 100))}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Delivery</span>
                        <span className="text-green-600">FREE</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax (5% GST)</span>
                        <span>{formatCurrency(order.amount * 0.05 / 100)}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2">
                        <span>Total</span>
                        <span className="text-primary-600">{formatCurrency(order.amount / 100)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Details */}
              {order.paymentDetails && (
                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle>Payment Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Payment ID</p>
                        <p className="font-mono text-sm">{order.paymentId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Payment Method</p>
                        <p className="capitalize">{order.paymentDetails.method}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Amount Paid</p>
                        <p className="font-semibold">{formatCurrency(order.paymentDetails.amount / 100)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Paid At</p>
                        <p>{new Date(order.paidAt).toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Delivery Information */}
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>Delivery Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPinIcon className="w-5 h-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-semibold">Delivery Address</p>
                        <p className="text-gray-600">{order.deliveryAddress.fullAddress}</p>
                        <p className="text-gray-600">
                          {order.deliveryAddress.city}, {order.deliveryAddress.state} - {order.deliveryAddress.pincode}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <CalendarIcon className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="font-semibold">Estimated Delivery</p>
                        <p className="text-gray-600">{getDeliveryEstimate()}</p>
                        <p className="text-sm text-green-600">Fresh prasad prepared and delivered within 2 days</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <PhoneIcon className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="font-semibold">Contact Number</p>
                        <p className="text-gray-600">{order.phoneNumber}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Actions Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card variant="gradient">
                <CardHeader>
                  <CardTitle className="text-center">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={handleDownloadReceipt}
                    variant="outline" 
                    className="w-full"
                    icon={ArrowDownTrayIcon}
                  >
                    Download Receipt
                  </Button>
                  
                  <Button 
                    onClick={handlePrintOrder}
                    variant="outline" 
                    className="w-full"
                    icon={PrinterIcon}
                  >
                    Print Order
                  </Button>
                  
                  <Button 
                    onClick={handleShareOrder}
                    variant="outline" 
                    className="w-full"
                    icon={ShareIcon}
                  >
                    Share Order
                  </Button>
                </CardContent>
              </Card>

              {/* Order Status */}
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>Order Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircleIcon className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-green-600">Order Placed</p>
                        <p className="text-sm text-gray-500">
                          {new Date(order.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircleIcon className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-green-600">Payment Confirmed</p>
                        <p className="text-sm text-gray-500">
                          {order.paidAt ? new Date(order.paidAt).toLocaleString() : 'Just now'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                        <TruckIcon className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-yellow-600">Preparing Order</p>
                        <p className="text-sm text-gray-500">Fresh prasad being prepared</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <TruckIcon className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-500">Out for Delivery</p>
                        <p className="text-sm text-gray-400">Expected by {getDeliveryEstimate()}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Support */}
              <Card variant="glass">
                <CardContent className="text-center">
                  <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Contact our support team for any questions about your order.
                  </p>
                  <div className="space-y-2">
                    <Link href="tel:+91-CHHATH-PRASAD">
                      <Button variant="outline" size="sm" className="w-full" icon={PhoneIcon}>
                        Call Support
                      </Button>
                    </Link>
                    <Link href="mailto:support@chhathprasad.com">
                      <Button variant="ghost" size="sm" className="w-full" icon={EnvelopeIcon}>
                        Email Us
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Continue Shopping */}
          <div className="text-center mt-12">
            <h2 className="heading-3 mb-4">🙏 Thank You for Your Order!</h2>
            <p className="body-medium text-gray-600 mb-6 max-w-2xl mx-auto">
              Your authentic Chhath prasad will be prepared with devotion and delivered fresh. 
              May your celebrations be blessed with joy and prosperity.
            </p>
            
            <div className="space-x-4">
              <Link href="/products">
                <Button variant="primary" size="lg">
                  Continue Shopping
                </Button>
              </Link>
              
              <Link href="/orders">
                <Button variant="outline" size="lg">
                  View All Orders
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}