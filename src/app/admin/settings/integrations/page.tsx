'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Send, Folder, Video, Calendar, CheckCircle, XCircle } from 'lucide-react';

const integrations = [
  {
    id: 'telegram',
    title: 'Telegram Bot',
    description: 'Kirim notifikasi order, pengingat pembayaran, dan handle revisi otomatis.',
    icon: Send,
    connected: true,
  },
  {
    id: 'google-drive',
    title: 'Google Drive',
    description: 'Buat folder project otomatis untuk setiap pesanan dan kelola file dengan mudah.',
    icon: Folder,
    connected: true,
  },
  {
    id: 'google-meet',
    title: 'Google Meet',
    description: 'Jadwalkan meeting konsultasi otomatis untuk customer dengan revisi berlebih.',
    icon: Video,
    connected: false,
  },
  {
    id: 'google-calendar',
    title: 'Google Calendar',
    description: 'Sinkronkan jadwal meeting dan deadline project langsung ke kalender Anda.',
    icon: Calendar,
    connected: true,
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
              <Button variant="outline" className="w-full">
                {integration.connected ? 'Kelola Pengaturan' : 'Hubungkan Sekarang'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
