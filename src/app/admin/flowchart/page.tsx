
'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { User, Shield, GitFork, Workflow, Check, X, RefreshCw, AlertTriangle, Play, Hourglass, Wallet, FileCheck, CircleDollarSign, CalendarClock, MessageCircleQuestion, FileX } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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

const FlowDecision = ({ text, end = false }: { text: string, end?: boolean }) => (
    <div className="relative pl-8">
        <div className="absolute left-0 top-0 flex h-full w-8 items-start justify-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-dashed border-amber-500 bg-amber-500/10 text-amber-600">
                <GitFork className="h-5 w-5" />
            </div>
            {!end && <div className="absolute top-8 h-[calc(100%+1.5rem)] w-px bg-border -z-10" />}
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

const CancellationPoint = ({ children }: { children: React.ReactNode }) => (
     <div className="relative my-4">
        <div className="absolute -left-[35px] top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-red-800">
            <X className="h-4 w-4" />
        </div>
        <div className="text-sm text-muted-foreground">{children}</div>
    </div>
);


export default function FlowchartPage() {
    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold font-headline flex items-center gap-3">
                    <Workflow className="h-8 w-8" />
                    Alur Kerja Pesanan (Flowchart)
                </h1>
                <p className="text-muted-foreground mt-2">
                    Visualisasi alur kerja dari pesanan masuk hingga selesai, lengkap dengan status pesanan di setiap tahap, PJ, dan titik keputusan.
                </p>
            </div>

            <div className="space-y-6">
                <FlowStep title="Pesanan Dibuat & Pembayaran" pj="Pelanggan & Sistem" icon={Wallet} color="bg-yellow-100 text-yellow-800">
                    <p>Pelanggan menyelesaikan checkout di website dan diarahkan ke bot Telegram untuk menyelesaikan pembayaran.</p>
                    <div className="mt-2"><Badge variant="outline">Status: Menunggu Pembayaran</Badge></div>
                </FlowStep>
                
                <FlowStep title="Pembayaran Diterima" pj="Admin Finance" icon={FileCheck} color="bg-green-100 text-green-800">
                    <p>Admin memvalidasi pembayaran secara manual. Sistem mengubah status pesanan dan memasukkannya ke antrian.</p>
                    <div className="mt-2"><Badge variant="outline">Status: Menunggu Pengerjaan</Badge></div>
                    <CancellationPoint>
                        Klien bisa membatalkan di sini. <Badge variant="destructive">Status: Dibatalkan (Pra-Desain)</Badge> dengan refund 90% (Lunas) / 80% dari DP.
                    </CancellationPoint>
                </FlowStep>

                <FlowStep title="Pengerjaan Desain Dimulai" pj="Desainer" icon={Play} color="bg-blue-100 text-blue-800">
                    <p>Desainer memilih pesanan dari antrian dan mengubah status. Bot memberi notifikasi ke pelanggan.</p>
                    <div className="mt-2"><Badge variant="outline">Status: Sedang Dikerjakan</Badge></div>
                </FlowStep>
                
                <FlowStep title="Pratinjau Terkirim" pj="Desainer & Sistem" icon={Hourglass} color="bg-sky-100 text-sky-800">
                     <p>Desainer mengunggah pratinjau dan mengubah status. Bot mengirimkan link pratinjau ke pelanggan. Revision count = 0.</p>
                     <div className="mt-2"><Badge variant="outline">Status: Menunggu Respon Klien</Badge></div>
                     <CancellationPoint>
                        Klien bisa membatalkan di sini. <Badge variant="destructive">Status: Dibatalkan (Pasca-Desain)</Badge> dengan refund 50% (Lunas) / DP hangus.
                    </CancellationPoint>
                </FlowStep>

                <FlowDecision text="Respon Klien ke-1 atau ke-2?" />
                
                <FlowBranch>
                    <BranchPath title="Revisi Wajar" icon={RefreshCw} color="bg-indigo-100 text-indigo-800">
                        <FlowStep title="Revisi Diproses" pj="Bot & Desainer" icon={RefreshCw} color="bg-indigo-100 text-indigo-800">
                            <p>AI mengklasifikasikan sebagai revisi wajar. Bot mengubah status, revision count +1, dan notifikasi ke desainer. Alur kembali ke "Pengerjaan Desain".</p>
                            <div className="mt-2"><Badge variant="outline">Status: Sedang Direvisi</Badge></div>
                        </FlowStep>
                    </BranchPath>

                    <BranchPath title="Scope Creep" icon={AlertTriangle} color="bg-rose-100 text-rose-800">
                        <FlowStep title="Eskalasi ke Owner" pj="Bot & Owner" icon={Shield} color="bg-rose-100 text-rose-800">
                            <p>AI mendeteksi permintaan di luar lingkup. Bot mengubah status dan memberi notifikasi kepada Owner untuk peninjauan manual.</p>
                            <div className="mt-2"><Badge variant="destructive">Status: Eskalasi</Badge></div>
                        </FlowStep>
                    </BranchPath>

                     <BranchPath title="Persetujuan" icon={Check} color="bg-green-100 text-green-800">
                        <FlowStep title="Pesanan Selesai" pj="Bot" icon={FileCheck} color="bg-green-100 text-green-800" end>
                            <p>Bot mendeteksi kata kunci "setuju" dan mengubah status. Pesanan dianggap tuntas.</p>
                            <div className="mt-2"><Badge variant="destructive">Status Final: Selesai</Badge></div>
                        </FlowStep>
                    </BranchPath>
                </FlowBranch>
                
                <FlowDecision text="Respon Klien ke-3 (Setelah 2x Revisi)?" />

                 <FlowBranch>
                    <BranchPath title="Minta Revisi Lagi" icon={MessageCircleQuestion} color="bg-orange-100 text-orange-800">
                         <FlowStep title="Tawarkan Google Meet" pj="Bot" icon={CalendarClock} color="bg-orange-100 text-orange-800">
                            <p>Bot menolak revisi via teks dan secara otomatis menawarkan jadwal meeting via G-Meet untuk diskusi langsung.</p>
                            <div className="mt-2"><Badge variant="destructive">Status: Menunggu Jadwal Meeting</Badge></div>
                        </FlowStep>
                    </BranchPath>
                    
                     <BranchPath title="Persetujuan" icon={Check} color="bg-green-100 text-green-800">
                        <FlowStep title="Pesanan Selesai" pj="Bot" icon={FileCheck} color="bg-green-100 text-green-800" end>
                            <p>Bot mendeteksi kata kunci "setuju" dan mengubah status. Pesanan dianggap tuntas.</p>
                             <div className="mt-2"><Badge variant="destructive">Status Final: Selesai</Badge></div>
                        </FlowStep>
                    </BranchPath>

                    <BranchPath title="Batal Setelah 2x Revisi" icon={CircleDollarSign} color="bg-gray-100 text-gray-800">
                         <FlowStep title="Pesanan Ditutup" pj="Sistem" icon={FileX} color="bg-gray-100 text-gray-800" end>
                            <p>Jika klien membatalkan setelah 2x revisi, pesanan ditutup tanpa pengembalian dana.</p>
                            <div className="mt-2"><Badge variant="destructive">Status Final: Ditutup (Tanpa Refund)</Badge></div>
                        </FlowStep>
                    </BranchPath>
                </FlowBranch>

            </div>
        </div>
    );
}
