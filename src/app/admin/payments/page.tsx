'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map(order => (
            <Card key={order.kode_order}>
              <CardHeader className="flex flex-row items-start justify-between gap-4 p-4">
                <div>
                  <CardTitle className="text-lg">
                     <Link href={`/admin/orders/${order.kode_order}`} className="text-primary hover:underline">
                        {order.kode_order}
                      </Link>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{order.nama_klien}</p>
                </div>
                 <Badge variant="outline" className={cn("capitalize", getStatusClass(order.paymentStatus))}>
                    {order.paymentStatus}
                  </Badge>
              </CardHeader>
              <CardContent className="p-4 pt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="grid grid-cols-2 gap-4 text-sm w-full sm:w-auto">
                  <div>
                    <p className="font-semibold text-muted-foreground">Dibayar</p>
                    <p>{formatRupiah(order.jumlah_transfer)}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-muted-foreground">Total</p>
                    <p>{formatRupiah(order.total_harga)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    {order.paymentStatus !== 'Lunas' && order.paymentStatus !== 'Batal' && <Button size="sm" variant="default" className="w-full sm:w-auto">Validasi</Button>}
                    {order.paymentStatus === 'Belum Lunas' && <Button size="sm" variant="outline" className="w-full sm:w-auto">Ingatkan</Button>}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              <p>Tidak ada data pembayaran yang sesuai dengan filter.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
