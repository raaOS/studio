"use client";

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import type { BudgetItem } from '@/lib/types';
import { User, Phone, Send, ChevronRight } from 'lucide-react';

const customerFormSchema = z.object({
  name: z.string().min(2, { message: "Nama harus diisi, minimal 2 karakter." }),
  phone: z.string().min(10, { message: "Nomor telepon tidak valid." }),
  telegram: z.string().min(3, { message: "Username Telegram tidak valid." }).startsWith('@', { message: 'Username harus diawali dengan @' }),
});

type CustomerFormValues = z.infer<typeof customerFormSchema>;

interface CustomerFormProps {
    selectedBudget: BudgetItem;
}

export function CustomerForm({ selectedBudget }: CustomerFormProps) {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: { name: "", phone: "", telegram: "" },
  });

  function onSubmit(data: CustomerFormValues) {
    localStorage.setItem('customerData', JSON.stringify(data));
    toast({
      title: "Data tersimpan!",
      description: `Selamat datang, ${data.name}! Lanjutkan untuk memilih layanan.`,
    });
    router.push(`/catalog/${selectedBudget.id}`);
  }

  return (
    <div className="container mx-auto max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Langkah Terakhir Sebelum Memilih Layanan</CardTitle>
          <CardDescription>
            Kami butuh data Anda untuk melanjutkan pesanan pada paket <span className="font-bold text-primary">{selectedBudget.title}</span>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    <FormLabel>Nomor Telepon</FormLabel>
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
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Memproses...' : 'Lanjut ke Katalog'}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
