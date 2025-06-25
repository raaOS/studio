"use client";

import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Components
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ServiceCard } from '@/components/ServiceCard';
import { OrderSummary } from '@/components/OrderSummary';
import { FloatingCart } from '@/components/FloatingCart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { User, Phone, Send, ChevronRight, ArrowRight, Info } from 'lucide-react';

// Hooks & Context
import { CartProvider, useCart } from '@/contexts/CartContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from "@/hooks/use-toast";

// Data & Types
import { budgetItems, services, mockCategories } from '@/lib/data';
import type { BudgetItem, Service, Customer } from '@/lib/types';

// Form Schema
const initialInfoFormSchema = z.object({
  name: z.string().min(2, { message: "Nama harus diisi, minimal 2 karakter." }),
  phone: z.string().min(10, { message: "Nomor telepon tidak valid." }),
  telegram: z.string().min(3, { message: "Username Telegram tidak valid." }).startsWith('@', { message: 'Username harus diawali dengan @' }),
  paymentMethod: z.enum(['dp', 'lunas'], { required_error: 'Pilih metode pembayaran.' }),
});
type InitialInfoFormValues = z.infer<typeof initialInfoFormSchema>;


function OrderWorkflow() {
  const { selectedBudget, setSelectedBudget, clearCart, setPaymentMethod } = useCart();
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const form = useForm<InitialInfoFormValues>({
    resolver: zodResolver(initialInfoFormSchema),
    defaultValues: { name: "", phone: "", telegram: "", paymentMethod: "dp" },
  });
  
  function onInfoSubmit(data: InitialInfoFormValues) {
    const customerData: Customer = { name: data.name, phone: data.phone, telegram: data.telegram };
    localStorage.setItem('customerData', JSON.stringify(customerData));
    setPaymentMethod(data.paymentMethod);
    toast({
      title: "Data Anda tersimpan!",
      description: `Sekarang, silakan pilih budget dan layanan di bawah.`,
    });
    document.getElementById('budget-selection-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  const handleBudgetSelect = (budget: BudgetItem) => {
    if (selectedBudget?.id !== budget.id) {
        clearCart();
    }
    setSelectedBudget(budget);
    setTimeout(() => {
        document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };
  
  const serviceCategories = useMemo(() => {
    if (!selectedBudget) return {};
    return services.reduce((acc, service) => {
        const categoryName = mockCategories.find(c => c.id === service.category)?.name || 'Lainnya';
        (acc[categoryName] = acc[categoryName] || []).push(service);
        return acc;
    }, {} as Record<string, Service[]>);
  }, [selectedBudget]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16">
        
        <div className="max-w-2xl mx-auto space-y-8">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onInfoSubmit)} className="space-y-8">
                    <section id="info-section">
                        <Card>
                        <CardHeader>
                            <CardTitle className="font-headline text-2xl flex items-center gap-2">
                                <span>Langkah 1: Data Diri</span>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Info className="h-5 w-5 text-muted-foreground cursor-pointer" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Data Anda hanya digunakan untuk konfirmasi pesanan.</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </CardTitle>
                            <CardDescription>
                                Isi data Anda untuk melanjutkan proses pemesanan.
                            </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
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
                            </CardContent>
                        </Card>
                    </section>

                     <section id="payment-section">
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-headline text-2xl">Langkah 2: Cara Pembayaran</CardTitle>
                                <CardDescription>Pilih metode pembayaran yang Anda inginkan.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <FormField
                                    control={form.control}
                                    name="paymentMethod"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    className="flex pt-2 gap-6"
                                                >
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="dp" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            DP 50%
                                                        </FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="lunas" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            Lunas
                                                        </FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full mt-6" disabled={form.formState.isSubmitting}>
                                    {form.formState.isSubmitting ? 'Menyimpan...' : 'Simpan Data & Lanjut Memilih'}
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                            </CardContent>
                        </Card>
                     </section>
                </form>
            </Form>
        </div>


        <section
          id="budget-selection-section"
          className="py-16 md:py-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-foreground">Langkah 3: Pilih Budget Anda</h2>
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
        
        <AnimatePresence>
        {selectedBudget && (
            <motion.section
                id="catalog-section"
                className="pt-8 flex-grow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-headline font-bold text-foreground">Langkah 4: Pilih Layanan</h2>
                    <p className="text-lg text-muted-foreground mt-2">Tambahkan layanan ke keranjang Anda.</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-8">
                    <div className="lg:col-span-8 xl:col-span-9">
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
