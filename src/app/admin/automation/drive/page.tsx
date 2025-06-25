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
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { mockDriveActivityLogs } from '@/lib/data';
import { CheckCircle, FolderSync, Folder, Save, TestTube2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { createDriveFolder } from '@/ai/flows/create-drive-folder';

export default function DriveAutomationPage() {
  const { toast } = useToast();
  const [isTesting, setIsTesting] = useState(false);
  const [testOrderId, setTestOrderId] = useState('');
  const [testCustomerName, setTestCustomerName] = useState('');
  const [folderTemplate, setFolderTemplate] = useState('[OrderID] - [CustomerName]');

  const handleTestDrive = async () => {
    if (!testOrderId || !testCustomerName) {
      toast({
        title: 'Data Tes Dibutuhkan',
        description: 'Mohon masukkan Order ID dan Nama Klien untuk pengujian.',
        variant: 'destructive',
      });
      return;
    }

    setIsTesting(true);
    try {
      const result = await createDriveFolder({
        orderId: testOrderId,
        customerName: testCustomerName,
        folderTemplate: folderTemplate,
      });

      if (result.success) {
        toast({
          title: 'Folder Tes Berhasil Dibuat!',
          description: `Folder dengan nama "${result.folderName}" telah disimulasikan.`,
        });
      } else {
        throw new Error('Simulated API call failed.');
      }
    } catch (error) {
      toast({
        title: 'Gagal Membuat Folder',
        description: 'Terjadi kesalahan saat pengujian. Periksa kembali pengaturan Anda.',
        variant: 'destructive',
      });
    } finally {
      setIsTesting(false);
    }
  };

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
                            <p className="font-semibold">urgentstudio.official@gmail.com</p>
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
                <Input 
                  id="folder-structure" 
                  value={folderTemplate}
                  onChange={(e) => setFolderTemplate(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Variabel yang tersedia: <code>[OrderID]</code>, <code>[CustomerName]</code>, <code>[BudgetType]</code>, <code>[Date]</code>.
                </p>
              </div>
            </CardContent>
            <CardFooter>
                <Button><Save className="mr-2 h-4 w-4" /> Simpan Struktur</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-8">
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
          <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><TestTube2 /> Uji Integrasi</CardTitle>
                <CardDescription>Buat folder proyek tes untuk memastikan integrasi berjalan.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="test-order-id">Test Order ID</Label>
                    <Input 
                        id="test-order-id" 
                        placeholder="#TEST-DRV-001" 
                        value={testOrderId}
                        onChange={(e) => setTestOrderId(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="test-customer-name">Test Nama Klien</Label>
                    <Input 
                        id="test-customer-name" 
                        placeholder="Test Customer" 
                        value={testCustomerName}
                        onChange={(e) => setTestCustomerName(e.target.value)}
                    />
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full" onClick={handleTestDrive} disabled={isTesting}>
                    {isTesting ? 'Membuat...' : <><FolderSync className="mr-2 h-4 w-4" /> Buat Folder Tes</>}
                </Button>
            </CardFooter>
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
