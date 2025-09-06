// src/contexts/CartContext.jsx
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';
import { storage } from '../lib/utils';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Load cart from localStorage on mount
  useEffect(() => {
    loadCart();
  }, [user]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      saveCart();
    }
  }, [cartItems, user]);

  const getCartKey = () => {
    return user ? `cart_${user.uid}` : 'cart_guest';
  };

  const loadCart = () => {
    try {
      const cartKey = getCartKey();
      const savedCart = storage.get(cartKey);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart || []);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
      setCartItems([]);
    }
  };

  const saveCart = () => {
    try {
      const cartKey = getCartKey();
      storage.set(cartKey, JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  };

  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    setLoading(true);
    
    try {
      const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
      
      if (existingItemIndex > -1) {
        // Update quantity if item exists
        const updatedCart = [...cartItems];
        const newQuantity = updatedCart[existingItemIndex].quantity + quantity;
        
        // Check stock limit
        if (newQuantity > product.stock) {
          toast.error(`Only ${product.stock} items available in stock`);
          return false;
        }
        
        updatedCart[existingItemIndex].quantity = newQuantity;
        setCartItems(updatedCart);
        toast.success(`${product.name} quantity updated in cart`);
      } else {
        // Add new item to cart
        if (quantity > product.stock) {
          toast.error(`Only ${product.stock} items available in stock`);
          return false;
        }
        
        const cartItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          imageURL: product.imageURL,
          category: product.category,
          availability: product.availability,
          stock: product.stock,
          quantity: quantity,
          addedAt: new Date().toISOString()
        };
        
        setCartItems(prevItems => [...prevItems, cartItem]);
        toast.success(`${product.name} added to cart`);
      }
      
      return true;
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    try {
      const updatedCart = cartItems.filter(item => item.id !== productId);
      setCartItems(updatedCart);
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove item');
    }
  };

  // Update item quantity
  const updateQuantity = (productId, newQuantity) => {
    try {
      if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
      }

      const updatedCart = cartItems.map(item => {
        if (item.id === productId) {
          if (newQuantity > item.stock) {
            toast.error(`Only ${item.stock} items available`);
            return item;
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      
      setCartItems(updatedCart);
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Failed to update quantity');
    }
  };

  // Clear entire cart
  const clearCart = () => {
    try {
      setCartItems([]);
      toast.success('Cart cleared');
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart');
    }
  };

  // Get cart totals
  const getCartTotals = () => {
    const subtotal = cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
    
    const originalSubtotal = cartItems.reduce((total, item) => {
      const price = item.originalPrice || item.price;
      return total + (price * item.quantity);
    }, 0);
    
    const savings = originalSubtotal - subtotal;
    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    
    // Calculate delivery charges (free above ₹500)
    const deliveryCharges = subtotal >= 500 ? 0 : 50;
    
    // Calculate tax (5% GST)
    const tax = Math.round(subtotal * 0.05);
    
    const total = subtotal + deliveryCharges + tax;
    
    return {
      subtotal,
      originalSubtotal,
      savings,
      itemCount,
      deliveryCharges,
      tax,
      total
    };
  };

  // Check if item is in cart
  const isInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  // Get item quantity in cart
  const getItemQuantity = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  // Validate cart before checkout
  const validateCart = async () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return false;
    }

    // Check if all items are still available
    const unavailableItems = cartItems.filter(item => !item.availability);
    if (unavailableItems.length > 0) {
      toast.error('Some items in your cart are no longer available');
      return false;
    }

    return true;
  };

  const value = {
    cartItems,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotals,
    isInCart,
    getItemQuantity,
    validateCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};