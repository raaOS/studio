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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { mockCustomers } from '@/lib/data';
import { formatRupiah } from '@/lib/utils';
import type { CustomerProfile } from '@/lib/types';

export default function AdminCustomersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-headline">Manajemen Pelanggan</h1>
        <p className="text-muted-foreground">Lihat dan kelola semua data pelanggan Anda.</p>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pelanggan</TableHead>
                <TableHead>Lifetime Value (LTV)</TableHead>
                <TableHead>Total Pesanan</TableHead>
                <TableHead>Order Terakhir</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCustomers.length > 0 ? (
                mockCustomers.map((customer: CustomerProfile) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src={customer.avatar} alt={customer.name} data-ai-hint="user avatar" />
                                <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p>{customer.name}</p>
                                <p className="text-sm text-muted-foreground">{customer.email}</p>
                            </div>
                        </div>
                    </TableCell>
                    <TableCell>{formatRupiah(customer.ltv)}</TableCell>
                    <TableCell>{customer.totalOrders}</TableCell>
                    <TableCell>{customer.lastOrderDate}</TableCell>
                    <TableCell className="text-right">
                       <Button asChild size="sm" variant="outline">
                          <Link href={`/admin/customers/${customer.id}`}>Lihat Detail</Link>
                       </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-24">
                    Belum ada data pelanggan.
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
