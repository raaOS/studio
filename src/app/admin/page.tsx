import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold font-headline">Selamat Datang</h1>
      <Card>
        <CardHeader>
          <CardTitle>Panel Admin DesignFlow Studio</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Gunakan menu navigasi di sebelah kiri untuk mengelola pesanan, melihat laporan, dan mengatur studio Anda.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
