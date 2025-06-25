"use client";

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useCart } from '@/contexts/CartContext';
import { QuantityStepper } from '@/components/QuantityStepper';
import type { Service } from '@/lib/types';
import { formatRupiah } from '@/lib/utils';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const { getItemQuantity, updateItemQuantity, updateBrief, cartItems } = useCart();
  const quantity = getItemQuantity(service.id);
  const brief = cartItems.find(item => item.id === service.id)?.brief ?? '';

  const handleQuantityChange = (newQuantity: number) => {
    updateItemQuantity(service.id, newQuantity);
  };
  
  const handleBriefChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateBrief(service.id, e.target.value);
  }

  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="p-0">
        <Image
          src={service.image}
          alt={service.name}
          width={400}
          height={300}
          className="object-cover w-full h-48"
          data-ai-hint="design service"
        />
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="font-headline text-lg mb-2">{service.name}</CardTitle>
        <p className="text-primary font-semibold text-xl">{formatRupiah(service.price)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col items-start gap-4">
        <div className="flex justify-between items-center w-full">
            <Label>Jumlah</Label>
            <QuantityStepper quantity={quantity} onQuantityChange={handleQuantityChange} />
        </div>
        <AnimatePresence>
          {quantity > 0 && (
            <motion.div
              className="w-full space-y-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Label htmlFor={`brief-${service.id}`}>Brief Desain</Label>
              <Textarea
                id={`brief-${service.id}`}
                placeholder="Jelaskan detail yang Anda inginkan..."
                value={brief}
                onChange={handleBriefChange}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </CardFooter>
    </Card>
  );
}
