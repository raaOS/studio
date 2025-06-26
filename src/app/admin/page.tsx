import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { mockOrders } from "@/lib/data";
import { CheckCircle, Inbox, Loader2 } from "lucide-react";
import type { Order } from '@/lib/types';

const getDashboardStats = (orders: Order[]) => {
  const pesananMasuk = orders.filter(o => o.status === 'Masuk Antrian').length;
  const antrianAktif = orders.filter(o => ['Sedang Dikerjakan', 'Sedang Direvisi'].includes(o.status)).length;
  const selesaiBulanIni = orders.filter(o => o.status === 'Selesai').length;

  const weeklyQueue = {
    W1: orders.filter(o => o.pekan === 'W1').length,
    W2: orders.filter(o => o.pekan === 'W2').length,
    W3: orders.filter(o => o.pekan === 'W3').length,
    W4: orders.filter(o => o.pekan === 'W4').length,
  };

  return { pesananMasuk, antrianAktif, selesaiBulanIni, weeklyQueue };
};

export default function AdminDashboardPage() {
  const { pesananMasuk, antrianAktif, selesaiBulanIni, weeklyQueue } = getDashboardStats(mockOrders);
  const weeklyCapacity = 5;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold font-headline">Dashboard</h1>
      
      <section>
        <h2 className="text-xl font-semibold mb-4 text-foreground/80">Statistik Ringkas</h2>
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
              <Loader2 className="h-4 w-4 text-muted-foreground animate-spin" />
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
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-foreground/80">Antrian Minggu Ini</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8">
              {Object.entries(weeklyQueue).map(([pekan, count]) => (
                <div key={pekan} className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-sm font-medium">Pekan {pekan.replace('W','')}</h3>
                    <span className="text-sm text-muted-foreground">{count}/{weeklyCapacity}</span>
                  </div>
                  <Progress value={(count / weeklyCapacity) * 100} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
