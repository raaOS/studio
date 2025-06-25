'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { mockOrders } from "@/lib/data"
import { Briefcase, CheckCircle, Clock, Inbox } from "lucide-react"

export default function AdminDashboardPage() {
  const pesananMasuk = mockOrders.filter(o => o.status === 'Antri').length;
  const antrianAktif = mockOrders.filter(o => ['Kerja', 'Revisi'].includes(o.status)).length;
  const selesaiBulanIni = mockOrders.filter(o => o.status === 'Selesai').length;

  const antrianPerPekan = mockOrders.reduce((acc, order) => {
    if (!acc[order.pekan]) {
        acc[order.pekan] = 0;
    }
    acc[order.pekan]++;
    return acc;
  }, {} as Record<string, number>);

  const kapasitasPekan = 5;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold font-headline">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pesanan Masuk</CardTitle>
                  <Inbox className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                  <div className="text-2xl font-bold">{pesananMasuk}</div>
                  <p className="text-xs text-muted-foreground">Menunggu untuk dikerjakan</p>
              </CardContent>
          </Card>
          <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Antrian Aktif</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                  <div className="text-2xl font-bold">{antrianAktif}</div>
                  <p className="text-xs text-muted-foreground">Dalam pengerjaan atau revisi</p>
              </CardContent>
          </Card>
          <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Selesai Bulan Ini</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                  <div className="text-2xl font-bold">{selesaiBulanIni}</div>
                   <p className="text-xs text-muted-foreground">Total pesanan yang tuntas</p>
              </CardContent>
          </Card>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Antrian Minggu Ini</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
            {Object.entries(antrianPerPekan).sort().map(([pekan, jumlah]) => (
                 <div key={pekan} className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                        <span>Pekan {pekan.replace('W','')}</span>
                        <span>{jumlah}/{kapasitasPekan}</span>
                    </div>
                    <Progress value={(jumlah / kapasitasPekan) * 100} className="h-2" />
                 </div>
            ))}
        </CardContent>
      </Card>
    </div>
  )
}
