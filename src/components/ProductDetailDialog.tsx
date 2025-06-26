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
import { QuantityStepper } from '@/components/QuantityStepper';
import { useCart } from '@/contexts/CartContext';
import { generateDynamicBrief } from '@/ai/flows/generate-dynamic-brief';
import type { Service } from '@/lib/types';
import { ShoppingCart } from 'lucide-react';

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
  const { addOrUpdateItem, getItemQuantity, getItemBrief } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [brief, setBrief] = useState<Record<string, string>>({});
  const [briefFields, setBriefFields] = useState<{name: string, placeholder: string, type: 'textarea' | 'input'}[]>([]);
  const [isGeneratingBrief, setIsGeneratingBrief] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const initialQuantity = getItemQuantity(service.id);
      const initialBrief = getItemBrief(service.id);
      
      setQuantity(initialQuantity === 0 ? 1 : initialQuantity);
      setBrief(initialBrief);

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
  }, [isOpen, service.id, service.name, getItemQuantity, getItemBrief, briefFields.length]);

  const handleBriefChange = (field: string, value: string) => {
    setBrief(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    addOrUpdateItem(service, quantity, brief);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">{service.name}</DialogTitle>
          <DialogDescription>
            Isi detail pesanan Anda di bawah ini.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-4">
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
          <Button type="button" onClick={handleSave}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            {getItemQuantity(service.id) > 0 ? 'Simpan Perubahan' : 'Tambahkan ke Keranjang'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
