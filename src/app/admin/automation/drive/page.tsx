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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { mockDriveActivityLogs } from '@/lib/data';
import { FolderSync, Save, TestTube2, Link as LinkIcon, FolderCog, KeyRound, FileJson, FolderInput, Lightbulb, UserPlus, Power, Flame } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { createOrderFolder } from '@/ai/flows/create-drive-folder';
import type { DriveActivityLog } from '@/lib/types';
import { ResponsiveTableWrapper } from '@/components/ResponsiveTableWrapper';

export default function DriveAutomationPage() {
  const { toast } = useToast();
  const [isTesting, setIsTesting] = useState(false);
  const [testOrderId, setTestOrderId] = useState('DSN-TEST-001');
  const [testCustomerName, setTestCustomerName] = useState('Pelanggan Uji');
  const [folderTemplate, setFolderTemplate] = useState('[OrderID] - [CustomerName]');
  const [activityLogs, setActivityLogs] = useState<DriveActivityLog[]>(mockDriveActivityLogs);

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
      const result = await createOrderFolder({
        orderId: testOrderId,
        customerName: testCustomerName,
        folderTemplate: folderTemplate,
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
        throw new Error(result.error || 'Gagal membuat folder. Pastikan semua variabel .env sudah benar.');
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
        <p className="text-muted-foreground">Ikuti langkah-langkah di bawah ini untuk menghubungkan aplikasi ke Google Drive Anda.</p>
      </div>

      <Alert variant="destructive">
        <Flame className="h-4 w-4" />
        <AlertTitle>Penting: Persiapan untuk Go-Live (Deployment)</AlertTitle>
        <AlertDescription>
            <p>Pengaturan di file <code>.env</code> hanya untuk pengembangan lokal. Agar integrasi ini berfungsi saat aplikasi dipublikasikan, Anda **harus** menyimpan variabel ini di **Firebase Secret Manager**:</p>
            <ul className="list-disc list-inside my-2">
                <li><code>DRIVE_SERVICE_ACCOUNT_JSON</code></li>
                <li><code>DRIVE_PARENT_FOLDER_ID</code></li>
            </ul>
            <Button asChild variant="secondary" size="sm" className="mt-2">
              <a href="https://console.cloud.google.com/security/secret-manager" target="_blank" rel="noopener noreferrer">
                Buka Secret Manager
              </a>
            </Button>
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
          
          <div className="space-y-6">
            <Card className="border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><Power className="h-6 w-6"/> Langkah 1: Aktifkan Google Drive API</CardTitle>
                    <CardDescription>Sebelum bot bisa bekerja, kita harus "menyalakan" fitur Google Drive di proyek Google Cloud Anda. Anggap ini seperti membuka gerbang utama.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ol className="list-decimal list-inside space-y-2 text-sm">
                        <li>Buka halaman Google Drive API di Google Cloud Console menggunakan tombol di bawah.</li>
                        <li>Pastikan proyek yang terpilih di bagian atas adalah proyek yang benar (`urgent-studio`).</li>
                        <li>Jika API belum aktif, Anda akan melihat tombol biru besar bertuliskan <strong>"ENABLE"</strong>. Klik tombol tersebut.</li>
                        <li>Tunggu beberapa saat hingga proses selesai. Halaman akan memuat ulang dan menampilkan grafik penggunaan. Jika sudah aktif, Anda tidak perlu melakukan apa-apa.</li>
                    </ol>
                </CardContent>
                <CardFooter>
                    <Button asChild>
                        <a href="https://console.cloud.google.com/apis/library/drive.googleapis.com" target="_blank" rel="noopener noreferrer">Buka Halaman Google Drive API</a>
                    </Button>
                </CardFooter>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><KeyRound className="h-6 w-6"/> Langkah 2: Buat Kunci API (Service Account)</CardTitle>
                    <CardDescription>Jika Anda sudah punya kunci dari proses sebelumnya, Anda bisa melewati ini. Jika belum, ikuti langkah ini untuk membuat "kunci" khusus untuk bot kita.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ol className="list-decimal list-inside space-y-2 text-sm">
                        <li>Buka Google Cloud Console dan pastikan Anda memilih proyek yang benar (`urgent-studio`).</li>
                        <li>Di menu pencarian, ketik "Service Accounts" dan buka halamannya.</li>
                        <li>Klik "+ CREATE SERVICE ACCOUNT", beri nama (misal: "designflow-bot"), lalu klik "CREATE AND CONTINUE".</li>
                        <li>Pada bagian "Role", cari kategori <strong>Basic</strong>, lalu pilih <strong>Editor</strong>. Klik "CONTINUE" dan "DONE".</li>
                        <li>Temukan service account yang baru dibuat di daftar, klik ikon tiga titik di kolom "Actions", dan pilih "Manage keys".</li>
                        <li>Klik "ADD KEY" > "Create new key". Pilih "JSON" sebagai tipe, lalu klik "CREATE". Sebuah file JSON akan terunduh.</li>
                    </ol>
                </CardContent>
                <CardFooter>
                    <Button asChild>
                        <a href="https://console.cloud.google.com/iam-admin/serviceaccounts" target="_blank" rel="noopener noreferrer">Buka Halaman Service Accounts</a>
                    </Button>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><FileJson className="h-6 w-6"/> Langkah 3: Simpan Kunci di File .env</CardTitle>
                    <CardDescription>Salin isi file JSON yang Anda unduh tadi ke dalam file <code>.env</code> di proyek ini.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="text-sm p-3 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-800 flex items-start gap-3">
                        <Lightbulb className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        <div>
                            <strong>Petunjuk Lokasi File:</strong> File <code>.env</code> berada di direktori utama (root) proyek Anda, di panel file di sebelah kiri. Levelnya sejajar dengan file <code>package.json</code>.
                        </div>
                    </div>
                    <p className="text-sm">Buka file JSON yang baru saja diunduh dengan text editor. Salin **seluruh isinya**.</p>
                    <div>
                        <Label>Tempelkan di file <code>.env</code> dengan format seperti ini:</Label>
                        <code className="relative block rounded bg-muted px-4 py-2 mt-2 text-sm">
                           <span className="text-primary font-semibold">DRIVE_SERVICE_ACCOUNT_JSON</span>=
                           <span className="text-muted-foreground">'{'{'}"type": "service_account", ...{'}'}'</span>
                        </code>
                        <p className="text-xs text-muted-foreground mt-1">Pastikan seluruh konten JSON berada dalam satu baris dan diapit oleh tanda kutip tunggal jika perlu.</p>
                    </div>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><FolderInput className="h-6 w-6"/> Langkah 4: Tentukan & Bagikan Folder Utama</CardTitle>
                    <CardDescription>Pilih folder di Drive Anda & izinkan bot kita untuk menulis di dalamnya.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <ol className="list-decimal list-inside space-y-3 text-sm">
                        <li>Buat sebuah folder baru di Google Drive Anda (misalnya: "Pesanan DesignFlow").</li>
                        <li>Klik kanan pada folder tersebut dan pilih <span className="font-semibold">Bagikan (Share)</span>.</li>
                        <li>
                            Buka kembali file JSON yang Anda unduh. Cari alamat email di bawah kunci <code className="bg-muted px-1 py-0.5 rounded">client_email</code>. Inilah "identitas" bot Anda.
                            <div className="text-xs p-2 mt-2 rounded-md bg-blue-500/10 border border-blue-500/20">
                                <p className="text-blue-800 dark:text-blue-200">Contoh di file JSON:</p>
                                <code className="block text-blue-900 dark:text-blue-300">
                                    ... <br/>
                                    "private_key": "...", <br/>
                                    <span className="bg-primary/20 p-0.5 rounded font-bold">"client_email": "nama-bot-anda@proyek-anda.iam.gserviceaccount.com",</span> <br/>
                                    "client_id": "...", <br/>
                                    ...
                                </code>
                            </div>
                        </li>
                        <li>
                            Di dialog "Bagikan", tempelkan alamat email tersebut, berikan peran sebagai <span className="font-semibold">Editor</span>, dan klik <span className="font-semibold">Kirim</span>.
                             <div className="text-xs p-2 mt-2 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:bg-amber-300/10 dark:border-amber-300/20 dark:text-amber-200 flex items-start gap-2">
                                <UserPlus className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                <div>
                                    <strong>Langkah Penting:</strong> Tanpa membagikan folder ini, bot tidak akan bisa membuat folder baru di dalamnya.
                                </div>
                            </div>
                        </li>
                        <li>Buka folder tersebut. ID-nya adalah bagian terakhir dari URL di browser Anda.</li>
                        <li>Salin ID tersebut dan tempelkan ke file <code>.env</code> Anda dengan nama variabel <code className="bg-muted px-1 py-0.5 rounded">DRIVE_PARENT_FOLDER_ID</code>.</li>
                     </ol>
                     <div className="space-y-2 pt-2">
                        <Label>Format di file <code>.env</code></Label>
                        <code className="relative block rounded bg-muted px-4 py-2 mt-2 text-sm">
                           <span className="text-primary font-semibold">DRIVE_PARENT_FOLDER_ID</span>=
                           <span className="text-muted-foreground">ID_FOLDER_ANDA_DI_SINI</span>
                        </code>
                        <p className="text-xs text-muted-foreground mt-1">
                          Contoh URL: drive.google.com/drive/folders/<b>ID_FOLDER_ANDA</b>
                        </p>
                    </div>
                </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><FolderCog/>Struktur Folder (Opsional)</CardTitle>
              <CardDescription>Atur format penamaan folder proyek. Anda bisa menggunakan variabel yang tersedia.</CardDescription>
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
                    Variabel yang tersedia: <code>[OrderID]</code>, <code>[CustomerName]</code>.
                    </p>
                </div>
            </CardContent>
            <CardFooter>
                <Button 
                    variant="outline"
                    onClick={() => {
                        toast({
                            title: "Pengaturan Disimpan!",
                            description: "Template nama folder telah disimpan (simulasi)."
                        })
                    }}
                >
                    <Save className="mr-2 h-4 w-4" /> Simpan Pengaturan
                </Button>
            </CardFooter>
          </Card>

        </div>

        <div className="lg:col-span-1 space-y-8">
          <Card className="sticky top-24">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><TestTube2 /> Uji Integrasi</CardTitle>
                <CardDescription>Setelah menyelesaikan semua langkah, uji koneksi Anda dengan membuat folder tes.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="test-order-id">Test Order ID</Label>
                    <Input 
                        id="test-order-id" 
                        value={testOrderId}
                        onChange={(e) => setTestOrderId(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="test-customer-name">Test Nama Klien</Label>
                    <Input 
                        id="test-customer-name" 
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
      
       <Card>
        <CardHeader>
          <CardTitle>Log Aktivitas</CardTitle>
          <CardDescription>Riwayat aktivitas sinkronisasi folder yang berhasil.</CardDescription>
        </CardHeader>
        <CardContent>
            <ResponsiveTableWrapper>
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead className="whitespace-nowrap">Order ID</TableHead>
                        <TableHead className="min-w-[250px]">Aktivitas</TableHead>
                        <TableHead className="whitespace-nowrap">Timestamp</TableHead>
                        <TableHead className="whitespace-nowrap">Tipe</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {activityLogs.map((log) => (
                        <TableRow key={log.id}>
                        <TableCell className="font-medium whitespace-nowrap">{log.orderId}</TableCell>
                        <TableCell className="flex items-center gap-2">
                            {log.activity}
                            {log.user === 'System (Live Test)' && (
                                <Button asChild variant="ghost" size="icon" className="h-6 w-6">
                                    <a href={`https://drive.google.com/drive/folders/${log.id}`} target="_blank" rel="noopener noreferrer"><LinkIcon className="h-3 w-3" /></a>
                                </Button>
                            )}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">{log.timestamp}</TableCell>
                        <TableCell className="whitespace-nowrap"><Badge variant={log.user === 'System (Live Test)' ? 'default' : 'secondary'} className={log.user === 'System (Live Test)' ? 'bg-green-600' : ''}>{log.user}</Badge></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </ResponsiveTableWrapper>
        </CardContent>
      </Card>
    </div>
  );
}
