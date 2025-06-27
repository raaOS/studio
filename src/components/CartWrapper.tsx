
"use client";

import { CartProvider } from '@/contexts/CartContext';
import React from 'react';

export function CartWrapper({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
}
