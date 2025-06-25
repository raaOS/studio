"use client";

import { useMemo } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

import { services, budgetItems } from '@/lib/data';
import type { Service } from '@/lib/types';
import { ServiceCard } from '@/components/ServiceCard';
import { OrderSummary } from '@/components/OrderSummary';
import { useIsMobile } from '@/hooks/use-mobile';
import { FloatingCart } from '@/components/FloatingCart';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function CatalogPage() {
  const params = useParams();
  const budgetType = params.budget as string;
  const isMobile = useIsMobile();

  const budgetInfo = useMemo(() => budgetItems.find(b => b.id === budgetType), [budgetType]);
  
  const filteredServices = useMemo(() => {
    return services.filter(service => service.budgets.includes(budgetType as any));
  }, [budgetType]);
  
  const serviceCategories = useMemo(() => {
    return filteredServices.reduce((acc, service) => {
        (acc[service.category] = acc[service.category] || []).push(service);
        return acc;
    }, {} as Record<string, Service[]>);
  }, [filteredServices]);

  if (!budgetInfo || filteredServices.length === 0) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-primary flex items-center gap-1"><Home className="h-4 w-4" /> Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span>Budget {budgetInfo.title}</span>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-foreground">Katalog</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8 xl:col-span-9">
            {Object.entries(serviceCategories).map(([category, servicesInCategory], categoryIndex) => (
                <div key={category} className="mb-12">
                    <motion.h2 
                        className="text-3xl font-headline font-bold mb-6"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                    >
                        {category}
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {servicesInCategory.map((service, serviceIndex) => (
                             <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: (categoryIndex * 0.1) + (serviceIndex * 0.05) }}
                            >
                                <ServiceCard service={service} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            ))}
          </div>
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-3">
            <div className="sticky top-24">
              <OrderSummary />
            </div>
          </aside>
        </div>
      </main>

      {isMobile && <FloatingCart />}
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
