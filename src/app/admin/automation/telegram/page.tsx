'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Bot, MessageSquare, Settings, Flame } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SettingsTab = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Settings /> Pengaturan & Verifikasi Bot</CardTitle>
                <CardDescription>Pengaturan token bot dan verifikasi koneksi akan muncul di sini.</CardDescription>
            </CardHeader>
            <CardContent>
                <Alert>
                    <Flame className="h-4 w-4" />
                    <AlertTitle>Dalam Pengembangan</AlertTitle>
                    <AlertDescription>
                        Fitur pengaturan dan verifikasi bot Telegram sedang dipersiapkan.
                    </AlertDescription>
                </Alert>
            </CardContent>
        </Card>
    );
}

const SimulationTab = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Bot /> Simulasi Respons Bot</CardTitle>
                <CardDescription>Fitur untuk menguji coba respons bot akan muncul di sini.</CardDescription>
            </CardHeader>
            <CardContent>
                <Alert>
                    <Flame className="h-4 w-4" />
                    <AlertTitle>Dalam Pengembangan</AlertTitle>
                    <AlertDescription>
                        Fitur simulasi respons bot Telegram sedang dipersiapkan.
                    </AlertDescription>
                </Alert>
            </CardContent>
        </Card>
    );
}

const MessagingTab = () => {
  return (
      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><MessageSquare /> Template Pesan Bot</CardTitle>
            <CardDescription>Pengelolaan template pesan otomatis bot akan muncul di sini.</CardDescription>
        </CardHeader>
        <CardContent>
            <Alert>
                <Flame className="h-4 w-4" />
                <AlertTitle>Dalam Pengembangan</AlertTitle>
                <AlertDescription>
                    Fitur pengelolaan template pesan bot Telegram sedang dipersiapkan.
                </AlertDescription>
            </Alert>
        </CardContent>
      </Card>
  );
};

export default function TelegramAutomationPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold font-headline">Integrasi & Simulasi Telegram</h1>
                <p className="text-muted-foreground">Kelola koneksi bot, pengaturan, dan uji coba respons dari satu tempat terpusat.</p>
            </div>
            <Tabs defaultValue="settings" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="settings">Pengaturan & Verifikasi</TabsTrigger>
                  <TabsTrigger value="simulation">Simulasi Respons</TabsTrigger>
                  <TabsTrigger value="messaging">Template Pesan</TabsTrigger>
                </TabsList>
                <TabsContent value="settings" className="mt-6">
                    <SettingsTab />
                </TabsContent>
                <TabsContent value="simulation" className="mt-6">
                    <SimulationTab />
                </TabsContent>
                <TabsContent value="messaging" className="mt-6">
                    <MessagingTab />
                </TabsContent>
            </Tabs>
        </div>
    );
}
