// functions/index.js - Complete Razorpay Integration
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const Razorpay = require('razorpay');
const crypto = require('crypto');

// Initialize Firebase Admin
admin.initializeApp();

// Initialize Razorpay
const getRazorpayInstance = () => {
  return new Razorpay({
    key_id: functions.config().razorpay.key_id,
    key_secret: functions.config().razorpay.key_secret,
  });
};

// Create Razorpay Order
exports.createRazorpayOrder = functions.https.onCall(async (data, context) => {
  try {
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }

    const { amount, currency = 'INR', orderItems, deliveryAddress, phoneNumber } = data;

    if (!amount || !orderItems || !deliveryAddress || !phoneNumber) {
      throw new functions.https.HttpsError('invalid-argument', 'Missing required order data');
    }

    if (amount < 100 || amount > 5000000) {
      throw new functions.https.HttpsError('invalid-argument', 'Invalid amount: must be between ₹1 and ₹50,000');
    }

    const userId = context.auth.uid;
    
    const orderData = {
      userId,
      items: orderItems,
      amount: amount,
      currency,
      deliveryAddress,
      phoneNumber,
      status: 'pending',
      razorpayOrderId: null,
      paymentId: null,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    const orderRef = await admin.firestore().collection('orders').add(orderData);
    const orderId = orderRef.id;

    const razorpay = getRazorpayInstance();
    const razorpayOrder = await razorpay.orders.create({
      amount: amount,
      currency: currency,
      receipt: orderId,
      notes: {
        orderId: orderId,
        userId: userId,
        phoneNumber: phoneNumber
      }
    });

    await orderRef.update({
      razorpayOrderId: razorpayOrder.id,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    functions.logger.info('Razorpay order created', { orderId, razorpayOrderId: razorpayOrder.id, amount, userId });

    return {
      success: true,
      orderId: orderId,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: functions.config().razorpay.key_id
    };

  } catch (error) {
    functions.logger.error('Error creating Razorpay order:', error);
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }
    throw new functions.https.HttpsError('internal', 'Failed to create order: ' + error.message);
  }
});

// Verify Razorpay Payment
exports.verifyRazorpayPayment = functions.https.onCall(async (data, context) => {
  try {
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }

    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, orderId } = data;

    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature || !orderId) {
      throw new functions.https.HttpsError('invalid-argument', 'Missing required payment data');
    }

    const userId = context.auth.uid;
    const orderDoc = await admin.firestore().collection('orders').doc(orderId).get();
    
    if (!orderDoc.exists) {
      throw new functions.https.HttpsError('not-found', 'Order not found');
    }

    const orderData = orderDoc.data();
    if (orderData.userId !== userId) {
      throw new functions.https.HttpsError('permission-denied', 'Order does not belong to user');
    }

    // Verify signature
    const keySecret = functions.config().razorpay.key_secret;
    const generatedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest('hex');

    if (generatedSignature !== razorpaySignature) {
      await admin.firestore().collection('orders').doc(orderId).update({
        status: 'failed',
        failureReason: 'Invalid payment signature',
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      throw new functions.https.HttpsError('invalid-argument', 'Invalid payment signature');
    }

    const razorpay = getRazorpayInstance();
    const payment = await razorpay.payments.fetch(razorpayPaymentId);

    if (payment.status !== 'captured' && payment.status !== 'authorized') {
      await admin.firestore().collection('orders').doc(orderId).update({
        status: 'failed',
        failureReason: `Payment status: ${payment.status}`,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      throw new functions.https.HttpsError('failed-precondition', 'Payment not successful');
    }

    // Update order to paid
    await admin.firestore().collection('orders').doc(orderId).update({
      status: 'paid',
      paymentId: razorpayPaymentId,
      paymentDetails: {
        id: payment.id,
        amount: payment.amount,
        currency: payment.currency,
        status: payment.status,
        method: payment.method,
        created_at: payment.created_at
      },
      paidAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    functions.logger.info('Payment verified successfully', { orderId, razorpayPaymentId, amount: payment.amount, userId });

    return {
      success: true,
      orderId: orderId,
      paymentId: razorpayPaymentId,
      amount: payment.amount,
      currency: payment.currency,
      status: 'paid'
    };

  } catch (error) {
    functions.logger.error('Error verifying payment:', error);
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }
    throw new functions.https.HttpsError('internal', 'Failed to verify payment: ' + error.message);
  }
});

// Handle Payment Failure
exports.handlePaymentFailure = functions.https.onCall(async (data, context) => {
  try {
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }

    const { orderId, errorDescription, errorReason } = data;
    if (!orderId) {
      throw new functions.https.HttpsError('invalid-argument', 'Order ID is required');
    }

    const userId = context.auth.uid;
    const orderDoc = await admin.firestore().collection('orders').doc(orderId).get();
    
    if (!orderDoc.exists) {
      throw new functions.https.HttpsError('not-found', 'Order not found');
    }

    const orderData = orderDoc.data();
    if (orderData.userId !== userId) {
      throw new functions.https.HttpsError('permission-denied', 'Order does not belong to user');
    }

    await admin.firestore().collection('orders').doc(orderId).update({
      status: 'failed',
      failureReason: errorDescription || errorReason || 'Payment failed',
      failedAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    functions.logger.info('Payment failure recorded', { orderId, errorDescription, userId });

    return {
      success: true,
      message: 'Payment failure recorded'
    };

  } catch (error) {
    functions.logger.error('Error handling payment failure:', error);
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }
    throw new functions.https.HttpsError('internal', 'Failed to record payment failure');
  }
});

// Get Order Details
exports.getOrderDetails = functions.https.onCall(async (data, context) => {
  try {
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }

    const { orderId } = data;
    if (!orderId) {
      throw new functions.https.HttpsError('invalid-argument', 'Order ID is required');
    }

    const userId = context.auth.uid;
    const orderDoc = await admin.firestore().collection('orders').doc(orderId).get();
    
    if (!orderDoc.exists) {
      throw new functions.https.HttpsError('not-found', 'Order not found');
    }

    const orderData = orderDoc.data();
    if (orderData.userId !== userId) {
      throw new functions.https.HttpsError('permission-denied', 'Order does not belong to user');
    }

    return {
      success: true,
      order: {
        id: orderId,
        ...orderData,
        createdAt: orderData.createdAt?.toDate()?.toISOString(),
        updatedAt: orderData.updatedAt?.toDate()?.toISOString(),
        paidAt: orderData.paidAt?.toDate()?.toISOString(),
        failedAt: orderData.failedAt?.toDate()?.toISOString(),
      }
    };

  } catch (error) {
    functions.logger.error('Error getting order details:', error);
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }
    throw new functions.https.HttpsError('internal', 'Failed to get order details');
  }
});
