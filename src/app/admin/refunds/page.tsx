'use client';

import React from 'react';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">Order ID</TableHead>
                <TableHead className="min-w-[200px]">Nama Klien</TableHead>
                <TableHead className="whitespace-nowrap">Jumlah Refund</TableHead>
                <TableHead className="whitespace-nowrap">Jenis Potongan</TableHead>
                <TableHead className="whitespace-nowrap">Status</TableHead>
                <TableHead className="text-right whitespace-nowrap">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {refunds.length > 0 ? (
                refunds.map((refund) => (
                  <TableRow key={refund.kode_order}>
                    <TableCell className="font-medium whitespace-nowrap">
                      <Link href={`/admin/orders/${refund.kode_order}`} className="text-primary hover:underline">
                        {refund.kode_order}
                      </Link>
                    </TableCell>
                    <TableCell>{refund.nama_klien}</TableCell>
                    <TableCell className="whitespace-nowrap">{formatRupiah(refund.total_refund)}</TableCell>
                    <TableCell className="whitespace-nowrap">{refund.jenis_potongan}</TableCell>
                    <TableCell className="whitespace-nowrap">
                        <Badge variant={refund.status_refund === 'Sudah' ? 'default' : 'secondary'} className={refund.status_refund === 'Sudah' ? 'bg-green-600' : ''}>
                            {refund.status_refund}
                        </Badge>
                    </TableCell>
                    <TableCell className="text-right whitespace-nowrap">
                       {refund.status_refund === 'Belum' && <Button size="sm" variant="outline">Tandai Sudah Ditransfer</Button>}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-24">
                    Belum ada data refund.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
