'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { mockMeetActivityLogs } from '@/lib/data';
import { CheckCircle, Video, Save, Clock } from 'lucide-react';


export default function MeetAutomationPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-headline">Otomasi Google Meet</h1>
        <p className="text-muted-foreground">Jadwalkan meeting konsultasi atau kickoff proyek secara otomatis.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Koneksi Akun Google</CardTitle>
              <CardDescription>Hubungkan akun Google Anda untuk integrasi dengan Meet.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between p-4 border rounded-md">
                    <div className="flex items-center gap-3">
                        <Video className="h-8 w-8 text-green-600" />
                        <div>
                            <p className="font-semibold">admin@designflow.com</p>
                            <Badge variant="outline" className="border-green-500/30 bg-green-500/20 text-green-700 mt-1">
                                <CheckCircle className="mr-1 h-3 w-3" /> Terhubung
                            </Badge>
                        </div>
                    </div>
                    <Button variant="destructive">Putuskan Hubungan</Button>
                </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Template Event Meeting</CardTitle>
              <CardDescription>Atur format judul untuk meeting yang dibuat otomatis.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="kickoff-title">Template Judul Kickoff Meeting</Label>
                <Input id="kickoff-title" defaultValue="Kickoff: Urgent Studio - [CustomerName] ([OrderID])" />
              </div>
               <div>
                <Label htmlFor="consultation-title">Template Judul Meeting Konsultasi</Label>
                <Input id="consultation-title" defaultValue="Konsultasi: Revisi [ServiceName] untuk [OrderID]" />
                 <p className="text-xs text-muted-foreground mt-1">
                  Variabel: <code>[OrderID]</code>, <code>[CustomerName]</code>, <code>[ServiceName]</code>.
                </p>
              </div>
            </CardContent>
            <CardFooter>
                <Button><Save className="mr-2 h-4 w-4" /> Simpan Template</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Clock /> Aturan Penjadwalan</CardTitle>
              <CardDescription>Aktifkan aturan untuk menjadwalkan meeting.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
                <div className="flex items-start justify-between">
                    <div>
                        <Label htmlFor="sync-kickoff" className="font-semibold">Jadwalkan Kickoff Meeting</Label>
                        <p className="text-muted-foreground">Saat pesanan baru dikonfirmasi.</p>
                    </div>
                    <Switch id="sync-kickoff" defaultChecked={true} />
                </div>
                <div className="flex items-start justify-between">
                    <div>
                        <Label htmlFor="sync-consultation" className="font-semibold">Jadwalkan Konsultasi Revisi</Label>
                        <p className="text-muted-foreground">Otomatis saat revisi melebihi batas (misal: > 2x).</p>
                    </div>
                    <Switch id="sync-consultation" defaultChecked={false} />
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Log Penjadwalan Meet</CardTitle>
          <CardDescription>Riwayat meeting yang dibuat oleh sistem.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">Order ID</TableHead>
                <TableHead className="min-w-[250px]">Aktivitas</TableHead>
                <TableHead className="whitespace-nowrap">Timestamp</TableHead>
                <TableHead className="whitespace-nowrap">Pemicu</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockMeetActivityLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium whitespace-nowrap">{log.orderId}</TableCell>
                  <TableCell>{log.activity}</TableCell>
                  <TableCell className="whitespace-nowrap">{log.timestamp}</TableCell>
                  <TableCell className="whitespace-nowrap"><Badge variant="secondary">{log.trigger}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

    </div>
  );
}
