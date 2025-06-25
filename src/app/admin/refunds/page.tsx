'use client';

import React from 'react';
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


// Mock data for refunds, we can expand this later
const mockRefunds = [
    { id: 'ref-001', orderId: '#006', amount: 180000, reason: 'Eskalasi: Revisi di Luar Lingkup', status: 'Pending', date: '2024-05-27' },
    { id: 'ref-002', orderId: '#008', amount: 50000, reason: 'Tidak Puas (Refund 50%)', status: 'Completed', date: '2024-05-26' },
];

export default function AdminRefundsPage() {
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
                <TableHead>Order ID</TableHead>
                <TableHead>Jumlah</TableHead>
                <TableHead>Alasan</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockRefunds.length > 0 ? (
                mockRefunds.map((refund) => (
                  <TableRow key={refund.id}>
                    <TableCell className="font-medium text-primary hover:underline cursor-pointer">{refund.orderId}</TableCell>
                    <TableCell>{formatRupiah(refund.amount)}</TableCell>
                    <TableCell>{refund.reason}</TableCell>
                    <TableCell>{refund.date}</TableCell>
                    <TableCell>
                        <Badge variant={refund.status === 'Completed' ? 'default' : 'secondary'} className={refund.status === 'Completed' ? 'bg-green-600' : ''}>
                            {refund.status}
                        </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                       {refund.status === 'Pending' && <Button size="sm" variant="outline">Tandai Selesai</Button>}
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
