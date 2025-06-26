"use client";

import { motion } from "framer-motion";
import { PackageSearch, ShoppingCart } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { OrderSummary } from "./OrderSummary";
import { useIsMobile } from '@/hooks/use-mobile';
import { TrackOrderForm } from './TrackOrderForm';

export function FloatingCart() {
  const isMobile = useIsMobile();
  const { totalItems } = useCart();

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
          <div className="container mx-auto grid h-16 grid-cols-2 items-stretch">
              
              {/* Sheet for Tracking Order */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" className="h-full flex-col gap-1 rounded-none">
                      <PackageSearch className="h-6 w-6" />
                      <span className="text-xs font-medium">Lacak Pesanan</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="rounded-t-2xl p-4 pt-8 max-h-[90vh] overflow-y-auto">
                    <SheetHeader className="sr-only">
                        <SheetTitle>Lacak Pesanan</SheetTitle>
                    </SheetHeader>
                    <TrackOrderForm />
                </SheetContent>
              </Sheet>

              {/* Sheet for Order Summary */}
              <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" className="relative h-full flex-col gap-1 rounded-none">
                        {totalItems > 0 && (
                            <span className="absolute right-8 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                                {totalItems}
                            </span>
                        )}
                        <ShoppingCart className="h-6 w-6" />
                        <span className="text-xs font-medium">Rincian Pesanan</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="rounded-t-2xl p-0 max-h-[90vh]">
                  <SheetHeader className="sr-only">
                    <SheetTitle>Rincian Pesanan</SheetTitle>
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
