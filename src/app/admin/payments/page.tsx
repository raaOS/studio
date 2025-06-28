'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockOrders } from '@/lib/data';
import { cn, formatRupiah } from '@/lib/utils';

export default function AdminPaymentsPage() {
  const [filters, setFilters] = useState({
    status: 'All',
    search: '',
  });

  const filteredOrders = useMemo(() => {
    return mockOrders.filter(order => {
      const statusMatch = filters.status === 'All' || order.paymentStatus === filters.status;
      const searchMatch =
        filters.search === '' ||
        order.kode_order.toLowerCase().includes(filters.search.toLowerCase()) ||
        order.nama_klien.toLowerCase().includes(filters.search.toLowerCase());
      return statusMatch && searchMatch;
    });
  }, [filters]);

  const handleFilterChange = (value: string) => {
    setFilters(prev => ({ ...prev, status: value }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };
  
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Lunas': return 'bg-green-500/20 text-green-700 border-green-500/30';
      case 'DP': return 'bg-blue-500/20 text-blue-700 border-blue-500/30';
      case 'Belum Lunas': return 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30';
      case 'Batal': return 'bg-red-500/20 text-red-700 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-700 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold font-headline">Validasi Pembayaran</h1>
      
      <Card>
        <CardContent className="p-4 flex flex-col md:flex-row items-center gap-4">
          <Select value={filters.status} onValueChange={handleFilterChange}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Status Pembayaran" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">Semua Status</SelectItem>
              <SelectItem value="Lunas">Lunas</SelectItem>
              <SelectItem value="DP">DP</SelectItem>
              <SelectItem value="Belum Lunas">Belum Lunas</SelectItem>
              <SelectItem value="Batal">Batal</SelectItem>
            </SelectContent>
          </Select>
          <Input
            placeholder="Cari kode atau nama..."
            value={filters.search}
            onChange={handleSearchChange}
            className="w-full md:flex-1"
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">Kode</TableHead>
                <TableHead className="min-w-[200px]">Nama</TableHead>
                <TableHead className="whitespace-nowrap">Dibayar</TableHead>
                <TableHead className="whitespace-nowrap">Total Order</TableHead>
                <TableHead className="whitespace-nowrap">Status Bayar</TableHead>
                <TableHead className="whitespace-nowrap">Tanggal</TableHead>
                <TableHead className="text-right whitespace-nowrap">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map(order => (
                  <TableRow key={order.kode_order}>
                    <TableCell className="font-medium whitespace-nowrap">
                      <Link href={`/admin/orders/${order.kode_order}`} className="text-primary hover:underline">
                        {order.kode_order}
                      </Link>
                    </TableCell>
                    <TableCell>{order.nama_klien}</TableCell>
                    <TableCell className="whitespace-nowrap">{formatRupiah(order.jumlah_transfer)}</TableCell>
                    <TableCell className="whitespace-nowrap">{formatRupiah(order.total_harga)}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      <Badge variant="outline" className={cn("capitalize", getStatusClass(order.paymentStatus))}>
                        {order.paymentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">{new Date(order.timestamp).toLocaleDateString('id-ID')}</TableCell>
                    <TableCell className="text-right space-x-2 whitespace-nowrap">
                       {order.paymentStatus !== 'Lunas' && order.paymentStatus !== 'Batal' && <Button size="sm" variant="default">Validasi</Button>}
                       {order.paymentStatus === 'Belum Lunas' && <Button size="sm" variant="outline">Ingatkan</Button>}
                       <Button asChild size="sm" variant="ghost">
                          <Link href={`/admin/orders/${order.kode_order}`}>Detail</Link>
                       </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center h-24">
                    Tidak ada data pembayaran yang sesuai dengan filter.
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
