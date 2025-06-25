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
import { cn } from '@/lib/utils';
import type { OrderStatus } from '@/lib/types';

export default function AdminOrdersPage() {
  const [filters, setFilters] = useState({
    status: 'All',
    pekan: 'All',
    search: '',
  });

  const filteredOrders = useMemo(() => {
    return mockOrders.filter(order => {
      const statusMatch = filters.status === 'All' || order.status === filters.status;
      const pekanMatch = filters.pekan === 'All' || order.pekan === filters.pekan;
      const searchMatch =
        filters.search === '' ||
        order.id.toLowerCase().includes(filters.search.toLowerCase()) ||
        order.customerName.toLowerCase().includes(filters.search.toLowerCase());
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
      case 'Antri': return 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30';
      case 'Kerja': return 'bg-blue-500/20 text-blue-700 border-blue-500/30';
      case 'Revisi': return 'bg-orange-500/20 text-orange-700 border-orange-500/30';
      case 'Selesai': return 'bg-green-500/20 text-green-700 border-green-500/30';
      case 'Batal': return 'bg-red-500/20 text-red-700 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-700 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold font-headline">Daftar Pesanan</h1>
      
      <Card>
        <CardContent className="p-4 flex flex-col md:flex-row items-center gap-4">
          <Select value={filters.status} onValueChange={value => handleFilterChange('status', value)}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">Semua Status</SelectItem>
              <SelectItem value="Antri">Antri</SelectItem>
              <SelectItem value="Kerja">Kerja</SelectItem>
              <SelectItem value="Revisi">Revisi</SelectItem>
              <SelectItem value="Selesai">Selesai</SelectItem>
              <SelectItem value="Batal">Batal</SelectItem>
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
                <TableHead>Kode</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Pekan</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map(order => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>{order.budget}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn("capitalize", getStatusClass(order.status))}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{order.pekan}</TableCell>
                    <TableCell className="text-right space-x-2">
                       {order.status === 'Antri' && <Button size="sm" variant="default">Mulai</Button>}
                       {order.status === 'Kerja' && <Button size="sm" variant="default">Pratinjau</Button>}
                       {order.status === 'Revisi' && <Button size="sm" variant="default">Update</Button>}
                       {order.status === 'Revisi' && <Button size="sm" variant="outline">Chat</Button>}
                       <Button asChild size="sm" variant="ghost">
                          <Link href={`/admin/orders/${order.id.substring(1)}`}>Detail</Link>
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
