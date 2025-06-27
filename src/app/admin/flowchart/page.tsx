'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Bot, User, BrainCircuit, Shield, GitFork, Workflow, MousePointerClick, FileCheck, FileX, CircleDollarSign, Ghost, RefreshCw, Check, X, CalendarClock, MessageCircleQuestion, AlertTriangle } from 'lucide-react';

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


export default function FlowchartPage() {
    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold font-headline flex items-center gap-3">
                    <Workflow className="h-8 w-8" />
                    Alur Kerja Pesanan (Flowchart)
                </h1>
                <p className="text-muted-foreground mt-2">
                    Visualisasi alur kerja dari pesanan masuk hingga selesai, lengkap dengan setiap kemungkinan dan titik keputusan.
                </p>
            </div>

            <div className="space-y-6">
                <FlowStep title="Pesanan Dibuat" pj="Pelanggan & Bot" icon={MousePointerClick} color="bg-blue-100 text-blue-800">
                    Pelanggan mengisi keranjang di website dan membuka tautan Telegram yang berisi data pesanan terenkripsi. Bot menerima pesan `/start` dengan data tersebut.
                </FlowStep>
                
                <FlowDecision text="Pembayaran Diterima?" />

                <FlowBranch>
                    <BranchPath title="Jalur TUNDA" icon={X} color="bg-red-100 text-red-800">
                        <FlowStep title="Dibatalkan (Belum Dikerjakan)" pj="Sistem" icon={FileX} color="bg-red-100 text-red-800" end>
                             Jika pembayaran tidak terkonfirmasi dalam waktu yang ditentukan (misal, 24 jam), sistem otomatis membatalkan pesanan.
                        </FlowStep>
                    </BranchPath>

                    <BranchPath title="Jalur LANJUT" icon={Check} color="bg-green-100 text-green-800">
                        <FlowStep title="Pembayaran Terkonfirmasi" pj="Sistem/Admin" icon={FileCheck} color="bg-green-100 text-green-800">
                            Admin memvalidasi pembayaran secara manual di panel, atau sistem pembayaran otomatis mengirim sinyal konfirmasi.
                        </FlowStep>

                        <FlowDecision text="Kapasitas Antrian Penuh?" />

                        <FlowBranch>
                             <BranchPath title="Jalur PENUH" icon={CalendarClock} color="bg-orange-100 text-orange-800">
                                 <FlowStep title="Masuk Antrian (Minggu Depan)" pj="Sistem" icon={CalendarClock} color="bg-orange-100 text-orange-800">
                                     Sistem mendeteksi antrian minggu ini penuh dan otomatis menjadwalkan pesanan untuk prioritas utama minggu berikutnya.
                                 </FlowStep>
                             </BranchPath>
                             <BranchPath title="Jalur TERSEDIA" icon={Check} color="bg-green-100 text-green-800">
                                <FlowStep title="Masuk Antrian" pj="Sistem" icon={BrainCircuit} color="bg-slate-100 text-slate-800">
                                    Pesanan masuk ke dalam daftar tugas aktif yang bisa diambil oleh desainer.
                                </FlowStep>
                             </BranchPath>
                        </FlowBranch>
                        
                        <FlowStep title="Pengerjaan Desain" pj="Desainer" icon={User} color="bg-amber-100 text-amber-800">
                            Desainer memilih pesanan dari antrian dan mengubah status menjadi "Sedang Dikerjakan". Bot memberi notifikasi ke pelanggan.
                        </FlowStep>

                        <FlowStep title="Pratinjau Siap" pj="Desainer" icon={User} color="bg-amber-100 text-amber-800">
                            Desainer mengunggah hasil karya ke folder Drive dan mengubah status menjadi "Siap Kirim Pratinjau".
                        </FlowStep>
                        
                        <FlowStep title="Menunggu Respon Klien" pj="Sistem & Bot" icon={MessageCircleQuestion} color="bg-sky-100 text-sky-800">
                             Sistem mengubah status dan Bot mengirimkan pesan pratinjau yang berisi link Drive ke pelanggan.
                        </FlowStep>

                        <FlowDecision text="Respon Klien?" />
                        
                        <FlowBranch>
                            <BranchPath title="Minta REVISI" icon={RefreshCw} color="bg-indigo-100 text-indigo-800">
                                <FlowStep title="Sedang Direvisi" pj="Bot & Desainer" icon={RefreshCw} color="bg-indigo-100 text-indigo-800">
                                    Bot mendeteksi kata kunci "revisi" dan mengubah status. Notifikasi dikirim ke desainer untuk mengerjakan ulang. Alur kembali ke "Pengerjaan Desain".
                                </FlowStep>
                            </BranchPath>
                            <BranchPath title="SETUJU" icon={Check} color="bg-green-100 text-green-800">
                                <FlowStep title="Selesai" pj="Bot" icon={FileCheck} color="bg-green-100 text-green-800" end>
                                    Bot mendeteksi kata kunci "setuju" dan mengubah status menjadi "Selesai". Pesanan dianggap tuntas.
                                </FlowStep>
                            </BranchPath>
                        </FlowBranch>
                    </BranchPath>
                </FlowBranch>

                 <FlowDecision text="Terjadi Eskalasi?" end/>
                  <FlowBranch>
                     <BranchPath title="Jalur Eskalasi" icon={AlertTriangle} color="bg-rose-100 text-rose-800">
                        <div className="space-y-4">
                            <FlowStep title="Revisi di Luar Lingkup" pj="Desainer" icon={Shield} color="bg-rose-100 text-rose-800">
                                Desainer mengubah status secara manual jika permintaan revisi tidak wajar.
                            </FlowStep>
                            <FlowStep title="Tidak Puas (Refund 50%)" pj="Owner" icon={CircleDollarSign} color="bg-rose-100 text-rose-800">
                                Owner memutuskan untuk mengakhiri proyek dengan pengembalian dana sebagian setelah negosiasi.
                            </FlowStep>
                            <FlowStep title="Ditutup (Tanpa Refund)" pj="Owner" icon={Ghost} color="bg-rose-100 text-rose-800" end>
                                Owner menutup paksa pesanan karena klien tidak responsif.
                            </FlowStep>
                        </div>
                    </BranchPath>
                  </FlowBranch>

            </div>
        </div>
    );
}
