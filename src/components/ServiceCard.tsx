
"use client";

import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import type { Service } from '@/lib/types';
import { useState } from 'react';
import { ProductDetailDialog } from './ProductDetailDialog';
import { PlusCircle } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const { getCartItem } = useCart();
  const cartItem = getCartItem(service.id);
  const quantity = cartItem?.quantity ?? 0;
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Card className="flex flex-col h-full overflow-hidden">
        <CardHeader className="p-0">
          <Image
            src={service.image}
            alt={service.name}
            width={400}
            height={300}
            className="object-cover w-full h-48"
            data-ai-hint={service.dataAiHint}
          />
        </CardHeader>

        <CardContent className="p-4 flex-grow">
          <CardTitle className="font-headline text-lg mb-2">{service.name}</CardTitle>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button 
            className="w-full" 
            variant={quantity > 0 ? "secondary" : "default"}
            onClick={() => setIsDialogOpen(true)}
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
      
      <ProductDetailDialog 
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        service={service}
      />
    </>
  );
}
