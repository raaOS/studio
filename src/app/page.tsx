"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { BudgetItem } from '@/lib/types';
import { budgetItems } from '@/lib/data';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CustomerForm } from '@/components/CustomerForm';

export default function Home() {
  const [selectedBudget, setSelectedBudget] = useState<BudgetItem | null>(null);
  
  const handleBudgetSelect = (budget: BudgetItem) => {
    setSelectedBudget(budget);
    setTimeout(() => {
        document.getElementById('customer-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
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
                <Card className="text-center h-full flex flex-col hover:border-primary hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <item.icon className="mx-auto h-12 w-12 text-primary mb-4" />
                    <CardTitle className="font-headline">{item.title}</CardTitle>
                    <CardDescription>{item.priceRange}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-between">
                    <p className="text-muted-foreground mb-6">{item.description}</p>
                    <Button onClick={() => handleBudgetSelect(item)} className="w-full">
                      Lihat Harga & Pesan <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <AnimatePresence>
          {selectedBudget && (
            <motion.section
              id="customer-form"
              className="mt-16 md:mt-24 px-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <CustomerForm selectedBudget={selectedBudget} />
            </motion.section>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
