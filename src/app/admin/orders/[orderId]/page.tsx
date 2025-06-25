'use client';

import { useMemo, useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import { mockOrders } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { formatRupiah, cn } from '@/lib/utils';
import type { OrderStatus } from '@/lib/types';
import { MessageSquare, Send, Folder, Calendar, Video } from 'lucide-react';

const allOrderStatuses: OrderStatus[] = [
    'Menunggu Pembayaran', 'Masuk Antrian', 'Sedang Dikerjakan',
    'Siap Kirim Pratinjau', 'Menunggu Respon Klien', 'Sedang Direvisi',
    'Selesai', 'Perlu Tinjauan Owner', 'Eskalasi: Revisi di Luar Lingkup',
    'Dibatalkan (Tidak Dibayar)', 'Dibatalkan (Refund 90%)',
    'Tidak Puas (Refund 50%)', 'Ditutup (Tanpa Refund)'
];


export default function OrderDetailPage() {
  const params = useParams();
  
  const order = useMemo(() => {
    if (!params?.orderId) return null;
    const orderId = `#${params.orderId}`;
    return mockOrders.find(o => o.id === orderId) || null;
  }, [params]);

  const [currentStatus, setCurrentStatus] = useState<OrderStatus>('Antri');

  useEffect(() => {
    if (order) {
      setCurrentStatus(order.status);
    }
  }, [order]);

  // This will be triggered once params are available but no order is found.
  if (params?.orderId && !order) {
    notFound();
  }

  // Render a loading state while params are being resolved.
  if (!order) {
    return <div>Loading...</div>; // Or a skeleton component
  }

  const getStatusClass = (status: OrderStatus) => {
    switch (status) {
      // Positive flow
      case 'Masuk Antrian': return 'bg-gray-500 hover:bg-gray-500/90 text-gray-50';
      case 'Sedang Dikerjakan': return 'bg-blue-500 hover:bg-blue-500/90 text-blue-50';
      case 'Siap Kirim Pratinjau': return 'bg-cyan-500 hover:bg-cyan-500/90 text-cyan-50';
      case 'Sedang Direvisi': return 'bg-indigo-500 hover:bg-indigo-500/90 text-indigo-50';
      case 'Selesai': return 'bg-green-500 hover:bg-green-500/90 text-green-50';

      // Waiting statuses
      case 'Menunggu Pembayaran': return 'bg-yellow-500 hover:bg-yellow-500/90 text-yellow-50';
      case 'Menunggu Respon Klien': return 'bg-amber-500 hover:bg-amber-500/90 text-amber-50';
      
      // Action needed statuses
      case 'Perlu Tinjauan Owner': return 'bg-purple-600 hover:bg-purple-600/90 text-purple-50 font-bold';
      case 'Eskalasi: Revisi di Luar Lingkup': return 'bg-orange-500 hover:bg-orange-500/90 text-orange-50 font-bold';

      // Negative/Cancellation statuses
      case 'Dibatalkan (Tidak Dibayar)': return 'bg-red-600 hover:bg-red-600/90 text-red-50';
      case 'Dibatalkan (Refund 90%)': return 'bg-red-500 hover:bg-red-500/90 text-red-50';
      case 'Tidak Puas (Refund 50%)': return 'bg-pink-500 hover:bg-pink-500/90 text-pink-50';
      case 'Ditutup (Tanpa Refund)': return 'bg-neutral-600 hover:bg-neutral-600/90 text-neutral-50';

      // Legacy statuses for smooth transition
      case 'Antri': return 'bg-yellow-500 hover:bg-yellow-500/90 text-yellow-50';
      case 'Kerja': return 'bg-blue-500 hover:bg-blue-500/90 text-blue-50';
      case 'Revisi': return 'bg-orange-500 hover:bg-orange-500/90 text-orange-50';
      case 'Batal': return 'bg-red-500 hover:bg-red-500/90 text-red-50';

      default: return 'bg-gray-500 hover:bg-gray-500/90 text-gray-50';
    }
  };

  // The visual timeline is complex with the new statuses. 
  // For now, we will focus on correct data display.
  // A more advanced timeline component can be built later.
  
  return (
    <div className="space-y-6">
        <Card>
            <CardHeader>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                    <div>
                        <CardTitle className="font-headline text-2xl">Pesanan {order.id} - {order.customerName}</CardTitle>
                        <CardDescription>
                            Budget: {order.budget} | Total: {formatRupiah(order.total)} | Pekan: {order.pekan}
                        </CardDescription>
                    </div>
                    <Badge className={cn("capitalize w-fit mt-2 md:mt-0", getStatusClass(currentStatus))}>{currentStatus}</Badge>
                </div>
            </CardHeader>
            <CardFooter className="flex flex-wrap gap-2 pt-4">
                 <Button variant="outline" size="sm"><Folder className="mr-2 h-4 w-4" /> Drive Folder</Button>
                 <Button variant="outline" size="sm"><MessageSquare className="mr-2 h-4 w-4" /> Telegram Chat</Button>
                 <Button variant="outline" size="sm"><Calendar className="mr-2 h-4 w-4" /> Schedule Meeting</Button>
            </CardFooter>
        </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-12 xl:col-span-5 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Detail Pesanan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {order.items.map((item, index) => (
                        <div key={index}>
                            <p className="font-semibold">{item.name} (x{item.quantity})</p>
                            <div className="text-sm text-muted-foreground pl-4 border-l-2 ml-2 mt-1 space-y-2 py-1">
                                {Object.entries(item.brief).map(([question, answer]) => (
                                    <div key={question}>
                                        <p className="font-medium text-foreground/80">{question}</p>
                                        <p>{answer as string}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    <Separator />
                    <h3 className="font-semibold pt-2">Info Kontak</h3>
                    <div className="text-sm space-y-1">
                        <p><strong>Nama:</strong> {order.customerName}</p>
                        <p><strong>Telegram:</strong> <a href="#" className="text-primary hover:underline">{order.customerTelegram}</a></p>
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className="lg:col-span-6 xl:col-span-4 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Aksi Cepat</CardTitle>
                </CardHeader>
                <CardFooter className="flex flex-col gap-2 items-stretch">
                    <div className='w-full space-y-2'>
                        <label className='text-sm font-medium'>Ubah Status Pesanan</label>
                         <Select value={currentStatus} onValueChange={(value) => setCurrentStatus(value as OrderStatus)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih status baru..." />
                            </SelectTrigger>
                            <SelectContent>
                                {allOrderStatuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <Button className="w-full mt-2">
                        <Send className="mr-2 h-4 w-4" />
                        Simpan & Kirim Update ke Klien
                    </Button>
                    <Button variant="secondary" className="w-full">
                        <Video className="mr-2 h-4 w-4" />
                        Jadwalkan Google Meet
                    </Button>
                </CardFooter>
            </Card>
        </div>

        <div className="lg:col-span-6 xl:col-span-3 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Integrasi</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold flex items-center gap-2"><Folder className="h-4 w-4" /> Drive Folder</h4>
                      <p className="text-sm text-muted-foreground">Last updated: 2 hours ago</p>
                      <Button variant="outline" size="sm" className="mt-2 w-full">Open Folder</Button>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-semibold flex items-center gap-2"><MessageSquare className="h-4 w-4" /> Telegram</h4>
                      <p className="text-sm text-muted-foreground">Last activity: 5 mins ago</p>
                      <Button variant="outline" size="sm" className="mt-2 w-full">Open Chat</Button>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-semibold flex items-center gap-2"><Calendar className="h-4 w-4" /> Meeting</h4>
                      <p className="text-sm text-muted-foreground">No upcoming meetings</p>
                      <Button variant="outline" size="sm" className="mt-2 w-full">Schedule Now</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
