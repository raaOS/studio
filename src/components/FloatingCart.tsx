
"use client";

import { motion, useAnimationControls } from "framer-motion";
import { ShoppingCart } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { OrderSummary } from "./OrderSummary";
import { useIsMobile } from '@/hooks/use-mobile';
import { useEffect } from "react";

export function FloatingCart() {
  const isMobile = useIsMobile();
  const { totalItems, cartShake } = useCart();
  const controls = useAnimationControls();

  useEffect(() => {
    if (cartShake > 0) {
      controls.start({
        scale: [1, 1.3, 1],
        rotate: [0, -10, 10, -5, 5, 0],
        transition: { duration: 0.5, type: "spring" }
      });
    }
  }, [cartShake, controls]);

  if (!isMobile) {
    return null;
  }

  return (
    <>
      {/* Spacer to prevent content from being hidden behind the fixed nav bar */}
      <div className="block h-16 md:hidden" /> 

      <motion.div 
          className="fixed bottom-0 left-0 right-0 z-40 block border-t bg-background/95 backdrop-blur-sm md:hidden"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
          <div className="container mx-auto grid h-16 grid-cols-1 items-stretch">
              
              {/* Sheet for Order Summary */}
              <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" className="relative h-full flex-col gap-1 rounded-none">
                        {totalItems > 0 && (
                            <span className="absolute left-[calc(50%+1rem)] top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                                {totalItems}
                            </span>
                        )}
                        <motion.div animate={controls}>
                          <ShoppingCart className="h-6 w-6" />
                        </motion.div>
                        <span className="text-xs font-medium">Rincian Pesanan</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="rounded-t-2xl p-0 max-h-[90vh]">
                  <SheetHeader>
                    <SheetTitle className="sr-only">Rincian Pesanan</SheetTitle>
                  </SheetHeader>
                  <div className="overflow-y-auto">
                      <OrderSummary />
                  </div>
                </SheetContent>
              </Sheet>
          </div>
      </motion.div>
    </>
  );
}
