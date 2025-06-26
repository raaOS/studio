'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { QuantityStepper } from '@/components/QuantityStepper';
import { useCart } from '@/contexts/CartContext';
import type { Service, BudgetTier } from '@/lib/types';
import { budgetItems } from '@/lib/data';
import { formatRupiah } from '@/lib/utils';
import { ShoppingCart } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';
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
      // Small delay to allow exit animation to finish before resetting state.
      setTimeout(() => {
        setBriefFields([]);
        setSelectedTier(null);
        setQuantity(1);
        setBrief({});
      }, 300); // Should match animation duration
    }
  }, [isOpen, service, getCartItem, briefFields.length]);
  
  const handleTierSelect = (tier: BudgetTier) => {
    setSelectedTier(tier);
  };

  const handleBriefChange = (field: string, value: string) => {
    setBrief(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!selectedTier) {
      toast({
        title: "Pilih Varian Dulu",
        description: "Anda harus memilih salah satu varian budget sebelum melanjutkan.",
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
          <DialogTitle>{service.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-4">
          <div className="text-3xl font-bold text-primary">
            {selectedTier ? formatRupiah(service.prices[selectedTier] * quantity) : "Pilih varian harga"}
          </div>

          <div className="space-y-2">
            <Label>Varian</Label>
            <div className="flex flex-col gap-2">
              {budgetItems.map((budget) => (
                 <motion.div
                  key={budget.id}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <button
                    onClick={() => handleTierSelect(budget.id)}
                    className={cn(
                        "w-full text-left p-3 border-2 rounded-lg transition-colors",
                        "flex items-start gap-4",
                        selectedTier === budget.id ? 'border-primary bg-primary/5' : 'border-muted bg-popover hover:bg-accent/50'
                    )}
                  >
                    <Image src={budget.image} alt={budget.title} width={40} height={40} className="rounded-md" data-ai-hint="logo" />
                    <div>
                      <p className="font-semibold">{budget.title}</p>
                      <p className="text-xs text-muted-foreground">{budget.description}</p>
                    </div>
                  </button>
                 </motion.div>
              ))}
            </div>
          </div>
          
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
                  />
              ) : (
                  <Input
                      id={`brief-${service.id}-${field.name}`}
                      placeholder={field.placeholder}
                      value={brief[field.name] ?? ''}
                      onChange={(e) => handleBriefChange(field.name, e.target.value)}
                  />
              )}
            </div>
          ))}
        </div>
        
        <div className="pt-4 mt-2 border-t">
          <div className="flex items-center justify-between mb-4">
            <Label>Kuantitas</Label>
            <QuantityStepper quantity={quantity} onQuantityChange={setQuantity} />
          </div>
          <Button type="button" onClick={handleSave} disabled={!selectedTier} className="w-full">
            <ShoppingCart className="mr-2 h-4 w-4" />
            {getCartItem(service.id) ? 'Simpan Perubahan' : 'Tambahkan ke Keranjang'}
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
}
