
'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { TrackOrderForm } from '@/components/TrackOrderForm';

export default function TrackOrderPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16 flex items-center justify-center">
        <TrackOrderForm />
      </main>
      <Footer />
    </div>
  );
}
