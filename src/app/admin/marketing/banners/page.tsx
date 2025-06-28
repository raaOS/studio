'use client';

import React from 'react';
import Image from 'next/image';
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[200px]">Nama</TableHead>
                <TableHead className="whitespace-nowrap">Posisi</TableHead>
                <TableHead className="whitespace-nowrap">Periode</TableHead>
                <TableHead className="whitespace-nowrap">Status</TableHead>
                <TableHead className="text-right whitespace-nowrap">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockBanners.length > 0 ? (
                mockBanners.map((banner: Banner) => (
                  <TableRow key={banner.id}>
                    <TableCell className="font-medium">{banner.name}</TableCell>
                    <TableCell>{banner.position}</TableCell>
                    <TableCell>{banner.period}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn("capitalize", getStatusClass(banner.status))}>
                        {banner.status}
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
                    Belum ada banner yang dibuat.
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
