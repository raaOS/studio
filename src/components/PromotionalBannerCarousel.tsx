
'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { mockBanners } from '@/lib/data';
import Autoplay from "embla-carousel-autoplay";

export function PromotionalBannerCarousel() {
  const activeBanners = mockBanners.filter(banner => banner.status === 'Aktif' && banner.type === 'Image');

  if (activeBanners.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-6 md:py-10">
      <div className="container mx-auto px-4">
        <Carousel
            plugins={[
                Autoplay({
                    delay: 5000,
                    stopOnInteraction: true,
                }),
            ]}
            className="w-full"
            opts={{
            loop: true,
            }}
        >
            <CarouselContent>
            {activeBanners.map((banner, index) => (
                <CarouselItem key={banner.id}>
                <Link href={banner.href || '#'}>
                    <Card className="overflow-hidden border-0 shadow-lg rounded-xl">
                    <CardContent className="flex aspect-[3/1] items-center justify-center p-0">
                        {banner.image && (
                            <Image
                                src={banner.image}
                                alt={banner.name}
                                width={600}
                                height={200}
                                className="object-cover w-full h-full"
                                data-ai-hint={banner.dataAiHint}
                                priority={index === 0}
                            />
                        )}
                    </CardContent>
                    </Card>
                </Link>
                </CarouselItem>
            ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex left-[-1rem]" />
            <CarouselNext className="hidden sm:flex right-[-1rem]" />
        </Carousel>
      </div>
    </section>
  );
}
