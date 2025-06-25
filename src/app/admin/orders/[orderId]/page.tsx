'use client';

import { useMemo, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import { mockOrders } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { formatRupiah, cn } from '@/lib/utils';
import type { OrderStatus } from '@/lib/types';
import { CheckCircle, Circle, MessageSquare, Send } from 'lucide-react';

const timelineSteps: { status: OrderStatus; label: string }[] = [
    { status: 'Antri', label: 'Pesanan Dibuat & Pembayaran Divalidasi' },
    { status: 'Kerja', label: 'Mulai Pengerjaan' },
    { status: 'Revisi', label: 'Kirim Pratinjau & Revisi' },
    { status: 'Selesai', label: 'Selesai & File Dikirim' },
];

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = `#${params.orderId}`;

  const order = useMemo(() => mockOrders.find(o => o.id === orderId), [orderId]);
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(order?.status || 'Antri');

  if (!order) {
    notFound();
  }

  const getStatusClass = (status: OrderStatus) => {
    switch (status) {
      case 'Antri': return 'bg-yellow-500 hover:bg-yellow-500/90 text-yellow-50';
      case 'Kerja': return 'bg-blue-500 hover:bg-blue-500/90 text-blue-50';
      case 'Revisi': return 'bg-orange-500 hover:bg-orange-500/90 text-orange-50';
      case 'Selesai': return 'bg-green-500 hover:bg-green-500/90 text-green-50';
      case 'Batal': return 'bg-red-500 hover:bg-red-500/90 text-red-50';
      default: return 'bg-gray-500 hover:bg-gray-500/90 text-gray-50';
    }
  };

  const isStepCompleted = (stepStatus: OrderStatus) => {
    const stepIndex = timelineSteps.findIndex(s => s.status === stepStatus);
    const currentIndex = timelineSteps.findIndex(s => s.status === currentStatus);
    return stepIndex <= currentIndex;
  };
  
  return (
    <div className="space-y-6">
        <Card>
            <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                    <CardTitle className="font-headline text-2xl">Pesanan {order.id} - {order.customerName}</CardTitle>
                    <CardDescription>
                        Budget: {order.budget} | Total: {formatRupiah(order.total)} | Pekan: {order.pekan}
                    </CardDescription>
                </div>
                <Badge className={cn("capitalize w-fit mt-2 md:mt-0", getStatusClass(currentStatus))}>{currentStatus}</Badge>
            </CardHeader>
        </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
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

        <div className="lg:col-span-1 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Timeline & Aksi</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {timelineSteps.map((step) => (
                            <li key={step.status} className="flex items-start gap-3">
                                {isStepCompleted(step.status) ? (
                                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                                ) : (
                                    <Circle className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                                )}
                                <span className={cn("text-sm", isStepCompleted(step.status) ? "font-semibold" : "text-muted-foreground")}>
                                    {step.label}
                                </span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
                <CardFooter className="flex flex-col gap-2 items-stretch">
                    <div className='w-full space-y-2'>
                        <label className='text-sm font-medium'>Ubah Status</label>
                         <Select value={currentStatus} onValueChange={(value) => setCurrentStatus(value as OrderStatus)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih status baru..." />
                            </SelectTrigger>
                            <SelectContent>
                                {timelineSteps.map(s => <SelectItem key={s.status} value={s.status}>{s.status}</SelectItem>)}
                                <SelectItem value="Batal">Batal</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button className="w-full mt-2">
                        <Send className="mr-2 h-4 w-4" />
                        Kirim Update
                    </Button>
                    <Button variant="outline" className="w-full">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Chat Klien
                    </Button>
                </CardFooter>
            </Card>
        </div>
      </div>
    </div>
  );
}
