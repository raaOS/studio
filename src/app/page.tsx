
"use client";

import { useMemo, useState } from 'react';
import Image from 'next/image';

// Components
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { OrderSummary } from '@/components/OrderSummary';
import { FloatingCart } from '@/components/FloatingCart';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ProductCarousel } from '@/components/ProductCarousel';

// Context
import { CartProvider } from '@/contexts/CartContext';

// Data & Types
import { services, mockCategories } from '@/lib/data';
import type { Service } from '@/lib/types';


function OrderWorkflow() {
  const [modalImage, setModalImage] = useState<{src: string, alt: string} | null>(null);

  const serviceCategories = useMemo(() => {
    return services.reduce((acc, service) => {
        const categoryName = mockCategories.find(c => c.id === service.category)?.name || 'Lainnya';
        (acc[categoryName] = acc[categoryName] || []).push(service);
        return acc;
    }, {} as Record<string, Service[]>);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container mx-auto px-4 flex-grow">
        <main className="space-y-8 pt-10 pb-16">
          
          {/* Catalog */}
          <section id="catalog-section" className="pt-8 flex-grow">
              <div className="text-center mb-10">
                  <h2 className="text-2xl font-headline font-semibold text-foreground">Langkah 1: Pilih layanan yang Anda butuhkan</h2>
                  <p className="text-sm text-muted-foreground mt-2 max-w-2xl mx-auto">Scroll ke bawah dan masukkin semua yang kamu butuhin ke keranjang.</p>
              </div>
              <div className="space-y-8">
                  {Object.entries(serviceCategories).map(([category, servicesInCategory]) => (
                      <ProductCarousel key={category} title={category} services={servicesInCategory} />
                  ))}
              </div>
          </section>

          {/* Order Summary */}
          <section id="summary-section" className="pt-16 hidden md:block">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-headline font-semibold text-foreground">Langkah 2: Periksa & Kirim Pesanan Anda</h2>
              <p className="text-sm text-muted-foreground mt-2 max-w-2xl mx-auto">Pastikan semua sudah benar sebelum mengisi data diri dan mengirim pesanan.</p>
            </div>
            <div className="max-w-3xl mx-auto">
              <OrderSummary />
            </div>
          </section>
        </main>
      </div>


      <Dialog open={!!modalImage} onOpenChange={(isOpen) => !isOpen && setModalImage(null)}>
        <DialogContent className="p-0 border-0 max-w-4xl bg-transparent shadow-none">
            <DialogTitle className="sr-only">{modalImage?.alt}</DialogTitle>
            <DialogDescription className="sr-only">
                Gambar pratinjau untuk {modalImage?.alt}
            </DialogDescription>
            {modalImage && (
                <Image 
                    src={modalImage.src} 
                    alt={modalImage.alt} 
                    width={1200}
                    height={1200}
                    className="object-contain w-full h-auto rounded-lg"
                />
            )}
        </DialogContent>
      </Dialog>
      
      <FloatingCart />
      <Footer />
    </div>
  );
}

// The main page component now wraps the workflow in the CartProvider.
export default function Home() {
  return (
    <CartProvider>
      <OrderWorkflow />
    </CartProvider>
  )
}
