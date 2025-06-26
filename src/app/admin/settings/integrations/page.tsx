'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Send, Folder, Video, Calendar, CheckCircle, XCircle, Flame, Database, Copy } from 'lucide-react';

const integrations = [
  {
    id: 'telegram',
    title: 'Telegram Bot',
    description: 'Kirim notifikasi order, pengingat pembayaran, dan handle revisi otomatis.',
    icon: Send,
    connected: true,
    href: '/admin/automation/telegram',
  },
  {
    id: 'google-drive',
    title: 'Google Drive',
    description: 'Buat folder project otomatis untuk setiap pesanan dan kelola file dengan mudah.',
    icon: Folder,
    connected: true,
    href: '/admin/automation/drive',
  },
  {
    id: 'google-meet',
    title: 'Google Meet',
    description: 'Jadwalkan meeting konsultasi otomatis untuk customer dengan revisi berlebih.',
    icon: Video,
    connected: true,
    href: '/admin/automation/meet',
  },
  {
    id: 'google-calendar',
    title: 'Google Calendar',
    description: 'Sinkronkan jadwal meeting dan deadline project langsung ke kalender Anda.',
    icon: Calendar,
    connected: true,
    href: '/admin/automation/calendar',
  },
];

export default function AdminIntegrationsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-headline">Kelola Integrasi</h1>
        <p className="text-muted-foreground">Hubungkan Urgent Studio dengan layanan pihak ketiga untuk otomasi alur kerja Anda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="md:col-span-2">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Flame className="h-6 w-6 text-orange-500" /> Panduan Mencari URL Firebase</CardTitle>
                <CardDescription>Jika Anda tidak bisa menemukan URL Realtime Database, ikuti panduan visual ini.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <ol className="list-decimal list-inside space-y-4 text-sm">
                    <li>
                        Buka Firebase Console dan pilih proyek Anda. Di menu kiri, di bawah kategori <strong>Build</strong>, klik <strong>Realtime Database</strong>.
                        <div className="mt-2 p-3 border rounded-md bg-muted/50 flex gap-4">
                            <div className="w-1/3 border-r pr-3">
                                <p className="text-xs font-semibold text-muted-foreground mb-2">MENU KIRI</p>
                                <div className="space-y-1">
                                    <p className="font-semibold text-foreground">Build</p>
                                    <div className="pl-2 space-y-1">
                                        <p>Authentication</p>
                                        <p>App Check</p>
                                        <p>Firestore Database</p>
                                        <p className="p-1 rounded-md bg-primary/20 text-primary font-bold flex items-center gap-1">
                                            <Database className="h-4 w-4" />
                                            Realtime Database
                                        </p>
                                        <p>Storage</p>
                                        <p>Hosting</p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-2/3">
                                 <p className="text-xs font-semibold text-muted-foreground mb-2">HALAMAN UTAMA</p>
                                 <p>Anda akan diarahkan ke halaman utama Realtime Database.</p>
                            </div>
                        </div>
                    </li>
                    <li>
                        URL database Anda akan terlihat di bagian atas halaman, tepat di bawah tab "Data".
                         <div className="mt-2 p-3 border rounded-md bg-muted/50">
                            <div className="flex items-center gap-2 bg-background p-2 rounded-md border">
                                <Database className="h-4 w-4 text-muted-foreground" />
                                <code className="text-sm text-foreground bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                                    https://nama-proyek-anda-default-rtdb.region.firebasedatabase.app
                                </code>
                                <Button variant="ghost" size="icon" className="h-6 w-6"><Copy className="h-4 w-4" /></Button>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">Klik ikon salin di sebelahnya untuk menyalin URL.</p>
                        </div>
                    </li>
                </ol>
            </CardContent>
            <CardFooter>
                <Button asChild className="w-full">
                    <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer">Buka Firebase Console</a>
                </Button>
            </CardFooter>
        </Card>

        {integrations.map((integration) => (
          <Card key={integration.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <integration.icon className="h-10 w-10 text-primary" />
                  <div>
                    <CardTitle>{integration.title}</CardTitle>
                    <CardDescription>{integration.description}</CardDescription>
                  </div>
                </div>
                {integration.connected ? (
                   <Badge variant="outline" className="border-green-500/30 bg-green-500/20 text-green-700">
                        <CheckCircle className="mr-1 h-3 w-3" /> Terhubung
                   </Badge>
                ) : (
                    <Badge variant="destructive">
                        <XCircle className="mr-1 h-3 w-3" /> Terputus
                    </Badge>
                )}
              </div>
            </CardHeader>
            <CardFooter className="mt-auto bg-muted/50 p-4 border-t">
              <Button asChild variant="outline" className="w-full">
                <Link href={integration.href}>
                  {integration.connected ? 'Kelola Pengaturan' : 'Hubungkan Sekarang'}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
