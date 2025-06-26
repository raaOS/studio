
"use client";

import { useMemo, useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';

// Components
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { OrderSummary } from '@/components/OrderSummary';
import { FloatingCart } from '@/components/FloatingCart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { User, Phone, Send, Percent, CheckCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ProductCarousel } from '@/components/ProductCarousel';

// Hooks & Context
import { CartProvider, useCart } from '@/contexts/CartContext';
import { useIsMobile } from '@/hooks/use-mobile';

// Data & Types
import { budgetItems, services, mockCategories } from '@/lib/data';
import type { BudgetItem, Service, Customer } from '@/lib/types';
import { Label } from '@/components/ui/label';

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
  const [modalImage, setModalImage] = useState<{src: string, alt: string} | null>(null);

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

  const handleImageClick = (e: React.MouseEvent, item: BudgetItem) => {
    e.stopPropagation(); // Prevent the card's onClick from firing
    setModalImage({ src: item.icon, alt: item.title });
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
      <main className="flex-grow container mx-auto px-4 pt-10 pb-16 space-y-6">
        
        {/* Customer Info */}
        <section id="info-section" className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-xl">Langkah 1: Kita isi data diri dulu, yuk?</CardTitle>
              <CardDescription className="text-sm">Cuma butuh nama, nomor telepon, sama username Telegram biar gampang dihubungin.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form className="space-y-6">
                  <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                      <FormItem>
                          <FormLabel>Nama Lengkap <span className="text-destructive">*</span></FormLabel>
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
                          <FormLabel>Nomor Telepon (Aktif) <span className="text-destructive">*</span></FormLabel>
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
                          <FormLabel>Username Telegram <span className="text-destructive">*</span></FormLabel>
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
                </form>
              </Form>
            </CardContent>
          </Card>
        </section>

        {/* Payment Method */}
        <section id="payment-section" className="max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-xl">Langkah 2: Mau bayar pakai cara apa?</CardTitle>
                    <CardDescription className="text-sm">Bisa bayar setengah dulu atau lunas sekalian, bebas!</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div
                            onClick={() => handlePaymentSelect('dp')}
                            className={`flex h-full flex-col items-center justify-center rounded-lg border-2 p-6 cursor-pointer transition-all space-y-2 text-center ${paymentMethod === 'dp' ? 'border-primary bg-primary/5' : 'border-muted bg-popover hover:bg-accent/50'}`}
                        >
                            <Percent className="h-8 w-8 text-primary" />
                            <h3 className="font-semibold text-lg">DP 50%</h3>
                            <p className="text-muted-foreground text-xs">Bayar setengahnya sekarang, sisanya setelah pratinjau.</p>
                        </div>
                        <div
                            onClick={() => handlePaymentSelect('lunas')}
                            className={`flex h-full flex-col items-center justify-center rounded-lg border-2 p-6 cursor-pointer transition-all space-y-2 text-center ${paymentMethod === 'lunas' ? 'border-primary bg-primary/5' : 'border-muted bg-popover hover:bg-accent/50'}`}
                        >
                            <CheckCircle className="h-8 w-8 text-primary" />
                            <h3 className="font-semibold text-lg">Lunas</h3>
                            <p className="text-muted-foreground text-xs">Bayar lunas sekarang dan dapatkan prioritas pengerjaan.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </section>

        {/* Budget Selection */}
        <section id="budget-selection-section">
            <div className="text-center mb-10">
                <h2 className="text-2xl font-headline font-semibold text-foreground">Langkah 3: Budget kamu yang mana, nih?</h2>
                <p className="text-sm text-muted-foreground mt-2 max-w-2xl mx-auto">Harga layanan nanti bakal nyesuain sama pilihan budget kamu di sini.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {budgetItems.map((item) => (
                <Card 
                    key={item.id}
                    onClick={() => handleBudgetSelect(item)}
                    className={`cursor-pointer h-full flex flex-col hover:shadow-lg transition-all duration-300 overflow-hidden ${selectedBudget?.id === item.id ? 'border-primary ring-2 ring-primary shadow-lg' : 'hover:border-primary/50'}`}
                >
                    <div onClick={(e) => handleImageClick(e, item)} className="relative w-full aspect-video cursor-pointer">
                        <Image
                            src={item.icon}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform hover:scale-105"
                            data-ai-hint={item.dataAiHint}
                        />
                    </div>
                    <CardContent className="p-6 text-center flex-grow">
                        <CardTitle className="font-headline text-xl">{item.title}</CardTitle>
                        <CardDescription>{item.priceRange}</CardDescription>
                        <p className="text-muted-foreground mt-4">{item.description}</p>
                    </CardContent>
                </Card>
                ))}
            </div>
        </section>
        
        {/* Catalog */}
        <section id="catalog-section" className="pt-8 flex-grow">
            <div className="text-center mb-10">
                <h2 className="text-2xl font-headline font-semibold text-foreground">Langkah 4: Terakhir, pilih layanannya!</h2>
                <p className="text-sm text-muted-foreground mt-2 max-w-2xl mx-auto">Scroll ke bawah dan masukkin semua yang kamu butuhin ke keranjang.</p>
            </div>
            <div>
                {Object.entries(serviceCategories).map(([category, servicesInCategory]) => (
                    <ProductCarousel key={category} title={category} services={servicesInCategory} />
                ))}
                
                {/* Order Summary for Desktop */}
                <div className="hidden lg:block max-w-4xl mx-auto mt-16">
                    <OrderSummary />
                </div>
            </div>
        </section>
      </main>

      <Dialog open={!!modalImage} onOpenChange={(isOpen) => !isOpen && setModalImage(null)}>
        <DialogContent className="sm:max-w-[500px] p-2">
            {modalImage && (
                <>
                <DialogHeader className="p-4 pb-0">
                    <DialogTitle>{modalImage.alt}</DialogTitle>
                </DialogHeader>
                <div className="relative aspect-square w-full">
                    <Image src={modalImage.src} alt={modalImage.alt} fill className="object-contain" />
                </div>
                </>
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
