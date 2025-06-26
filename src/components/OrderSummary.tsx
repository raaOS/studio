
"use client";

import { useCart } from "@/contexts/CartContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Trash2 } from "lucide-react";
import { formatRupiah } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { sendTelegramUpdate } from '@/ai/flows/telegram-bot-integration';
import { createOrderFolder } from '@/ai/flows/create-drive-folder';
import { useState, useEffect } from "react";
import type { Customer } from "@/lib/types";

export function OrderSummary() {
    const { cartItems, totalPrice, totalItems, paymentMethod, removeItem, clearCart } = useCart();
    const { toast } = useToast();
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const savedCustomerData = localStorage.getItem('customerData');
        if (savedCustomerData) {
            setCustomer(JSON.parse(savedCustomerData));
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

        if (!customer?.telegram || !customer?.name) {
            toast({
                title: 'Data Pelanggan Tidak Lengkap',
                description: 'Mohon kembali ke Langkah 1 dan isi nama serta username Telegram Anda.',
                variant: 'destructive',
            });
            return;
        }
        
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
