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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockCoupons, mockPromos } from '@/lib/data';
import { cn } from '@/lib/utils';
import { PlusCircle } from 'lucide-react';

const PromosTab = () => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Aktif': return 'bg-green-500/20 text-green-700 border-green-500/30';
      case 'Draft': return 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30';
      case 'Selesai': return 'bg-gray-500/20 text-gray-700 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-700 border-gray-500/30';
    }
  };

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produk</TableHead>
              <TableHead>Promo</TableHead>
              <TableHead>Periode</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockPromos.length > 0 ? (
              mockPromos.map(promo => (
                <TableRow key={promo.id}>
                  <TableCell className="font-medium">{promo.productName}</TableCell>
                  <TableCell>{promo.promoText}</TableCell>
                  <TableCell>{promo.period}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn("capitalize", getStatusClass(promo.status))}>
                      {promo.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                     <Button size="sm" variant="outline">Edit</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24">
                  Belum ada promo yang dibuat.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

const CouponsTab = () => {
    const getStatusClass = (status: string) => {
        switch (status) {
        case 'Aktif': return 'bg-green-500/20 text-green-700 border-green-500/30';
        case 'Draft': return 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30';
        case 'Expired': return 'bg-red-500/20 text-red-700 border-red-500/30';
        default: return 'bg-gray-500/20 text-gray-700 border-gray-500/30';
        }
    };

    return (
        <Card>
            <CardContent className="p-0">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Kode</TableHead>
                    <TableHead>Diskon</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Periode</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {mockCoupons.length > 0 ? (
                    mockCoupons.map(coupon => (
                    <TableRow key={coupon.id}>
                        <TableCell className="font-medium">{coupon.code}</TableCell>
                        <TableCell>{coupon.discount}</TableCell>
                        <TableCell>{coupon.usage}</TableCell>
                        <TableCell>{coupon.period}</TableCell>
                        <TableCell>
                        <Badge variant="outline" className={cn("capitalize", getStatusClass(coupon.status))}>
                            {coupon.status}
                        </Badge>
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                        <Button size="sm" variant="outline">Edit</Button>
                        </TableCell>
                    </TableRow>
                    ))
                ) : (
                    <TableRow>
                    <TableCell colSpan={6} className="text-center h-24">
                        Belum ada kupon yang dibuat.
                    </TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table>
            </CardContent>
        </Card>
    );
};


export default function DiscountsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold font-headline">Diskon & Promo</h1>
         <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Tambah Baru
        </Button>
      </div>
      
      <Tabs defaultValue="promos" className="w-full">
        <TabsList>
          <TabsTrigger value="promos">Promo Produk</TabsTrigger>
          <TabsTrigger value="coupons">Kupon</TabsTrigger>
        </TabsList>
        <TabsContent value="promos" className="mt-4">
            <PromosTab />
        </TabsContent>
        <TabsContent value="coupons" className="mt-4">
            <CouponsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
