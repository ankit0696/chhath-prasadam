// src/app/checkout/page.jsx - Checkout Page with Razorpay Integration
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import Layout from '../../components/layout/Layout';
import RazorpayCheckout from '../../components/payment/RazorpayCheckout';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { formatCurrency } from '../../lib/utils';
import Link from 'next/link';
import toast from 'react-hot-toast';
import {
  ShoppingCartIcon,
  MapPinIcon,
  PhoneIcon,
  UserIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline';

export default function CheckoutPage() {
  const [deliveryAddress, setDeliveryAddress] = useState({
    fullAddress: '',
    city: '',
    state: '',
    pincode: '',
    landmark: ''
  });
  const [addressErrors, setAddressErrors] = useState({});
  const [showPayment, setShowPayment] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const { user } = useAuth();
  const { cartItems, getCartTotals, clearCart } = useCart();
  const router = useRouter();
  const totals = getCartTotals();

  useEffect(() => {
    if (!user) {
      toast.error('Please login to continue checkout');
      router.push('/login');
      return;
    }

    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      router.push('/cart');
      return;
    }

    // Load saved address if available
    loadSavedAddress();
  }, [user, cartItems, router]);

  const loadSavedAddress = async () => {
    try {
      // You can implement saved address loading from Firestore here
      // For now, we'll use a simple local storage approach
      const savedAddress = localStorage.getItem(`address_${user.uid}`);
      if (savedAddress) {
        setDeliveryAddress(JSON.parse(savedAddress));
      }
    } catch (error) {
      console.error('Error loading saved address:', error);
    }
  };

  const validateAddress = () => {
    const errors = {};

    if (!deliveryAddress.fullAddress.trim()) {
      errors.fullAddress = 'Full address is required';
    }

    if (!deliveryAddress.city.trim()) {
      errors.city = 'City is required';
    }

    if (!deliveryAddress.state.trim()) {
      errors.state = 'State is required';
    }

    if (!deliveryAddress.pincode.trim()) {
      errors.pincode = 'PIN code is required';
    } else if (!/^\d{6}$/.test(deliveryAddress.pincode)) {
      errors.pincode = 'PIN code must be 6 digits';
    }

    setAddressErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddressChange = (field, value) => {
    setDeliveryAddress(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error for this field
    if (addressErrors[field]) {
      setAddressErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const handleProceedToPayment = async () => {
    if (!validateAddress()) {
      toast.error('Please fill all required address fields');
      return;
    }

    // Save address for future use
    try {
      localStorage.setItem(`address_${user.uid}`, JSON.stringify(deliveryAddress));
    } catch (error) {
      console.error('Error saving address:', error);
    }

    // Calculate order details
    const orderDetails = {
      subtotal: totals.subtotal,
      deliveryCharges: totals.deliveryCharges,
      tax: totals.tax,
      total: totals.total,
      amount: totals.total * 100, // Convert to paisa for Razorpay
      itemCount: totals.itemCount
    };

    setOrderDetails(orderDetails);
    setShowPayment(true);
  };

  const handlePaymentSuccess = (paymentData) => {
    toast.success('🎉 Payment successful! Redirecting to confirmation page...');
    // RazorpayCheckout component will handle the redirect
  };

  const handlePaymentFailure = (error) => {
    toast.error(`Payment failed: ${error}`);
    setShowPayment(false);
  };

  const handleEditAddress = () => {
    setShowPayment(false);
  };

  if (!user) {
    return null;
  }

  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Card variant="elevated" className="max-w-md mx-auto text-center">
            <CardContent className="p-8">
              <ShoppingCartIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Cart is Empty</h1>
              <p className="text-gray-600 mb-6">
                Add some authentic Chhath prasad items to continue with checkout.
              </p>
              <Link href="/products">
                <Button size="lg">Browse Products</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-8">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="heading-2 mb-2">🛒 Checkout</h1>
            <p className="text-gray-600">
              Complete your order for authentic Chhath prasad
            </p>
          </div>

          {!showPayment ? (
            /* Address Collection */
            <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Address Form */}
              <div className="lg:col-span-2">
                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MapPinIcon className="w-5 h-5 text-primary-600" />
                      <span>Delivery Address</span>
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <Input
                      label="Full Address"
                      placeholder="House/Building number, Street, Area..."
                      value={deliveryAddress.fullAddress}
                      onChange={(e) => handleAddressChange('fullAddress', e.target.value)}
                      error={!!addressErrors.fullAddress}
                      errorMessage={addressErrors.fullAddress}
                      required
                      leftIcon={MapPinIcon}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="City"
                        placeholder="Enter city"
                        value={deliveryAddress.city}
                        onChange={(e) => handleAddressChange('city', e.target.value)}
                        error={!!addressErrors.city}
                        errorMessage={addressErrors.city}
                        required
                      />

                      <Input
                        label="State"
                        placeholder="Enter state"
                        value={deliveryAddress.state}
                        onChange={(e) => handleAddressChange('state', e.target.value)}
                        error={!!addressErrors.state}
                        errorMessage={addressErrors.state}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="PIN Code"
                        placeholder="6-digit PIN code"
                        value={deliveryAddress.pincode}
                        onChange={(e) => handleAddressChange('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))}
                        error={!!addressErrors.pincode}
                        errorMessage={addressErrors.pincode}
                        required
                        type="text"
                        inputMode="numeric"
                      />

                      <Input
                        label="Landmark (Optional)"
                        placeholder="Near landmark"
                        value={deliveryAddress.landmark}
                        onChange={(e) => handleAddressChange('landmark', e.target.value)}
                      />
                    </div>

                    {/* Contact Information */}
                    <div className="border-t border-gray-200 pt-4">
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                        <PhoneIcon className="w-4 h-4" />
                        <span>Contact Information</span>
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          label="Phone Number"
                          value={user.phoneNumber || ''}
                          disabled
                          leftIcon={PhoneIcon}
                        />

                        <Input
                          label="Email (Optional)"
                          value={user.email || ''}
                          disabled
                          leftIcon={UserIcon}
                        />
                      </div>
                    </div>

                    {/* Delivery Instructions */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">📋 Delivery Instructions</h4>
                      <ul className="text-blue-700 text-sm space-y-1">
                        <li>• Fresh prasad will be delivered within 2-3 business days</li>
                        <li>• Free delivery for orders above ₹500</li>
                        <li>• Call us if you need faster delivery for special occasions</li>
                        <li>• Ensure someone is available to receive the order</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div className="space-y-6">
                <Card variant="gradient">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                    <Badge variant="info" size="sm">
                      {totals.itemCount} {totals.itemCount === 1 ? 'item' : 'items'}
                    </Badge>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-amber-100 rounded-lg flex items-center justify-center">
                          <span className="text-lg">🪔</span>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-semibold">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}

                    <div className="border-t border-gray-200 pt-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span>{formatCurrency(totals.subtotal)}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600">Delivery</span>
                        <span className={totals.deliveryCharges === 0 ? 'text-green-600' : ''}>
                          {totals.deliveryCharges === 0 ? 'FREE' : formatCurrency(totals.deliveryCharges)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax (5% GST)</span>
                        <span>{formatCurrency(totals.tax)}</span>
                      </div>
                      
                      <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2">
                        <span>Total</span>
                        <span className="text-primary-600">{formatCurrency(totals.total)}</span>
                      </div>
                    </div>

                    {totals.subtotal < 500 && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <p className="text-yellow-800 text-sm">
                          Add {formatCurrency(500 - totals.subtotal)} more for FREE delivery!
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button 
                    onClick={handleProceedToPayment}
                    className="w-full text-lg py-3 btn-shimmer"
                    size="lg"
                    icon={CreditCardIcon}
                  >
                    Proceed to Payment
                  </Button>

                  <Link href="/cart">
                    <Button variant="outline" className="w-full" size="lg">
                      Back to Cart
                    </Button>
                  </Link>
                </div>

                {/* Trust Indicators */}
                <div className="text-center text-sm text-gray-600 space-y-1">
                  <div className="flex items-center justify-center space-x-1">
                    <span>🔒</span>
                    <span>Secure SSL Payment</span>
                  </div>
                  <div className="flex items-center justify-center space-x-1">
                    <span>✅</span>
                    <span>100% Authentic Prasad</span>
                  </div>
                  <div className="flex items-center justify-center space-x-1">
                    <span>🚚</span>
                    <span>Fast & Fresh Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Payment Section */
            <div className="max-w-4xl mx-auto">
              {/* Address Confirmation */}
              <Card variant="elevated" className="mb-6">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Delivering to:</h3>
                      <p className="text-gray-700">{deliveryAddress.fullAddress}</p>
                      <p className="text-gray-600">
                        {deliveryAddress.city}, {deliveryAddress.state} - {deliveryAddress.pincode}
                      </p>
                    </div>
                    <Button 
                      onClick={handleEditAddress}
                      variant="outline" 
                      size="sm"
                    >
                      Edit Address
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Razorpay Checkout */}
              <RazorpayCheckout
                orderDetails={orderDetails}
                deliveryAddress={deliveryAddress}
                onSuccess={handlePaymentSuccess}
                onFailure={handlePaymentFailure}
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}