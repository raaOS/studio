
"use client";

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useCart } from '@/contexts/CartContext';
import { QuantityStepper } from '@/components/QuantityStepper';
import type { Service } from '@/lib/types';
import { formatRupiah, cn } from '@/lib/utils';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const { getItemQuantity, updateItemQuantity, updateBrief, cartItems, selectedBudget } = useCart();
  const quantity = getItemQuantity(service.id);
  const brief = cartItems.find(item => item.id === service.id)?.brief ?? {};

  const handleQuantityChange = (newQuantity: number) => {
    updateItemQuantity(service, newQuantity);
  };
  
  const handleBriefChange = (field: string, value: string) => {
    updateBrief(service.id, field, value);
  }

  const isBudgetSelected = !!selectedBudget;
  const price = isBudgetSelected ? service.prices[selectedBudget.id] : 0;

  return (
    <Card className={cn(
        "flex flex-col overflow-hidden transition-all duration-300 h-full",
        isBudgetSelected ? "hover:shadow-lg" : "opacity-60"
    )}>
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
        <p className="text-primary font-semibold text-lg">
            {isBudgetSelected ? formatRupiah(price) : 'Pilih budget dulu'}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col items-start gap-4">
        <div className="flex justify-between items-center w-full">
            <Label>Jumlah</Label>
            <QuantityStepper 
                quantity={quantity} 
                onQuantityChange={handleQuantityChange} 
                disabled={!isBudgetSelected}
            />
        </div>
        <AnimatePresence>
          {quantity > 0 && isBudgetSelected && (
            <motion.div
              className="w-full space-y-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-full space-y-2">
                <Label htmlFor={`brief-${service.id}`}>Brief</Label>
                <Textarea
                  id={`brief-${service.id}`}
                  placeholder="Jelaskan detail yang Anda inginkan..."
                  value={brief['detail'] ?? ''}
                  onChange={(e) => handleBriefChange('detail', e.target.value)}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardFooter>
    </Card>
  );
}
