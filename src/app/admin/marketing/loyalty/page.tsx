'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, Gem, Crown, Star, Ticket, UserPlus } from 'lucide-react';

export default function AdminLoyaltyPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold font-headline">Program Loyalitas Pelanggan</h1>
        <Button variant="outline">Kelola Pengaturan</Button>
      </div>

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
}
