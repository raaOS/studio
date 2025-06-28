'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Check, CheckCircle } from 'lucide-react';

const weeklyPlanningData = [
  { week: 'W1', target: 5, actual: 5, status: 'Full' },
  { week: 'W2', target: 5, actual: 3, status: 'Available' },
  { week: 'W3', target: 5, actual: 0, status: 'Open' },
  { week: 'W4', target: 5, actual: 0, status: 'Open' },
];

export default function GeneralSettingsPage() {

  const getStatusBadge = (status: string, slots: number) => {
    switch (status) {
      case 'Full':
        return <Badge variant="destructive"><Check className="mr-1 h-3 w-3" /> Full</Badge>;
      case 'Available':
        return <Badge variant="outline"><AlertTriangle className="mr-1 h-3 w-3" /> Sisa {slots} slot</Badge>;
      case 'Open':
        return <Badge variant="secondary"><CheckCircle className="mr-1 h-3 w-3" /> Open</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
            <h1 className="text-2xl md:text-3xl font-bold font-headline">Pengaturan Kapasitas</h1>
            <p className="text-muted-foreground">Atur batas pesanan dan kelola antrian kerja mingguan Anda.</p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
            <Button>Simpan Batas</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Batas Pesanan</CardTitle>
                    <CardDescription>Atur batas pesanan mingguan, bulanan, dan slot darurat untuk mencegah kelebihan beban kerja.</CardDescription>
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
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>Perencanaan Kapasitas Mingguan</CardTitle>
                    <CardDescription>Rencanakan dan pantau target kapasitas mingguan Anda.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {weeklyPlanningData.map((item) => (
                    <Card key={item.week}>
                      <CardContent className="p-3 grid grid-cols-2 sm:grid-cols-4 gap-2 items-center text-sm">
                        <p className="font-bold">{item.week}</p>
                        <p><span className="text-muted-foreground">Target:</span> {item.target}</p>
                        <p><span className="text-muted-foreground">Aktual:</span> {item.actual}</p>
                        <div>{getStatusBadge(item.status, item.target - item.actual)}</div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1">
             <Card className="sticky top-24">
                <CardHeader>
                    <CardTitle>Status Kapasitas Saat Ini</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label>Minggu Ini (3/5)</Label>
                    </div>
                    <div>
                         <Label>Bulan Ini (12/20)</Label>
                    </div>
                </CardContent>
                 <CardFooter>
                    <Button variant="secondary" className="w-full">Reset Counter Mingguan</Button>
                </CardFooter>
            </Card>
        </div>
      </div>
    </div>
  );
}
