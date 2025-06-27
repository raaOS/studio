
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Gift, Percent } from "lucide-react";
import { mockBanners } from "@/lib/data";
import React from "react";

const iconMap = {
    Gift: Gift,
    Percent: Percent,
};

export function CouponInfoSection() {
    const infoCards = mockBanners.filter(
        (banner) => banner.position === 'Info Card' && banner.status === 'Aktif'
    );

    if (infoCards.length === 0) {
        return null;
    }
    
    return (
        <section className="container mx-auto px-4 py-12 md:py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {infoCards.map((card) => {
                    const Icon = card.icon ? iconMap[card.icon as keyof typeof iconMap] : null;
                    return (
                        <Card key={card.id} className="overflow-hidden flex flex-col md:flex-row items-center shadow-lg h-full">
                            <div className="w-full md:w-1/3 shrink-0">
                                <Image
                                    src={card.image || 'https://placehold.co/400x400.png'}
                                    alt={card.name}
                                    width={400}
                                    height={400}
                                    className="object-cover w-full h-48 md:h-full"
                                    data-ai-hint={card.dataAiHint}
                                />
                            </div>
                            <div className="p-6 flex-1">
                                <CardHeader className="p-0">
                                    <CardTitle className="flex items-center gap-2">
                                        {Icon && <Icon className="h-5 w-5" />}
                                        {card.name}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-0 pt-4">
                                    <p className="text-muted-foreground">
                                        {card.content}
                                    </p>
                                </CardContent>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </section>
    );
}
