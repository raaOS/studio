"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";

interface QuantityStepperProps {
    quantity: number;
    onQuantityChange: (newQuantity: number) => void;
}

export function QuantityStepper({ quantity, onQuantityChange }: QuantityStepperProps) {
    const handleIncrement = () => onQuantityChange(quantity + 1);
    const handleDecrement = () => onQuantityChange(Math.max(0, quantity - 1));

    return (
        <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="shrink-0" onClick={handleDecrement} disabled={quantity <= 0}>
                <Minus className="h-4 w-4" />
                <span className="sr-only">Kurangi jumlah</span>
            </Button>
            <Input
                type="text"
                readOnly
                value={quantity}
                className="w-12 h-10 text-center"
            />
            <Button variant="outline" size="icon" className="shrink-0" onClick={handleIncrement}>
                <Plus className="h-4 w-4" />
                <span className="sr-only">Tambah jumlah</span>
            </Button>
        </div>
    );
}
