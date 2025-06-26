
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
import { useEffect, useState } from 'react';
import { generateDynamicBrief } from '@/ai/flows/generate-dynamic-brief';
import { Skeleton } from './ui/skeleton';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const { getItemQuantity, updateItemQuantity, updateBrief, cartItems, selectedBudget } = useCart();
  const quantity = getItemQuantity(service.id);
  const brief = cartItems.find(item => item.id === service.id)?.brief ?? {};

  const [briefFields, setBriefFields] = useState<string[]>([]);
  const [isGeneratingBrief, setIsGeneratingBrief] = useState(false);

  const isBudgetSelected = !!selectedBudget;

  // Pastikan aman dari error jika id tidak ditemukan di price map
  const price =
    isBudgetSelected && service.prices[selectedBudget.id] !== undefined
      ? service.prices[selectedBudget.id]
      : 0;

  const handleQuantityChange = (newQuantity: number) => {
    updateItemQuantity(service, newQuantity);
  };

  const handleBriefChange = (field: string, value: string) => {
    updateBrief(service.id, field, value);
  };

  useEffect(() => {
    const fetchBriefFields = async () => {
      // Hanya fetch jika memenuhi semua syarat
      if (quantity > 0 && isBudgetSelected && briefFields.length === 0 && !isGeneratingBrief) {
        setIsGeneratingBrief(true);
        try {
          const response = await generateDynamicBrief({ serviceName: service.name });
          setBriefFields(response.briefFields);
        } catch (error) {
          console.error("[DynamicBrief Error]", error);
          // Fallback default jika gagal
          setBriefFields(['Jelaskan detail yang Anda inginkan...']);
        } finally {
          setIsGeneratingBrief(false);
        }
      } else if (quantity === 0) {
        setBriefFields([]); // reset saat quantity 0
      }
    };

    fetchBriefFields();
  }, [quantity, isBudgetSelected, service.name, isGeneratingBrief, briefFields.length]);

  return (
    <Card className={cn(
      "flex flex-col overflow-hidden h-full relative transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:z-10"
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
              {isGeneratingBrief ? (
                <div className="space-y-3 pt-2">
                  <p className="text-sm text-muted-foreground animate-pulse">
                    Membuat pertanyaan brief...
                  </p>
                  <Skeleton className="h-20 w-full" />
                </div>
              ) : (
                briefFields.map((field) => (
                  <div key={field} className="w-full space-y-2">
                    <Label htmlFor={`brief-${service.id}-${field}`}>{field}</Label>
                    <Textarea
                      id={`brief-${service.id}-${field}`}
                      placeholder="..."
                      maxLength={500}
                      value={brief[field] ?? ''}
                      onChange={(e) => handleBriefChange(field, e.target.value)}
                    />
                  </div>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </CardFooter>
    </Card>
  );
}
