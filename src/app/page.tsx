"use client";

import { CartProvider } from '@/contexts/CartContext';
import { OrderWorkflow } from '@/components/OrderWorkflow';

// The main page component now wraps the workflow in the CartProvider.
export default function Home() {
  return (
    <CartProvider>
      <OrderWorkflow />
    </CartProvider>
  )
}
