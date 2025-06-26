
"use client";

import { motion, useAnimationControls } from "framer-motion";
import { ShoppingCart, PackageSearch } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { OrderSummary } from "./OrderSummary";
import { useIsMobile } from '@/hooks/use-mobile';
import { useEffect } from "react";
import Link from "next/link";

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
          <div className="container mx-auto grid h-16 grid-cols-2 items-stretch divide-x divide-border">
              <Link href="/track" passHref legacyBehavior>
                <a className="flex flex-col items-center justify-center gap-1 text-xs font-medium text-muted-foreground hover:text-primary transition-colors">
                    <PackageSearch className="h-6 w-6" />
                    <span>Lacak Pesanan</span>
                </a>
              </Link>
              
              {/* Sheet for Order Summary */}
              <Sheet>
                <SheetTrigger asChild>
                    <button className="relative h-full flex flex-col items-center justify-center gap-1 text-xs font-medium rounded-none text-muted-foreground hover:text-primary transition-colors">
                        {totalItems > 0 && (
                            <span className="absolute left-[calc(50%+1.25rem)] top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                                {totalItems}
                            </span>
                        )}
                        <motion.div animate={controls}>
                          <ShoppingCart className="h-6 w-6" />
                        </motion.div>
                        <span >Rincian Pesanan</span>
                    </button>
                </SheetTrigger>
                <SheetContent side="bottom" className="rounded-t-2xl p-0 max-h-[90vh] flex flex-col">
                  <OrderSummary />
                </SheetContent>
              </Sheet>
          </div>
      </motion.div>
    </>
  );
}
