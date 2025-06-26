'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Send, Folder, Video, Calendar, CheckCircle, XCircle, KeyRound } from 'lucide-react';

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
        <Card className="md:col-span-2 border-primary">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <KeyRound className="h-6 w-6 text-primary" /> Panduan Deployment: Menyimpan Kunci Rahasia (Secret)
                </CardTitle>
                <CardDescription>
                    Agar integrasi Google Drive & Telegram berfungsi saat aplikasi dipublikasikan, simpan variabel dari file <code>.env</code> Anda di Firebase Secret Manager.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <ol className="list-decimal list-inside space-y-4 text-sm">
                    <li>
                        Buka halaman <strong>Secret Manager</strong> di Google Cloud Console menggunakan tombol di bawah. Pastikan proyek yang terpilih sudah benar.
                    </li>
                    <li>
                        Klik <strong>+ CREATE SECRET</strong> di bagian atas.
                    </li>
                    <li>
                        Untuk nama Secret, masukkan persis: <code>DRIVE_SERVICE_ACCOUNT_JSON</code>.
                        <div className="mt-2 p-3 border rounded-md bg-muted/50">
                            <p>Di bagian <strong>Secret value</strong>, salin dan tempel <strong>seluruh isi</strong> file JSON service account Anda (mulai dari <code>{'{'}</code> hingga <code>{'}'}</code>).</p>
                        </div>
                    </li>
                    <li>
                        Biarkan pengaturan lain sebagai default dan klik <strong>Create secret</strong>.
                    </li>
                    <li>
                        Ulangi proses ini untuk kunci lainnya. Buat secret baru dengan nama dan nilai berikut:
                        <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
                            <li>Nama: <code>DRIVE_PARENT_FOLDER_ID</code>, Nilai: ID folder utama Drive Anda.</li>
                            <li>Nama: <code>TELEGRAM_BOT_TOKEN</code>, Nilai: Token bot Telegram Anda.</li>
                        </ul>
                    </li>
                     <li>
                        <strong>Penting (Izin Akses):</strong> Setelah membuat secret, Anda harus memberikan izin kepada service account App Hosting untuk mengaksesnya. Klik pada nama secret yang baru dibuat, pergi ke tab <strong>Permissions</strong>, klik <strong>+ GRANT ACCESS</strong>, dan tambahkan service account App Hosting Anda (biasanya bernama <code>service-PROJECT_NUMBER@gcp-sa-apphosting.iam.gserviceaccount.com</code>) dengan peran <strong>Secret Manager Secret Accessor</strong>. Lakukan ini untuk semua secret yang Anda buat.
                    </li>
                </ol>
            </CardContent>
            <CardFooter>
                <Button asChild className="w-full">
                    <a href="https://console.cloud.google.com/security/secret-manager" target="_blank" rel="noopener noreferrer">
                        Buka Firebase Secret Manager
                    </a>
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
