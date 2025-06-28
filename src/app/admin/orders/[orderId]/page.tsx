'use client';

import { useMemo, useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import { mockOrders, allOrderStatusesCategorized, mockMessageTemplates } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { formatRupiah, cn } from '@/lib/utils';
import type { Order, OrderStatus } from '@/lib/types';
import { MessageSquare, Send, Folder, Calendar, Video, History, FolderSync, Loader2 } from 'lucide-react';
import { createOrderFolder } from '@/ai/flows/create-drive-folder';
import { sendTelegramUpdate } from '@/ai/flows/telegram-bot-integration';
import { useToast } from '@/hooks/use-toast';

export default function OrderDetailPage() {
  const { orderId: orderIdParam } = useParams();
  const { toast } = useToast();
  
  const orderId = Array.isArray(orderIdParam) ? orderIdParam[0] : orderIdParam;
  
  const order: Order | null = useMemo(() => {
    if (!orderId) return null;
    return mockOrders.find(o => o.kode_order === orderId) || null;
  }, [orderId]);

  const [currentStatus, setCurrentStatus] = useState<OrderStatus>('Menunggu Pengerjaan');
  const [driveUrl, setDriveUrl] = useState(order?.driveFolderUrl);
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [isSubmittingUpdate, setIsSubmittingUpdate] = useState(false);

  useEffect(() => {
    if (order) {
      setCurrentStatus(order.status_pesanan);
      setDriveUrl(order.driveFolderUrl);
    }
  }, [order]);

  if (orderId && !order) {
    notFound();
  }

  if (!order) {
    return <div>Loading...</div>;
  }
  
  const handleCreateFolder = async () => {
    setIsCreatingFolder(true);
    try {
      const result = await createOrderFolder({
        orderId: order.kode_order,
        customerName: order.nama_klien,
        folderTemplate: '[OrderID] - [CustomerName]',
      });

      if (result.success && result.folderUrl) {
        setDriveUrl(result.folderUrl);
        toast({
          title: 'Folder Berhasil Dibuat!',
          description: `Folder untuk pesanan ${order.kode_order} telah dibuat.`,
        });
        // Note: In a real app, you'd want to persist this URL to your database
        // and update the local mockOrder data or refetch.
      } else {
        throw new Error(result.error || 'Gagal membuat folder.');
      }
    } catch (error: any) {
      toast({
        title: 'Gagal Membuat Folder',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsCreatingFolder(false);
    }
  };

  const handleStatusUpdate = async () => {
    if (!order) return;

    setIsSubmittingUpdate(true);
    try {
        let message: string;

        if (currentStatus === 'Menunggu Respon Klien') {
             if (!driveUrl) {
                toast({
                    title: 'Folder Drive Belum Ada',
                    description: 'Mohon buat folder Drive terlebih dahulu sebelum mengirim pratinjau.',
                    variant: 'destructive',
                });
                setIsSubmittingUpdate(false);
                return;
            }
            const template = mockMessageTemplates.find(t => t.id === 'preview_ready');
            if (!template) {
                throw new Error("Template 'preview_ready' tidak ditemukan. Mohon periksa file data.");
            }
            message = template.content
                .replace('{{customerName}}', order.nama_klien)
                .replace('{{orderId}}', order.kode_order)
                .replace('{{driveUrl}}', driveUrl);
        } else {
            message = `🔔 *Update Pesanan Anda* 🔔\n\nHalo ${order.nama_klien},\nStatus pesanan Anda dengan ID \`${order.kode_order}\` telah diperbarui menjadi:\n\n*${currentStatus}*\n\nJika ada pertanyaan, jangan ragu untuk membalas pesan ini. Terima kasih!`;
        }
        
        const result = await sendTelegramUpdate({
            telegramId: order.customerTelegram,
            message: message,
        });

        if (result.success) {
            toast({
                title: 'Update Terkirim!',
                description: `Notifikasi perubahan status ke "${currentStatus}" telah dikirim ke klien.`,
            });
            // In a real app, you would also update the order in your database.
        } else {
            throw new Error(result.error || 'Gagal mengirim notifikasi Telegram.');
        }

    } catch (error: any) {
        toast({
            title: 'Gagal Mengirim Update',
            description: error.message,
            variant: 'destructive',
        });
    } finally {
        setIsSubmittingUpdate(false);
    }
};

  const getStatusClass = (status: OrderStatus) => {
    switch (status) {
      case 'Menunggu Pembayaran': return 'bg-yellow-500 hover:bg-yellow-500/90 text-yellow-50';
      case 'Menunggu Pengerjaan': return 'bg-gray-500 hover:bg-gray-500/90 text-gray-50';
      case 'Sedang Dikerjakan': return 'bg-blue-500 hover:bg-blue-500/90 text-blue-50';
      case 'Menunggu Respon Klien': return 'bg-amber-500 hover:bg-amber-500/90 text-amber-50';
      case 'Sedang Direvisi': return 'bg-indigo-500 hover:bg-indigo-500/90 text-indigo-50';
      case 'Selesai': return 'bg-green-500 hover:bg-green-500/90 text-green-50';
      case 'Dibatalkan': return 'bg-red-500 hover:bg-red-500/90 text-red-50';
      case 'Eskalasi': return 'bg-purple-600 hover:bg-purple-600/90 text-purple-50 font-bold';
      default: return 'bg-gray-500 hover:bg-gray-500/90 text-gray-50';
    }
  };

  return (
    <div className="space-y-6">
        <Card>
            <CardHeader>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                    <div>
                        <CardTitle className="font-headline text-2xl">Pesanan {order.kode_order} - {order.nama_klien}</CardTitle>
                        <CardDescription>
                            Budget: {order.budget} | Total: {formatRupiah(order.total_harga)} ({order.tipe_pembayaran}) | Pekan: {order.pekan}
                        </CardDescription>
                    </div>
                    <Badge className={cn("capitalize w-fit mt-2 md:mt-0", getStatusClass(currentStatus))}>{currentStatus}</Badge>
                </div>
            </CardHeader>
        </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
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
                        <p><strong>Nama:</strong> {order.nama_klien}</p>
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
                                {allOrderStatusesCategorized.map((group) => (
                                    <SelectGroup key={group.label}>
                                        <SelectLabel>{group.label}</SelectLabel>
                                        {group.statuses.map(status => (
                                            <SelectItem key={status} value={status}>{status}</SelectItem>
                                        ))}
                                    </SelectGroup>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Button className="w-full mt-2" onClick={handleStatusUpdate} disabled={isSubmittingUpdate}>
                       {isSubmittingUpdate ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Mengirim...</>
                        ) : (
                            <><Send className="mr-2 h-4 w-4" /> Simpan & Kirim Update ke Klien</>
                        )}
                    </Button>
                    <Button variant="secondary" className="w-full">
                        <Video className="mr-2 h-4 w-4" />
                        Jadwalkan Google Meet
                    </Button>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><History /> Log Aktivitas</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4 text-sm">
                        {order.log_aktivitas.map((log, index) => (
                            <li key={index} className="flex gap-3">
                                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                                </div>
                                <div className="flex-grow">
                                    <p className="font-medium">{log.aksi}</p>
                                    <p className="text-muted-foreground capitalize">{log.oleh} - {new Date(log.waktu).toLocaleString('id-ID')}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </CardContent>
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
                      <p className="text-sm text-muted-foreground">
                        {driveUrl ? `Folder telah dibuat.` : 'Folder belum dibuat.'}
                      </p>
                      {driveUrl ? (
                        <Button asChild variant="outline" size="sm" className="mt-2 w-full">
                          <a href={driveUrl} target="_blank" rel="noopener noreferrer">
                            Buka Folder
                          </a>
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" className="mt-2 w-full" onClick={handleCreateFolder} disabled={isCreatingFolder}>
                          {isCreatingFolder ? (
                            <><FolderSync className="mr-2 h-4 w-4 animate-spin" /> Membuat...</>
                          ) : (
                            'Buat Folder Sekarang'
                          )}
                        </Button>
                      )}
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
