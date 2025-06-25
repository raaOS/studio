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
import { mockCalendarActivityLogs } from '@/lib/data';
import { CheckCircle, CalendarDays, CalendarClock, Save } from 'lucide-react';

export default function CalendarAutomationPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-headline">Otomasi Google Calendar</h1>
        <p className="text-muted-foreground">Sinkronkan jadwal meeting dan deadline proyek secara otomatis.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Koneksi Akun</CardTitle>
              <CardDescription>Hubungkan akun Google Calendar Anda untuk memulai.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between p-4 border rounded-md">
                    <div className="flex items-center gap-3">
                        <CalendarDays className="h-8 w-8 text-green-600" />
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
              <CardTitle>Template Event</CardTitle>
              <CardDescription>Atur format judul dan deskripsi untuk event yang dibuat otomatis.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="meeting-title">Template Judul Meeting</Label>
                <Input id="meeting-title" defaultValue="Meeting: DesignFlow - [CustomerName] ([OrderID])" />
              </div>
               <div>
                <Label htmlFor="deadline-title">Template Judul Deadline</Label>
                <Input id="deadline-title" defaultValue="Deadline: [ServiceName] untuk [OrderID]" />
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
              <CardTitle className="flex items-center gap-2"><CalendarClock /> Aturan Sinkronisasi</CardTitle>
              <CardDescription>Aktifkan aturan untuk membuat event otomatis.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
                <div className="flex items-start justify-between">
                    <div>
                        <Label htmlFor="sync-meeting" className="font-semibold">Buat Event Meeting</Label>
                        <p className="text-muted-foreground">Saat meeting dijadwalkan via Telegram/tool.</p>
                    </div>
                    <Switch id="sync-meeting" defaultChecked={true} />
                </div>
                <div className="flex items-start justify-between">
                    <div>
                        <Label htmlFor="sync-deadline" className="font-semibold">Buat Event Deadline</Label>
                        <p className="text-muted-foreground">Saat pesanan mulai dikerjakan.</p>
                    </div>
                    <Switch id="sync-deadline" defaultChecked={true} />
                </div>
                 <div className="flex items-start justify-between">
                    <div>
                        <Label htmlFor="sync-revision" className="font-semibold">Jadwalkan Meeting Revisi</Label>
                        <p className="text-muted-foreground">Saat revisi > 2x, buat proposal meeting.</p>
                    </div>
                    <Switch id="sync-revision" defaultChecked={false} />
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Log Aktivitas Kalender</CardTitle>
          <CardDescription>Riwayat event yang dibuat dan diperbarui oleh sistem.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Aktivitas</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Pemicu</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCalendarActivityLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.orderId}</TableCell>
                  <TableCell>{log.activity}</TableCell>
                  <TableCell>{log.timestamp}</TableCell>
                  <TableCell><Badge variant="secondary">{log.trigger}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

    </div>
  );
}
