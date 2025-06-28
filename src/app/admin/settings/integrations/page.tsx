'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Send, Folder, Video, Calendar, CheckCircle, XCircle, KeyRound, Info, Search, AlertTriangle } from 'lucide-react';

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
    href: '/admin/automation/google',
  },
  {
    id: 'google-meet',
    title: 'Google Meet',
    description: 'Jadwalkan meeting konsultasi otomatis untuk customer dengan revisi berlebih.',
    icon: Video,
    connected: true,
    href: '/admin/automation/google',
  },
  {
    id: 'google-calendar',
    title: 'Google Calendar',
    description: 'Sinkronkan jadwal meeting dan deadline project langsung ke kalender Anda.',
    icon: Calendar,
    connected: true,
    href: '/admin/automation/google',
  },
];

export default function AdminIntegrationsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-headline">Kelola Integrasi & Deployment</h1>
        <p className="text-muted-foreground">Hubungkan layanan pihak ketiga dan pahami langkah-langkah untuk mempublikasikan aplikasi Anda.</p>
      </div>
      
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Kendala Umum: Persyaratan Penagihan (Billing)</AlertTitle>
        <AlertDescription>
            <p>Untuk menggunakan fitur canggih seperti **Secret Manager** (brankas digital untuk kunci API), Google Cloud mewajibkan adanya akun penagihan yang terverifikasi (biasanya dengan kartu kredit). Ini adalah standar industri untuk verifikasi identitas dan pencegahan penyalahgunaan.</p>
            <p className="mt-2"><strong>Jangan khawatir, ini tidak berarti Anda akan ditagih.</strong> Layanan yang kita gunakan memiliki kuota gratis yang sangat besar. Namun, jika Anda tidak memiliki kartu kredit, Anda tidak akan bisa menyelesaikan langkah "Panduan Deployment" di bawah ini.</p>
            <p className="mt-2"><strong>Solusi:</strong> Fokus untuk membuat semua fitur berjalan sempurna di komputer Anda dengan menyimpan semua kunci di file <code>.env</code>. Aplikasi akan berfungsi penuh untuk pengujian. Panduan di bawah ini adalah untuk masa depan, jika Anda sudah siap untuk go-live.</p>
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="md:col-span-2 border-primary">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <KeyRound className="h-6 w-6 text-primary" /> Panduan Deployment (Jika Sudah Siap Go-Live)
                </CardTitle>
                <CardDescription>
                    Langkah-langkah ini **hanya diperlukan saat Anda siap mempublikasikan aplikasi** dan sudah memiliki akun penagihan di Google Cloud.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <ol className="list-decimal list-inside space-y-4 text-sm pt-4">
                    <li>
                        Buka Google Cloud Console menggunakan tombol di bawah.
                        <div className="mt-2 p-3 border rounded-md bg-muted/50">
                          <p>Cara termudah untuk menemukan layanan adalah dengan <strong>menggunakan bar pencarian di bagian atas halaman</strong>.</p>
                          <p className="mt-1">Ketik <code className="bg-muted px-1 py-0.5 rounded">Secret Manager</code> di bar pencarian, lalu pilih dari hasil yang muncul.</p>
                        </div>
                    </li>
                    <li>
                        Di halaman Secret Manager, klik <strong>+ CREATE SECRET</strong>.
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
                        Ulangi proses ini untuk kunci rahasia lainnya:
                        <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
                            <li>Nama: <code>DRIVE_PARENT_FOLDER_ID</code>, Nilai: ID folder utama Drive Anda.</li>
                            <li>Nama: <code>TELEGRAM_BOT_TOKEN</code>, Nilai: Token bot Telegram Anda.</li>
                            <li>Nama: <code>GEMINI_API_KEY</code>, Nilai: Kunci API Gemini Anda (jika ada).</li>
                        </ul>
                    </li>
                     <li>
                        <strong>Penting (Izin Akses):</strong> Setelah membuat secret, berikan izin kepada service account App Hosting untuk mengaksesnya. Klik nama secret, pergi ke tab <strong>Permissions</strong>, klik <strong>+ GRANT ACCESS</strong>, dan tambahkan service account App Hosting Anda (biasanya bernama <code>service-PROJECT_NUMBER@gcp-sa-apphosting.iam.gserviceaccount.com</code>) dengan peran <strong>Secret Manager Secret Accessor</strong>. Lakukan ini untuk semua secret.
                    </li>
                </ol>
            </CardContent>
            <CardFooter>
                <Button asChild className="w-full">
                    <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer">
                        <Search className="mr-2 h-4 w-4" /> Buka Google Cloud Console
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
