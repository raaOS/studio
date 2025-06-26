'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCart } from '@/contexts/CartContext';
import type { Service, BudgetTier } from '@/lib/types';
import { budgetItems } from '@/lib/data';
import { formatRupiah, cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";
import { Check, Ticket } from 'lucide-react';
import { DialogFooter } from './ui/dialog';

interface ProductDetailDialogProps {
  service: Service;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const fallbackBriefFields = [
    { name: 'Mau desain seperti apa?', placeholder: 'Jelaskan konsep atau gaya desain yang Anda inginkan...', type: 'textarea' as const },
    { name: 'Link Aset Tambahan (wajib Google Drive)', placeholder: 'https://drive.google.com/...', type: 'input' as const },
];

export function ProductDetailDialog({ service, isOpen, onOpenChange }: ProductDetailDialogProps) {
  const { addOrUpdateItem, getCartItem } = useCart();
  const { toast } = useToast();
  const router = useRouter();

  const [quantity, setQuantity] = useState(1);
  const [brief, setBrief] = useState<Record<string, string>>({});
  const [selectedTier, setSelectedTier] = useState<BudgetTier | null>(null);
  const [selectedImage, setSelectedImage] = useState(service.image);
  
  const [size, setSize] = useState({ width: '', height: '', unit: 'px' });

  // Simulate promo data
  const promo = useMemo(() => {
    if (service.id === 'desain-konten-carousel' && selectedTier) {
      const originalPrice = service.prices[selectedTier];
      return {
        active: true,
        discountPrice: originalPrice * 0.8, // 20% off
        originalPrice: originalPrice,
        hemat: originalPrice * 0.2,
      };
    }
    return { active: false, discountPrice: 0, originalPrice: 0, hemat: 0 };
  }, [service, selectedTier]);

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
      
      const savedSize = initialBrief['Ukuran'] ? initialBrief['Ukuran'].match(/(\d+)\s*x\s*(\d+)\s*(\w+)/) : null;
      if (savedSize) {
        setSize({ width: savedSize[1], height: savedSize[2], unit: savedSize[3] });
      } else {
        setSize({ width: '', height: '', unit: 'px' });
      }

    } else {
      setTimeout(() => {
        setQuantity(1);
        setBrief({});
        setSelectedTier(null);
        setSelectedImage(service.image);
        setSize({ width: '', height: '', unit: 'px' });
      }, 300);
    }
  }, [isOpen, service, getCartItem]);
  
  useEffect(() => {
      if (selectedTier) {
          setSelectedImage(service.tierImages[selectedTier]);
      } else {
          setSelectedImage(service.image);
      }
  }, [selectedTier, service]);

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
      return false;
    }

    const fullBrief = { ...brief };
    if (size.width && size.height) {
      fullBrief['Ukuran'] = `${size.width} x ${size.height} ${size.unit}`;
    }

    addOrUpdateItem(service, quantity, fullBrief, selectedTier);
    onOpenChange(false);
    return true;
  };
  
  const handleCheckout = () => {
    const success = handleSave();
    if (success) {
        router.push('/#summary-section'); 
    }
  }

  const minPrice = Math.min(...Object.values(service.prices));
  const maxPrice = Math.max(...Object.values(service.prices));

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[95vh] flex flex-col p-0">
        <div className="md:grid md:grid-cols-2 md:gap-6 h-full min-h-0">
          
          <div className="p-4 md:p-6 flex flex-col order-first md:order-last">
              <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                  <Image 
                      key={selectedImage}
                      src={selectedImage} 
                      alt={service.name} 
                      fill 
                      className="object-cover animate-in fade-in"
                  />
              </div>
          </div>
          
          <div className="flex flex-col h-full min-h-0">
              <div className="flex-grow overflow-y-auto p-6 space-y-4 no-scrollbar">
                  <DialogHeader className="text-left">
                    <DialogTitle className="font-headline text-2xl tracking-tight">{service.name}</DialogTitle>
                  </DialogHeader>

                  <div className="space-y-1">
                      {promo.active ? (
                          <div className="flex flex-col items-start">
                              <div className="flex items-center gap-2">
                                <p className="text-3xl font-bold text-green-600">{formatRupiah(promo.discountPrice * quantity)}</p>
                                <p className="text-lg font-medium text-muted-foreground line-through">{formatRupiah(promo.originalPrice * quantity)}</p>
                              </div>
                              <div className="mt-1 flex items-center gap-2 rounded-md border border-red-500/50 bg-red-500/10 px-2 py-1 text-sm text-red-600">
                                  <Ticket className="h-4 w-4"/>
                                  <span>Hemat {formatRupiah(promo.hemat * quantity)}!</span>
                              </div>
                          </div>
                      ) : (
                          <p className="text-3xl font-bold text-green-600">
                              {selectedTier ? formatRupiah(service.prices[selectedTier] * quantity) : `${formatRupiah(minPrice)} - ${formatRupiah(maxPrice)}`}
                          </p>
                      )}
                  </div>

                  <div className="space-y-2">
                    <Label className="font-semibold">Variasi</Label>
                    <div className="grid grid-cols-1 gap-2">
                        {budgetItems.map((budget) => (
                          <button
                            key={budget.id}
                            onClick={() => setSelectedTier(budget.id)}
                            className={cn(
                                "w-full text-left p-3 border-2 rounded-lg transition-colors",
                                "flex items-center justify-between gap-3",
                                selectedTier === budget.id ? 'border-primary bg-primary/5' : 'border-muted bg-popover hover:bg-accent/50'
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <Image src={budget.image} alt={budget.title} width={32} height={32} className="rounded-md" data-ai-hint="logo" />
                              <div>
                                <p className="font-semibold text-sm">{budget.title}</p>
                                <p className="text-xs text-muted-foreground">{budget.description}</p>
                              </div>
                            </div>
                            {selectedTier === budget.id && (
                               <div className="w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0">
                                  <Check className="h-4 w-4" />
                               </div>
                            )}
                          </button>
                        ))}
                    </div>
                  </div>
                  
                  {fallbackBriefFields.map(field => (
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

                  <div className="space-y-2">
                      <Label className="font-semibold">Ukuran & Kuantitas</Label>
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <Input 
                            placeholder="L" 
                            className="w-16 text-center" 
                            value={size.width}
                            onChange={(e) => setSize(s => ({...s, width: e.target.value}))}
                          />
                          <span className="text-muted-foreground">x</span>
                          <Input 
                            placeholder="T" 
                            className="w-16 text-center"
                            value={size.height}
                            onChange={(e) => setSize(s => ({...s, height: e.target.value}))}
                          />
                          <Select value={size.unit} onValueChange={(value) => setSize(s => ({...s, unit: value as 'px' | 'cm' | 'm'}))}>
                            <SelectTrigger className="w-[70px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="px">px</SelectItem>
                                <SelectItem value="cm">cm</SelectItem>
                                <SelectItem value="m">m</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <QuantityStepper quantity={quantity} onQuantityChange={setQuantity} />
                      </div>
                  </div>
              </div>

              <DialogFooter className="p-6 border-t bg-background sticky bottom-0 grid grid-cols-2 gap-4">
                  <Button type="button" onClick={handleSave} variant="outline" className="w-full">
                      {getCartItem(service.id) ? 'Simpan & Pesan Nanti' : 'Pesan Lagi'}
                  </Button>
                  <Button type="button" onClick={handleCheckout} className="w-full">
                      Lanjut Bayar
                  </Button>
              </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
