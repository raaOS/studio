"use client";

import { useCart } from "@/contexts/CartContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Trash2 } from "lucide-react";
import { formatRupiah } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { sendTelegramUpdate } from '@/ai/flows/telegram-bot-integration';
import { useState, useEffect } from "react";
import type { Customer } from "@/lib/types";

export function OrderSummary() {
    const { cartItems, totalPrice, totalItems, paymentMethod, updateItemQuantity, clearCart } = useCart();
    const { toast } = useToast();
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [botToken, setBotToken] = useState('');

    useEffect(() => {
        const savedCustomerData = localStorage.getItem('customerData');
        if (savedCustomerData) {
            setCustomer(JSON.parse(savedCustomerData));
        }
        const savedToken = localStorage.getItem('telegramBotToken');
        if (savedToken) {
            setBotToken(savedToken);
        }
    }, []);

    const handleSubmitOrder = async () => {
        if (totalItems === 0) {
            toast({
                title: 'Keranjang Kosong',
                description: 'Silakan tambahkan layanan ke keranjang Anda.',
                variant: 'destructive',
            });
            return;
        }

        if (!customer) {
            toast({
                title: 'Data Pelanggan Tidak Ditemukan',
                description: 'Mohon kembali ke halaman utama dan isi data Anda.',
                variant: 'destructive',
            });
            return;
        }
        
        if (!botToken) {
            toast({
                title: 'Token Bot Telegram Tidak Ditemukan',
                description: 'Admin belum mengatur token bot di panel admin.',
                variant: 'destructive',
            });
            return;
        }

        setIsSubmitting(true);
        const orderId = `#${Math.floor(1000 + Math.random() * 9000)}`;
        const orderDetails = cartItems.map(item => `${item.name} (x${item.quantity})`).join(', ');
        const message = `Halo ${customer.name}, pesanan baru Anda ${orderId} telah kami terima.
Rincian: ${orderDetails}.
Total: ${formatRupiah(totalPrice)}.
Metode Bayar: ${paymentMethod === 'dp' ? 'DP 50%' : 'Lunas'}.
Terima kasih!`;

        try {
            const result = await sendTelegramUpdate({
                botToken: botToken,
                telegramId: customer.telegram,
                orderId: orderId,
                updateMessage: message,
            });

            if (result.success) {
                toast({
                    title: 'Pesanan Terkirim!',
                    description: `Terima kasih! Pesanan Anda ${orderId} sedang diproses. Cek Telegram untuk konfirmasi.`,
                });
                clearCart();
            } else {
                 toast({
                    title: 'Gagal Mengirim Pesanan',
                    description: result.error || 'Terjadi kesalahan. Pastikan Anda sudah memulai chat dengan bot kami.',
                    variant: 'destructive',
                });
            }
        } catch (error: any) {
            console.error("Failed to send order:", error);
            toast({
                title: 'Gagal Mengirim Pesanan',
                description: error.message || 'Terjadi kesalahan. Silakan coba lagi atau hubungi admin.',
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const finalPrice = paymentMethod === 'dp' ? totalPrice / 2 : totalPrice;

    return (
        <Card className="shadow-none border-none">
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
                    <div className="max-h-60 overflow-y-auto pr-2 space-y-3">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex justify-between items-start text-sm">
                                <div>
                                    <p className="font-medium">{item.name} <span className="text-muted-foreground">x{item.quantity}</span></p>
                                    <p className="text-muted-foreground">{formatRupiah(item.price * item.quantity)}</p>
                                </div>
                                <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => updateItemQuantity(item, 0)}>
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-muted-foreground text-center py-8">Keranjang Anda kosong.</p>
                )}
                
                <Separator />

                <div className="space-y-1 text-lg">
                    <div className="flex justify-between">
                        <span>Total Bayar:</span>
                        <span className="font-bold">{formatRupiah(finalPrice)}</span>
                    </div>
                    {paymentMethod === 'dp' && <p className="text-xs text-muted-foreground text-right">Sisa pelunasan: {formatRupiah(totalPrice / 2)}</p>}
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full" onClick={handleSubmitOrder} disabled={isSubmitting || totalItems === 0}>
                    {isSubmitting ? 'Mengirim...' : 'Kirim Pesanan'}
                </Button>
            </CardFooter>
        </Card>
    );
}
