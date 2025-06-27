'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { mockCoupons } from "@/lib/data";
import { Copy, Check } from "lucide-react";
import type { Coupon } from '@/lib/types';

export function CouponInfoSection() {
    const { toast } = useToast();
    const [copiedCode, setCopiedCode] = useState<string | null>(null);

    // Get the first two active coupons to display
    const activeCoupons = mockCoupons.filter(c => c.status === 'Aktif').slice(0, 2);

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
        <section className="container mx-auto px-4 py-12 md:py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {activeCoupons.map((coupon: Coupon) => (
                     <Card key={coupon.id} className="overflow-hidden flex flex-col md:flex-row items-center shadow-lg h-full">
                        <div className="w-full md:w-1/3 shrink-0">
                            <Image
                                src='https://placehold.co/400x400.png'
                                alt={`Promo ${coupon.code}`}
                                width={400}
                                height={400}
                                className="object-cover w-full h-48 md:h-full"
                                data-ai-hint="coupon gift"
                            />
                        </div>
                        <div className="p-6 flex-1 flex flex-col justify-center h-full w-full">
                            {coupon.code === 'NEWBIE20' && (
                                <CardHeader className="p-0 mb-2">
                                    <CardTitle>Spesial Pengguna Baru</CardTitle>
                                </CardHeader>
                            )}
                            <CardContent className="p-0">
                                <div className="flex items-center justify-between rounded-lg border-2 border-dashed bg-muted p-3">
                                    <p className="font-mono text-lg font-bold text-primary">{coupon.code}</p>
                                    <Button size="sm" onClick={() => handleCopy(coupon.code)} className='shrink-0'>
                                        {copiedCode === coupon.code ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                        <span className="ml-2 hidden sm:inline">{copiedCode === coupon.code ? 'Disalin' : 'Salin Kupon'}</span>
                                    </Button>
                                </div>
                                <p className="text-muted-foreground text-sm mt-2">
                                    Gunakan kode di bawah ini saat checkout untuk mendapatkan diskon sebesar {coupon.discount}.
                                </p>
                            </CardContent>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
}
