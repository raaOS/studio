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
  const [selectedImage, setSelectedImage] = useState(service.image);


  useEffect(() => {
    if (isOpen) {
      const cartItem = getCartItem(service.id);
      const initialQuantity = cartItem?.quantity || 1;
      const initialBrief = cartItem?.brief || {};
      const initialTier = cartItem?.budgetTier || null;
      
      setQuantity(initialQuantity);
      setBrief(initialBrief);
      setSelectedTier(initialTier);
      setSelectedImage(initialTier ? service.tierImages[initialTier] : service.image);

      if (briefFields.length === 0) {
        setBriefFields(fallbackBriefFields);
      }
    } else {
      setTimeout(() => {
        setBriefFields([]);
        setQuantity(1);
        setBrief({});
        setSelectedTier(null);
        setSelectedImage(service.image);
      }, 300);
    }
  }, [isOpen, service, getCartItem, briefFields.length]);
  
  useEffect(() => {
      if (selectedTier) {
          setSelectedImage(service.tierImages[selectedTier]);
      } else {
          setSelectedImage(service.image);
      }
  }, [selectedTier, service]);

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

  const price = selectedTier ? service.prices[selectedTier] * quantity : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl p-0">
        <div className="md:grid md:grid-cols-2 md:gap-8">
          {/* Left Column: Image Gallery */}
          <div className="p-4 space-y-4">
              <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                  <Image 
                      key={selectedImage}
                      src={selectedImage} 
                      alt={service.name} 
                      fill 
                      className="object-cover animate-in fade-in"
                  />
              </div>
              <div className="grid grid-cols-5 gap-2">
                {budgetItems.map(budget => (
                    <button 
                        key={budget.id}
                        onClick={() => handleTierSelect(budget.id)}
                        className={cn(
                            "relative aspect-square w-full rounded-md overflow-hidden ring-2 ring-transparent transition-all",
                            selectedTier === budget.id ? "ring-primary" : "hover:ring-primary/50"
                        )}
                    >
                        <Image 
                            src={service.tierImages[budget.id]} 
                            alt={budget.title}
                            fill
                            className="object-cover"
                            data-ai-hint="logo"
                        />
                    </button>
                ))}
              </div>
          </div>
          
          {/* Right Column: Details & Actions */}
          <div className="flex flex-col h-full max-h-[90vh] md:max-h-[80vh]">
              <div className="flex-grow overflow-y-auto p-6 space-y-4 no-scrollbar">
                  <DialogHeader>
                    <DialogTitle className="font-headline text-2xl tracking-tight">{service.name}</DialogTitle>
                    <DialogDescription>Pilih varian dan isi brief untuk melanjutkan.</DialogDescription>
                  </DialogHeader>

                  <div className="text-3xl font-bold text-primary">
                    {selectedTier ? formatRupiah(price) : "Pilih varian harga"}
                  </div>

                  <div className="space-y-2">
                    <Label>Varian</Label>
                    <div className="grid grid-cols-1 gap-2">
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
                                "flex items-start gap-3",
                                selectedTier === budget.id ? 'border-primary bg-primary/5' : 'border-muted bg-popover hover:bg-accent/50'
                            )}
                            >
                                <div className="flex-shrink-0">
                                  <Image src={budget.image} alt={budget.title} width={32} height={32} className="rounded-md" data-ai-hint="logo" />
                                </div>
                                <div>
                                <p className="font-semibold text-sm">{budget.title}</p>
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

              <DialogFooter className="p-6 border-t bg-background sticky bottom-0">
                  <div className="w-full space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="font-medium">Kuantitas</Label>
                      <QuantityStepper quantity={quantity} onQuantityChange={setQuantity} />
                    </div>
                    <Button type="button" onClick={handleSave} disabled={!selectedTier} className="w-full">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      {getCartItem(service.id) ? 'Simpan Perubahan' : 'Tambahkan ke Keranjang'}
                    </Button>
                  </div>
              </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
