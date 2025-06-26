
"use client";

import { useMemo, useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Components
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ServiceCard } from '@/components/ServiceCard';
import { OrderSummary } from '@/components/OrderSummary';
import { FloatingCart } from '@/components/FloatingCart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { User, Phone, Send, ArrowRight } from 'lucide-react';

// Hooks & Context
import { CartProvider, useCart } from '@/contexts/CartContext';
import { useIsMobile } from '@/hooks/use-mobile';

// Data & Types
import { budgetItems, services, mockCategories } from '@/lib/data';
import type { BudgetItem, Service, Customer } from '@/lib/types';

// Form Schema
const customerInfoFormSchema = z.object({
  name: z.string().min(2, { message: "Nama harus diisi, minimal 2 karakter." }),
  phone: z.string().min(10, { message: "Nomor telepon tidak valid." }),
  telegram: z.string().min(3, { message: "Username Telegram tidak valid." }).startsWith('@', { message: 'Username harus diawali dengan @' }),
});
type CustomerInfoFormValues = z.infer<typeof customerInfoFormSchema>;


function OrderWorkflow() {
  const { selectedBudget, setSelectedBudget, clearCart, setPaymentMethod, paymentMethod } = useCart();
  const isMobile = useIsMobile();

  const form = useForm<CustomerInfoFormValues>({
    resolver: zodResolver(customerInfoFormSchema),
    defaultValues: { name: "", phone: "", telegram: "" },
    mode: 'onChange', // Validate on change to enable auto-saving
  });

  const { watch, formState } = form;
  const watchedValues = watch();

  useEffect(() => {
    // Automatically save customer data to localStorage when the form is valid.
    if (formState.isValid) {
      const customerData: Customer = {
        name: watchedValues.name,
        phone: watchedValues.phone,
        telegram: watchedValues.telegram,
      };
      localStorage.setItem('customerData', JSON.stringify(customerData));
    }
  }, [watchedValues, formState.isValid]);
  
  const handlePaymentSelect = (method: 'dp' | 'lunas') => {
    setPaymentMethod(method);
  };

  const handleBudgetSelect = (budget: BudgetItem) => {
    if (selectedBudget?.id !== budget.id) {
        clearCart();
    }
    setSelectedBudget(budget);
  };
  
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
      <main className="flex-grow container mx-auto px-4 py-16 space-y-24">
        
        {/* Customer Info */}
        <section id="info-section" className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Data Diri Anda</CardTitle>
              <CardDescription>Isi data Anda untuk melanjutkan proses pemesanan.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <div className="space-y-6">
                  <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                      <FormItem>
                          <FormLabel>Nama Lengkap</FormLabel>
                          <FormControl>
                          <div className="relative">
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                              <Input placeholder="John Doe" {...field} className="pl-10" />
                          </div>
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                      <FormItem>
                          <FormLabel>Nomor Telepon (Aktif)</FormLabel>
                          <FormControl>
                          <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                              <Input placeholder="081234567890" {...field} className="pl-10" />
                          </div>
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="telegram"
                      render={({ field }) => (
                      <FormItem>
                          <FormLabel>Username Telegram</FormLabel>
                          <FormControl>
                          <div className="relative">
                              <Send className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                              <Input placeholder="@johndoe" {...field} className="pl-10" />
                          </div>
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                      )}
                  />
                </div>
              </Form>
            </CardContent>
          </Card>
        </section>

        {/* Payment Method */}
        <section id="payment-section" className="max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Cara Pembayaran</CardTitle>
                    <CardDescription>Pilih metode pembayaran yang Anda inginkan.</CardDescription>
                </CardHeader>
                <CardContent>
                    <RadioGroup 
                        className="flex pt-2 gap-6"
                        onValueChange={(value) => handlePaymentSelect(value as 'dp' | 'lunas')}
                        value={paymentMethod || ''}
                    >
                        <div className="flex items-center space-x-3">
                            <RadioGroupItem value="dp" id="payment-dp" />
                            <Label htmlFor="payment-dp" className="font-normal cursor-pointer">
                                DP 50%
                            </Label>
                        </div>
                        <div className="flex items-center space-x-3">
                            <RadioGroupItem value="lunas" id="payment-lunas" />
                            <Label htmlFor="payment-lunas" className="font-normal cursor-pointer">
                                Lunas
                            </Label>
                        </div>
                    </RadioGroup>
                </CardContent>
            </Card>
        </section>

        {/* Budget Selection */}
        <section id="budget-selection-section">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-headline font-bold text-foreground">Pilih Budget Anda</h2>
                <p className="text-lg text-muted-foreground mt-2">Pilih paket yang sesuai dengan kebutuhan Anda.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {budgetItems.map((item) => (
                <Card 
                    key={item.id}
                    className={`text-center h-full flex flex-col hover:shadow-lg transition-all duration-300 ${selectedBudget?.id === item.id ? 'border-primary ring-2 ring-primary' : 'hover:border-primary'}`}
                >
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
                ))}
            </div>
        </section>
        
        {/* Catalog */}
        <section id="catalog-section" className="pt-8 flex-grow">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-headline font-bold text-foreground">Pilih Layanan</h2>
                <p className="text-lg text-muted-foreground mt-2">Tambahkan layanan ke keranjang Anda. Harga yang ditampilkan sesuai dengan paket budget yang Anda pilih.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-8">
                <div className="lg:col-span-8 xl:col-span-9">
                    {Object.entries(serviceCategories).map(([category, servicesInCategory]) => (
                        <div key={category} className="mb-12">
                            <h3 className="text-2xl font-headline font-bold mb-6">{category}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {servicesInCategory.map((service) => (
                                    <ServiceCard key={service.id} service={service} />
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
        </section>
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
