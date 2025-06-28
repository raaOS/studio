"use client";

import { useCart } from "@/contexts/CartContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingCart, Trash2, Percent, CheckCircle, User, Phone, Send, Loader2 } from "lucide-react";
import { formatRupiah } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { isFirebaseConfigured, db } from "@/lib/firebase";
import { BriefAssistant } from "./BriefAssistant";


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

    const handleCheckoutViaTelegram = async () => {
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

        // Check if Firebase is configured. If not, run a simulation.
        if (!isFirebaseConfigured || !db) {
            toast({
                title: 'Mode Simulasi',
                description: 'Konfigurasi Firebase tidak ditemukan. Menjalankan simulasi checkout...',
            });

            setTimeout(() => {
                toast({
                    title: 'Simulasi Berhasil!',
                    description: 'Dalam aplikasi nyata, Anda akan diarahkan ke Telegram sekarang.',
                });
                setIsSubmitting(false);
                clearCart();
            }, 2500);
            return;
        }

        // --- Real Checkout Flow ---
        const orderPayload = {
            customer,
            cartItems: cartItems.map(item => ({
                id: item.id,
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                brief: item.brief,
                budgetTier: item.budgetTier,
                budgetName: item.budgetName,
            })),
            totalPrice,
            paymentMethod,
            createdAt: serverTimestamp(),
        };

        try {
            const pendingOrdersCol = collection(db, "pendingOrders");
            const docRef = await addDoc(pendingOrdersCol, orderPayload);
            const pendingOrderId = docRef.id;

            const botUsername = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME;
            if (!botUsername) {
                 toast({
                    title: 'Konfigurasi Bot Diperlukan',
                    description: 'Admin perlu mengatur NEXT_PUBLIC_TELEGRAM_BOT_USERNAME di file .env',
                    variant: 'destructive',
                });
                setIsSubmitting(false);
                return;
            }

            const telegramUrl = `https://t.me/${botUsername}?start=${pendingOrderId}`;
            window.location.href = telegramUrl;
            
        } catch (error) {
            console.error("Failed to create pending order or redirect:", error);
            toast({
                title: 'Gagal Memproses Pesanan',
                description: 'Terjadi kesalahan saat terhubung ke database. Pastikan konfigurasi Firebase sudah benar.',
                variant: 'destructive',
            });
            setIsSubmitting(false);
        }
    };

    const finalPrice = paymentMethod === 'dp' ? totalPrice / 2 : totalPrice;

    return (
        <Card className="shadow-lg border-border flex flex-col h-full bg-background">
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                    <ShoppingCart className="h-6 w-6" />
                    Ringkasan Pesanan
                </CardTitle>
                <CardDescription>
                    {totalItems} Item | Total: {formatRupiah(totalPrice)}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 flex-1 overflow-y-auto">
                {cartItems.length > 0 ? (
                    <div className="space-y-3">
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
                
                <BriefAssistant />

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

                <Separator />

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
            <CardFooter className="border-t pt-6">
                <Button className="w-full" onClick={handleCheckoutViaTelegram} disabled={isSubmitting || totalItems === 0 || !paymentMethod}>
                     {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Memproses...
                        </>
                    ) : (
                        <>
                            <Send className="mr-2 h-4 w-4" />
                            Selesaikan via Telegram
                        </>
                    )}
                </Button>
            </CardFooter>
        </Card>
    );
}
