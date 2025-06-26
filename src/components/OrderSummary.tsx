
"use client";

import { useCart } from "@/contexts/CartContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingCart, Trash2, Percent, CheckCircle, User, Phone, Send } from "lucide-react";
import { formatRupiah } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { sendTelegramUpdate } from '@/ai/flows/telegram-bot-integration';
import { createOrderFolder } from '@/ai/flows/create-drive-folder';
import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import type { Customer } from "@/lib/types";

// Form Schema
const customerInfoFormSchema = z.object({
  name: z.string().min(2, { message: "Nama harus diisi, minimal 2 karakter." }),
  phone: z.string().min(10, { message: "Nomor telepon tidak valid." }),
  telegram: z.string().min(3, { message: "Username Telegram tidak valid." }).startsWith('@', { message: 'Username harus diawali dengan @' }),
});
type CustomerInfoFormValues = z.infer<typeof customerInfoFormSchema>;


export function OrderSummary() {
    const { cartItems, totalPrice, totalItems, paymentMethod, setPaymentMethod, removeItem, clearCart } = useCart();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<CustomerInfoFormValues>({
        resolver: zodResolver(customerInfoFormSchema),
        defaultValues: { name: "", phone: "", telegram: "" },
    });

    useEffect(() => {
        const savedCustomerData = localStorage.getItem('customerData');
        if (savedCustomerData) {
            const customer = JSON.parse(savedCustomerData);
            form.reset(customer);
        }
    }, [form]);

    const handleSubmitOrder = async () => {
        const isFormValid = await form.trigger();

        if (!isFormValid) {
             toast({
                title: 'Data Diri Belum Lengkap',
                description: 'Mohon isi nama, telepon, dan username Telegram Anda dengan benar.',
                variant: 'destructive',
            });
            return;
        }

        if (totalItems === 0) {
            toast({
                title: 'Keranjang Kosong',
                description: 'Silakan tambahkan layanan ke keranjang Anda.',
                variant: 'destructive',
            });
            return;
        }
        
        const customer = form.getValues();
        localStorage.setItem('customerData', JSON.stringify(customer));

        setIsSubmitting(true);
        const orderId = `#${String(Math.floor(1000 + Math.random() * 9000)).padStart(4, '0')}`;
        let folderUrl = 'Tidak dibuat (konfigurasi .env belum lengkap)';
        let folderCreationError = '';

        try {
            const folderResult = await createOrderFolder({
                orderId: orderId,
                customerName: customer.name,
                folderTemplate: '[OrderID] - [CustomerName]',
            });

            if (folderResult.success && folderResult.folderUrl) {
                folderUrl = folderResult.folderUrl;
            } else {
                folderCreationError = folderResult.error || 'Gagal membuat folder di Google Drive.';
            }
        } catch (error: any) {
            console.error("Failed to create Drive folder:", error);
            folderCreationError = error.message || 'Terjadi kesalahan saat menghubungi layanan Drive.';
        }

        const orderDetails = cartItems.map(item => `- ${item.name} (${item.budgetName}) (x${item.quantity})`).join('\n');
        const message = `✅ *Pesanan Baru Diterima!*\n\n*Order ID:* \`${orderId}\`\n*Nama:* ${customer.name}\n*Telegram:* ${customer.telegram}\n\n*Rincian Pesanan:*\n${orderDetails}\n\n*Total Tagihan:* ${formatRupiah(totalPrice)}\n*Metode Bayar:* ${paymentMethod === 'dp' ? 'DP 50%' : 'Lunas'}\n\n*Folder Google Drive:*\n${folderUrl}\n\nTerima kasih! Tim kami akan segera memprosesnya.`;

        try {
            const telegramResult = await sendTelegramUpdate({
                telegramId: customer.telegram,
                message: message,
            });

            if (telegramResult.success) {
                toast({
                    title: 'Pesanan Terkirim!',
                    description: `Pesanan ${orderId} sedang diproses. Cek Telegram untuk konfirmasi.`,
                });
                if (folderCreationError) {
                    toast({
                        title: 'Catatan Google Drive',
                        description: folderCreationError,
                        variant: 'destructive'
                    });
                }
                clearCart();
            } else {
                 toast({
                    title: 'Gagal Mengirim Notifikasi',
                    description: telegramResult.error || 'Pastikan Anda sudah memulai chat dengan bot kami.',
                    variant: 'destructive',
                });
            }
        } catch (error: any) {
            console.error("Failed to send order via Telegram:", error);
            toast({
                title: 'Gagal Mengirim Pesanan',
                description: error.message || 'Terjadi kesalahan. Silakan coba lagi.',
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const finalPrice = paymentMethod === 'dp' ? totalPrice / 2 : totalPrice;

    return (
        <Card className="shadow-lg border-border">
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                    <ShoppingCart className="h-6 w-6" />
                    Ringkasan Pesanan
                </CardTitle>
                <CardDescription>
                    {totalItems} Item | Total: {formatRupiah(totalPrice)}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {cartItems.length > 0 ? (
                    <div className="overflow-y-auto pr-2 space-y-3">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex justify-between items-start text-sm">
                                <div>
                                    <p className="font-medium">{item.name} <span className="text-muted-foreground">x{item.quantity}</span></p>
                                    <p className="text-xs text-muted-foreground -mt-1">{item.budgetName}</p>
                                    <p className="text-muted-foreground">{formatRupiah(item.price * item.quantity)}</p>
                                    {item.brief && Object.values(item.brief).some(v => v) && (
                                        <div className="text-xs text-muted-foreground pl-4 border-l-2 ml-2 mt-2 space-y-1 py-1">
                                            {Object.entries(item.brief).filter(([, answer]) => answer).map(([question, answer]) => (
                                                <div key={question}>
                                                    <p className="font-medium text-foreground/70">{question}</p>
                                                    <p className="whitespace-pre-wrap">{answer as string}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => removeItem(item.id)}>
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-muted-foreground text-center py-8">Keranjang Anda kosong.</p>
                )}
                
                <Separator />
                
                <div className="space-y-4">
                    <h4 className="text-sm font-medium text-foreground">Data Pemesan</h4>
                     <Form {...form}>
                        <form className="space-y-3">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="sr-only">Nama Lengkap</FormLabel>
                                    <FormControl>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                        <Input placeholder="Nama Lengkap Anda" {...field} className="pl-10" />
                                    </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                <FormItem>
                                     <FormLabel className="sr-only">Nomor Telepon</FormLabel>
                                    <FormControl>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                        <Input placeholder="Nomor Telepon (Aktif)" {...field} className="pl-10" />
                                    </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="telegram"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="sr-only">Username Telegram</FormLabel>
                                    <FormControl>
                                    <div className="relative">
                                        <Send className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                        <Input placeholder="Username Telegram (@anda)" {...field} className="pl-10" />
                                    </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </div>
                
                <Separator />

                <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">Pilih Metode Pembayaran</h4>
                     <div className="grid grid-cols-2 gap-4">
                          <div
                              onClick={() => setPaymentMethod('dp')}
                              className={`flex h-full flex-col items-center justify-center rounded-lg border-2 p-4 cursor-pointer transition-all space-y-1 text-center ${paymentMethod === 'dp' ? 'border-primary bg-primary/5' : 'border-muted bg-popover hover:bg-accent/50'}`}
                          >
                              <Percent className="h-6 w-6 text-primary" />
                              <h3 className="font-semibold text-base">DP 50%</h3>
                              <p className="text-muted-foreground text-xs">Bayar setengahnya sekarang.</p>
                          </div>
                          <div
                              onClick={() => setPaymentMethod('lunas')}
                              className={`flex h-full flex-col items-center justify-center rounded-lg border-2 p-4 cursor-pointer transition-all space-y-1 text-center ${paymentMethod === 'lunas' ? 'border-primary bg-primary/5' : 'border-muted bg-popover hover:bg-accent/50'}`}
                          >
                              <CheckCircle className="h-6 w-6 text-primary" />
                              <h3 className="font-semibold text-base">Lunas</h3>
                              <p className="text-muted-foreground text-xs">Dapatkan prioritas pengerjaan.</p>
                          </div>
                      </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="coupon-code" className="text-sm font-medium">Punya Kode Kupon?</Label>
                    <div className="flex space-x-2">
                        <Input id="coupon-code" placeholder="Masukkan kode kupon" />
                        <Button variant="secondary" className="shrink-0">Terapkan</Button>
                    </div>
                </div>

                <Separator />

                {paymentMethod ? (
                    <div className="space-y-1 text-lg">
                        <div className="flex justify-between">
                            <span>Total Bayar:</span>
                            <span className="font-bold">{formatRupiah(finalPrice)}</span>
                        </div>
                        {paymentMethod === 'dp' && <p className="text-xs text-muted-foreground text-right">Sisa pelunasan: {formatRupiah(totalPrice / 2)}</p>}
                    </div>
                ) : (
                    <p className="text-muted-foreground text-center py-4 text-sm">Pilih metode pembayaran untuk melihat total.</p>
                )}

            </CardContent>
            <CardFooter>
                <Button className="w-full" onClick={handleSubmitOrder} disabled={isSubmitting || totalItems === 0 || !paymentMethod}>
                    {isSubmitting ? 'Mengirim...' : 'Kirim Pesanan'}
                </Button>
            </CardFooter>
        </Card>
    );
}
