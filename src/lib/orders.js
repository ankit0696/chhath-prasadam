// src/lib/orders.js
import { 
  collection, 
  doc, 
  addDoc, 
  getDoc,
  getDocs, 
  updateDoc,
  query, 
  where, 
  orderBy,
  onSnapshot 
} from 'firebase/firestore';
import { db } from '../firebase/config';

export const orderOperations = {
  // Create new order
  createOrder: async (orderData) => {
    try {
      const ordersRef = collection(db, 'orders');
      const newOrder = {
        ...orderData,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
        orderNumber: generateOrderNumber(),
        paymentStatus: 'pending',
        deliveryStatus: 'processing'
      };
      
      const docRef = await addDoc(ordersRef, newOrder);
      return {
        id: docRef.id,
        ...newOrder
      };
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  // Get order by ID
  getOrderById: async (orderId) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      const snapshot = await getDoc(orderRef);
      
      if (snapshot.exists()) {
        return {
          id: snapshot.id,
          ...snapshot.data()
        };
      } else {
        throw new Error('Order not found');
      }
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  },

  // Get orders for a user
  getUserOrders: async (userId) => {
    try {
      const ordersRef = collection(db, 'orders');
      const q = query(
        ordersRef, 
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      
      const orders = [];
      snapshot.forEach((doc) => {
        orders.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return orders;
    } catch (error) {
      console.error('Error fetching user orders:', error);
      throw error;
    }
  },

  // Update order status
  updateOrderStatus: async (orderId, status, additionalData = {}) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      const updateData = {
        status,
        ...additionalData,
        updatedAt: new Date()
      };
      
      await updateDoc(orderRef, updateData);
      return true;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  },

  // Update payment status
  updatePaymentStatus: async (orderId, paymentStatus, paymentDetails = {}) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      const updateData = {
        paymentStatus,
        paymentDetails,
        updatedAt: new Date()
      };
      
      if (paymentStatus === 'completed') {
        updateData.paidAt = new Date();
      }
      
      await updateDoc(orderRef, updateData);
      return true;
    } catch (error) {
      console.error('Error updating payment status:', error);
      throw error;
    }
  },

  // Subscribe to order updates
  subscribeToOrder: (orderId, callback) => {
    const orderRef = doc(db, 'orders', orderId);
    
    return onSnapshot(orderRef, (doc) => {
      if (doc.exists()) {
        callback({
          id: doc.id,
          ...doc.data()
        });
      } else {
        callback(null);
      }
    });
  },

  // Get order statistics
  getOrderStats: async (userId) => {
    try {
      const ordersRef = collection(db, 'orders');
      const q = query(ordersRef, where('userId', '==', userId));
      const snapshot = await getDocs(q);
      
      let totalOrders = 0;
      let totalAmount = 0;
      let completedOrders = 0;
      
      snapshot.forEach((doc) => {
        const order = doc.data();
        totalOrders++;
        totalAmount += order.total || 0;
        if (order.status === 'completed') {
          completedOrders++;
        }
      });
      
      return {
        totalOrders,
        totalAmount,
        completedOrders,
        averageOrderValue: totalOrders > 0 ? totalAmount / totalOrders : 0
      };
    } catch (error) {
      console.error('Error fetching order stats:', error);
      throw error;
    }
  }
};

// Generate unique order number
function generateOrderNumber() {
  const prefix = 'CP'; // Chhath Prasadam
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}${timestamp}${random}`;
}

// Order status mapping for display
export const orderStatusConfig = {
  pending: {
    label: 'Order Placed',
    color: 'text-orange-600 bg-orange-100',
    description: 'Your order has been placed and is being processed'
  },
  confirmed: {
    label: 'Confirmed',
    color: 'text-blue-600 bg-blue-100',
    description: 'Your order has been confirmed and is being prepared'
  },
  preparing: {
    label: 'Preparing',
    color: 'text-yellow-600 bg-yellow-100',
    description: 'Your prasad is being prepared with care'
  },
  shipped: {
    label: 'Shipped',
    color: 'text-purple-600 bg-purple-100',
    description: 'Your order is on the way'
  },
  delivered: {
    label: 'Delivered',
    color: 'text-green-600 bg-green-100',
    description: 'Your prasad has been delivered successfully'
  },
  cancelled: {
    label: 'Cancelled',
    color: 'text-red-600 bg-red-100',
    description: 'This order has been cancelled'
  }
};

// Payment status mapping
export const paymentStatusConfig = {
  pending: {
    label: 'Payment Pending',
    color: 'text-orange-600 bg-orange-100',
    icon: '⏳'
  },
  completed: {
    label: 'Payment Completed',
    color: 'text-green-600 bg-green-100',
    icon: '✅'
  },
  failed: {
    label: 'Payment Failed',
    color: 'text-red-600 bg-red-100',
    icon: '❌'
  },
  refunded: {
    label: 'Refunded',
    color: 'text-blue-600 bg-blue-100',
    icon: '↩️'
  }
};

// Delivery status mapping
export const deliveryStatusConfig = {
  processing: {
    label: 'Processing',
    color: 'text-orange-600',
    description: 'Order is being processed'
  },
  packed: {
    label: 'Packed',
    color: 'text-blue-600',
    description: 'Order has been packed'
  },
  shipped: {
    label: 'Shipped',
    color: 'text-purple-600',
    description: 'Order is on the way'
  },
  out_for_delivery: {
    label: 'Out for Delivery',
    color: 'text-indigo-600',
    description: 'Order is out for delivery'
  },
  delivered: {
    label: 'Delivered',
    color: 'text-green-600',
    description: 'Order has been delivered'
  }
};