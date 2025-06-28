'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { services, mockCategories } from '@/lib/data';
import { formatRupiah } from '@/lib/utils';
import type { Service } from '@/lib/types';
import { PlusCircle } from 'lucide-react';
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
      const categoryMatch = filters.category === 'all' || service.category === category.id;
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
    toast({
      title: 'Simulasi Hapus Produk',
      description: `Produk "${service.name}" telah dihapus (simulasi).`,
      variant: 'destructive',
    });
  };

  const getCategoryName = (categoryId: string) => {
    return mockCategories.find(c => c.id === categoryId)?.name || categoryId;
  };

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

        {filteredServices.length > 0 ? (
          <div className="space-y-4">
            {filteredServices.map(service => (
              <Card key={service.id}>
                <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4">
                  <div className="space-y-1">
                    <h3 className="font-bold text-lg">{service.name}</h3>
                    <p className="text-sm text-muted-foreground">Kategori: {getCategoryName(service.category)}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm pt-2">
                      <span>Kaki Lima: <span className="font-semibold">{formatRupiah(service.prices['kaki-lima'])}</span></span>
                      <span>UMKM: <span className="font-semibold">{formatRupiah(service.prices['umkm'])}</span></span>
                      <span>E-Comm: <span className="font-semibold">{formatRupiah(service.prices['e-comm'])}</span></span>
                    </div>
                  </div>
                  <div className="flex sm:flex-col gap-2 justify-start sm:justify-center sm:items-end">
                    <Button size="sm" onClick={() => handleEditProduct(service)}>Edit</Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDeleteProduct(service)}>Hapus</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              <p>Belum ada produk yang cocok dengan filter Anda.</p>
            </CardContent>
          </Card>
        )}
      </div>

      <ProductFormDialog 
        product={selectedProduct}
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </>
  );
}
