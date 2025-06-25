'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Check, CheckCircle } from 'lucide-react';

const weeklyPlanningData = [
  { week: 'W1', target: 5, actual: 5, status: 'Full' },
  { week: 'W2', target: 5, actual: 3, status: 'Available' },
  { week: 'W3', target: 5, actual: 0, status: 'Open' },
  { week: 'W4', target: 5, actual: 0, status: 'Open' },
];

export default function AdminCapacityPage() {

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
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold font-headline">Pengaturan Kapasitas Order</h1>
        <div className="flex gap-2">
            <Button variant="outline">Emergency Override</Button>
            <Button>Update Limits</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Order Limits</CardTitle>
                    <CardDescription>Atur batas pesanan mingguan dan bulanan, serta slot darurat.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="weekly-limit">Limit Mingguan</Label>
                        <Input id="weekly-limit" type="number" defaultValue="5" placeholder="Order/minggu" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="monthly-limit">Limit Bulanan</Label>
                        <Input id="monthly-limit" type="number" defaultValue="20" placeholder="Order/bulan" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="emergency-buffer">Buffer Emergency</Label>
                        <Input id="emergency-buffer" type="number" defaultValue="2" placeholder="Slot darurat"/>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button variant="secondary">Reset Counter</Button>
                </CardFooter>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>Weekly Capacity Planning</CardTitle>
                    <CardDescription>Rencanakan dan pantau target kapasitas mingguan Anda.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>Minggu</TableHead>
                            <TableHead>Target</TableHead>
                            <TableHead>Aktual</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {weeklyPlanningData.map((item) => (
                            <TableRow key={item.week}>
                                <TableCell className="font-medium">{item.week}</TableCell>
                                <TableCell>{item.target}</TableCell>
                                <TableCell>{item.actual}</TableCell>
                                <TableCell>{getStatusBadge(item.status, item.target - item.actual)}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </CardContent>
                 <CardFooter className="gap-2">
                    <Button variant="outline">Edit Weekly Targets</Button>
                    <Button variant="secondary">Block Specific Weeks</Button>
                </CardFooter>
            </Card>
        </div>

        <div className="lg:col-span-1">
             <Card className="sticky top-24">
                <CardHeader>
                    <CardTitle>Status Saat Ini</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <div className="flex justify-between items-baseline mb-1">
                            <span className="text-sm font-medium">Minggu ini</span>
                            <span className="text-sm text-muted-foreground">3/5 (60%)</span>
                        </div>
                        <Progress value={60} />
                    </div>
                    <div>
                         <div className="flex justify-between items-baseline mb-1">
                            <span className="text-sm font-medium">Bulan ini</span>
                            <span className="text-sm text-muted-foreground">12/20 (60%)</span>
                        </div>
                        <Progress value={60} />
                    </div>
                </CardContent>
            </Card>
        </div>

      </div>
    </div>
  );
}
