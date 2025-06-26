'use client';

import React, { useRef } from 'react';
import { ServiceCard } from './ServiceCard';
import type { Service } from '@/lib/types';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductCarouselProps {
  title: string;
  services: Service[];
}

export function ProductCarousel({ title, services }: ProductCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-12">
      <div className="relative group">
        <h3 className="text-2xl font-headline font-bold mb-6">{title}</h3>
        
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto space-x-6 pb-4 snap-x snap-mandatory overscroll-behavior-x-contain no-scrollbar scroll-smooth"
        >
          {services.map((service) => (
            <div key={service.id} className="w-72 flex-shrink-0 snap-start">
              <ServiceCard service={service} />
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2 rounded-full h-10 w-10 z-10 hidden md:flex opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 hover:bg-background"
          onClick={() => scroll('right')}
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Scroll Right</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 rounded-full h-10 w-10 z-10 hidden md:flex opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 hover:bg-background"
          onClick={() => scroll('left')}
        >
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Scroll Left</span>
        </Button>
      </div>
    </div>
  );
}
