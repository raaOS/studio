
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { PlusCircle, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatRupiah } from '@/lib/utils';
import { mockOrders } from '@/lib/data';

export default function AdminRefundsPage() {
  const refunds = mockOrders.filter(order => ['Menunggu Proses Refund', 'Dibatalkan'].includes(order.status_pesanan));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-headline">Manajemen Refund</h1>
          <p className="text-muted-foreground">Lacak dan kelola semua permintaan pengembalian dana.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Proses Refund Manual
        </Button>
      </div>
      
      <Card>
        <CardHeader>
            <CardTitle>Daftar Permintaan Refund</CardTitle>
            <CardDescription>Riwayat pengembalian dana yang sedang diproses atau sudah selesai.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {refunds.length > 0 ? (
            refunds.map((refund) => (
              <Card key={refund.kode_order} className={refund.status_pesanan === 'Menunggu Proses Refund' ? 'border-destructive' : ''}>
                 <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="text-lg">
                                <Link href={`/admin/orders/${refund.kode_order}`} className="text-primary hover:underline">
                                    {refund.kode_order}
                                </Link>
                            </CardTitle>
                            <CardDescription>{refund.nama_klien}</CardDescription>
                        </div>
                         <Badge variant={refund.status_pesanan === 'Menunggu Proses Refund' ? 'destructive' : 'secondary'}>
                            {refund.status_pesanan}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                    {refund.cancellationDetails && (
                        <blockquote className="mt-2 border-l-2 pl-4 italic text-sm">
                            <div className="flex items-center gap-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} className={`h-4 w-4 ${i < refund.cancellationDetails!.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
                                ))}
                            </div>
                            "{refund.cancellationDetails.reason}"
                        </blockquote>
                    )}
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                  <div>
                    <span className="text-sm text-muted-foreground">Jumlah Refund: </span>
                    <span className="font-bold">{formatRupiah(refund.total_refund)}</span>
                  </div>
                  {refund.status_pesanan === 'Menunggu Proses Refund' && <Button size="sm">Selesaikan Refund</Button>}
                </CardFooter>
              </Card>
            ))
          ) : (
             <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                    <p>Belum ada data refund.</p>
                </CardContent>
             </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
