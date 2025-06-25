
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from "@/hooks/use-toast";
import { Send, TestTube2, Save, Terminal, CheckCircle, XCircle, Loader2, RefreshCw, Webhook } from 'lucide-react';
import { sendTelegramUpdate } from '@/ai/flows/telegram-bot-integration';
import { verifyTelegramBot } from '@/ai/flows/verify-telegram-bot';

type BotStatus = 'idle' | 'checking' | 'approved' | 'rejected';

const StatusIndicator = ({ status, message }: { status: BotStatus; message: string }) => {
    if (status === 'idle') {
        return null;
    }

    const Icon = status === 'checking' ? <Loader2 className="h-4 w-4 animate-spin" /> :
                   status === 'approved' ? <CheckCircle className="h-4 w-4" /> :
                   <XCircle className="h-4 w-4" />;

    const textColor = status === 'checking' ? 'text-muted-foreground' :
                      status === 'approved' ? 'text-green-600' :
                      'text-destructive';

    return (
        <div className="flex flex-col gap-2 flex-grow">
            <div className={`flex items-center gap-2 text-sm ${textColor}`}>
                {Icon}
                <span>{message}</span>
            </div>
        </div>
    );
};

export default function TelegramAutomationPage() {
    const { toast } = useToast();
    const [adminChatId, setAdminChatId] = useState('');
    const [testTelegramId, setTestTelegramId] = useState('');
    const [isTesting, setIsTesting] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [webhookUrl, setWebhookUrl] = useState('');
    const [botStatus, setBotStatus] = useState<BotStatus>('idle');
    const [botStatusMessage, setBotStatusMessage] = useState('');

    const handleVerifyBot = useCallback(async () => {
        setBotStatus('checking');
        setBotStatusMessage('Memeriksa token bot...');
        try {
            const result = await verifyTelegramBot();
            if (result.success && result.botName) {
                setBotStatus('approved');
                setBotStatusMessage(`Bot direstui: @${result.botName}`);
            } else {
                setBotStatus('rejected');
                setBotStatusMessage(`Bot tidak direstui: ${result.error || 'Token tidak valid.'}`);
            }
        } catch (e: any) {
             setBotStatus('rejected');
             setBotStatusMessage(`Gagal verifikasi: ${e.message}`);
        }
    }, []);
    
    const handleSaveSettings = useCallback(() => {
        setIsSaving(true);
        localStorage.setItem('telegramAdminChatId', adminChatId);
        toast({
            title: 'Pengaturan Disimpan!',
            description: 'ID Chat Admin telah disimpan di browser Anda.',
        });
        setTimeout(() => setIsSaving(false), 1000);
    }, [adminChatId, toast]);

    const handleTestMessage = useCallback(async () => {
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
    }, [testTelegramId, toast]);
    
    useEffect(() => {
        const origin = typeof window !== 'undefined' ? window.location.origin : '';
        setWebhookUrl(`${origin}/api/telegram/webhook`);
        handleVerifyBot();
        
        const savedAdminId = localStorage.getItem('telegramAdminChatId');
        if (savedAdminId) {
            setAdminChatId(savedAdminId);
        }
    }, [handleVerifyBot]);

    useEffect(() => {
        setTestTelegramId(adminChatId);
    }, [adminChatId]);
    
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
                            <CardTitle>Panduan Pengaturan Bot</CardTitle>
                            <CardDescription>Ikuti 3 langkah berikut untuk menghubungkan bot Anda.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <Alert>
                              <Terminal className="h-4 w-4" />
                              <AlertTitle>Langkah 1: Atur Token Bot</AlertTitle>
                              <AlertDescription>
                                Token adalah identitas unik untuk bot Anda. Masukkan token dari BotFather ke file `.env` di proyek Anda.
                                <code className="block bg-muted text-foreground p-2 rounded-md my-2 text-sm">TELEGRAM_BOT_TOKEN="TOKEN_ANDA_DISINI"</code>
                                Setelah disimpan, klik tombol "Verifikasi Token" di bawah untuk memastikan token valid.
                              </AlertDescription>
                            </Alert>

                            <Alert variant="destructive">
                              <Webhook className="h-4 w-4" />
                              <AlertTitle>Langkah 2: Atur Webhook (WAJIB!)</AlertTitle>
                              <AlertDescription>
                                Webhook adalah "jembatan" yang menghubungkan Telegram ke aplikasi Anda. **Bot Anda tidak akan bisa merespons pesan apapun (termasuk `/start`) sebelum langkah ini selesai.**
                                <ol className="list-decimal list-inside my-2 space-y-1">
                                  <li>Salin token bot Anda dari file <strong>.env</strong>.</li>
                                  <li>Ganti <code>[TOKEN_BOT_ANDA]</code> pada URL di bawah ini dengan token yang sudah Anda salin.</li>
                                  <li>Kunjungi URL lengkap tersebut di tab browser baru (cukup sekali).</li>
                                </ol>
                                <code className="block bg-muted text-destructive-foreground p-2 rounded-md my-2 text-sm break-all">
                                  https://api.telegram.org/bot[TOKEN_BOT_ANDA]/setWebhook?url={webhookUrl}
                                </code>
                                Jika berhasil, browser akan menampilkan pesan: `{"ok":true,"result":true,"description":"Webhook was set"}`.
                              </AlertDescription>
                            </Alert>

                             <div className="space-y-2">
                                <Label htmlFor="admin-chat-id">Langkah 3: Masukkan Admin Chat ID Anda</Label>
                                <Input 
                                    id="admin-chat-id" 
                                    placeholder="Dapatkan dari bot setelah Langkah 2 berhasil" 
                                    value={adminChatId}
                                    onChange={(e) => setAdminChatId(e.target.value)}
                                />
                                <p className="text-xs text-muted-foreground">
                                    Ini adalah "alamat" Telegram pribadi Anda agar bot bisa mengirim notifikasi khusus admin kepada Anda.
                                    <br />
                                    <strong>Cara mendapatkan:</strong> Setelah Langkah 1 & 2 selesai, kirim pesan <code>/start</code> ke bot Anda. Bot akan membalas dengan Chat ID Anda.
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
                               Verifikasi Token
                            </Button>
                           </div>
                           <StatusIndicator status={botStatus} message={botStatusMessage} />
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

const notificationSettings = [
  { id: 'order-confirmation', label: 'Konfirmasi Pesanan Baru', description: 'Kirim pesan saat pesanan baru berhasil dibuat.', defaultChecked: true },
  { id: 'payment-reminder', label: 'Pengingat Pembayaran', description: 'Kirim pengingat untuk pembayaran yang belum lunas.', defaultChecked: true },
  { id: 'work-started', label: 'Update Pengerjaan Dimulai', description: 'Beritahu klien saat pesanan mulai dikerjakan.', defaultChecked: false },
  { id: 'preview-ready', label: 'Notifikasi Pratinjau Siap', description: 'Kirim link pratinjau saat hasil awal siap direview.', defaultChecked: true },
  { id: 'order-completed', label: 'Notifikasi Pesanan Selesai', description: 'Beritahu klien saat pesanan selesai dan file final dikirim.', defaultChecked: true },
];

    