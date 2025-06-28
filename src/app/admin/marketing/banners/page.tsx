'use client';

import React from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { mockBanners } from '@/lib/data';
import { cn } from '@/lib/utils';
import { PlusCircle } from 'lucide-react';
import type { Banner } from '@/lib/types';

export default function AdminBannersPage() {
  
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Aktif': return 'bg-green-500/20 text-green-700 border-green-500/30';
      case 'Draft': return 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30';
      case 'Selesai': return 'bg-gray-500/20 text-gray-700 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-700 border-gray-500/30';
    }
  };

  const activeBanner = mockBanners.find(b => b.status === 'Aktif');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold font-headline">Kelola Banner Promo</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Upload Banner
        </Button>
      </div>
      
      {activeBanner && (
        <Card>
            <CardHeader>
                <CardTitle>Preview Banner Aktif</CardTitle>
                <CardDescription>Banner ini yang sedang ditampilkan kepada pengunjung.</CardDescription>
            </CardHeader>
            <CardContent>
                {activeBanner.type === 'Image' && activeBanner.image ? (
                     <Image
                        src={activeBanner.image}
                        alt={activeBanner.name}
                        width={800}
                        height={100}
                        className="object-cover w-full rounded-md border"
                        data-ai-hint="promotional banner"
                      />
                ) : (
                    <div className="p-6 bg-muted rounded-md text-center font-medium text-muted-foreground">
                        {activeBanner.content}
                    </div>
                )}
            </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Daftar Banner</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockBanners.length > 0 ? (
            mockBanners.map((banner: Banner) => (
              <Card key={banner.id}>
                <CardContent className="p-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-sm">
                  <div>
                    <p className="font-bold">{banner.name}</p>
                    <p className="text-muted-foreground">Posisi: {banner.position} | Periode: {banner.period}</p>
                  </div>
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <Badge variant="outline" className={cn("capitalize", getStatusClass(banner.status))}>
                      {banner.status}
                    </Badge>
                    <Button size="sm" variant="outline" className="ml-auto">Edit</Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
             <div className="text-center text-muted-foreground py-12">
              <p>Belum ada banner yang dibuat.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
