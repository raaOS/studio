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
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import type { MessageTemplate } from "@/lib/types"
import { useEffect } from "react"
import { Alert, AlertDescription } from "./ui/alert";
import { Info } from "lucide-react";

const messageTemplateFormSchema = z.object({
  id: z.string().regex(/^[a-z0-9_]+$/, { message: "ID hanya boleh berisi huruf kecil, angka, dan underscore." }).min(3, { message: "ID template minimal 3 karakter." }),
  description: z.string().min(10, { message: "Deskripsi minimal 10 karakter." }),
  content: z.string().min(20, { message: "Konten pesan minimal 20 karakter." }),
})

type MessageTemplateFormValues = z.infer<typeof messageTemplateFormSchema>

interface MessageTemplateFormDialogProps {
  template: MessageTemplate | null
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

const availableVariables = ['{{orderId}}', '{{customerName}}', '{{driveUrl}}', '{{totalPrice}}'];

export function MessageTemplateFormDialog({ template, isOpen, onOpenChange }: MessageTemplateFormDialogProps) {
  const { toast } = useToast()

  const form = useForm<MessageTemplateFormValues>({
    resolver: zodResolver(messageTemplateFormSchema),
    defaultValues: {
      id: "",
      description: "",
      content: "",
    },
  })

  useEffect(() => {
    if (isOpen) {
      form.reset({
        id: template?.id || "",
        description: template?.description || "",
        content: template?.content || "",
      })
    }
  }, [isOpen, template, form])


  function onSubmit(data: MessageTemplateFormValues) {
    // In a real app, you'd send this data to your database/API
    console.log("Template data submitted:", data);
    
    toast({
      title: `Template ${template ? 'Diperbarui' : 'Dibuat'}!`,
      description: `(Simulasi) Template "${data.id}" telah disimpan.`,
    })

    onOpenChange(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{template ? 'Edit Template Pesan' : 'Buat Template Baru'}</DialogTitle>
          <DialogDescription>
            Gunakan variabel dalam kurung kurawal, contoh: <code>{`{{customerName}}`}</code>, untuk menyisipkan data dinamis.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto pr-4">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Template ID</FormLabel>
                  <FormControl>
                    <Input placeholder="contoh_template_baru" {...field} disabled={!!template} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Input placeholder="Pesan untuk konfirmasi pesanan..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Isi Pesan</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Halo {{customerName}}, pesanan Anda {{orderId}} telah kami terima." {...field} rows={8} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                    <p className="font-semibold mb-2">Variabel yang Tersedia:</p>
                    <div className="flex flex-wrap gap-2">
                        {availableVariables.map(v => (
                            <code key={v} className="text-xs bg-muted px-2 py-1 rounded">{v}</code>
                        ))}
                    </div>
                </AlertDescription>
            </Alert>


            <DialogFooter className="pt-4 sticky bottom-0 bg-background py-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Batal
              </Button>
              <Button type="submit">Simpan Template</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
