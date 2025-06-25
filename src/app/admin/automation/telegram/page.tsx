'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from "@/hooks/use-toast";
import { Send, TestTube2 } from 'lucide-react';
import { sendTelegramUpdate } from '@/ai/flows/telegram-bot-integration';

const notificationSettings = [
  { id: 'order-confirmation', label: 'Konfirmasi Pesanan Baru', description: 'Kirim pesan saat pesanan baru berhasil dibuat.', defaultChecked: true },
  { id: 'payment-reminder', label: 'Pengingat Pembayaran', description: 'Kirim pengingat untuk pembayaran yang belum lunas.', defaultChecked: true },
  { id: 'work-started', label: 'Update Pengerjaan Dimulai', description: 'Beritahu klien saat pesanan mulai dikerjakan.', defaultChecked: false },
  { id: 'preview-ready', label: 'Notifikasi Pratinjau Siap', description: 'Kirim link pratinjau saat hasil awal siap direview.', defaultChecked: true },
  { id: 'order-completed', label: 'Notifikasi Pesanan Selesai', description: 'Beritahu klien saat pesanan selesai dan file final dikirim.', defaultChecked: true },
];

export default function TelegramAutomationPage() {
    const { toast } = useToast();
    const [testTelegramId, setTestTelegramId] = useState('');
    const [isTesting, setIsTesting] = useState(false);

    const handleTestMessage = async () => {
        if (!testTelegramId) {
            toast({
                title: 'ID Telegram dibutuhkan',
                description: 'Mohon masukkan ID Telegram untuk pengujian.',
                variant: 'destructive',
            });
            return;
        }

        setIsTesting(true);
        try {
            const result = await sendTelegramUpdate({
                telegramId: testTelegramId,
                orderId: '#TEST-001',
                updateMessage: 'Ini adalah pesan tes dari integrasi bot Telegram DesignFlow Studio.',
            });

            if (result.success) {
                toast({
                    title: 'Pesan Tes Terkirim!',
                    description: `Pesan berhasil dikirim ke ID ${testTelegramId}.`,
                });
            } else {
                throw new Error('Simulated API call failed.');
            }
        } catch (error) {
            toast({
                title: 'Gagal Mengirim Pesan',
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
                <h1 className="text-2xl md:text-3xl font-bold font-headline">Otomasi Telegram</h1>
                <p className="text-muted-foreground">Kelola notifikasi otomatis dan pengaturan bot Telegram Anda.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Pengaturan Bot</CardTitle>
                            <CardDescription>Masukkan informasi bot Telegram Anda di sini.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="bot-token">Bot Token</Label>
                                <Input id="bot-token" type="password" placeholder="••••••••••••••••••••••••••" defaultValue="SECRET_BOT_TOKEN" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="admin-chat-id">Admin Chat ID</Label>
                                <Input id="admin-chat-id" placeholder="Contoh: 123456789" defaultValue="ADMIN_CHAT_ID" />
                                <p className="text-xs text-muted-foreground">ID ini akan menerima notifikasi untuk admin.</p>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Simpan Pengaturan</Button>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Notifikasi Otomatis</CardTitle>
                            <CardDescription>Pilih notifikasi mana yang ingin Anda aktifkan untuk dikirim ke klien.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {notificationSettings.map((setting) => (
                                <div key={setting.id} className="flex items-start justify-between">
                                    <div className="max-w-md">
                                        <Label htmlFor={`switch-${setting.id}`} className="font-semibold">{setting.label}</Label>
                                        <p className="text-sm text-muted-foreground">{setting.description}</p>
                                    </div>
                                    <Switch
                                        id={`switch-${setting.id}`}
                                        defaultChecked={setting.defaultChecked}
                                        aria-label={`Activate ${setting.label}`}
                                    />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-1">
                    <Card className="sticky top-24">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><TestTube2 /> Uji Integrasi</CardTitle>
                            <CardDescription>Kirim pesan tes untuk memastikan bot berjalan dengan baik.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="test-telegram-id">ID Telegram Klien</Label>
                                <Input 
                                    id="test-telegram-id" 
                                    placeholder="@username atau ID" 
                                    value={testTelegramId}
                                    onChange={(e) => setTestTelegramId(e.target.value)}
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" onClick={handleTestMessage} disabled={isTesting}>
                                {isTesting ? 'Mengirim...' : <><Send className="mr-2 h-4 w-4" /> Kirim Pesan Tes</>}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
