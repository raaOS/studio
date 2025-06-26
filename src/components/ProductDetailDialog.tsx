
'use client';

import { useState, useEffect } from 'react';
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
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { QuantityStepper } from '@/components/QuantityStepper';
import { useCart } from '@/contexts/CartContext';
import { generateDynamicBrief } from '@/ai/flows/generate-dynamic-brief';
import type { Service, BudgetTier } from '@/lib/types';
import { budgetItems } from '@/lib/data';
import { formatRupiah } from '@/lib/utils';
import { ShoppingCart } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

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
  const [isGeneratingBrief, setIsGeneratingBrief] = useState(false);
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
        setIsGeneratingBrief(true);
        generateDynamicBrief({ serviceName: service.name })
          .then(response => {
            const dynamicFields = response.briefFields.map(field => ({ name: field, placeholder: '...', type: 'textarea' as const }));
            const assetField = fallbackBriefFields.find(f => f.name.includes('Aset'));
            const logoField = fallbackBriefFields.find(f => f.name.includes('Logo'));
            
            const finalFields = [...dynamicFields];
            if (assetField) finalFields.push(assetField);
            if (logoField) finalFields.push(logoField);

            setBriefFields(finalFields);
          })
          .catch(error => {
            console.error("[DynamicBrief Error]", error);
            setBriefFields(fallbackBriefFields);
          })
          .finally(() => setIsGeneratingBrief(false));
      }
    } else {
      setBriefFields([]);
    }
  }, [isOpen, service.id, service.name, getCartItem, briefFields.length]);

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
      <DialogContent className="sm:max-w-lg">
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
                    <Label 
                        key={budget.id}
                        htmlFor={`${service.id}-${budget.id}`}
                        className={`flex items-start justify-between rounded-md border-2 p-3 cursor-pointer transition-colors ${selectedTier === budget.id ? 'border-primary bg-primary/5' : 'border-muted hover:bg-accent/50'}`}
                    >
                        <div className="flex-1">
                            <p className="font-semibold">{budget.title}</p>
                            <p className="text-sm text-muted-foreground">{budget.description}</p>
                        </div>
                        <div className="text-right ml-4 flex-shrink-0">
                            <p className="font-bold text-lg">{formatRupiah(service.prices[budget.id])}</p>
                            <RadioGroupItem value={budget.id} id={`${service.id}-${budget.id}`} className="mt-2 ml-auto" />
                        </div>
                    </Label>
                    ))}
                </RadioGroup>
            </div>
            
            <Separator />
            
          {isGeneratingBrief ? (
            <div className="space-y-4 pt-2">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-20 w-full" />
            </div>
          ) : (
            briefFields.map(field => (
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
            ))
          )}

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
