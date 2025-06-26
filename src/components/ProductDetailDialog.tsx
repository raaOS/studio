
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
  const [displayImage, setDisplayImage] = useState(service.image);


  useEffect(() => {
    if (isOpen) {
      const cartItem = getCartItem(service.id);
      const initialQuantity = cartItem?.quantity || 0;
      const initialBrief = cartItem?.brief || {};
      const initialTier = cartItem?.budgetTier || null;

      setQuantity(initialQuantity === 0 ? 1 : initialQuantity);
      setBrief(initialBrief);
      setSelectedTier(initialTier);
      
      // Set initial image based on saved tier or default
      setDisplayImage(initialTier ? service.tierImages[initialTier] : service.image);

      if (briefFields.length === 0) {
        setBriefFields(fallbackBriefFields);
      }
    } else {
      // Reset state on close
      setTimeout(() => {
        setBriefFields([]);
        setSelectedTier(null);
        setQuantity(1);
        setBrief({});
        setDisplayImage(service.image);
      }, 300); // Delay to allow exit animation
    }
  }, [isOpen, service, getCartItem, briefFields.length]);
  
  const handleTierSelect = (tier: BudgetTier) => {
    setSelectedTier(tier);
    setDisplayImage(service.tierImages[tier]);
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
      <DialogContent className="sm:max-w-4xl p-0">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Image Gallery */}
          <div className="p-4 md:p-6">
            <div className="relative aspect-square w-full rounded-lg overflow-hidden">
              <Image 
                src={displayImage} 
                alt={service.name} 
                fill 
                className="object-cover"
                data-ai-hint="product image"
              />
            </div>
          </div>
          
          {/* Right Column: Details & Actions */}
          <div className="p-4 md:p-6 flex flex-col bg-muted/30">
            <DialogHeader className="mb-4">
              <DialogTitle className="font-headline text-2xl">{service.name}</DialogTitle>
            </DialogHeader>

            <div className="flex-grow space-y-4 overflow-y-auto pr-2">
              <div className="text-3xl font-bold text-primary">
                {selectedTier ? formatRupiah(service.prices[selectedTier]) : "Pilih varian harga"}
              </div>

              <div className="space-y-2">
                <Label>Varian</Label>
                <div className="flex flex-wrap gap-2">
                  {budgetItems.map((budget) => (
                    <Button
                      key={budget.id}
                      variant={selectedTier === budget.id ? 'default' : 'outline'}
                      onClick={() => handleTierSelect(budget.id)}
                      className="flex-grow md:flex-grow-0"
                    >
                      {budget.title}
                    </Button>
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
              
              <div className="flex items-center justify-between">
                <Label>Kuantitas</Label>
                <QuantityStepper quantity={quantity} onQuantityChange={setQuantity} />
              </div>
            </div>

            <div className="pt-6 mt-auto border-t">
              <Button type="button" onClick={handleSave} disabled={!selectedTier} className="w-full">
                <ShoppingCart className="mr-2 h-4 w-4" />
                {getCartItem(service.id) ? 'Simpan Perubahan' : 'Tambahkan ke Keranjang'}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
