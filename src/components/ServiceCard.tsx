
"use client";

import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import type { Service } from '@/lib/types';
import { useState } from 'react';
import { ProductDetailDialog } from './ProductDetailDialog';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { PlusCircle } from 'lucide-react';
import { formatRupiah } from '@/lib/utils';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const { getCartItem } = useCart();
  const cartItem = getCartItem(service.id);
  const quantity = cartItem?.quantity ?? 0;
  
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);

  const prices = Object.values(service.prices);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  return (
    <>
      <Card className="flex flex-col h-full overflow-hidden">
        <CardHeader className="p-0">
          <div
            className="relative w-full cursor-pointer overflow-hidden aspect-[4/3]"
            onClick={() => setIsImagePreviewOpen(true)}
            role="button"
            aria-label={`Lihat gambar untuk ${service.name}`}
          >
            <Image
              src={service.image}
              alt={service.name}
              fill
              className="object-cover"
              data-ai-hint={service.dataAiHint}
            />
          </div>
        </CardHeader>

        <CardContent className="p-4 flex-grow space-y-1">
          <CardTitle className="font-headline text-lg">{service.name}</CardTitle>
          <p className="font-semibold text-primary/80 text-sm">
            {formatRupiah(minPrice)} - {formatRupiah(maxPrice)}
          </p>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button 
            className="w-full" 
            variant={quantity > 0 ? "secondary" : "default"}
            onClick={() => setIsDetailDialogOpen(true)}
          >
            {quantity > 0 ? (
              <div className='flex items-center justify-center'>
                <Badge className="mr-2">{quantity}</Badge> Ubah Detail
              </div>
            ) : (
              <>
                <PlusCircle className="mr-2 h-4 w-4" />
                Tambahkan
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
      
      {/* This is the dialog for configuring the product */}
      <ProductDetailDialog 
        isOpen={isDetailDialogOpen}
        onOpenChange={setIsDetailDialogOpen}
        service={service}
      />

      {/* This is the new dialog for just previewing the image */}
      <Dialog open={isImagePreviewOpen} onOpenChange={setIsImagePreviewOpen}>
        <DialogContent className="max-w-3xl p-2">
            {/* Adding a title for accessibility */}
            <DialogTitle className="sr-only">Pratinjau Gambar: {service.name}</DialogTitle>
            <Image
                src={service.image}
                alt={service.name}
                width={1200}
                height={800}
                className="object-contain w-full h-full rounded-md"
            />
        </DialogContent>
      </Dialog>
    </>
  );
}
