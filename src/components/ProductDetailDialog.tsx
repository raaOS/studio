
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { QuantityStepper } from '@/components/QuantityStepper';
import { useCart } from '@/contexts/CartContext';
import type { Service, BudgetTier } from '@/lib/types';
import { budgetItems } from '@/lib/data';
import { formatRupiah } from '@/lib/utils';
import { ShoppingCart } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { motion } from 'framer-motion';

interface ProductDetailDialogProps {
  service: Service;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const fallbackBriefFields = [
    { name: 'Mau desain seperti apa?', placeholder: 'Jelaskan konsep atau gaya desain yang Anda inginkan...', type: 'textarea' as const },
    { name: 'Link Aset (Google Drive)', placeholder: 'https://drive.google.com/...', type: 'input' as const },
    { name: 'Link Logo (Opsional)', placeholder: 'https://...', type: 'input' as const },
];

export function ProductDetailDialog({ service, isOpen, onOpenChange }: ProductDetailDialogProps) {
  const { addOrUpdateItem, getCartItem } = useCart();
  const { toast } = useToast();
  
  const [quantity, setQuantity] = useState(1);
  const [brief, setBrief] = useState<Record<string, string>>({});
  const [briefFields, setBriefFields] = useState<{name: string, placeholder: string, type: 'textarea' | 'input'}[]>([]);
  const [selectedTier, setSelectedTier] = useState<BudgetTier | null>(null);

  useEffect(() => {
    if (isOpen) {
      const cartItem = getCartItem(service.id);
      const initialQuantity = cartItem?.quantity || 0;
      const initialBrief = cartItem?.brief || {};
      const initialTier = cartItem?.budgetTier || null;

      setQuantity(initialQuantity === 0 ? 1 : initialQuantity);
      setBrief(initialBrief);
      setSelectedTier(initialTier);

      if (briefFields.length === 0) {
        setBriefFields(fallbackBriefFields);
      }
    } else {
      setBriefFields([]);
    }
  }, [isOpen, service.id, getCartItem, briefFields.length]);

  const handleBriefChange = (field: string, value: string) => {
    setBrief(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!selectedTier) {
      toast({
        title: "Pilih Budget Dulu",
        description: "Anda harus memilih salah satu tipe budget sebelum melanjutkan.",
        variant: "destructive",
      });
      return;
    }
    addOrUpdateItem(service, quantity, brief, selectedTier);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">{service.name}</DialogTitle>
          <DialogDescription>
            Pilih budget dan isi detail pesanan Anda di bawah ini.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-4">
            <div className="space-y-2">
                <Label>Pilih Tipe Budget</Label>
                <RadioGroup
                    value={selectedTier ?? ""}
                    onValueChange={(value) => setSelectedTier(value as BudgetTier)}
                    className="grid grid-cols-1 gap-2"
                >
                    {budgetItems.map((budget) => (
                    <motion.div
                        key={budget.id}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                        <Label 
                            htmlFor={`${service.id}-${budget.id}`}
                            className={`flex items-start justify-between rounded-md border-2 p-3 cursor-pointer transition-colors ${selectedTier === budget.id ? 'border-primary bg-primary/5' : 'border-muted hover:bg-accent/50'}`}
                        >
                            <div className="flex items-center gap-4">
                               <Image 
                                 src={service.tierImages[budget.id]} 
                                 alt={budget.title}
                                 width={64}
                                 height={64}
                                 className="rounded-md aspect-square object-cover"
                                 data-ai-hint="tier option"
                               />
                                <div className="flex-1">
                                    <p className="font-semibold">{budget.title}</p>
                                    <p className="text-sm text-muted-foreground">{budget.description}</p>
                                </div>
                            </div>
                            <div className="text-right ml-4 flex-shrink-0 flex flex-col items-end">
                                <p className="font-bold text-lg">{formatRupiah(service.prices[budget.id])}</p>
                                <RadioGroupItem value={budget.id} id={`${service.id}-${budget.id}`} className="mt-2 ml-auto" />
                            </div>
                        </Label>
                    </motion.div>
                    ))}
                </RadioGroup>
            </div>
            
            <Separator />
            
            {briefFields.map(field => (
              <div key={field.name} className="w-full space-y-2">
                <Label htmlFor={`brief-${service.id}-${field.name}`}>{field.name}</Label>
                {field.type === 'textarea' ? (
                    <Textarea
                        id={`brief-${service.id}-${field.name}`}
                        placeholder={field.placeholder}
                        maxLength={500}
                        value={brief[field.name] ?? ''}
                        onChange={(e) => handleBriefChange(field.name, e.target.value)}
                        className="focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                ) : (
                    <Input
                        id={`brief-${service.id}-${field.name}`}
                        placeholder={field.placeholder}
                        value={brief[field.name] ?? ''}
                        onChange={(e) => handleBriefChange(field.name, e.target.value)}
                        className="focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                )}
              </div>
            ))}

            <div className="space-y-2 pt-2">
                <Label>Jumlah Pesanan</Label>
                <QuantityStepper quantity={quantity} onQuantityChange={setQuantity} />
            </div>
        </div>

        <DialogFooter className="pt-4 border-t mt-6">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button type="button" onClick={handleSave} disabled={!selectedTier}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            {getCartItem(service.id) ? 'Simpan Perubahan' : 'Tambahkan ke Keranjang'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
