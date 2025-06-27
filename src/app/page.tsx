
"use client";

import { useMemo } from 'react';
import Image from 'next/image';

// Components
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { OrderSummary } from '@/components/OrderSummary';
import { FloatingCart } from '@/components/FloatingCart';
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


function HomePageContent() {

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
                {categoryOrder.map((categoryName) => {
                  const category = mockCategories.find(c => c.name === categoryName);
                  if (!category) return null;

                  const servicesInCategory = services.filter(s => s.category === category.id);
                  if (servicesInCategory.length === 0) return null;

                  return (
                    <div key={category.id}>
                      <ProductCarousel 
                        title={category.name} 
                        services={servicesInCategory} 
                        categoryId={category.id} 
                      />
                      {category.name === 'Branding & Kantor' && <CouponInfoSection />}
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
      
      <FloatingCart />
      <Footer />
    </div>
  );
}

// The main page component now wraps the workflow in the CartProvider.
export default function Home() {
  return (
    <CartProvider>
      <HomePageContent />
    </CartProvider>
  )
}
