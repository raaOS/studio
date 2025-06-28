'use client';

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { mockMessageTemplates, budgetItems } from '@/lib/data';
import { PlusCircle, Edit, AlertTriangle, Check, CheckCircle } from 'lucide-react';
import { MessageTemplateFormDialog } from '@/components/MessageTemplateFormDialog';
import type { MessageTemplate, BudgetItem } from '@/lib/types';
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveTableWrapper } from '@/components/ResponsiveTableWrapper';


const BudgetsTab = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedBudget, setSelectedBudget] = useState<BudgetItem | null>(null);
    const [editableBudget, setEditableBudget] = useState<BudgetItem | null>(null);
    const { toast } = useToast();

    const handleEditClick = (budget: BudgetItem) => {
        setSelectedBudget(budget);
        setEditableBudget({ ...budget });
        setIsDialogOpen(true);
    };

    const handleSaveChanges = () => {
        if (!editableBudget) return;
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
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Budget: {selectedBudget?.title}</DialogTitle>
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
                        <div className="space-y-2">
                            <Label htmlFor="image">URL Gambar</Label>
                            <Input id="image" value={editableBudget.image} onChange={(e) => handleFieldChange('image', e.target.value)} />
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

const MessagingTab = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<MessageTemplate | null>(null);

  const handleCreateTemplate = () => {
    setSelectedTemplate(null);
    setIsDialogOpen(true);
  };
  
  const handleEditTemplate = (template: MessageTemplate) => {
    setSelectedTemplate(template);
    setIsDialogOpen(true);
  };

  return (
    <>
      <Card>
        <CardHeader>
            <div className="flex justify-between items-center">
                <div>
                    <CardTitle>Template Pesan Bot</CardTitle>
                    <CardDescription>Kelola semua pesan otomatis yang dikirim oleh bot Telegram.</CardDescription>
                </div>
                <Button onClick={handleCreateTemplate}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Buat Template Baru
                </Button>
            </div>
        </CardHeader>
        <CardContent className="p-0">
          <ResponsiveTableWrapper>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="whitespace-nowrap">Template ID</TableHead>
                  <TableHead className="min-w-[250px]">Deskripsi</TableHead>
                  <TableHead className="whitespace-nowrap">Terakhir Diubah</TableHead>
                  <TableHead className="text-right whitespace-nowrap">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockMessageTemplates.map((template) => (
                  <TableRow key={template.id}>
                    <TableCell className="font-mono text-xs whitespace-nowrap">{template.id}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{template.description}</TableCell>
                    <TableCell className="whitespace-nowrap">{template.lastUpdated}</TableCell>
                    <TableCell className="text-right whitespace-nowrap">
                      <Button size="sm" variant="outline" onClick={() => handleEditTemplate(template)}>Edit</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ResponsiveTableWrapper>
        </CardContent>
      </Card>
      <MessageTemplateFormDialog
        template={selectedTemplate}
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </>
  );
};

const CapacityTab = () => {
  const weeklyPlanningData = [
    { week: 'W1', target: 5, actual: 5, status: 'Full' },
    { week: 'W2', target: 5, actual: 3, status: 'Available' },
    { week: 'W3', target: 5, actual: 0, status: 'Open' },
    { week: 'W4', target: 5, actual: 0, status: 'Open' },
  ];

  const getStatusBadge = (status: string, slots: number) => {
    switch (status) {
      case 'Full':
        return <Badge variant="destructive"><Check className="mr-1 h-3 w-3" /> Full</Badge>;
      case 'Available':
        return <Badge variant="outline"><AlertTriangle className="mr-1 h-3 w-3" /> Available ({slots} slot)</Badge>;
      case 'Open':
        return <Badge variant="secondary"><CheckCircle className="mr-1 h-3 w-3" /> Open</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Batas Pesanan</CardTitle>
                    <CardDescription>Atur batas pesanan mingguan, bulanan, dan slot darurat.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="weekly-limit">Limit Mingguan</Label>
                        <Input id="weekly-limit" type="number" defaultValue="5" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="monthly-limit">Limit Bulanan</Label>
                        <Input id="monthly-limit" type="number" defaultValue="20" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="emergency-buffer">Buffer Darurat</Label>
                        <Input id="emergency-buffer" type="number" defaultValue="2" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button>Simpan Batas</Button>
                </CardFooter>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>Perencanaan Kapasitas Mingguan</CardTitle>
                    <CardDescription>Rencanakan dan pantau target kapasitas mingguan Anda.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <ResponsiveTableWrapper>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="whitespace-nowrap">Minggu</TableHead>
                                <TableHead className="whitespace-nowrap">Target</TableHead>
                                <TableHead className="whitespace-nowrap">Aktual</TableHead>
                                <TableHead className="whitespace-nowrap">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        {weeklyPlanningData.map((item) => (
                            <TableRow key={item.week}>
                                <TableCell className="font-medium whitespace-nowrap">{item.week}</TableCell>
                                <TableCell className="whitespace-nowrap">{item.target}</TableCell>
                                <TableCell className="whitespace-nowrap">{item.actual}</TableCell>
                                <TableCell className="whitespace-nowrap">{getStatusBadge(item.status, item.target - item.actual)}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                  </ResponsiveTableWrapper>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1">
             <Card className="sticky top-24">
                <CardHeader>
                    <CardTitle>Status Kapasitas Saat Ini</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <Label>Minggu Ini (3/5)</Label>
                    </div>
                    <div>
                         <Label>Bulan Ini (12/20)</Label>
                    </div>
                </CardContent>
                 <CardFooter>
                    <Button variant="secondary" className="w-full">Reset Counter</Button>
                </CardFooter>
            </Card>
        </div>
    </div>
  );
};


export default function GeneralSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-headline">Pengaturan Umum</h1>
        <p className="text-muted-foreground">Kelola pengaturan inti aplikasi Anda dari satu tempat.</p>
      </div>

       <Tabs defaultValue="budgets" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="budgets">Tampilan Budget</TabsTrigger>
          <TabsTrigger value="messaging">Pesan Bot</TabsTrigger>
          <TabsTrigger value="capacity">Kapasitas</TabsTrigger>
        </TabsList>
        <TabsContent value="budgets" className="mt-4">
            <BudgetsTab />
        </TabsContent>
        <TabsContent value="messaging" className="mt-4">
            <MessagingTab />
        </TabsContent>
        <TabsContent value="capacity" className="mt-4">
            <CapacityTab />
        </TabsContent>
      </Tabs>
      
    </div>
  );
}
