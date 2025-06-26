'use client';

import React, { useState, useEffect } from 'react';
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
import { FolderSync, Save, TestTube2, AlertCircle, Link as LinkIcon, FolderCog } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { createOrderFolder } from '@/ai/flows/create-drive-folder';
import type { DriveActivityLog } from '@/lib/types';

export default function DriveAutomationPage() {
  const { toast } = useToast();
  const [isTesting, setIsTesting] = useState(false);
  const [testOrderId, setTestOrderId] = useState('DSN-TEST-001');
  const [testCustomerName, setTestCustomerName] = useState('Pelanggan Uji');
  const [folderTemplate, setFolderTemplate] = useState('[OrderID] - [CustomerName]');
  const [parentFolderId, setParentFolderId] = useState('');
  const [activityLogs, setActivityLogs] = useState<DriveActivityLog[]>(mockDriveActivityLogs);

  // Effect to load parent folder ID from env var placeholder on client-side
  // In a real app, this might be fetched from a secure config endpoint
  useEffect(() => {
    // This is a placeholder for demonstrating where the env var would be used.
    // In Next.js, `process.env` is not directly available in the client like this
    // without being prefixed with NEXT_PUBLIC_. For server-side values, we
    // would fetch them from an API route. Here we'll just leave it blank
    // and let the user input it.
  }, []);

  const handleTestDrive = async () => {
    if (!testOrderId || !testCustomerName) {
      toast({
        title: 'Data Tes Dibutuhkan',
        description: 'Mohon masukkan Order ID dan Nama Klien untuk pengujian.',
        variant: 'destructive',
      });
      return;
    }
    
    if (!parentFolderId) {
       toast({
        title: 'Parent Folder ID Diperlukan',
        description: 'Mohon masukkan ID folder utama di Google Drive tempat folder baru akan dibuat.',
        variant: 'destructive',
      });
      return;
    }

    setIsTesting(true);
    try {
      const result = await createOrderFolder({
        orderId: testOrderId,
        customerName: testCustomerName,
        folderTemplate: folderTemplate,
        parentFolderId: parentFolderId,
      });

      if (result.success && result.folderId) {
        toast({
          title: 'Folder Tes Berhasil Dibuat!',
          description: `Folder "${result.folderName}" telah dibuat di Google Drive Anda.`,
          action: result.folderUrl ? (
            <Button asChild variant="secondary" size="sm">
                <a href={result.folderUrl} target="_blank" rel="noopener noreferrer">Buka Folder</a>
            </Button>
          ) : undefined,
        });
        
        const newLog: DriveActivityLog = {
          id: result.folderId,
          orderId: testOrderId,
          activity: `Folder Created: ${result.folderName}`,
          timestamp: new Date().toLocaleString('id-ID'),
          user: 'System (Live Test)',
        };
        setActivityLogs(prevLogs => [newLog, ...prevLogs]);

      } else {
        throw new Error(result.error || 'Terjadi kesalahan tidak diketahui.');
      }
    } catch (error: any) {
      toast({
        title: 'Gagal Membuat Folder',
        description: error.message,
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
        <p className="text-muted-foreground">Kelola folder proyek otomatis untuk setiap pesanan langsung di Google Drive.</p>
      </div>

       <Alert variant="destructive" className="bg-yellow-50 border-yellow-300 dark:bg-yellow-950 dark:border-yellow-800">
          <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
          <AlertTitle className="text-yellow-800 dark:text-yellow-300 font-bold">Konfigurasi Diperlukan</AlertTitle>
          <AlertDescription className="text-yellow-700 dark:text-yellow-400">
            Integrasi ini sekarang **nyata**. Untuk bekerja, Anda harus:
            <ol className="list-decimal list-inside mt-2 space-y-1">
                <li>Membuat **Service Account** di Google Cloud Console dan mengunduh file kredensial JSON-nya.</li>
                <li>Menambahkan isi file JSON tersebut ke variabel <code>DRIVE_SERVICE_ACCOUNT_JSON</code> di file <code>.env</code> Anda.</li>
                <li>Mendapatkan **ID Folder Induk** dari URL Google Drive dan memasukkannya di bawah atau di variabel <code>DRIVE_PARENT_FOLDER_ID</code>.</li>
            </ol>
          </AlertDescription>
        </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><FolderCog/>Struktur Folder</CardTitle>
              <CardDescription>Atur format penamaan dan lokasi folder proyek di Google Drive.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="parent-folder-id">ID Folder Induk Google Drive</Label>
                <Input 
                  id="parent-folder-id" 
                  placeholder="Contoh: 1a2b3c4d5e6f7g8h9i0j_kL"
                  value={parentFolderId}
                  onChange={(e) => setParentFolderId(e.target.value)}
                />
                 <p className="text-xs text-muted-foreground mt-1">
                  Ambil ID dari URL folder utama di Google Drive Anda. Folder baru akan dibuat di dalamnya.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="folder-structure">Template Nama Folder</Label>
                <Input 
                  id="folder-structure" 
                  value={folderTemplate}
                  onChange={(e) => setFolderTemplate(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Variabel yang tersedia: <code>[OrderID]</code>, <code>[CustomerName]</code>.
                </p>
              </div>
            </CardContent>
            <CardFooter>
                <Button><Save className="mr-2 h-4 w-4" /> Simpan Pengaturan (Simulasi)</Button>
            </CardFooter>
          </Card>

           <Card>
            <CardHeader>
              <CardTitle>Log Aktivitas</CardTitle>
              <CardDescription>Riwayat aktivitas sinkronisasi folder yang berhasil.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Aktivitas</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Tipe</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activityLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-medium">{log.orderId}</TableCell>
                      <TableCell className="flex items-center gap-2">
                        {log.activity}
                        {log.user === 'System (Live Test)' && (
                             <Button asChild variant="ghost" size="icon" className="h-6 w-6">
                                <a href={`https://drive.google.com/drive/folders/${log.id}`} target="_blank" rel="noopener noreferrer"><LinkIcon className="h-3 w-3" /></a>
                             </Button>
                        )}
                      </TableCell>
                      <TableCell>{log.timestamp}</TableCell>
                      <TableCell><Badge variant={log.user === 'System (Live Test)' ? 'default' : 'secondary'} className={log.user === 'System (Live Test)' ? 'bg-green-600' : ''}>{log.user}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-8">
          <Card className="sticky top-24">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><TestTube2 /> Uji Integrasi</CardTitle>
                <CardDescription>Buat folder proyek tes untuk memastikan koneksi ke Google Drive berjalan.</CardDescription>
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
                    {isTesting ? <><FolderSync className="mr-2 h-4 w-4 animate-spin" /> Membuat...</> : <><FolderSync className="mr-2 h-4 w-4" /> Uji Buat Folder</>}
                </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
