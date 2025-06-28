'use client';

import React, { useState, useMemo } from 'react';
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
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  const [filters, setFilters] = useState({ search: '', category: 'all' });
  const { toast } = useToast();

  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const searchMatch = service.name.toLowerCase().includes(filters.search.toLowerCase());
      const categoryMatch = filters.category === 'all' || service.category === filters.category;
      return searchMatch && categoryMatch;
    });
  }, [filters]);
  
  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsDialogOpen(true);
  };

  const handleEditProduct = (service: Service) => {
    setSelectedProduct(service);
    setIsDialogOpen(true);
  };

  const handleDeleteProduct = (service: Service) => {
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
          <CardContent className="p-4 flex flex-col md:flex-row items-center gap-4">
            <Input
              placeholder="Cari nama produk..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              className="w-full md:flex-1"
            />
            <Select 
              value={filters.category} 
              onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger className="w-full md:w-[240px]">
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                {mockCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="whitespace-nowrap">Nama Produk</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Kaki Lima</TableHead>
                  <TableHead>UMKM</TableHead>
                  <TableHead>E-Comm</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredServices.length > 0 ? (
                  filteredServices.map((service: Service) => (
                    <TableRow key={service.id}>
                      <TableCell className="font-medium whitespace-nowrap">{service.name}</TableCell>
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
                      Belum ada produk yang cocok dengan filter Anda.
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
