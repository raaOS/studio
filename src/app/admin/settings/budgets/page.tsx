
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { budgetItems } from '@/lib/data';
import type { BudgetItem } from '@/lib/types';
import { Edit } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";


export default function AdminBudgetsPage() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedBudget, setSelectedBudget] = useState<BudgetItem | null>(null);
    const [editableBudget, setEditableBudget] = useState<BudgetItem | null>(null);
    const { toast } = useToast();

    const handleEditClick = (budget: BudgetItem) => {
        setSelectedBudget(budget);
        setEditableBudget(budget); // Copy to editable state
        setIsDialogOpen(true);
    };

    const handleSaveChanges = () => {
        if (!editableBudget) return;
        // In a real app, this would be an API call.
        console.log("Saving changes for:", editableBudget);
        toast({
            title: "Perubahan Disimpan (Simulasi)",
            description: `Detail untuk budget "${editableBudget.title}" telah diperbarui.`,
        });
        setIsDialogOpen(false);
        setSelectedBudget(null);
    };
    
    const handleFieldChange = (field: keyof Omit<BudgetItem, 'id'>, value: string) => {
        if(editableBudget) {
            setEditableBudget({ ...editableBudget, [field]: value });
        }
    }

    return (
        <>
        <div className="space-y-6">
            <div>
            <h1 className="text-2xl md:text-3xl font-bold font-headline">Tampilan & Budget</h1>
            <p className="text-muted-foreground">Kelola judul dan deskripsi global untuk setiap tingkatan budget.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {budgetItems.map((budget) => (
                <Card key={budget.id}>
                    <CardHeader>
                        <CardTitle>{budget.title}</CardTitle>
                        <CardDescription>{budget.description}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                         <Button variant="outline" className="w-full" onClick={() => handleEditClick(budget)}>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                        </Button>
                    </CardFooter>
                </Card>
            ))}
            </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Budget: {selectedBudget?.title}</DialogTitle>
                    <DialogDescription>
                        Ubah detail untuk tingkatan budget ini. Perubahan akan terlihat di halaman pemesanan.
                    </DialogDescription>
                </DialogHeader>
                {editableBudget && (
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Judul</Label>
                            <Input id="title" value={editableBudget.title} onChange={(e) => handleFieldChange('title', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Deskripsi</Label>
                            <Textarea id="description" value={editableBudget.description} onChange={(e) => handleFieldChange('description', e.target.value)} />
                        </div>
                    </div>
                )}
                <DialogFooter>
                    <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>Batal</Button>
                    <Button onClick={handleSaveChanges}>Simpan Perubahan</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        </>
    );
}
