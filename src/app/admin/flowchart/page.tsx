
'use client';

import React from 'react';
import { cn, getOrderStatusClass } from '@/lib/utils';
import { User, Shield, GitFork, Workflow, Check, X, RefreshCw, AlertTriangle, Play, Hourglass, Wallet, FileCheck, CircleDollarSign, CalendarClock, MessageCircleQuestion, Bot as BotIcon, MessageSquareWarning, Star, Receipt, FileX2, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { OrderStatus } from '@/lib/types';


// --- Chat Simulation Components ---

const ChatSimulation = ({ messages }: { messages: { from: 'user' | 'bot', text: string }[] }) => (
  <div className="space-y-3 p-2">
    {messages.map((message, index) => (
      <div key={index} className={cn("flex items-end gap-2", message.from === 'user' ? 'justify-end' : 'justify-start')}>
        {message.from === 'bot' && (
          <Avatar className="h-6 w-6">
            <AvatarFallback><BotIcon className="h-4 w-4"/></AvatarFallback>
          </Avatar>
        )}
        <div className={cn("max-w-[85%] rounded-lg p-2 text-xs shadow-sm", 
            message.from === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
        )}>
          {message.text}
        </div>
        {message.from === 'user' && (
          <Avatar className="h-6 w-6">
            <AvatarFallback><User className="h-4 w-4"/></AvatarFallback>
          </Avatar>
        )}
      </div>
    ))}
  </div>
);

const StatusBadgeWithDialog = ({ status, isFinal = false }: { status: OrderStatus, isFinal?: boolean }) => {
  const simulationMap: Partial<Record<OrderStatus, {from: 'user' | 'bot', text: string}[]>> = {
    'Menunggu Pembayaran': [{ from: 'bot', text: 'Pesanan #DSN-1234 diterima. Silakan lakukan pembayaran Rp 150.000 untuk melanjutkan.' }],
    'Menunggu Pengerjaan': [{ from: 'user', text: 'sudah bayar'}, { from: 'bot', text: 'Pembayaran untuk #DSN-1234 diterima. Pesanan Anda masuk antrian.' }],
    'Sedang Dikerjakan': [{ from: 'bot', text: 'Pesanan #DSN-1234 mulai dikerjakan oleh tim desainer kami!' }],
    'Menunggu Respon Klien': [{ from: 'bot', text: 'Pratinjau untuk #DSN-1234 siap! Balas "Setuju" atau "Revisi: [catatan]".' }],
    'Sedang Direvisi': [{ from: 'user', text: 'Revisi: Tolong ganti warna background jadi lebih gelap ya.' }, { from: 'bot', text: 'Baik, permintaan revisi diterima. Kami akan segera proses.' }],
    'Selesai': [
      { from: 'user', text: 'Oke, sudah bagus. Aku setuju.' },
      { from: 'bot', text: 'Siap! Pesanan #DSN-1234 kami anggap selesai. Ini link final untuk semua file desain Anda:\nhttps://drive.google.com/link-final' },
    ],
    'Eskalasi': [{ from: 'user', text: 'Revisi: Selain logo, tolong buatkan juga desain kartu namanya ya.' }, { from: 'bot', text: '⚠️ Potensi Perubahan Lingkup Kerja Terdeteksi! Tim kami akan meninjau permintaan ini.' }],
    'Menunggu Jadwal Meeting': [{ from: 'user', text: 'Revisi lagi dong, font-nya ganti.' }, { from: 'bot', text: 'Anda telah mencapai batas revisi. Kami akan menawarkan jadwal G-Meet untuk diskusi lebih lanjut.' }],
    'Dibatalkan (Pra-Desain)': [ // Changed from 'Dibatalkan'
      { from: 'user', text: '/batal' },
      { from: 'bot', text: '⚠️ Konfirmasi Pembatalan. Balas dengan format:\n/konfirmasi_batal BINTANG:[1-5] ALASAN:[Alasan singkat]' },
    ],
    'Selesai Otomatis (Tanpa Respon)': [{ from: 'bot', text: 'Karena tidak ada respon selama >3 hari, pesanan Anda #DSN-1234 kami tutup. Hubungi kami jika ada pertanyaan.'}],
    'Menunggu Pembayaran Re-Aktivasi': [{from: 'user', text: 'revisi lagi'}, { from: 'bot', text: 'Pesanan ini telah ditutup. Untuk membuka kembali, ada biaya re-aktivasi Rp 50.000. Balas "/bayar_aktivasi" untuk lanjut.' }],
    'Sedang Direvisi (Jalur Ekspres)': [{from: 'user', text: 'sudah bayar biaya aktivasi'}, {from: 'bot', text: 'Pembayaran diterima! Revisi Anda masuk jalur ekspres dan akan segera kami kerjakan.'}]
  };
  
  const messages = simulationMap[status];
  
  const badgeContent = (
      <Badge variant="outline" className={cn(getOrderStatusClass(status), messages && "cursor-pointer hover:ring-2 hover:ring-primary/50")}>
          {isFinal ? 'Status Final: ' : ''}{status}
      </Badge>
  );

  if (!messages) {
    return badgeContent;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {badgeContent}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md p-4">
        <DialogHeader>
          <DialogTitle>Contoh Percakapan: {status}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <ChatSimulation messages={messages} />
        </div>
      </DialogContent>
    </Dialog>
  );
};


// --- Flowchart UI Components ---
const FlowStep = ({ title, pj, icon, color, children, end = false }: { title: string, pj: string, icon: React.ElementType, color: string, children: React.ReactNode, end?: boolean }) => (
  <div className="relative pl-8">
    <div className="absolute left-0 top-0 flex h-full w-8 items-start justify-center">
      <div className={cn("flex h-8 w-8 items-center justify-center rounded-full", color)}>
        {React.createElement(icon, { className: "h-5 w-5" })}
      </div>
      {!end && <div className="absolute top-8 h-[calc(100%+1.5rem)] w-px bg-border -z-10" />}
    </div>
    <div className="ml-4 pb-6">
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-muted-foreground">PJ: {pj}</p>
      <div className="mt-2 text-sm text-foreground/80">{children}</div>
    </div>
  </div>
);

const FlowDecision = ({ text }: { text: string }) => (
    <div className="relative pl-8">
        <div className="absolute left-0 top-0 flex h-full w-8 items-start justify-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-dashed border-amber-500 bg-amber-500/10 text-amber-600">
                <GitFork className="h-5 w-5" />
            </div>
            <div className="absolute top-8 h-[calc(100%)] w-px bg-border -z-10" />
        </div>
        <div className="ml-4 flex h-8 items-center">
            <h4 className="font-semibold text-amber-600">{text}</h4>
        </div>
    </div>
);

const FlowBranch = ({ children }: { children: React.ReactNode }) => (
    <div className="relative pl-8">
      <div className="ml-4 space-y-6 border-l-2 border-dashed pl-8 py-4">{children}</div>
    </div>
);

const BranchPath = ({ title, icon, color, children }: { title: string, icon: React.ElementType, color: string, children: React.ReactNode }) => (
    <div className="relative">
        <div className={cn("absolute -left-[35px] top-1 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold", color)}>
            {React.createElement(icon, { className: "h-4 w-4" })}
        </div>
        <p className="font-semibold">{title}</p>
        <div className="text-sm text-muted-foreground">{children}</div>
    </div>
);

// --- Main Page Component ---
export default function FlowchartPage() {
    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold font-headline flex items-center gap-3">
                    <Workflow className="h-8 w-8" />
                    Alur Kerja Pesanan (Flowchart)
                </h1>
                <p className="text-muted-foreground mt-2">
                    Arahkan kursor atau klik pada badge status untuk melihat contoh percakapan bot yang relevan di setiap tahap.
                </p>
            </div>

            <div className="space-y-6">
                <FlowStep title="Pesanan Dibuat & Pembayaran" pj="Pelanggan & Sistem" icon={Wallet} color="bg-yellow-100 text-yellow-800">
                    <p>Pelanggan checkout di website, bot mengirim tagihan pembayaran.</p>
                    <div className="mt-2"><StatusBadgeWithDialog status='Menunggu Pembayaran' /></div>
                </FlowStep>
                
                <FlowStep title="Pembayaran Divalidasi" pj="Admin Finance" icon={FileCheck} color="bg-green-100 text-green-800">
                    <p>Admin memvalidasi pembayaran manual. Sistem mengubah status pesanan.</p>
                    <div className="mt-2"><StatusBadgeWithDialog status='Menunggu Pengerjaan' /></div>
                </FlowStep>

                <FlowStep title="Pengerjaan Desain Dimulai" pj="Desainer" icon={Play} color="bg-blue-100 text-blue-800">
                    <p>Desainer mengubah status. Bot memberi notifikasi ke pelanggan.</p>
                    <div className="mt-2"><StatusBadgeWithDialog status='Sedang Dikerjakan' /></div>
                </FlowStep>
                
                <FlowStep title="Pratinjau Terkirim" pj="Desainer & Sistem" icon={Hourglass} color="bg-sky-100 text-sky-800">
                     <p>Bot mengirimkan link pratinjau. `revisionCount` dimulai dari 0. Timer 3 hari dimulai.</p>
                     <div className="mt-2"><StatusBadgeWithDialog status='Menunggu Respon Klien' /></div>
                </FlowStep>
                
                <FlowDecision text="Bagaimana Respon Klien?" />

                <FlowBranch>
                    <BranchPath title="✅ Persetujuan" icon={Check} color="bg-green-100 text-green-800">
                        <FlowStep title="Pesanan Selesai" pj="Bot" icon={FileCheck} color="bg-green-100 text-green-800" end>
                            <p>Bot mendeteksi kata kunci "setuju", mengirim file final, dan meminta rating.</p>
                            <div className="mt-2"><StatusBadgeWithDialog status='Selesai' isFinal={true} /></div>
                        </FlowStep>
                    </BranchPath>
                    
                    <BranchPath title="✏️ Revisi" icon={RefreshCw} color="bg-indigo-100 text-indigo-800">
                        <FlowStep title="Revisi Diproses (Ke 1 & 2)" pj="Bot & Desainer" icon={RefreshCw} color="bg-indigo-100 text-indigo-800">
                            <p>AI mengklasifikasikan sebagai revisi wajar. `revisionCount` +1. Alur kembali ke "Pengerjaan Desain".</p>
                            <div className="mt-2"><StatusBadgeWithDialog status='Sedang Direvisi' /></div>
                        </FlowStep>
                        
                        <FlowStep title="Revisi ke-3 Ditolak" pj="Bot" icon={CalendarClock} color="bg-orange-100 text-orange-800" end>
                            <p>Setelah 2x revisi ('revisionCount' &gt;= 2), bot akan menolak revisi via teks dan menawarkan G-Meet.</p>
                            <div className="mt-2"><StatusBadgeWithDialog status='Menunggu Jadwal Meeting' /></div>
                        </FlowStep>
                    </BranchPath>

                    <BranchPath title="⚠️ Scope Creep" icon={AlertTriangle} color="bg-rose-100 text-rose-800">
                        <FlowStep title="Eskalasi ke Owner" pj="Bot & Owner" icon={Shield} color="bg-rose-100 text-rose-800" end>
                            <p>AI mendeteksi permintaan di luar lingkup. Bot memberi notifikasi ke Owner untuk peninjauan manual.</p>
                            <div className="mt-2"><StatusBadgeWithDialog status='Eskalasi' /></div>
                        </FlowStep>
                    </BranchPath>

                    <BranchPath title="⏰ Klien Menghilang (> 3 Hari)" icon={Clock} color="bg-gray-100 text-gray-800">
                         <FlowStep title="Pesanan Ditutup Otomatis" pj="Sistem (CRON Job)" icon={FileX2} color="bg-gray-100 text-gray-800">
                            <p>Sistem otomatis menutup pesanan dan mengirimkan notifikasi.</p>
                            <div className="mt-2"><StatusBadgeWithDialog status='Selesai Otomatis (Tanpa Respon)' isFinal={true}/></div>
                        </FlowStep>
                        <FlowStep title="Re-Aktivasi Berbayar" pj="Bot & Admin Finance" icon={CircleDollarSign} color="bg-teal-100 text-teal-800" end>
                            <p>Jika klien kembali, bot menawarkan re-aktivasi dengan biaya tambahan untuk masuk "Jalur Ekspres".</p>
                            <div className="mt-2 space-y-2">
                                <StatusBadgeWithDialog status='Menunggu Pembayaran Re-Aktivasi'/>
                                <StatusBadgeWithDialog status='Sedang Direvisi (Jalur Ekspres)'/>
                            </div>
                        </FlowStep>
                    </BranchPath>
                    
                    <BranchPath title="❌ Pembatalan" icon={MessageSquareWarning} color="bg-red-100 text-red-800">
                        <FlowStep title="Pembatalan Diproses" pj="Bot & Admin Finance" icon={Receipt} color="bg-red-100 text-red-800" end>
                            <p>Bot meminta feedback & rating. Admin Finance memproses refund sesuai tahap pembatalan.</p>
                            <div className="mt-2"><StatusBadgeWithDialog status='Dibatalkan (Pra-Desain)' isFinal={true} /></div>
                        </FlowStep>
                    </BranchPath>
                </FlowBranch>
            </div>
        </div>
    );
}
