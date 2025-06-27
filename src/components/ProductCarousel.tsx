'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ServiceCard } from './ServiceCard';
import type { Service } from '@/lib/types';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, LayoutPanelLeft, Briefcase, Megaphone, MonitorSmartphone } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductCarouselProps {
  title: string;
  services: Service[];
}

const categoryIcons: Record<string, React.ElementType> = {
  'Konten Media Sosial': LayoutPanelLeft,
  'Branding & Kantor': Briefcase,
  'Materi Promosi': Megaphone,
  'Desain Digital & Event': MonitorSmartphone,
};


export function ProductCarousel({ title, services }: ProductCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const Icon = categoryIcons[title];

  const updateArrowVisibility = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    const tolerance = 1;

    setShowLeftArrow(scrollLeft > tolerance);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - tolerance);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const resizeObserver = new ResizeObserver(updateArrowVisibility);
    resizeObserver.observe(container);
    container.addEventListener('scroll', updateArrowVisibility, { passive: true });

    updateArrowVisibility();

    return () => {
      resizeObserver.disconnect();
      if (container) {
        container.removeEventListener('scroll', updateArrowVisibility);
      }
    };
  }, [services, updateArrowVisibility]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const item = container.querySelector('.carousel-item');
      if (!item) return;
      const itemWidth = item.clientWidth;
      const gap = 16;
      const scrollAmount = (itemWidth + gap) * (direction === 'left' ? -1 : 1);
      
      container.scrollBy({ 
        left: scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  return (
    <div className="mb-12">
      <div className="relative">
        <h3 className="text-2xl font-headline font-bold mb-6 px-4 md:px-0 flex items-center gap-3">
          {Icon && <Icon className="h-7 w-7 text-primary" />}
          {title}
        </h3>
        
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-4 px-4 md:px-0"
        >
          {services.map((service) => (
            <div 
              key={service.id} 
              className="carousel-item w-3/5 sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.75rem)] shrink-0"
            >
              <ServiceCard service={service} />
            </div>
          ))}
        </div>

        {showLeftArrow && (
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 -translate-y-1/2 left-2 rounded-full h-10 w-10 z-10 hidden md:flex transition-opacity bg-background/80 hover:bg-background shadow-md"
            onClick={() => scroll('left')}
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Scroll Left</span>
          </Button>
        )}

        {showRightArrow && (
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 -translate-y-1/2 right-2 rounded-full h-10 w-10 z-10 hidden md:flex transition-opacity bg-background/80 hover:bg-background shadow-md"
            onClick={() => scroll('right')}
          >
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Scroll Right</span>
          </Button>
        )}
      </div>
    </div>
  );
}
