
"use client";

import { useMemo, useState } from 'react';
import Image from 'next/image';

// Components
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { OrderSummary } from '@/components/OrderSummary';
import { FloatingCart } from '@/components/FloatingCart';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ProductCarousel } from '@/components/ProductCarousel';
import { PromotionalBannerCarousel } from '@/components/PromotionalBannerCarousel';
import { PortfolioSection } from '@/components/PortfolioSection';
import { CouponInfoSection } from '@/components/CouponInfoSection';
import { TrackOrderForm } from '@/components/TrackOrderForm';

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

  const categoryOrder = [
    'Konten Media Sosial',
    'Branding & Kantor',
    'Materi Promosi',
    'Desain Digital & Event',
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <PortfolioSection />
        <PromotionalBannerCarousel />

        {/* Catalog */}
        <section id="catalog-section" className="pt-10 pb-16">
            <div className="container mx-auto px-4 space-y-8">
                {categoryOrder.map((category) => {
                  const servicesInCategory = serviceCategories[category];
                  if (!servicesInCategory) return null;

                  return (
                    <div key={category}>
                      <ProductCarousel title={category} services={servicesInCategory} />
                      {category === 'Branding & Kantor' && <CouponInfoSection />}
                    </div>
                  );
                })}
            </div>
        </section>

        {/* Desktop-only Track Order & Order Summary */}
        <section id="summary-section" className="hidden md:block container mx-auto px-4 pb-16">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div>
                     <h2 className="text-2xl font-headline font-semibold text-foreground text-center mb-10">Lacak Status Pesanan Anda</h2>
                     <TrackOrderForm />
                </div>
                 <div>
                    <h2 className="text-2xl font-headline font-semibold text-foreground text-center mb-10">Periksa & Kirim Pesanan Anda</h2>
                    <OrderSummary />
                </div>
            </div>
        </section>
      </main>

      <Dialog open={!!modalImage} onOpenChange={(isOpen) => !isOpen && setModalImage(null)}>
        <DialogContent className="p-0 border-0 max-w-4xl bg-transparent shadow-none">
          <div className="sr-only">
            <DialogTitle>{modalImage?.alt}</DialogTitle>
            <DialogDescription>Gambar pratinjau untuk {modalImage?.alt}</DialogDescription>
          </div>
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
