"use client";

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { BudgetItem, Service } from '@/lib/types';
import { budgetItems, services } from '@/lib/data';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CustomerForm } from '@/components/CustomerForm';
import { ServiceCard } from '@/components/ServiceCard';
import { OrderSummary } from '@/components/OrderSummary';
import { useIsMobile } from '@/hooks/use-mobile';
import { FloatingCart } from '@/components/FloatingCart';
import { CartProvider } from '@/contexts/CartContext';

// This component contains the actual page content and uses the cart context.
function OrderWorkflow() {
  const [selectedBudget, setSelectedBudget] = useState<BudgetItem | null>(null);
  const [customerDataSubmitted, setCustomerDataSubmitted] = useState(false);
  const isMobile = useIsMobile();
  
  const handleBudgetSelect = (budget: BudgetItem) => {
    setSelectedBudget(budget);
    setCustomerDataSubmitted(false); // Reset if budget changes
    setTimeout(() => {
        document.getElementById('customer-form-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };
  
  const handleCustomerSuccess = () => {
    setCustomerDataSubmitted(true);
    setTimeout(() => {
        document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const filteredServices = useMemo(() => {
    if (!selectedBudget) return [];
    return services.filter(service => service.budgets.includes(selectedBudget.id as any));
  }, [selectedBudget]);

  const serviceCategories = useMemo(() => {
    if (!filteredServices) return {};
    return filteredServices.reduce((acc, service) => {
        (acc[service.category] = acc[service.category] || []).push(service);
        return acc;
    }, {} as Record<string, Service[]>);
  }, [filteredServices]);


  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Step 1: Budget Selection */}
        <section className="text-center py-16 md:py-24 px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-headline font-bold text-foreground mb-4"
          >
            Wujudkan Desain Impian Anda
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Pilih paket yang sesuai dengan budget Anda dan biarkan kami yang urus sisanya.
          </motion.p>
        </section>

        <section className="px-4">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {budgetItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                <Card className={`text-center h-full flex flex-col hover:shadow-lg transition-all duration-300 ${selectedBudget?.id === item.id ? 'border-primary ring-2 ring-primary' : 'hover:border-primary'}`}>
                  <CardHeader>
                    <item.icon className="mx-auto h-12 w-12 text-primary mb-4" />
                    <CardTitle className="font-headline">{item.title}</CardTitle>
                    <CardDescription>{item.priceRange}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-between">
                    <p className="text-muted-foreground mb-6">{item.description}</p>
                    <Button onClick={() => handleBudgetSelect(item)} className="w-full">
                      Pilih Paket Ini <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Step 2: Customer Form */}
        <AnimatePresence>
          {selectedBudget && (
            <motion.section
              id="customer-form-section"
              className="mt-16 md:mt-24 px-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <CustomerForm selectedBudget={selectedBudget} onSuccess={handleCustomerSuccess} />
            </motion.section>
          )}
        </AnimatePresence>
        
        {/* Step 3: Catalog and Order Summary */}
        <AnimatePresence>
        {customerDataSubmitted && selectedBudget && (
            <motion.section
                id="catalog-section"
                className="container mx-auto px-4 py-8 flex-grow mt-16 md:mt-24"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-8">
                    <div className="lg:col-span-8 xl:col-span-9">
                        <h2 className="text-3xl font-headline font-bold mb-8">Langkah 3: Pilih Layanan untuk Budget {selectedBudget.title}</h2>
                        {Object.entries(serviceCategories).map(([category, servicesInCategory], categoryIndex) => (
                            <div key={category} className="mb-12">
                                <motion.h3
                                    className="text-2xl font-headline font-bold mb-6"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                                >
                                    {category}
                                </motion.h3>
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
            </motion.section>
        )}
        </AnimatePresence>
      </main>
      {isMobile && <FloatingCart />}
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
