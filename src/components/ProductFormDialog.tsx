'use client';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { Service } from "@/lib/types"
import { useEffect } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { mockCategories } from "@/lib/data";
import { Separator } from "./ui/separator";

const productFormSchema = z.object({
  id: z.string(),
  name: z.string().min(3, { message: "Nama produk minimal 3 karakter." }),
  category: z.string({ required_error: "Silakan pilih kategori." }),
  prices: z.object({
    'kaki-lima': z.coerce.number().min(0, { message: "Harga harus angka positif." }),
    'umkm': z.coerce.number().min(0, { message: "Harga harus angka positif." }),
    'e-comm': z.coerce.number().min(0, { message: "Harga harus angka positif." }),
  }),
  image: z.string().url({ message: "URL gambar tidak valid." }),
  tierImages: z.object({
    'kaki-lima': z.string().url({ message: "URL gambar tidak valid." }),
    'umkm': z.string().url({ message: "URL gambar tidak valid." }),
    'e-comm': z.string().url({ message: "URL gambar tidak valid." }),
  }),
  dataAiHint: z.string(), // No longer required in the form
})

type ProductFormValues = z.infer<typeof productFormSchema>

interface ProductFormDialogProps {
  product: Service | null
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  onSave: (product: Service) => void;
}

const defaultTierImages = {
    'kaki-lima': "https://placehold.co/128x128/f8fafc/64748b.png",
    'umkm': "https://placehold.co/128x128/f1f5f9/334155.png",
    'e-comm': "https://placehold.co/128x128/e2e8f0/1e293b.png",
};

export function ProductFormDialog({ product, isOpen, onOpenChange, onSave }: ProductFormDialogProps) {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      id: product?.id || `new-product-${Date.now()}`,
      name: product?.name || "",
      category: product?.category || undefined,
      prices: {
        'kaki-lima': product?.prices['kaki-lima'] || 0,
        'umkm': product?.prices['umkm'] || 0,
        'e-comm': product?.prices['e-comm'] || 0,
      },
      image: product?.image || "https://placehold.co/400x300.png",
      tierImages: product?.tierImages || defaultTierImages,
      dataAiHint: product?.dataAiHint || "",
    },
  })

  useEffect(() => {
    if (isOpen) {
      form.reset({
        id: product?.id || `new-product-${Date.now()}`,
        name: product?.name || "",
        category: product?.category || undefined,
        prices: {
          'kaki-lima': product?.prices['kaki-lima'] || 0,
          'umkm': product?.prices['umkm'] || 0,
          'e-comm': product?.prices['e-comm'] || 0,
        },
        image: product?.image || "https://placehold.co/400x300.png",
        tierImages: product?.tierImages || defaultTierImages,
        dataAiHint: product?.dataAiHint || "",
      })
    }
  }, [isOpen, product, form])


  function onSubmit(data: ProductFormValues) {
    onSave(data as Service);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{product ? 'Edit Produk' : 'Tambah Produk Baru'}</DialogTitle>
          <DialogDescription>
            Isi detail produk di bawah ini. Perubahan akan langsung terlihat di daftar produk.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto pr-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Produk</FormLabel>
                  <FormControl>
                    <Input placeholder="Contoh: Logo Premium" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kategori</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori untuk produk" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {mockCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                control={form.control}
                name="prices.kaki-lima"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Harga Kaki Lima</FormLabel>
                    <FormControl>
                        <Input type="number" placeholder="15000" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="prices.umkm"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Harga UMKM</FormLabel>
                    <FormControl>
                        <Input type="number" placeholder="25000" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="prices.e-comm"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Harga E-Comm</FormLabel>
                    <FormControl>
                        <Input type="number" placeholder="70000" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            
            <Separator />
            <p className="text-sm font-medium">Gambar</p>

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL Gambar Utama (di kartu produk)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://placehold.co/400x300" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />
            <p className="text-sm font-medium">Gambar Tier (di popup)</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <FormField
                    control={form.control}
                    name="tierImages.kaki-lima"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Tier Kaki Lima</FormLabel>
                        <FormControl>
                            <Input placeholder="https://..." {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="tierImages.umkm"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Tier UMKM</FormLabel>
                        <FormControl>
                            <Input placeholder="https://..." {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="tierImages.e-comm"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Tier E-Comm</FormLabel>
                        <FormControl>
                            <Input placeholder="https://..." {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <DialogFooter className="pt-4 sticky bottom-0 bg-background py-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Batal
              </Button>
              <Button type="submit">Simpan Perubahan</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
