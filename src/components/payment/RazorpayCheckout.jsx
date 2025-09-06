// src/components/payment/RazorpayCheckout.jsx - Razorpay Payment Integration
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import toast from 'react-hot-toast';
import { formatCurrency } from '../../lib/utils';
import { 
  ShieldCheckIcon, 
  CreditCardIcon, 
  BanknotesIcon,
  DevicePhoneMobileIcon
} from '@heroicons/react/24/outline';

const RazorpayCheckout = ({ 
  orderDetails, 
  deliveryAddress, 
  onSuccess, 
  onFailure 
}) => {
  const [loading, setLoading] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const { user } = useAuth();
  const { cartItems, clearCart } = useCart();
  const router = useRouter();

  // Load Razorpay script
  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve, reject) => {
        if (typeof window.Razorpay !== 'undefined') {
          resolve(true);
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => reject(false);
        document.body.appendChild(script);
      });
    };

    loadRazorpayScript().catch(() => {
      toast.error('Failed to load payment system. Please refresh the page.');
    });
  }, []);

  const handlePayment = async () => {
    if (!user) {
      toast.error('Please login to continue payment');
      router.push('/login');
      return;
    }

    if (!orderDetails?.amount || !deliveryAddress) {
      toast.error('Order details missing');
      return;
    }

    setLoading(true);

    try {
      // Import Firebase functions
      const { getFunctions, httpsCallable } = await import('firebase/functions');
      const functions = getFunctions();
      const createRazorpayOrder = httpsCallable(functions, 'createRazorpayOrder');

      // Create Razorpay order via Firebase Function
      const result = await createRazorpayOrder({
        amount: orderDetails.amount, // Amount in paisa
        currency: 'INR',
        orderItems: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          category: item.category
        })),
        deliveryAddress: deliveryAddress,
        phoneNumber: user.phoneNumber
      });

      if (!result.data.success) {
        throw new Error('Failed to create order');
      }

      const { orderId, razorpayOrderId, amount, currency, key } = result.data;

      // Configure Razorpay options
      const razorpayOptions = {
        key: key,
        amount: amount,
        currency: currency,
        name: 'Chhath Prasadam Portal',
        description: 'Authentic Chhath Puja Prasad',
        image: '/images/logo.png',
        order_id: razorpayOrderId,
        handler: async function (response) {
          await handlePaymentSuccess(response, orderId);
        },
        prefill: {
          name: user.displayName || '',
          email: user.email || '',
          contact: user.phoneNumber || ''
        },
        notes: {
          address: deliveryAddress.fullAddress
        },
        theme: {
          color: '#f6761a' // Primary color from design system
        },
        modal: {
          ondismiss: function() {
            handlePaymentFailure(orderId, {
              errorDescription: 'Payment cancelled by user',
              errorReason: 'USER_CANCELLED'
            });
          }
        },
        retry: {
          enabled: true,
          max_count: 3
        },
        timeout: 600, // 10 minutes
        remember_customer: true,
        readonly: {
          contact: true,
          email: true
        }
      };

      // Open Razorpay checkout
      const razorpayInstance = new window.Razorpay(razorpayOptions);
      
      razorpayInstance.on('payment.failed', function (response) {
        handlePaymentFailure(orderId, {
          errorCode: response.error.code,
          errorDescription: response.error.description,
          errorSource: response.error.source,
          errorStep: response.error.step,
          errorReason: response.error.reason
        });
      });

      razorpayInstance.open();

    } catch (error) {
      console.error('Payment initialization error:', error);
      toast.error(error.message || 'Failed to initialize payment');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async (razorpayResponse, orderId) => {
    setLoading(true);

    try {
      // Import Firebase functions
      const { getFunctions, httpsCallable } = await import('firebase/functions');
      const functions = getFunctions();
      const verifyRazorpayPayment = httpsCallable(functions, 'verifyRazorpayPayment');

      // Verify payment via Firebase Function
      const verificationResult = await verifyRazorpayPayment({
        razorpayOrderId: razorpayResponse.razorpay_order_id,
        razorpayPaymentId: razorpayResponse.razorpay_payment_id,
        razorpaySignature: razorpayResponse.razorpay_signature,
        orderId: orderId
      });

      if (verificationResult.data.success) {
        // Clear cart
        await clearCart();
        
        // Show success message
        toast.success('Payment successful! Order confirmed.');
        
        // Call success callback
        if (onSuccess) {
          onSuccess({
            orderId: orderId,
            paymentId: razorpayResponse.razorpay_payment_id,
            amount: verificationResult.data.amount,
            currency: verificationResult.data.currency
          });
        }

        // Redirect to success page
        router.push(`/order-confirmation/${orderId}`);
      } else {
        throw new Error('Payment verification failed');
      }

    } catch (error) {
      console.error('Payment verification error:', error);
      toast.error(error.message || 'Payment verification failed');
      
      // Call failure callback
      if (onFailure) {
        onFailure(error.message || 'Payment verification failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentFailure = async (orderId, errorDetails) => {
    try {
      // Import Firebase functions
      const { getFunctions, httpsCallable } = await import('firebase/functions');
      const functions = getFunctions();
      const handlePaymentFailure = httpsCallable(functions, 'handlePaymentFailure');

      // Record failure via Firebase Function
      await handlePaymentFailure({
        orderId: orderId,
        ...errorDetails
      });

      // Show error message
      const errorMessage = errorDetails.errorDescription || 'Payment failed. Please try again.';
      toast.error(errorMessage);

      // Call failure callback
      if (onFailure) {
        onFailure(errorMessage);
      }

    } catch (error) {
      console.error('Error recording payment failure:', error);
      toast.error('Payment failed. Please try again.');
    }
  };

  return (
    <Card variant="premium" className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          🙏 Complete Your Order
        </CardTitle>
        <div className="text-center">
          <Badge variant="success" size="md" icon={ShieldCheckIcon}>
            Secure Payment Gateway
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Order Summary */}
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-xl">
          <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
          
          <div className="space-y-2">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <span className="text-gray-700">
                  {item.name} × {item.quantity}
                </span>
                <span className="font-medium">
                  {formatCurrency(item.price * item.quantity)}
                </span>
              </div>
            ))}
            
            <div className="border-t border-orange-200 pt-2 mt-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">
                  {formatCurrency(orderDetails.subtotal)}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Delivery</span>
                <span className="font-medium text-green-600">
                  {orderDetails.deliveryCharges === 0 ? 'FREE' : formatCurrency(orderDetails.deliveryCharges)}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tax (5% GST)</span>
                <span className="font-medium">
                  {formatCurrency(orderDetails.tax)}
                </span>
              </div>
              
              <div className="flex justify-between items-center text-lg font-bold border-t border-orange-200 pt-2 mt-2">
                <span>Total Amount</span>
                <span className="text-primary-600">
                  {formatCurrency(orderDetails.amount / 100)} {/* Convert from paisa */}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="bg-gray-50 p-4 rounded-xl">
          <h3 className="font-semibold text-gray-900 mb-2">Delivery Address</h3>
          <p className="text-gray-700">{deliveryAddress.fullAddress}</p>
          <p className="text-gray-600 text-sm">
            {deliveryAddress.city}, {deliveryAddress.state} - {deliveryAddress.pincode}
          </p>
        </div>

        {/* Payment Methods */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Accepted Payment Methods</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col items-center p-3 border border-gray-200 rounded-lg">
              <CreditCardIcon className="w-6 h-6 text-blue-600 mb-1" />
              <span className="text-xs text-gray-600 text-center">Cards</span>
            </div>
            
            <div className="flex flex-col items-center p-3 border border-gray-200 rounded-lg">
              <BanknotesIcon className="w-6 h-6 text-green-600 mb-1" />
              <span className="text-xs text-gray-600 text-center">Net Banking</span>
            </div>
            
            <div className="flex flex-col items-center p-3 border border-gray-200 rounded-lg">
              <DevicePhoneMobileIcon className="w-6 h-6 text-purple-600 mb-1" />
              <span className="text-xs text-gray-600 text-center">UPI</span>
            </div>
            
            <div className="flex flex-col items-center p-3 border border-gray-200 rounded-lg">
              <span className="text-sm font-bold text-orange-600 mb-1">₹</span>
              <span className="text-xs text-gray-600 text-center">Wallets</span>
            </div>
          </div>
        </div>

        {/* Security Badges */}
        <div className="flex items-center justify-center space-x-4 text-xs text-gray-600 bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center space-x-1">
            <ShieldCheckIcon className="w-4 h-4 text-green-600" />
            <span>256-bit SSL</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </span>
            <span>PCI Compliant</span>
          </div>
        </div>

        {/* Payment Button */}
        <Button
          onClick={handlePayment}
          loading={loading}
          disabled={loading || !orderDetails?.amount}
          className="w-full text-lg py-4 btn-shimmer"
          size="xl"
          icon={CreditCardIcon}
        >
          {loading ? 'Processing...' : `Pay ${formatCurrency(orderDetails?.amount ? orderDetails.amount / 100 : 0)}`}
        </Button>

        {/* Terms */}
        <p className="text-xs text-gray-500 text-center">
          By completing this purchase, you agree to our{' '}
          <a href="/terms" className="text-primary-600 hover:underline">
            Terms & Conditions
          </a>{' '}
          and{' '}
          <a href="/privacy" className="text-primary-600 hover:underline">
            Privacy Policy
          </a>
        </p>
      </CardContent>
    </Card>
  );
};

export default RazorpayCheckout;