
'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Loader2, Search, PackageCheck, XCircle } from 'lucide-react';
import { mockOrders } from '@/lib/data';
import type { Order, OrderStatus } from '@/lib/types';
import { cn } from '@/lib/utils';

export default function TrackOrderPage() {
  const [orderIdInput, setOrderIdInput] = useState('');
  const [foundOrder, setFoundOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderIdInput) return;

    setIsLoading(true);
    setFoundOrder(null);
    setError(null);

    // Simulate API call
    setTimeout(() => {
      const order = mockOrders.find(o => o.id.toLowerCase() === orderIdInput.toLowerCase());
      if (order) {
        setFoundOrder(order);
      } else {
        setError('Pesanan tidak ditemukan. Pastikan kode pesanan Anda benar (contoh: #001).');
      }
      setIsLoading(false);
    }, 1000);
  };

  const getStatusClass = (status: OrderStatus) => {
    switch (status) {
      case 'Masuk Antrian': return 'bg-gray-500/20 text-gray-700 border-gray-500/30';
      case 'Sedang Dikerjakan': return 'bg-blue-500/20 text-blue-700 border-blue-500/30';
      case 'Siap Kirim Pratinjau': return 'bg-cyan-500/20 text-cyan-700 border-cyan-500/30';
      case 'Selesai': return 'bg-green-500/20 text-green-700 border-green-500/30';
      case 'Menunggu Pembayaran': return 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30';
      case 'Menunggu Respon Klien': return 'bg-amber-500/20 text-amber-700 border-amber-500/30';
      case 'Dibatalkan (Tidak Dibayar)': return 'bg-red-500/20 text-red-700 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-700 border-gray-500/30';
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="w-full max-w-md space-y-8">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="font-headline text-2xl">Lacak Pesanan Anda</CardTitle>
              <CardDescription>Masukkan kode pesanan Anda untuk melihat status terbaru.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTrackOrder} className="flex gap-2">
                <Input
                  type="text"
                  placeholder="#001"
                  value={orderIdInput}
                  onChange={(e) => setOrderIdInput(e.target.value)}
                  className="flex-grow"
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? <Loader2 className="animate-spin" /> : <Search />}
                  <span className="sr-only">Lacak</span>
                </Button>
              </form>
            </CardContent>
          </Card>

          {isLoading && (
            <div className="text-center text-muted-foreground flex items-center justify-center gap-2">
              <Loader2 className="animate-spin" />
              Mencari pesanan...
            </div>
          )}
          
          {error && (
            <Card className="border-destructive">
                <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                    <XCircle className="h-8 w-8 text-destructive" />
                    <div>
                        <CardTitle className="text-destructive">Gagal Menemukan</CardTitle>
                        <CardDescription className="text-destructive/80">{error}</CardDescription>
                    </div>
                </CardHeader>
            </Card>
          )}

          {foundOrder && (
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle>Pesanan Ditemukan!</CardTitle>
                            <CardDescription>Kode: {foundOrder.id}</CardDescription>
                        </div>
                        <PackageCheck className="h-8 w-8 text-green-500" />
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <p className="text-sm text-muted-foreground">Pelanggan</p>
                        <p className="font-semibold">{foundOrder.customerName}</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Status Saat Ini</p>
                        <Badge variant="outline" className={cn("capitalize text-base mt-1", getStatusClass(foundOrder.status))}>
                            {foundOrder.status}
                        </Badge>
                    </div>
                    <p className="text-xs text-center text-muted-foreground pt-4">
                        Untuk detail lebih lanjut, silakan periksa notifikasi di Telegram Anda.
                    </p>
                </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
