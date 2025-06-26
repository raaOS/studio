
"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import type { CartItem, Service, BudgetItem } from '@/lib/types';
import { services as allServices } from '@/lib/data';

interface CartContextType {
  cartItems: CartItem[];
  updateItemQuantity: (service: Service, quantity: number) => void;
  updateBrief: (serviceId: string, field: string, value: string) => void;
  clearCart: () => void;
  totalPrice: number;
  totalItems: number;
  paymentMethod: 'dp' | 'lunas' | null;
  setPaymentMethod: (method: 'dp' | 'lunas' | null) => void;
  getItemQuantity: (serviceId: string) => number;
  selectedBudget: BudgetItem | null;
  setSelectedBudget: (budget: BudgetItem | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'dp' | 'lunas' | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<BudgetItem | null>(null);

  const getItemQuantity = useCallback((serviceId: string) => {
    return cartItems.find(item => item.id === serviceId)?.quantity ?? 0;
  }, [cartItems]);

  const updateItemQuantity = useCallback((service: Service, quantity: number) => {
    if (!selectedBudget) {
      console.error("Budget not selected. Cannot update item quantity.");
      return;
    }
    
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === service.id);
      
      if (quantity <= 0) {
        return prevItems.filter(item => item.id !== service.id);
      }
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === service.id ? { ...item, quantity } : item
        );
      } else {
        const price = service.prices[selectedBudget.id];
        return [...prevItems, { ...service, quantity, price, brief: {} }];
      }
    });
  }, [selectedBudget]);
  
  const updateBrief = useCallback((serviceId: string, field: string, value: string) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === serviceId 
          ? { ...item, brief: { ...item.brief, [field]: value } } 
          : item
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
        updateItemQuantity,
        updateBrief,
        clearCart,
        totalPrice,
        totalItems,
        paymentMethod,
        setPaymentMethod,
        getItemQuantity,
        selectedBudget,
        setSelectedBudget
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
