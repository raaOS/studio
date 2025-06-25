'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from "@/hooks/use-toast";
import { Send, TestTube2, Save, Terminal, CheckCircle, XCircle, Loader2, RefreshCw } from 'lucide-react';
import { sendTelegramUpdate } from '@/ai/flows/telegram-bot-integration';
import { verifyTelegramBot } from '@/ai/flows/verify-telegram-bot';

const notificationSettings = [
  { id: 'order-confirmation', label: 'Konfirmasi Pesanan Baru', description: 'Kirim pesan saat pesanan baru berhasil dibuat.', defaultChecked: true },
  { id: 'payment-reminder', label: 'Pengingat Pembayaran', description: 'Kirim pengingat untuk pembayaran yang belum lunas.', defaultChecked: true },
  { id: 'work-started', label: 'Update Pengerjaan Dimulai', description: 'Beritahu klien saat pesanan mulai dikerjakan.', defaultChecked: false },
  { id: 'preview-ready', label: 'Notifikasi Pratinjau Siap', description: 'Kirim link pratinjau saat hasil awal siap direview.', defaultChecked: true },
  { id: 'order-completed', label: 'Notifikasi Pesanan Selesai', description: 'Beritahu klien saat pesanan selesai dan file final dikirim.', defaultChecked: true },
];

export default function TelegramAutomationPage() {
    const { toast } = useToast();
    const [adminChatId, setAdminChatId] = useState('');
    const [testTelegramId, setTestTelegramId] = useState('');
    const [isTesting, setIsTesting] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const [botStatus, setBotStatus] = useState<'idle' | 'checking' | 'approved' | 'rejected'>('idle');
    const [botStatusMessage, setBotStatusMessage] = useState('');

    const handleVerifyBot = async () => {
        setBotStatus('checking');
        setBotStatusMessage('Memeriksa token bot...');
        try {
            const result = await verifyTelegramBot();
            if (result.success) {
                setBotStatus('approved');
                setBotStatusMessage(`Bot direstui: @${result.botName}`);
            } else {
                setBotStatus('rejected');
                setBotStatusMessage(`Bot tidak direstui: ${result.error}`);
            }
        } catch (e: any) {
             setBotStatus('rejected');
             setBotStatusMessage(`Gagal verifikasi: ${e.message}`);
        }
    };
    
    useEffect(() => {
        handleVerifyBot();
    }, []);

    useEffect(() => {
        const savedAdminId = localStorage.getItem('telegramAdminChatId') ?? '6116803120';
        setAdminChatId(savedAdminId);
    }, []);

    useEffect(() => {
        setTestTelegramId(adminChatId);
    }, [adminChatId]);
    
    const handleSaveSettings = () => {
        setIsSaving(true);
        localStorage.setItem('telegramAdminChatId', adminChatId);
        toast({
            title: 'Pengaturan Disimpan!',
            description: 'ID Chat Admin telah disimpan di browser Anda.',
        });
        setTimeout(() => setIsSaving(false), 1000);
    };

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
                message: 'Ini adalah pesan tes dari integrasi bot Telegram Urgent Studio.',
            });

            if (result.success) {
                toast({
                    title: 'Pesan Tes Terkirim!',
                    description: `Pesan berhasil dikirim ke ID ${testTelegramId}.`,
                });
            } else {
                toast({
                    title: 'Gagal Mengirim Pesan',
                    description: result.error || 'Terjadi kesalahan. Pastikan Token Bot sudah benar di file .env, dan Anda sudah memulai chat dengan bot.',
                    variant: 'destructive',
                });
            }
        } catch (error: any) {
            toast({
                title: 'Gagal Mengirim Pesan',
                description: error.message || 'Terjadi kesalahan. Pastikan Token Bot sudah benar di file .env, dan Anda sudah memulai chat dengan bot.',
                variant: 'destructive',
            });
        } finally {
            setIsTesting(false);
        }
    };
    
    const StatusIndicator = () => {
        let indicator = null;

        if (botStatus === 'checking') {
            indicator = (
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>{botStatusMessage}</span>
                </div>
            );
        } else if (botStatus === 'approved') {
            indicator = (
                <div className="flex items-center gap-2 text-green-600 text-sm">
                <CheckCircle className="h-4 w-4" />
                <span>{botStatusMessage}</span>
                </div>
            );
        } else if (botStatus === 'rejected') {
            indicator = (
                <div className="flex items-center gap-2 text-destructive text-sm">
                <XCircle className="h-4 w-4" />
                <span>{botStatusMessage}</span>
                </div>
            );
        }

        return (
            <div className="flex flex-col gap-2 flex-grow">
                {indicator}
            </div>
        );
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
                            <Alert>
                              <Terminal className="h-4 w-4" />
                              <AlertTitle>Pengaturan Token Bot</AlertTitle>
                              <AlertDescription>
                                Untuk keamanan, Token Bot Telegram sekarang diatur melalui environment variable. Tambahkan baris berikut ke file `.env` Anda:
                                <code className="block bg-muted text-foreground p-2 rounded-md my-2 text-sm">TELEGRAM_BOT_TOKEN="TOKEN_ANDA_DISINI"</code>
                                Hubungi developer jika Anda tidak memiliki akses ke file ini.
                              </AlertDescription>
                            </Alert>
                             <div className="space-y-2">
                                <Label htmlFor="admin-chat-id">Admin Chat ID</Label>
                                <Input 
                                    id="admin-chat-id" 
                                    placeholder="Contoh: 123456789" 
                                    value={adminChatId}
                                    onChange={(e) => setAdminChatId(e.target.value)}
                                />
                                <p className="text-xs text-muted-foreground">
                                    Ini adalah Chat ID pribadi Anda dengan bot. Bot akan menggunakan ID ini untuk mengirim notifikasi penting khusus untuk admin. Untuk mendapatkannya, kirim pesan <strong>/start</strong> ke bot Anda di Telegram, lalu salin Chat ID yang ditampilkan di pesan balasan.
                                </p>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-wrap items-center justify-between gap-4">
                           <div className="flex gap-2">
                             <Button onClick={handleSaveSettings} disabled={isSaving}>
                                {isSaving ? 'Menyimpan...' : <><Save className="mr-2 h-4 w-4" /> Simpan ID Admin</>}
                            </Button>
                            <Button variant="outline" onClick={handleVerifyBot} disabled={botStatus === 'checking'}>
                               <RefreshCw className={`mr-2 h-4 w-4 ${botStatus === 'checking' ? 'animate-spin' : ''}`} />
                               Verifikasi
                            </Button>
                           </div>
                           <StatusIndicator />
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
                                <Label htmlFor="test-telegram-id">ID Telegram Tujuan</Label>
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
