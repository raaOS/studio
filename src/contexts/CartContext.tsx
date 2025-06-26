
"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import type { CartItem, Service, BudgetItem } from '@/lib/types';

interface CartContextType {
  cartItems: CartItem[];
  updateItemQuantity: (service: Service, quantity: number) => void;
  updateBrief: (serviceId: string, field: string, value: string) => void;
  addOrUpdateItem: (service: Service, quantity: number, brief: Record<string, string>) => void;
  clearCart: () => void;
  totalPrice: number;
  totalItems: number;
  paymentMethod: 'dp' | 'lunas' | null;
  setPaymentMethod: (method: 'dp' | 'lunas' | null) => void;
  getItemQuantity: (serviceId: string) => number;
  getItemBrief: (serviceId: string) => Record<string, string>;
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

  const getItemBrief = useCallback((serviceId: string) => {
    return cartItems.find(item => item.id === serviceId)?.brief ?? {};
  }, [cartItems]);

  const addOrUpdateItem = useCallback((service: Service, quantity: number, brief: Record<string, string>) => {
    if (!selectedBudget) {
      console.error("Budget not selected. Cannot add or update item.");
      return;
    }
    
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === service.id);
      
      if (quantity <= 0) {
        return prevItems.filter(item => item.id !== service.id);
      }

      const newItemData: CartItem = {
        ...service,
        quantity,
        price: service.prices[selectedBudget.id],
        brief,
      };

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = newItemData;
        return updatedItems;
      } else {
        return [...prevItems, newItemData];
      }
    });
  }, [selectedBudget]);
  
  const updateItemQuantity = useCallback((service: Service, quantity: number) => {
    if (!selectedBudget) return;
    const currentBrief = cartItems.find(item => item.id === service.id)?.brief ?? {};
    addOrUpdateItem(service, quantity, currentBrief);
  }, [selectedBudget, cartItems, addOrUpdateItem]);
  
  const updateBrief = useCallback((serviceId: string, field: string, value: string) => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id === serviceId) {
          const newBrief = { ...item.brief, [field]: value };
          return { ...item, brief: newBrief };
        }
        return item;
      })
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
        addOrUpdateItem,
        clearCart,
        totalPrice,
        totalItems,
        paymentMethod,
        setPaymentMethod,
        getItemQuantity,
        getItemBrief,
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
