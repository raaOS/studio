
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockOrders, allOrderStatusesCategorized, mockCustomers } from '@/lib/data';
import { cn, getOrderStatusClass } from '@/lib/utils';
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

      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map(order => (
            <Card key={order.kode_order}>
                <CardHeader className="flex flex-row items-start justify-between gap-4 p-4">
                    <div>
                        <CardTitle className="text-lg">{order.kode_order}</CardTitle>
                        <p className="text-sm text-muted-foreground">{order.nama_klien}</p>
                    </div>
                    <Badge variant="outline" className={cn("capitalize text-right", getOrderStatusClass(order.status_pesanan))}>
                        {order.status_pesanan}
                    </Badge>
                </CardHeader>
                <CardContent className="p-4 pt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="text-sm text-muted-foreground">
                        Budget: <span className="font-semibold text-foreground">{order.budget}</span> | Pekan: <span className="font-semibold text-foreground">{order.pekan}</span>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        {order.driveFolderUrl && (
                            <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                                <a href={order.driveFolderUrl} target="_blank" rel="noopener noreferrer" title="Buka Folder Drive">
                                    <Folder className="h-4 w-4" />
                                </a>
                            </Button>
                        )}
                        <Button asChild size="sm" className="w-full sm:w-auto">
                            <Link href={`/admin/orders/${order.kode_order}`}>Lihat Detail</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              <p>Tidak ada pesanan yang sesuai dengan filter.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
