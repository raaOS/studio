'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { mockCoupons } from "@/lib/data";
import { Copy, Check } from "lucide-react";
import type { Coupon } from '@/lib/types';

export function CouponInfoSection() {
    const { toast } = useToast();
    const [copiedCode, setCopiedCode] = useState<string | null>(null);

    // Only display the NEWBIE20 coupon.
    const activeCoupons = mockCoupons.filter(c => c.status === 'Aktif' && c.code === 'NEWBIE20');

    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code).then(() => {
            setCopiedCode(code);
            toast({
                title: "Kode Kupon Disalin!",
                description: `Kode "${code}" telah disalin ke clipboard.`,
            });
            setTimeout(() => setCopiedCode(null), 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            toast({
                title: 'Gagal Menyalin Kode',
                description: 'Coba salin secara manual.',
                variant: 'destructive',
            });
        });
    };

    if (activeCoupons.length === 0) {
        return null;
    }

    return (
        <section className="container mx-auto px-4 py-6 md:py-10">
            <div className="grid grid-cols-1 md:max-w-4xl mx-auto gap-8">
                {activeCoupons.map((coupon: Coupon) => (
                    <div key={coupon.id} className="grid md:grid-cols-2 items-center gap-x-8 gap-y-6 p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
                        <div className="relative aspect-square w-full">
                            <Image
                                src='https://placehold.co/400x400.png'
                                alt={`Promo ${coupon.code}`}
                                fill
                                className="object-cover rounded-md"
                                data-ai-hint="coupon gift"
                            />
                        </div>

                        <div className="flex flex-col justify-center h-full">
                            {coupon.code === 'NEWBIE20' && (
                                <h3 className="text-2xl font-headline font-bold mb-4">Spesial Pengguna Baru</h3>
                            )}
                            <div className="flex items-center justify-between rounded-lg border-2 border-dashed bg-muted p-3">
                                <p className="font-mono text-lg font-bold text-primary">{coupon.code}</p>
                                <Button size="sm" onClick={() => handleCopy(coupon.code)} className='shrink-0'>
                                    {copiedCode === coupon.code ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                    <span className="ml-2 hidden sm:inline">{copiedCode === coupon.code ? 'Disalin' : 'Salin Kupon'}</span>
                                </Button>
                            </div>
                            <p className="text-muted-foreground text-sm mt-3">
                                Gunakan kode ini saat checkout untuk mendapatkan diskon sebesar {coupon.discount}.
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
