'use client';

import React from 'react';
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
    <div className="space-y-4">
      {mockPromos.length > 0 ? (
        mockPromos.map(promo => (
          <Card key={promo.id}>
             <CardContent className="p-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-sm">
                <div>
                  <p className="font-bold">{promo.productName}</p>
                  <p className="text-muted-foreground">Promo: {promo.promoText} | Periode: {promo.period}</p>
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto">
                   <Badge variant="outline" className={cn("capitalize", getStatusClass(promo.status))}>
                      {promo.status}
                    </Badge>
                  <Button size="sm" variant="outline" className="ml-auto">Edit</Button>
                </div>
              </CardContent>
          </Card>
        ))
      ) : (
         <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              <p>Belum ada promo yang dibuat.</p>
            </CardContent>
          </Card>
      )}
    </div>
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
       <div className="space-y-4">
        {mockCoupons.length > 0 ? (
            mockCoupons.map(coupon => (
              <Card key={coupon.id}>
                <CardContent className="p-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-sm">
                    <div>
                        <p className="font-mono font-bold text-base">{coupon.code}</p>
                        <p className="text-muted-foreground">Diskon: {coupon.discount} | Usage: {coupon.usage} | Periode: {coupon.period}</p>
                    </div>
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                        <Badge variant="outline" className={cn("capitalize", getStatusClass(coupon.status))}>
                          {coupon.status}
                        </Badge>
                       <Button size="sm" variant="outline" className="ml-auto">Edit</Button>
                    </div>
                  </CardContent>
              </Card>
            ))
        ) : (
            <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                <p>Belum ada kupon yang dibuat.</p>
                </CardContent>
            </Card>
        )}
      </div>
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
