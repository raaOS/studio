"use client";

import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { formatRupiah } from "@/lib/utils";
import { OrderSummary } from "./OrderSummary";

export function FloatingCart() {
  const { totalItems, totalPrice } = useCart();

  if (totalItems === 0) {
    return null;
  }

  return (
    <Sheet>
      <motion.div
        className="fixed bottom-4 left-4 right-4 z-40"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <SheetTrigger asChild>
          <Button className="w-full h-14 rounded-full shadow-lg text-lg flex justify-between items-center px-6 bg-primary hover:bg-primary/90">
            <div className="flex items-center gap-3">
              <div className="bg-primary-foreground/20 rounded-full p-2">
                <ShoppingCart className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-primary-foreground">{totalItems} item</span>
            </div>
            <span className="text-primary-foreground font-semibold">{formatRupiah(totalPrice)}</span>
          </Button>
        </SheetTrigger>
      </motion.div>
      <SheetContent side="bottom" className="rounded-t-2xl p-0 max-h-[90vh]">
        <div className="overflow-y-auto">
            <OrderSummary />
        </div>
      </SheetContent>
    </Sheet>
  );
}
