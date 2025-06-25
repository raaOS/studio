'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { verifyTelegramBot } from '@/ai/flows/verify-telegram-bot';
import { sendTelegramUpdate } from '@/ai/flows/telegram-bot-integration';
import { Bot, CheckCircle, XCircle, Loader2, Send, Copy, AlertTriangle } from 'lucide-react';
import type { VerifyTelegramBotOutput } from '@/ai/flows/verify-telegram-bot';

type VerificationStatus = 'idle' | 'loading' | 'success' | 'error';
type SendStatus = 'idle' | 'loading' | 'success' | 'error';

export default function TelegramAutomationPage() {
  const { toast } = useToast();
  const [botToken, setBotToken] = useState('');
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>('idle');
  const [botInfo, setBotInfo] = useState<VerifyTelegramBotOutput | null>(null);
  
  const [testChatId, setTestChatId] = useState('');
  const [sendStatus, setSendStatus] = useState<SendStatus>('idle');
  
  const handleVerifyToken = async () => {
    if (!botToken) {
      toast({
        title: 'Token Dibutuhkan',
        description: 'Mohon masukkan Token Bot Anda untuk verifikasi.',
        variant: 'destructive',
      });
      return;
    }
    setVerificationStatus('loading');
    setBotInfo(null);
    try {
      const result = await verifyTelegramBot({ botToken });
      setBotInfo(result);
      if (result.success) {
        setVerificationStatus('success');
        toast({
          title: 'Verifikasi Berhasil!',
          description: `Bot dengan username @${result.botName} berhasil terhubung.`,
        });
      } else {
        setVerificationStatus('error');
        toast({
          title: 'Verifikasi Gagal',
          description: result.error || 'Token tidak valid atau terjadi kesalahan.',
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      setVerificationStatus('error');
      setBotInfo({ success: false, error: error.message || 'Terjadi kesalahan jaringan.' });
      toast({
        title: 'Error',
        description: error.message || 'Gagal menghubungi server.',
        variant: 'destructive',
      });
    }
  };

  const handleSendTestMessage = async () => {
    if (!testChatId) {
      toast({
        title: 'Chat ID Dibutuhkan',
        description: 'Mohon masukkan Chat ID tujuan untuk mengirim pesan tes.',
        variant: 'destructive',
      });
      return;
    }
    setSendStatus('loading');
    try {
      const result = await sendTelegramUpdate({
        botToken,
        telegramId: testChatId,
        message: `✅ Pesan tes dari Urgent Studio! Jika Anda menerima ini, bot Anda telah terkonfigurasi dengan benar.`,
      });

      if (result.success) {
        setSendStatus('success');
        toast({
          title: 'Pesan Terkirim!',
          description: `Pesan tes berhasil dikirim ke Chat ID ${testChatId}.`,
        });
      } else {
        setSendStatus('error');
         toast({
            title: 'Gagal Mengirim Pesan',
            description: result.error || 'Terjadi kesalahan. Pastikan Chat ID benar.',
            variant: 'destructive',
        });
      }
    } catch (error: any) {
      setSendStatus('error');
      toast({
        title: 'Error',
        description: error.message || 'Gagal menghubungi server.',
        variant: 'destructive',
      });
    }
  };
  
  const copyWebhookUrl = () => {
    // In a real deployed app, this would be the actual URL.
    const webhookUrl = `${window.location.origin}/api/telegram/webhook`;
    navigator.clipboard.writeText(`https://api.telegram.org/bot${botToken}/setWebhook?url=${webhookUrl}`);
    toast({
      title: 'URL Webhook Disalin!',
      description: 'Tempelkan di browser Anda untuk mengatur webhook.',
    });
  };

  const StatusIndicator = ({ status, botInfo }: { status: VerificationStatus, botInfo: VerifyTelegramBotOutput | null }) => {
    if (status === 'loading') {
      return <Badge variant="outline" className="text-blue-600 border-blue-600/30"><Loader2 className="mr-1 h-3 w-3 animate-spin" /> Memverifikasi...</Badge>;
    }
    if (status === 'success' && botInfo?.success) {
      return <Badge variant="outline" className="text-green-700 bg-green-500/20 border-green-500/30"><CheckCircle className="mr-1 h-3 w-3" /> Terhubung sebagai @{botInfo.botName}</Badge>;
    }
    if (status === 'error') {
      return <Badge variant="destructive"><XCircle className="mr-1 h-3 w-3" /> Gagal: {botInfo?.error?.substring(0, 30)}...</Badge>;
    }
    return <Badge variant="secondary">Menunggu verifikasi</Badge>;
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-headline">Otomasi Telegram</h1>
        <p className="text-muted-foreground">Kelola notifikasi otomatis dan pengaturan bot Telegram Anda.</p>
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Catatan Penting</AlertTitle>
        <AlertDescription>
          Untuk fungsionalitas penuh (seperti notifikasi otomatis dari pesanan), Anda tetap harus menyimpan <strong>Token Bot</strong> di file <code>.env</code> dengan nama variabel <code>TELEGRAM_BOT_TOKEN</code>. Halaman ini hanya untuk verifikasi dan pengujian.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Bot /> Pengaturan Bot</CardTitle>
            <CardDescription>Masukkan token bot Anda untuk verifikasi dan pengujian.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bot-token">Token Bot</Label>
              <Input 
                id="bot-token"
                type="password"
                placeholder="123456:ABC-DEF..."
                value={botToken}
                onChange={(e) => setBotToken(e.target.value)}
              />
            </div>
            <div>
              <Label>Status Koneksi</Label>
              <div className="mt-2">
                <StatusIndicator status={verificationStatus} botInfo={botInfo} />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col items-stretch gap-3">
             <Button className="w-full" onClick={handleVerifyToken} disabled={verificationStatus === 'loading'}>
              {verificationStatus === 'loading' ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Memverifikasi...</> : 'Verifikasi Token'}
            </Button>
            <Button className="w-full" variant="secondary" onClick={copyWebhookUrl} disabled={verificationStatus !== 'success'}>
                <Copy className="mr-2 h-4 w-4" /> Salin URL Webhook
            </Button>
            <p className="text-xs text-muted-foreground text-center">Setelah token terverifikasi, salin URL webhook dan buka di browser untuk mengaktifkan bot.</p>
          </CardFooter>
        </Card>

        <Card className={verificationStatus !== 'success' ? 'bg-muted/50 pointer-events-none opacity-60' : ''}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Send /> Uji Coba Kirim Pesan</CardTitle>
            <CardDescription>
              {verificationStatus !== 'success' 
                ? 'Verifikasi token terlebih dahulu untuk mengaktifkan fitur ini.'
                : 'Kirim pesan tes ke Chat ID Anda untuk memastikan bot berjalan.'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="chat-id">Chat ID Anda</Label>
              <Input 
                id="chat-id"
                placeholder="Dapatkan setelah mengirim /start ke bot Anda"
                value={testChatId}
                onChange={(e) => setTestChatId(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleSendTestMessage} disabled={sendStatus === 'loading' || verificationStatus !== 'success'}>
              {sendStatus === 'loading' ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Mengirim...</> : 'Kirim Pesan Tes'}
            </Button>
          </CardFooter>
        </Card>
      </div>

    </div>
  );
}
