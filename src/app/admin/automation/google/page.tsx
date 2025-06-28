
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { mockDriveActivityLogs, mockCalendarActivityLogs, mockMeetActivityLogs } from '@/lib/data';
import { FolderSync, Save, TestTube2, Link as LinkIcon, FolderCog, CheckCircle, Video, CalendarDays, CalendarClock, Clock, KeyRound, FileJson, FolderInput, Lightbulb, UserPlus, Power, Flame } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { createOrderFolder } from '@/ai/flows/create-drive-folder';
import type { DriveActivityLog } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ResponsiveTableWrapper } from '@/components/ResponsiveTableWrapper';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


const DriveTab = () => {
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
          
          <div className="space-y-6">
            <Card className="border-primary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><Power className="h-6 w-6"/> Langkah 1: Aktifkan Google Drive API</CardTitle>
                    <CardDescription>Sebelum bot bisa bekerja, kita harus "menyalakan" fitur Google Drive di proyek Google Cloud Anda.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ol className="list-decimal list-inside space-y-2 text-sm">
                        <li>Buka halaman Google Drive API di Google Cloud Console menggunakan tombol di bawah.</li>
                        <li>Pastikan proyek yang terpilih di bagian atas adalah proyek yang benar (`urgent-studio`).</li>
                        <li>Jika API belum aktif, Anda akan melihat tombol biru besar bertuliskan <strong>"ENABLE"</strong>. Klik tombol tersebut.</li>
                        <li>Tunggu beberapa saat hingga proses selesai.</li>
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
                    <CardDescription>Buat "kunci digital" khusus agar aplikasi kita bisa mengakses Drive secara aman.</CardDescription>
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
                    <p className="text-sm">Buka file JSON yang baru saja diunduh dengan text editor. Salin **seluruh isinya**.</p>
                    <div>
                        <Label>Tempelkan di file <code>.env</code> dengan format seperti ini:</Label>
                        <code className="relative block rounded bg-muted px-4 py-2 mt-2 text-sm">
                           <span className="text-primary font-semibold">DRIVE_SERVICE_ACCOUNT_JSON</span>=
                           <span className="text-muted-foreground">'{'{'}"type": "service_account", ...{'}'}'</span>
                        </code>
                        <p className="text-xs text-muted-foreground mt-1">Pastikan seluruh konten JSON berada dalam satu baris dan diapit oleh tanda kutip tunggal.</p>
                    </div>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><FolderInput className="h-6 w-6"/> Langkah 4: Tentukan & Bagikan Folder Utama</CardTitle>
                    <CardDescription>Pilih folder di Drive Anda & izinkan aplikasi kita untuk menulis di dalamnya.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <ol className="list-decimal list-inside space-y-3 text-sm">
                        <li>Buat sebuah folder baru di Google Drive Anda (misalnya: "Pesanan DesignFlow").</li>
                        <li>Klik kanan pada folder tersebut dan pilih <span className="font-semibold">Bagikan (Share)</span>.</li>
                        <li>
                            Buka kembali file JSON yang Anda unduh. Cari alamat email di bawah kunci <code className="bg-muted px-1 py-0.5 rounded">client_email</code>. Inilah "identitas" aplikasi Anda.
                        </li>
                        <li>
                            Di dialog "Bagikan", tempelkan alamat email tersebut, berikan peran sebagai <span className="font-semibold">Editor</span>, dan klik <span className="font-semibold">Kirim</span>.
                             <div className="text-xs p-2 mt-2 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:bg-amber-300/10 dark:border-amber-300/20 dark:text-amber-200 flex items-start gap-2">
                                <UserPlus className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                <div>
                                    <strong>Langkah Penting:</strong> Tanpa membagikan folder ini, aplikasi tidak akan bisa membuat folder baru di dalamnya.
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
          <CardTitle>Log Aktivitas Drive</CardTitle>
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

const CalendarTab = () => {
    return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Koneksi Akun</CardTitle>
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
                <Input id="meeting-title" defaultValue="Meeting: Urgent Studio - [CustomerName] ([OrderID])" />
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
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
                <div className="flex items-start justify-between">
                    <div>
                        <Label htmlFor="sync-meeting" className="font-semibold">Buat Event Meeting</Label>
                        <p className="text-muted-foreground">Saat meeting dijadwalkan.</p>
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
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Log Aktivitas Kalender</CardTitle>
        </CardHeader>
        <CardContent>
            <ResponsiveTableWrapper>
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
                    {mockCalendarActivityLogs.map((log) => (
                        <TableRow key={log.id}>
                        <TableCell className="font-medium whitespace-nowrap">{log.orderId}</TableCell>
                        <TableCell>{log.activity}</TableCell>
                        <TableCell className="whitespace-nowrap">{log.timestamp}</TableCell>
                        <TableCell className="whitespace-nowrap"><Badge variant="secondary">{log.trigger}</Badge></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </ResponsiveTableWrapper>
        </CardContent>
      </Card>
    </div>
    )
}

const MeetTab = () => {
    return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Koneksi Akun Google</CardTitle>
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
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
                <div className="flex items-start justify-between">
                    <div>
                        <Label htmlFor="sync-kickoff" className="font-semibold">Jadwalkan Kickoff Otomatis</Label>
                        <p className="text-muted-foreground">Saat pesanan baru dikonfirmasi.</p>
                    </div>
                    <Switch id="sync-kickoff" defaultChecked={true} />
                </div>
                <div className="flex items-start justify-between">
                    <div>
                        <Label htmlFor="sync-consultation" className="font-semibold">Jadwalkan Konsultasi Revisi</Label>
                        <p className="text-muted-foreground">Saat revisi melebihi batas (misal: > 2x).</p>
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
        </CardHeader>
        <CardContent>
            <ResponsiveTableWrapper>
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
            </ResponsiveTableWrapper>
        </CardContent>
      </Card>
    </div>
  );
}

export default function GoogleIntegrationsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-headline">Integrasi Google</h1>
        <p className="text-muted-foreground">Kelola semua otomasi yang terhubung dengan akun Google Workspace Anda.</p>
      </div>
      <Tabs defaultValue="drive" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="drive">Google Drive</TabsTrigger>
          <TabsTrigger value="calendar">Google Calendar</TabsTrigger>
          <TabsTrigger value="meet">Google Meet</TabsTrigger>
        </TabsList>
        <TabsContent value="drive" className="mt-6">
            <DriveTab />
        </TabsContent>
        <TabsContent value="calendar" className="mt-6">
            <CalendarTab />
        </TabsContent>
        <TabsContent value="meet" className="mt-6">
            <MeetTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
