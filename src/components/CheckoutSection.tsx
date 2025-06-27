'use client';

import { useCart } from '@/contexts/CartContext';
import { TrackOrderForm } from '@/components/TrackOrderForm';
import { OrderSummary } from '@/components/OrderSummary';
import { cn } from '@/lib/utils';

export function CheckoutSection() {
    const { isCheckoutActive } = useCart();

    return (
        <section id="summary-section" className="hidden md:block container mx-auto px-4 pb-12">
            <div className={cn(
                "grid gap-12 items-start transition-all duration-300",
                isCheckoutActive ? "lg:grid-cols-2" : "lg:grid-cols-1"
            )}>
                <div className={cn(!isCheckoutActive && "lg:max-w-md mx-auto")}>
                    <h2 className="text-2xl font-headline font-semibold text-foreground text-center mb-6">Lacak Status Pesanan Anda</h2>
                    <TrackOrderForm />
                </div>
                
                {isCheckoutActive && (
                    <div className="animate-in fade-in-0 slide-in-from-top-5 duration-500">
                        <h2 className="text-2xl font-headline font-semibold text-foreground text-center mb-6">Periksa & Kirim Pesanan Anda</h2>
                        <OrderSummary />
                    </div>
                )}
            </div>
        </section>
    );
}
