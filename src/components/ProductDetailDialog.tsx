
'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
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
import { Ticket, CheckCircle } from 'lucide-react';
import { Separator } from './ui/separator';

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
      
      if (initialTier && service.tierImages[initialTier]) {
        setSelectedImage(service.tierImages[initialTier]);
      } else {
        setSelectedImage(service.image);
      }
      
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
      if (selectedTier && service.tierImages[selectedTier]) {
          setSelectedImage(service.tierImages[selectedTier]);
      } else {
        setSelectedImage(service.image);
      }
  }, [selectedTier, service.tierImages, service.image]);

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

  const currentPrice = useMemo(() => {
    if (!selectedTier) return 0;
    return promo.active ? promo.discountPrice : service.prices[selectedTier];
  }, [selectedTier, promo, service.prices]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 sm:max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex-1 flex flex-col sm:grid sm:grid-cols-2 sm:gap-6 sm:items-start overflow-y-auto">
          
          {/* Image Column */}
          <div className="p-0 sm:p-6 sm:sticky sm:top-0">
              <div className="relative aspect-square w-full overflow-hidden sm:rounded-lg block">
                  <Image 
                      key={selectedImage}
                      src={selectedImage} 
                      alt={service.name} 
                      fill 
                      className="object-cover animate-in fade-in"
                  />
              </div>
          </div>

          {/* Content Column */}
          <div className="flex-1 flex flex-col">
              <div className="p-4 sm:p-6 sm:pt-6 sm:pr-4 flex-1 overflow-y-auto">
                  <div className="space-y-5">
                  
                      {/* Mobile Header */}
                      <div className="flex items-start gap-3 sm:hidden">
                          <div className="w-16 h-16 relative overflow-hidden rounded-md shrink-0">
                              <Image src={selectedImage} alt={service.name} fill className="object-cover" />
                          </div>
                          <div>
                              <DialogTitle asChild>
                                <h2 className="font-semibold tracking-tight font-headline text-base text-left leading-tight">
                                  {service.name}
                                </h2>
                              </DialogTitle>
                              {promo.active && selectedTier ? (
                                  <div className="flex items-center gap-2 flex-wrap">
                                      <p className="text-xl font-bold text-red-600">{formatRupiah(currentPrice * quantity)}</p>
                                      <p className="text-base font-medium text-muted-foreground line-through">{formatRupiah(promo.originalPrice * quantity)}</p>
                                  </div>
                              ) : (
                                  <p className="text-xl font-bold text-green-600">
                                      {selectedTier ? formatRupiah(currentPrice * quantity) : 'Pilih varian'}
                                  </p>
                              )}
                          </div>
                      </div>

                      {/* Desktop Header */}
                      <div className="hidden sm:block space-y-2">
                          <DialogTitle className="font-headline text-2xl tracking-tight text-left">{service.name}</DialogTitle>
                          <div className="space-y-1">
                          {promo.active && selectedTier ? (
                              <div className="flex flex-col items-start">
                                  <div className="flex items-center gap-2 flex-wrap">
                                      <p className="text-3xl font-bold text-red-600">{formatRupiah(currentPrice * quantity)}</p>
                                      <p className="text-lg font-medium text-muted-foreground line-through">{formatRupiah(promo.originalPrice * quantity)}</p>
                                  </div>
                                  <div className="mt-1 flex items-center gap-2 rounded-md border border-red-500/50 bg-red-500/10 px-2 py-1 text-sm text-red-600">
                                      <Ticket className="h-4 w-4"/>
                                      <span>Hemat {formatRupiah(promo.hemat * quantity)}!</span>
                                  </div>
                              </div>
                          ) : (
                              <p className="text-3xl font-bold text-green-600">
                                  {selectedTier ? formatRupiah(currentPrice * quantity) : 'Pilih varian'}
                              </p>
                          )}
                          </div>
                      </div>
                      
                      <Separator/>

                      <div className="space-y-2">
                      <Label className="font-semibold text-sm">Variasi</Label>
                      <div className="grid grid-cols-3 gap-2">
                          {budgetItems.map((budget) => (
                              <button
                              key={budget.id}
                              onClick={() => setSelectedTier(budget.id)}
                              className={cn(
                                  "w-full text-left p-2 border-2 rounded-lg transition-colors relative",
                                  "flex items-center gap-2",
                                  selectedTier === budget.id ? 'border-primary bg-primary/5' : 'border-muted bg-popover hover:bg-accent/50'
                              )}
                              >
                              {selectedTier === budget.id && (
                                  <div className="absolute top-1 right-1 bg-green-500 text-white rounded-full p-0.5">
                                      <CheckCircle className="h-3 w-3" />
                                  </div>
                              )}
                              <Image src={budget.image} alt={budget.title} width={24} height={24} className="rounded-md shrink-0" data-ai-hint="logo" />
                              <div>
                                  <p className="font-semibold text-xs leading-tight">{budget.title}</p>
                              </div>
                              </button>
                          ))}
                      </div>
                      </div>

                      <Separator />
                      
                      {fallbackBriefFields.map(field => (
                      <div key={field.name} className="w-full space-y-2">
                          <Label htmlFor={`brief-${service.id}-${field.name}`} className="font-semibold text-sm">{field.name}</Label>
                          {field.type === 'textarea' ? (
                              <Textarea
                                  id={`brief-${service.id}-${field.name}`}
                                  placeholder={field.placeholder}
                                  maxLength={500}
                                  value={brief[field.name] ?? ''}
                                  onChange={(e) => handleBriefChange(field.name, e.target.value)}
                                  className="text-sm"
                              />
                          ) : (
                              <Input
                                  id={`brief-${service.id}-${field.name}`}
                                  placeholder={field.placeholder}
                                  value={brief[field.name] ?? ''}
                                  onChange={(e) => handleBriefChange(field.name, e.target.value)}
                                  className="text-sm"
                              />
                          )}
                      </div>
                      ))}

                      <Separator />

                      <div className="space-y-3">
                          <div className="flex justify-between items-center">
                              <Label htmlFor="width" className="font-semibold text-sm">Ukuran</Label>
                              <div className="flex items-center gap-1">
                              <Input
                                  id='width'
                                  placeholder="L"
                                  className="h-9 text-center"
                                  value={size.width}
                                  onChange={(e) => setSize(s => ({...s, width: e.target.value}))}
                                  style={{width: `${(size.width.length || 1) + 2}ch`, minWidth: '3rem'}}
                              />
                              <span className="text-muted-foreground">x</span>
                              <Input
                                  id='height'
                                  placeholder="T"
                                  className="h-9 text-center"
                                  value={size.height}
                                  onChange={(e) => setSize(s => ({...s, height: e.target.value}))}
                                  style={{width: `${(size.height.length || 1) + 2}ch`, minWidth: '3rem'}}
                              />
                              <Select value={size.unit} onValueChange={(value) => setSize(s => ({...s, unit: value as 'px' | 'cm' | 'm'}))}>
                                  <SelectTrigger className="w-[70px] h-9">
                                      <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                      <SelectItem value="px">px</SelectItem>
                                      <SelectItem value="cm">cm</SelectItem>
                                      <SelectItem value="m">m</SelectItem>
                                  </SelectContent>
                              </Select>
                              </div>
                          </div>
                          <div className="flex justify-between items-center">
                              <Label className="font-semibold text-sm">Jumlah</Label>
                              <QuantityStepper quantity={quantity} onQuantityChange={setQuantity} />
                          </div>
                      </div>
                  </div>
              </div>
              <DialogFooter className="p-4 border-t bg-background grid grid-cols-2 gap-4 shrink-0 sm:flex sm:items-center sm:justify-end sm:gap-2">
                  <Button type="button" onClick={handleSave} variant="outline" className="w-full sm:w-auto">
                      {getCartItem(service.id) ? 'Simpan Perubahan' : 'Tambah Desain'}
                  </Button>
                  <Button type="button" onClick={handleCheckout} className="w-full sm:w-auto">
                      Lanjut Bayar
                  </Button>
              </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
