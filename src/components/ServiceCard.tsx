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
import { generateDynamicBrief } from '@/ai/flows/generate-dynamic-brief';
import { useState, useEffect } from 'react';
import { Skeleton } from './ui/skeleton';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const { getItemQuantity, updateItemQuantity, updateBrief, cartItems } = useCart();
  const quantity = getItemQuantity(service.id);
  const brief = cartItems.find(item => item.id === service.id)?.brief ?? {};
  
  const [briefFields, setBriefFields] = useState<string[] | null>(null);
  const [isLoadingFields, setIsLoadingFields] = useState(false);

  useEffect(() => {
    const fetchFields = async () => {
      if (quantity > 0 && !briefFields) {
        setIsLoadingFields(true);
        try {
          const response = await generateDynamicBrief({ serviceName: service.name });
          setBriefFields(response.briefFields);
        } catch (error) {
          console.error("Failed to generate brief fields:", error);
          // Fallback to a generic field
          setBriefFields(["Jelaskan detail yang Anda inginkan..."]);
        } finally {
          setIsLoadingFields(false);
        }
      }
    };

    fetchFields();
  }, [quantity, briefFields, service.name]);

  const handleQuantityChange = (newQuantity: number) => {
    updateItemQuantity(service.id, newQuantity);
  };
  
  const handleBriefChange = (field: string, value: string) => {
    updateBrief(service.id, field, value);
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
              className="w-full space-y-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-full space-y-2">
                {isLoadingFields ? (
                  <>
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-20 w-full" />
                  </>
                ) : (
                  briefFields?.map(field => (
                    <div key={field} className="space-y-2">
                      <Label htmlFor={`brief-${service.id}-${field}`}>{field}</Label>
                      <Textarea
                        id={`brief-${service.id}-${field}`}
                        placeholder="..."
                        value={brief[field] ?? ''}
                        onChange={(e) => handleBriefChange(field, e.target.value)}
                      />
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardFooter>
    </Card>
  );
}
