'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { PlusCircle, Users, ShoppingCart, Cake, Star } from 'lucide-react';

const emailCampaigns = [
  {
    id: 'welcome',
    title: 'Welcome Series',
    description: 'Kirim email selamat datang saat pelanggan baru mendaftar.',
    icon: Users,
    isActive: true,
  },
  {
    id: 'abandoned-cart',
    title: 'Abandoned Cart Reminder',
    description: 'Ingatkan pelanggan yang meninggalkan keranjang belanja.',
    icon: ShoppingCart,
    isActive: true,
  },
  {
    id: 'post-purchase',
    title: 'Post-Purchase Follow-up',
    description: 'Kirim email ucapan terima kasih dan minta feedback setelah pesanan selesai.',
    icon: Star,
    isActive: false,
  },
  {
    id: 'birthday-discount',
    title: 'Birthday Discount',
    description: 'Kirim kupon diskon spesial di hari ulang tahun pelanggan.',
    icon: Cake,
    isActive: false,
  },
];


export default function AdminEmailMarketingPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold font-headline">Email Campaign Automation</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Buat Campaign Baru
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Statistik Email</CardTitle>
          <CardDescription>Ringkasan performa email marketing Anda bulan ini.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col gap-1">
                <span className="text-sm text-muted-foreground">Email Terkirim</span>
                <span className="text-2xl font-bold">1,254</span>
            </div>
             <div className="flex flex-col gap-1">
                <span className="text-sm text-muted-foreground">Open Rate</span>
                <span className="text-2xl font-bold">28.3%</span>
            </div>
             <div className="flex flex-col gap-1">
                <span className="text-sm text-muted-foreground">Click Rate</span>
                <span className="text-2xl font-bold">4.1%</span>
            </div>
             <div className="flex flex-col gap-1">
                <span className="text-sm text-muted-foreground">Unsubscribed</span>
                <span className="text-2xl font-bold">12</span>
            </div>
        </CardContent>
      </Card>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-foreground/80">Automation Triggers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {emailCampaigns.map((campaign) => (
            <Card key={campaign.id}>
              <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <campaign.icon className="h-8 w-8 text-primary" />
                      <CardTitle>{campaign.title}</CardTitle>
                    </div>
                    <Switch
                        id={`switch-${campaign.id}`}
                        defaultChecked={campaign.isActive}
                        aria-label={`Activate ${campaign.title}`}
                    />
                  </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{campaign.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
