'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatRupiah } from '@/lib/utils';
import { mockOrders } from '@/lib/data';

export default function AdminRefundsPage() {
  const refunds = mockOrders.filter(order => order.total_refund > 0);

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
            <CardTitle>Daftar Refund</CardTitle>
            <CardDescription>Riwayat pengembalian dana yang sedang diproses atau sudah selesai.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {refunds.length > 0 ? (
            refunds.map((refund) => (
              <Card key={refund.kode_order}>
                <CardContent className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                  <div>
                    <p className="font-semibold text-muted-foreground">Order ID</p>
                    <Link href={`/admin/orders/${refund.kode_order}`} className="text-primary hover:underline font-bold">
                        {refund.kode_order}
                    </Link>
                    <p className="text-xs text-muted-foreground">{refund.nama_klien}</p>
                  </div>
                   <div>
                    <p className="font-semibold text-muted-foreground">Jumlah Refund</p>
                    <p>{formatRupiah(refund.total_refund)}</p>
                  </div>
                   <div>
                    <p className="font-semibold text-muted-foreground">Status</p>
                    <Badge variant={refund.status_refund === 'Sudah' ? 'default' : 'secondary'} className={refund.status_refund === 'Sudah' ? 'bg-green-600' : ''}>
                        {refund.status_refund}
                    </Badge>
                  </div>
                  <div className="col-span-2 md:col-span-1 flex justify-end">
                    {refund.status_refund === 'Belum' && <Button size="sm" variant="outline">Tandai Sudah Ditransfer</Button>}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center text-muted-foreground py-12">
              <p>Belum ada data refund.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
