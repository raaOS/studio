
'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, BrainCircuit, User, Shield, Info, MessageSquare, UserCheck, Trash2, Ghost, DollarSign, CalendarOff } from 'lucide-react';
import { cn } from '@/lib/utils';

const simulationData = [
  {
    status: 'Menunggu Pembayaran',
    pj: { name: 'Bot', icon: Bot, color: 'bg-sky-100 text-sky-800 border-sky-200' },
    pemicu: 'Pelanggan menyelesaikan pesanan di website dan membuka tautan Telegram.',
    pesanPembeli: '✅ *Pesanan Anda Diterima!*\n\n*Order ID:* `DSN-1234`\n*Nama:* {{customerName}}\n\n⏳ Mohon tunggu sebentar, kami sedang membuat folder & menyiapkan tagihan untuk Anda...',
    pesanInternal: '🔔 **Pesanan Baru Masuk!**\nOrder `DSN-1234` dari `{{customerName}}` telah masuk ke sistem. Menunggu konfirmasi pembayaran.',
    aksiPembeli: 'Mengirim `/start <data_pesanan>` (terjadi otomatis saat tautan dari website diklik).',
  },
  {
    status: 'Masuk Antrian',
    pj: { name: 'Sistem', icon: BrainCircuit, color: 'bg-slate-100 text-slate-800 border-slate-200' },
    pemicu: 'Pembayaran (DP/Lunas) terkonfirmasi oleh admin di panel pembayaran atau melalui sistem pembayaran otomatis.',
    pesanPembeli: '👍 *Pembayaran Diterima!*\n\nPembayaran untuk pesanan `{{orderId}}` telah kami konfirmasi. Pesanan Anda sekarang resmi masuk ke dalam antrian pengerjaan. Kami akan memberi tahu Anda lagi setelah pratinjau siap.',
    pesanInternal: '✅ **Pembayaran Lunas!**\nOrder `{{orderId}}` siap untuk dikerjakan. Telah dimasukkan ke antrian desainer.',
    aksiPembeli: 'Melakukan transfer dan konfirmasi pembayaran (di luar alur bot).',
  },
  {
    status: 'Masuk Antrian (Minggu Depan)',
    pj: { name: 'Sistem', icon: CalendarOff, color: 'bg-slate-100 text-slate-800 border-slate-200' },
    pemicu: 'Pembayaran terkonfirmasi, namun kapasitas antrian minggu ini sudah penuh.',
    pesanPembeli: '🙏 *Terima Kasih Atas Kesabaran Anda!*\n\nPembayaran untuk `{{orderId}}` telah kami konfirmasi. Karena antrian minggu ini sudah penuh, pesanan Anda telah kami jadwalkan untuk prioritas utama minggu depan.',
    pesanInternal: '🗓️ **Dijadwalkan W+1**\nOrder `{{orderId}}` telah masuk, namun antrian penuh. Otomatis masuk ke antrian minggu depan.',
    aksiPembeli: 'Melakukan transfer dan konfirmasi pembayaran (di luar alur bot).',
  },
  {
    status: 'Sedang Dikerjakan',
    pj: { name: 'Desainer', icon: User, color: 'bg-amber-100 text-amber-800 border-amber-200' },
    pemicu: 'Desainer secara manual mengklik tombol "Mulai Kerjakan" di panel admin.',
    pesanPembeli: '✍️ *Pesanan Mulai Dikerjakan!*\n\nKabar baik, {{customerName}}! Desainer kami telah mulai mengerjakan pesanan Anda `{{orderId}}`. Kami akan berikan yang terbaik!',
    pesanInternal: '▶️ **Mulai Pengerjaan**\nDesainer `{{designerName}}` telah memulai pengerjaan order `{{orderId}}`.',
    aksiPembeli: '-',
  },
  {
    status: 'Siap Kirim Pratinjau',
    pj: { name: 'Desainer', icon: User, color: 'bg-amber-100 text-amber-800 border-amber-200' },
    pemicu: 'Desainer mengklik tombol "Kirim Pratinjau" di panel admin setelah mengunggah hasil desain ke folder Drive.',
    pesanPembeli: '-',
    pesanInternal: '📬 **Pratinjau Siap**\nDesain untuk `{{orderId}}` siap dikirim. Bot akan mengirim notifikasi ke pelanggan.',
    aksiPembeli: '-',
  },
  {
    status: 'Menunggu Respon Klien',
    pj: { name: 'Sistem', icon: BrainCircuit, color: 'bg-slate-100 text-slate-800 border-slate-200' },
    pemicu: 'Dipicu otomatis setelah status diubah menjadi "Siap Kirim Pratinjau".',
    pesanPembeli: '🎨 *Pratinjau Desain Siap!* 🎨\n\nHalo {{customerName}}, pratinjau untuk `{{orderId}}` sudah siap.\n\nSilakan cek di folder Drive:\n`{{driveUrl}}`\n\nBalas pesan ini dengan *"SETUJU"* jika sudah oke, atau ketik *"REVISI: [catatan revisi Anda]"* jika ada perubahan.',
    pesanInternal: '⏳ **Menunggu Klien**\nNotifikasi pratinjau untuk `{{orderId}}` telah dikirim. Menunggu balasan dari `{{customerName}}`.',
    aksiPembeli: '-',
  },
  {
    status: 'Sedang Direvisi',
    pj: { name: 'Bot', icon: Bot, color: 'bg-sky-100 text-sky-800 border-sky-200' },
    pemicu: 'Pelanggan membalas pesan pratinjau dengan kata kunci "REVISI".',
    pesanPembeli: '✍️ *Revisi Diterima*\n\nBaik, {{customerName}}. Catatan revisi Anda untuk `{{orderId}}` telah kami terima. Desainer kami akan segera mengerjakannya kembali.',
    pesanInternal: '🔄 **Permintaan Revisi**\nKlien `{{customerName}}` meminta revisi untuk `{{orderId}}`. Catatan: `{{revisionNote}}`.',
    aksiPembeli: '`REVISI: Tolong ganti warnanya jadi merah.`',
  },
  {
    status: 'Selesai',
    pj: { name: 'Bot', icon: Bot, color: 'bg-sky-100 text-sky-800 border-sky-200' },
    pemicu: 'Pelanggan membalas pesan pratinjau dengan kata kunci "SETUJU", "OK", atau "APPROVE".',
    pesanPembeli: '🎉 *Pesanan Selesai!*\n\nTerima kasih, {{customerName}}! Pesanan `{{orderId}}` telah selesai. Terima kasih telah mempercayakan kami. Kami tunggu orderan selanjutnya! ⭐',
    pesanInternal: '✅ **Proyek Selesai!**\nOrder `{{orderId}}` telah disetujui oleh klien. Pindahkan ke arsip.',
    aksiPembeli: '`Setuju`',
  },
  {
    status: 'Eskalasi: Revisi di Luar Lingkup',
    pj: { name: 'Desainer', icon: User, color: 'bg-amber-100 text-amber-800 border-amber-200' },
    pemicu: 'Desainer secara manual mengubah status ini jika permintaan revisi klien terlalu jauh dari brief awal.',
    pesanPembeli: '⚠️ *Perlu Diskusi Lanjutan*\n\nHalo {{customerName}}, permintaan revisi Anda untuk `{{orderId}}` sepertinya di luar lingkup awal. Tim kami akan segera menghubungi Anda untuk diskusi lebih lanjut.',
    pesanInternal: '❗ **Eskalasi Revisi!**\nOrder `{{orderId}}`. Desainer menandai revisi di luar lingkup. Mohon Owner/Admin untuk meninjau.',
    aksiPembeli: '`REVISI: Tolong ubah dari logo jadi brosur.` (Contoh ekstrem)',
  },
  {
    status: 'Perlu Tinjauan Owner',
    pj: { name: 'Owner', icon: Shield, color: 'bg-rose-100 text-rose-800 border-rose-200' },
    pemicu: 'Bisa dipicu **Sistem** (misal, revisi > 3x) atau **Manual** oleh desainer saat ada masalah kompleks.',
    pesanPembeli: '-',
    pesanInternal: '🛡️ **TINJAUAN OWNER DIPERLUKAN!**\nOrder `{{orderId}}` memerlukan keputusan Anda. Penyebab: `{{escalationReason}}`.',
    aksiPembeli: '-',
  },
  {
    status: 'Dibatalkan (Belum Dikerjakan)',
    pj: { name: 'Owner', icon: Trash2, color: 'bg-red-100 text-red-800 border-red-200' },
    pemicu: 'Sistem: Pembayaran tidak diterima. Manual: Permintaan klien sebelum pekerjaan dimulai.',
    pesanPembeli: '❌ *Pesanan Dibatalkan*\n\nMohon maaf, pesanan Anda `{{orderId}}` telah dibatalkan karena `{{cancellationReason}}`. Jika sudah terlanjur membayar, dana akan dikembalikan penuh.',
    pesanInternal: '🗑️ **Pembatalan Pre-Work**\nOrder `{{orderId}}` dibatalkan sebelum dikerjakan. Alasan: `{{cancellationReason}}`.',
    aksiPembeli: 'Meminta pembatalan / Tidak melakukan pembayaran.',
  },
  {
    status: 'Dibatalkan (Sudah Dikerjakan)',
    pj: { name: 'Owner', icon: Trash2, color: 'bg-red-100 text-red-800 border-red-200' },
    pemicu: 'Manual: Permintaan klien atau keputusan internal setelah pekerjaan dimulai.',
    pesanPembeli: '❌ *Pesanan Dibatalkan*\n\nMohon maaf, pesanan `{{orderId}}` dibatalkan atas permintaan Anda. Karena pekerjaan sudah dimulai, akan ada potongan biaya sesuai kebijakan.',
    pesanInternal: '🗑️ **Pembatalan Post-Work**\nOrder `{{orderId}}` dibatalkan setelah dikerjakan. Alasan: `{{cancellationReason}}`. Periksa kebijakan refund.',
    aksiPembeli: 'Meminta pembatalan setelah proses desain berjalan.',
  },
  {
    status: 'Tidak Puas (Refund 50%)',
    pj: { name: 'Owner', icon: DollarSign, color: 'bg-rose-100 text-rose-800 border-rose-200' },
    pemicu: 'Manual: Keputusan bisnis setelah negosiasi buntu dengan klien.',
    pesanPembeli: '📑 *Proses Refund*\n\nSesuai kesepakatan, kami telah memproses pengembalian dana 50% untuk pesanan `{{orderId}}`. Mohon maaf atas ketidaknyamanannya.',
    pesanInternal: '💸 **Refund 50%**\nOrder `{{orderId}}` ditutup dengan refund 50%. Mohon tim keuangan memprosesnya.',
    aksiPembeli: 'Menyetujui opsi refund setelah negosiasi.',
  },
   {
    status: 'Ditutup (Tanpa Refund)',
    pj: { name: 'Owner', icon: Ghost, color: 'bg-neutral-100 text-neutral-800 border-neutral-200' },
    pemicu: 'Manual: Klien tidak responsif setelah beberapa kali dihubungi.',
    pesanPembeli: '🔒 *Pesanan Ditutup*\n\nKarena tidak ada respon dalam waktu yang ditentukan, pesanan Anda `{{orderId}}` kami anggap selesai dan telah ditutup.',
    pesanInternal: '👻 **Proyek Terbengkalai**\nOrder `{{orderId}}` ditutup karena klien tidak responsif. Tidak ada refund.',
    aksiPembeli: 'Tidak merespon pesan/pengingat selama periode waktu tertentu.',
  },
];

export default function SimulasiPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-headline">Simulasi Alur Kerja Pesanan</h1>
        <p className="text-muted-foreground mt-2 max-w-4xl">
          Peta ini menjelaskan setiap langkah dalam siklus hidup pesanan, siapa yang bertanggung jawab, apa pemicunya, dan komunikasi apa yang terjadi. Gunakan ini sebagai panduan untuk tim Anda.
        </p>
      </div>

      <Card>
        <CardContent className="p-0">
            <div className="relative w-full overflow-auto">
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead className="min-w-[200px]">Status Pesanan</TableHead>
                    <TableHead className="min-w-[180px]">Penanggung Jawab</TableHead>
                    <TableHead className="min-w-[300px]">Pemicu Perubahan Status</TableHead>
                    <TableHead className="min-w-[350px]">Contoh Pesan (Pembeli)</TableHead>
                    <TableHead className="min-w-[350px]">Notifikasi Internal (Tim)</TableHead>
                    <TableHead className="min-w-[300px]">Contoh Aksi Pemicu dari Pembeli</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {simulationData.map((item, index) => (
                    <TableRow key={index} className="align-top">
                        <TableCell className="font-semibold text-foreground">{item.status}</TableCell>
                        <TableCell>
                        <Badge variant="outline" className={cn("whitespace-nowrap", item.pj.color)}>
                            <item.pj.icon className="mr-2 h-4 w-4" />
                            {item.pj.name}
                        </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{item.pemicu}</TableCell>
                        <TableCell className="text-sm">
                        {item.pesanPembeli !== '-' ? (
                            <div className="p-3 rounded-md bg-muted border text-muted-foreground whitespace-pre-wrap font-mono text-xs">
                            {item.pesanPembeli}
                            </div>
                        ) : (
                            <span className="text-muted-foreground/60">-</span>
                        )}
                        </TableCell>
                        <TableCell className="text-sm">
                        {item.pesanInternal !== '-' ? (
                            <div className="p-3 rounded-md bg-muted border text-muted-foreground whitespace-pre-wrap font-mono text-xs">
                            <Info className="h-4 w-4 float-left mr-2 mt-0.5 text-blue-500" />
                            {item.pesanInternal}
                            </div>
                        ) : (
                            <span className="text-muted-foreground/60">-</span>
                        )}
                        </TableCell>
                        <TableCell className="text-sm">
                        {item.aksiPembeli !== '-' ? (
                            <div className="p-3 rounded-md bg-green-50 border border-green-200 text-green-900 whitespace-pre-wrap font-mono text-xs">
                            <UserCheck className="h-4 w-4 float-left mr-2 mt-0.5" />
                            {item.aksiPembeli}
                            </div>
                        ) : (
                            <span className="text-muted-foreground/60">-</span>
                        )}
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
