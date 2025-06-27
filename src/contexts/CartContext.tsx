"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import type { CartItem, Service, BudgetTier } from '@/lib/types';
import { budgetItems } from '@/lib/data';

interface CartContextValue {
  cartItems: CartItem[];
  addOrUpdateItem: (service: Service, quantity: number, brief: Record<string, string>, budgetTier: BudgetTier) => void;
  removeItem: (serviceId: string) => void;
  clearCart: () => void;
  totalPrice: number;
  totalItems: number;
  paymentMethod: 'dp' | 'lunas' | null;
  setPaymentMethod: (method: 'dp' | 'lunas' | null) => void;
  getCartItem: (serviceId: string) => CartItem | undefined;
  cartShake: number;
  isCheckoutActive: boolean;
  setCheckoutActive: (isActive: boolean) => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'dp' | 'lunas' | null>(null);
  const [cartShake, setCartShake] = useState(0);
  const [isCheckoutActive, setCheckoutActive] = useState(false);

  const getCartItem = useCallback((serviceId: string) => {
    return cartItems.find(item => item.id === serviceId);
  }, [cartItems]);

  const addOrUpdateItem = useCallback((service: Service, quantity: number, brief: Record<string, string>, budgetTier: BudgetTier) => {
    const budgetName = budgetItems.find(b => b.id === budgetTier)?.title || 'Custom';
    
    setCartItems(prevItems => {
      if (quantity <= 0) {
        return prevItems.filter(item => item.id !== service.id);
      }

      const existingItemIndex = prevItems.findIndex(item => item.id === service.id);
      
      const newItemData: CartItem = {
        id: service.id,
        name: service.name,
        quantity,
        price: service.prices[budgetTier],
        brief,
        image: service.image,
        budgetTier: budgetTier,
        budgetName: budgetName,
      };

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = newItemData;
        return updatedItems;
      } else {
        return [...prevItems, newItemData];
      }
    });
    setCartShake(s => s + 1);
  }, []);

  const removeItem = useCallback((serviceId: string) => {
    setCartItems(prevItems => {
        const newItems = prevItems.filter(item => item.id !== serviceId);
        if (newItems.length === 0) {
            setCheckoutActive(false); // Hide summary if cart is emptied
        }
        return newItems;
    });
    setCartShake(s => s + 1);
  }, []);

  const clearCart = () => {
    setCartItems([]);
    setCheckoutActive(false); // Hide summary when cart is cleared
    setCartShake(s => s + 1);
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addOrUpdateItem,
        removeItem,
        clearCart,
        totalPrice,
        totalItems,
        paymentMethod,
        setPaymentMethod,
        getCartItem,
        cartShake,
        isCheckoutActive,
        setCheckoutActive,
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
