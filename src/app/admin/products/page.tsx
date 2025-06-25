'use client';

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { services, mockCategories } from '@/lib/data';
import { formatRupiah } from '@/lib/utils';
import { PlusCircle, MoreHorizontal } from 'lucide-react';
import type { Service } from '@/lib/types';
import { ProductFormDialog } from '@/components/ProductFormDialog';
import { useToast } from '@/hooks/use-toast';

export default function AdminProductsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Service | null>(null);
  const { toast } = useToast();

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsDialogOpen(true);
  };

  const handleEditProduct = (service: Service) => {
    setSelectedProduct(service);
    setIsDialogOpen(true);
  };

  const handleDeleteProduct = (service: Service) => {
    // In a real app, you'd show a confirmation and then call an API to delete.
    // For now, we just log it and show a toast.
    console.log("Delete product:", service);
    toast({
      title: 'Simulasi Hapus Produk',
      description: `Produk "${service.name}" telah dihapus (simulasi).`,
      variant: 'destructive',
    });
  }
  
  const getCategoryName = (categoryId: string) => {
    return mockCategories.find(c => c.id === categoryId)?.name || categoryId;
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-headline">Manajemen Produk</h1>
            <p className="text-muted-foreground">Kelola layanan dan harga yang Anda tawarkan.</p>
          </div>
          <Button onClick={handleAddProduct}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Tambah Produk
          </Button>
        </div>
        
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Produk</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Kaki Lima</TableHead>
                  <TableHead>UMKM</TableHead>
                  <TableHead>E-Comm</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.length > 0 ? (
                  services.map((service: Service) => (
                    <TableRow key={service.id}>
                      <TableCell className="font-medium">{service.name}</TableCell>
                      <TableCell>{getCategoryName(service.category)}</TableCell>
                      <TableCell>{formatRupiah(service.prices['kaki-lima'])}</TableCell>
                      <TableCell>{formatRupiah(service.prices['umkm'])}</TableCell>
                      <TableCell>{formatRupiah(service.prices['e-comm'])}</TableCell>
                      <TableCell className="text-right">
                         <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">Aksi untuk {service.name}</span>
                                  </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                  <DropdownMenuItem onSelect={() => handleEditProduct(service)}>Edit</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-destructive focus:bg-destructive/30" onSelect={() => handleDeleteProduct(service)}>Hapus</DropdownMenuItem>
                              </DropdownMenuContent>
                          </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center h-24">
                      Belum ada produk yang ditambahkan.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <ProductFormDialog 
        product={selectedProduct}
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </>
  );
}
