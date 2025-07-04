'use client';

import React from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockCustomers } from '@/lib/data';
import { formatRupiah } from '@/lib/utils';
import type { CustomerProfile } from '@/lib/types';
import { Award, Gem, Crown, Star, Ticket, UserPlus } from 'lucide-react';

const CustomersListTab = () => (
  <Card>
    <CardHeader>
        <CardTitle>Daftar Pelanggan</CardTitle>
        <CardDescription>Lihat dan kelola semua data pelanggan Anda.</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      {mockCustomers.length > 0 ? (
        mockCustomers.map((customer: CustomerProfile) => (
          <Card key={customer.id}>
            <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Avatar>
                    <AvatarImage src={customer.avatar} alt={customer.name} data-ai-hint="user avatar" />
                    <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-bold">{customer.name}</p>
                    <p className="text-sm text-muted-foreground">{customer.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:flex sm:items-center gap-4 text-sm w-full sm:w-auto">
                <div>
                  <p className="font-semibold text-muted-foreground">LTV</p>
                  <p>{formatRupiah(customer.ltv)}</p>
                </div>
                 <div>
                  <p className="font-semibold text-muted-foreground">Total Pesanan</p>
                  <p>{customer.totalOrders}</p>
                </div>
                 <div>
                  <p className="font-semibold text-muted-foreground">Terakhir Pesan</p>
                  <p>{customer.lastOrderDate}</p>
                </div>
              </div>
              <Button asChild size="sm" variant="outline" className="w-full sm:w-auto mt-2 sm:mt-0">
                  <Link href={`/admin/customers/${customer.id}`}>Lihat Detail</Link>
              </Button>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="text-center text-muted-foreground py-12">
          <p>Belum ada data pelanggan.</p>
        </div>
      )}
    </CardContent>
  </Card>
);

const LoyaltyProgramTab = () => (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-semibold mb-4 text-foreground/80">Sistem Tier</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Award className="h-10 w-10 text-yellow-600" />
                <div>
                  <CardTitle>Bronze</CardTitle>
                  <CardDescription>1-3 Pesanan</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Cashback 5% untuk pesanan berikutnya.</li>
                <li>Dukungan pelanggan standar.</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Gem className="h-10 w-10 text-slate-500" />
                 <div>
                    <CardTitle>Silver</CardTitle>
                    <CardDescription>4-7 Pesanan</CardDescription>
                 </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Cashback 10% untuk pesanan berikutnya.</li>
                <li>Antrian prioritas untuk pengerjaan.</li>
                <li>Akses ke promo eksklusif.</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
               <div className="flex items-center gap-3">
                  <Crown className="h-10 w-10 text-amber-500" />
                  <div>
                    <CardTitle>Gold</CardTitle>
                    <CardDescription>8+ Pesanan</CardDescription>
                  </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Cashback 15% untuk pesanan berikutnya.</li>
                <li>Antrian prioritas & pengerjaan ekspres.</li>
                <li>1x konsultasi desain gratis per bulan.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-foreground/80">Sistem Poin</h2>
         <Card>
            <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                      <Star className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                      <h3 className="font-semibold">Dapatkan Poin</h3>
                      <p className="text-sm text-muted-foreground">Setiap pesanan yang selesai akan mendapatkan 100 poin.</p>
                  </div>
              </div>
              <div className="flex items-start gap-4">
                   <div className="p-3 bg-primary/10 rounded-full">
                        <Ticket className="h-6 w-6 text-primary" />
                   </div>
                   <div>
                        <h3 className="font-semibold">Tukarkan Poin</h3>
                        <p className="text-sm text-muted-foreground">1000 poin dapat ditukar dengan kupon diskon Rp 50.000.</p>
                   </div>
              </div>
              <div className="flex items-start gap-4">
                   <div className="p-3 bg-primary/10 rounded-full">
                        <UserPlus className="h-6 w-6 text-primary" />
                   </div>
                   <div>
                        <h3 className="font-semibold">Bonus Referral</h3>
                        <p className="text-sm text-muted-foreground">Dapatkan bonus 200 poin untuk setiap teman yang berhasil Anda ajak.</p>
                   </div>
              </div>
            </CardContent>
         </Card>
      </section>
    </div>
);


export default function AdminCustomersAndLoyaltyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-headline">Pelanggan & Loyalitas</h1>
        <p className="text-muted-foreground">Kelola data pelanggan dan program loyalitas untuk meningkatkan retensi.</p>
      </div>
      
       <Tabs defaultValue="customers" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="customers">Daftar Pelanggan</TabsTrigger>
          <TabsTrigger value="loyalty">Program Loyalitas</TabsTrigger>
        </TabsList>
        <TabsContent value="customers" className="mt-6">
          <CustomersListTab />
        </TabsContent>
        <TabsContent value="loyalty" className="mt-6">
          <LoyaltyProgramTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
