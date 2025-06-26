"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";

interface QuantityStepperProps {
    quantity: number;
    onQuantityChange: (newQuantity: number) => void;
    disabled?: boolean;
}

export function QuantityStepper({ quantity, onQuantityChange, disabled = false }: QuantityStepperProps) {
    const handleIncrement = () => onQuantityChange(quantity + 1);
    const handleDecrement = () => onQuantityChange(Math.max(0, quantity - 1));

    return (
        <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="shrink-0" onClick={handleDecrement} disabled={disabled || quantity <= 0}>
                <Minus className="h-4 w-4" />
                <span className="sr-only">Kurangi jumlah</span>
            </Button>
            <Input
                type="text"
                readOnly
                value={quantity}
                className="w-12 h-10 text-center"
                disabled={disabled}
            />
            <Button variant="outline" size="icon" className="shrink-0" onClick={handleIncrement} disabled={disabled}>
                <Plus className="h-4 w-4" />
                <span className="sr-only">Tambah jumlah</span>
            </Button>
        </div>
    );
}
