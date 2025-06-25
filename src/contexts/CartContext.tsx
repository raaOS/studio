"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import type { CartItem, Service } from '@/lib/types';

interface CartContextType {
  cartItems: CartItem[];
  addItem: (service: Service) => void;
  removeItem: (serviceId: string) => void;
  updateItemQuantity: (serviceId: string, quantity: number) => void;
  updateBrief: (serviceId: string, brief: string) => void;
  clearCart: () => void;
  totalPrice: number;
  totalItems: number;
  paymentMethod: 'dp' | 'lunas';
  setPaymentMethod: (method: 'dp' | 'lunas') => void;
  getItemQuantity: (serviceId: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'dp' | 'lunas'>('dp');

  const getItemQuantity = useCallback((serviceId: string) => {
    return cartItems.find(item => item.id === serviceId)?.quantity ?? 0;
  }, [cartItems]);

  const updateItemQuantity = useCallback((serviceId: string, quantity: number) => {
    setCartItems(prevItems => {
      const service = prevItems.find(item => item.id === serviceId);
      if (quantity <= 0) {
        return prevItems.filter(item => item.id !== serviceId);
      }
      if (service) {
        return prevItems.map(item =>
          item.id === serviceId ? { ...item, quantity } : item
        );
      }
      return prevItems;
    });
  }, []);

  const addItem = useCallback((service: Service) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === service.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === service.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...service, quantity: 1, brief: '' }];
    });
  }, []);

  const removeItem = useCallback((serviceId: string) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === serviceId);
      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map(item =>
          item.id === serviceId ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return prevItems.filter(item => item.id !== serviceId);
    });
  }, []);
  
  const updateBrief = useCallback((serviceId: string, brief: string) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === serviceId ? { ...item, brief } : item
      )
    );
  }, []);

  const clearCart = () => {
    setCartItems([]);
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItem,
        removeItem,
        updateItemQuantity,
        updateBrief,
        clearCart,
        totalPrice,
        totalItems,
        paymentMethod,
        setPaymentMethod,
        getItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
