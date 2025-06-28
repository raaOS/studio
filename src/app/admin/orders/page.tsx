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
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockOrders, allOrderStatusesCategorized, mockCustomers } from '@/lib/data';
import { cn } from '@/lib/utils';
import type { OrderStatus } from '@/lib/types';
import { Folder } from 'lucide-react';

export default function AdminOrdersPage() {
  const [filters, setFilters] = useState({
    status: 'All',
    pekan: 'All',
    search: '',
  });

  const filteredOrders = useMemo(() => {
    return mockOrders.filter(order => {
      const statusMatch = filters.status === 'All' || order.status_pesanan === filters.status;
      const pekanMatch = filters.pekan === 'All' || order.pekan === filters.pekan;
      const searchMatch =
        filters.search === '' ||
        order.kode_order.toLowerCase().includes(filters.search.toLowerCase()) ||
        order.nama_klien.toLowerCase().includes(filters.search.toLowerCase());
      return statusMatch && pekanMatch && searchMatch;
    });
  }, [filters]);

  const handleFilterChange = (key: 'status' | 'pekan', value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };
  
  const getStatusClass = (status: OrderStatus) => {
    switch (status) {
      // Positive flow
      case 'Masuk Antrian': return 'bg-gray-500/20 text-gray-700 border-gray-500/30';
      case 'Sedang Dikerjakan': return 'bg-blue-500/20 text-blue-700 border-blue-500/30';
      case 'Siap Kirim Pratinjau': return 'bg-cyan-500/20 text-cyan-700 border-cyan-500/30';
      case 'Sedang Direvisi': return 'bg-indigo-500/20 text-indigo-700 border-indigo-500/30';
      case 'Selesai': return 'bg-green-500/20 text-green-700 border-green-500/30';

      // Waiting statuses
      case 'Menunggu Pembayaran': return 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30';
      case 'Menunggu Respon Klien': return 'bg-amber-500/20 text-amber-700 border-amber-500/30';
      
      // Action needed statuses
      case 'Perlu Tinjauan Owner': return 'bg-purple-500/20 text-purple-700 border-purple-500/30 font-bold';
      case 'Eskalasi: Revisi di Luar Lingkup': return 'bg-orange-500/20 text-orange-700 border-orange-500/30 font-bold';

      // Negative/Cancellation statuses
      case 'Dibatalkan (Belum Dikerjakan)': return 'bg-red-500/20 text-red-700 border-red-500/30';
      case 'Dibatalkan (Sudah Dikerjakan)': return 'bg-red-600/20 text-red-800 border-red-600/30';
      case 'Tidak Puas (Refund 50%)': return 'bg-pink-500/20 text-pink-700 border-pink-500/30';
      case 'Ditutup (Tanpa Refund)': return 'bg-neutral-500/20 text-neutral-700 border-neutral-500/30';

      default: return 'bg-gray-500/20 text-gray-700 border-gray-500/30';
    }
  };

  const getCustomerId = (customerName: string) => {
    return mockCustomers.find(c => c.name === customerName)?.id || '';
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold font-headline">Daftar Pesanan</h1>
      
      <Card>
        <CardContent className="p-4 flex flex-col md:flex-row items-center gap-4">
          <Select value={filters.status} onValueChange={value => handleFilterChange('status', value)}>
            <SelectTrigger className="w-full md:w-[220px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="All">Semua Status</SelectItem>
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
          <Select value={filters.pekan} onValueChange={value => handleFilterChange('pekan', value)}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Pekan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">Semua Pekan</SelectItem>
              <SelectItem value="W1">Pekan 1</SelectItem>
              <SelectItem value="W2">Pekan 2</SelectItem>
              <SelectItem value="W3">Pekan 3</SelectItem>
              <SelectItem value="W4">Pekan 4</SelectItem>
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
                <TableHead className="whitespace-nowrap">Budget</TableHead>
                <TableHead className="whitespace-nowrap">Status</TableHead>
                <TableHead className="whitespace-nowrap">Drive</TableHead>
                <TableHead className="text-right whitespace-nowrap">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map(order => (
                  <TableRow key={order.kode_order}>
                    <TableCell className="font-medium">{order.kode_order}</TableCell>
                    <TableCell>
                       <Link href={`/admin/customers/${getCustomerId(order.nama_klien)}`} className="hover:underline text-primary">
                        {order.nama_klien}
                      </Link>
                    </TableCell>
                    <TableCell>{order.budget}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn("capitalize", getStatusClass(order.status_pesanan))}>
                        {order.status_pesanan}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {order.driveFolderUrl && (
                        <Button asChild variant="ghost" size="icon">
                          <a href={order.driveFolderUrl} target="_blank" rel="noopener noreferrer" title="Buka Folder Drive">
                            <Folder className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </TableCell>
                    <TableCell className="text-right space-x-2 whitespace-nowrap">
                       {order.status_pesanan === 'Masuk Antrian' && <Button size="sm" variant="default">Mulai</Button>}
                       {order.status_pesanan === 'Sedang Dikerjakan' && <Button size="sm" variant="default">Pratinjau</Button>}
                       {order.status_pesanan === 'Sedang Direvisi' && <Button size="sm" variant="default">Update</Button>}
                       {order.status_pesanan === 'Menunggu Respon Klien' && <Button size="sm" variant="outline">Kirim Pengingat</Button>}
                       {order.status_pesanan === 'Perlu Tinjauan Owner' && <Button size="sm" variant="destructive">Tinjau</Button>}
                       <Button asChild size="sm" variant="ghost">
                          <Link href={`/admin/orders/${order.kode_order}`}>Detail</Link>
                       </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-24">
                    Tidak ada pesanan yang sesuai dengan filter.
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
