'use client';

import React, { useRef, useState, useEffect } from 'react';
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
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // This effect will update arrow visibility based on scroll position
  // and also when the component or window resizes.
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const updateArrowVisibility = () => {
        const { scrollLeft, scrollWidth, clientWidth } = container;
        const tolerance = 1; // Add tolerance for sub-pixel calculations
        setShowLeftArrow(scrollLeft > tolerance);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - tolerance);
    };

    const resizeObserver = new ResizeObserver(updateArrowVisibility);
    resizeObserver.observe(container);
    container.addEventListener('scroll', updateArrowVisibility, { passive: true });

    updateArrowVisibility(); // Initial check

    return () => {
      resizeObserver.disconnect();
      container.removeEventListener('scroll', updateArrowVisibility);
    };
  }, [services]); // Re-run if the services list changes

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-12">
      <div className="relative">
        <h3 className="text-2xl font-headline font-bold mb-6 px-4 md:px-0">{title}</h3>
        
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-4 px-4 md:px-14"
        >
          {services.map((service) => (
            <div key={service.id} className="w-4/5 sm:w-[calc(50%-0.5rem)] md:w-64 shrink-0 snap-start">
              <ServiceCard service={service} />
            </div>
          ))}
        </div>

        {/* Left Button - Shown on desktop when scrollable */}
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

        {/* Right Button - Shown on desktop when scrollable */}
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
