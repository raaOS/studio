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
import { Switch } from '@/components/ui/switch';
import { mockDriveActivityLogs, mockCalendarActivityLogs, mockMeetActivityLogs } from '@/lib/data';
import { FolderSync, Save, TestTube2, Link as LinkIcon, FolderCog, CheckCircle, Video, CalendarDays, CalendarClock, Clock } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { createOrderFolder } from '@/ai/flows/create-drive-folder';
import type { DriveActivityLog } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


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
                <Button variant="outline" disabled><Save className="mr-2 h-4 w-4" /> Simpan Pengaturan (Simulasi)</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-8">
          <Card className="sticky top-24">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><TestTube2 /> Uji Integrasi</CardTitle>
                <CardDescription>Uji koneksi Anda dengan membuat folder tes.</CardDescription>
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
