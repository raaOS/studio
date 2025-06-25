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
import { mockDriveActivityLogs } from '@/lib/data';
import { CheckCircle, FolderSync, Folder, Save } from 'lucide-react';

export default function DriveAutomationPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-headline">Otomasi Google Drive</h1>
        <p className="text-muted-foreground">Kelola folder proyek otomatis dan sinkronisasi file.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Utama</CardTitle>
              <CardDescription>Hubungkan akun Google Anda untuk mengaktifkan integrasi.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-md">
                    <div className="flex items-center gap-3">
                        <Folder className="h-8 w-8 text-blue-500" />
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
              <CardTitle>Struktur Folder</CardTitle>
              <CardDescription>Atur format penamaan untuk folder proyek yang dibuat secara otomatis.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="folder-structure">Template Nama Folder</Label>
                <Input id="folder-structure" defaultValue="[OrderID] - [CustomerName]" />
                <p className="text-xs text-muted-foreground">
                  Variabel yang tersedia: <code>[OrderID]</code>, <code>[CustomerName]</code>, <code>[BudgetType]</code>, <code>[Date]</code>.
                </p>
              </div>
            </CardContent>
            <CardFooter>
                <Button><Save className="mr-2 h-4 w-4" /> Simpan Struktur</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><FolderSync /> Sinkronisasi</CardTitle>
              <CardDescription>Atur file apa saja yang akan disinkronkan secara otomatis.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
                <p><strong>Saat Pesanan Dibuat:</strong></p>
                <ul className="list-disc list-inside text-muted-foreground pl-2">
                    <li>Buat folder proyek baru.</li>
                    <li>Upload ringkasan brief (brief.pdf).</li>
                </ul>
                  <p className="mt-4"><strong>Saat Pesanan Selesai:</strong></p>
                  <ul className="list-disc list-inside text-muted-foreground pl-2">
                    <li>Upload semua file final (final_assets.zip).</li>
                    <li>Bagikan folder ke klien (read-only).</li>
                </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Log Aktivitas</CardTitle>
          <CardDescription>Riwayat aktivitas sinkronisasi Google Drive.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Aktivitas</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockDriveActivityLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.orderId}</TableCell>
                  <TableCell>{log.activity}</TableCell>
                  <TableCell>{log.timestamp}</TableCell>
                  <TableCell>{log.user}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

    </div>
  );
}
