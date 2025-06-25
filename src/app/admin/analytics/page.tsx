'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart, ResponsiveContainer } from "recharts"
import { TrendingUp, ArrowDown, Users, ShoppingCart, DollarSign, Percent } from 'lucide-react';
import { formatRupiah } from '@/lib/utils';

const revenueData = [
  { month: 'Jan', revenue: 12300000 },
  { month: 'Feb', revenue: 15500000 },
  { month: 'Mar', revenue: 14200000 },
  { month: 'Apr', revenue: 18900000 },
  { month: 'May', revenue: 21300000 },
  { month: 'Jun', revenue: 19800000 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--primary))",
  },
  visitors: {
    label: "Visitors",
    color: "hsl(var(--chart-1))",
  },
  orders: {
    label: "Orders",
    color: "hsl(var(--chart-2))",
  },
}

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-headline">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Wawasan mendalam tentang performa bisnis Anda.</p>
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-foreground/80">Revenue Analytics</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatRupiah(15500000)}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                +23% vs bulan lalu
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatRupiah(425000)}</div>
               <p className="text-xs text-muted-foreground flex items-center gap-1">
                <ArrowDown className="h-3 w-3 text-red-500" />
                -5% vs bulan lalu
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Customer Lifetime Value</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatRupiah(1200000)}</div>
              <p className="text-xs text-muted-foreground">Estimasi pendapatan per customer</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Card>
        <CardHeader>
            <CardTitle>Grafik Pendapatan Bulanan</CardTitle>
            <CardDescription>Pendapatan dalam 6 bulan terakhir.</CardDescription>
        </CardHeader>
        <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <LineChart data={revenueData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis 
                      tickFormatter={(value) => `${(value as number) / 1000000} Jt`}
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      width={50}
                    />
                    <ChartTooltip 
                      cursor={false}
                      content={<ChartTooltipContent 
                        formatter={(value) => formatRupiah(value as number)} 
                        indicator="line" 
                      />}
                    />
                    <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2} dot={true} />
                </LineChart>
            </ChartContainer>
        </CardContent>
      </Card>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-foreground/80">Conversion Funnel</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1">
                 <CardHeader>
                    <CardTitle>Funnel Pengunjung ke Pesanan</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center space-x-4">
                        <div className="text-center">
                            <Users className="h-8 w-8 mx-auto text-primary" />
                            <p className="text-2xl font-bold">1,250</p>
                            <p className="text-sm text-muted-foreground">Visitors</p>
                        </div>
                        <div className="text-center text-muted-foreground">
                            <TrendingUp className="h-6 w-6 mx-auto" />
                            <p className="text-lg font-bold text-foreground">3.6%</p>
                        </div>
                         <div className="text-center">
                            <ShoppingCart className="h-8 w-8 mx-auto text-green-500" />
                            <p className="text-2xl font-bold">45</p>
                            <p className="text-sm text-muted-foreground">Orders</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Top Converting Budget</CardTitle>
                    <CardDescription>Budget yang paling banyak menghasilkan pesanan.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4 text-sm">
                        <div className="flex justify-between items-center">
                            <span>UMKM</span>
                            <div className="flex items-center gap-2">
                                <span className="font-semibold">5.2%</span>
                                <div className="w-32 h-2 bg-muted rounded-full"><div className="h-2 bg-primary rounded-full" style={{width: '70%'}}></div></div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span>E-Comm</span>
                            <div className="flex items-center gap-2">
                                <span className="font-semibold">3.1%</span>
                                <div className="w-32 h-2 bg-primary rounded-full" style={{width: '50%'}}></div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span>Kaki Lima</span>
                            <div className="flex items-center gap-2">
                                <span className="font-semibold">2.5%</span>
                                <div className="w-32 h-2 bg-primary rounded-full" style={{width: '40%'}}></div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Best Performing Promo</CardTitle>
                    <CardDescription>Promo yang paling efektif menarik pelanggan.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center h-full">
                        <div className="p-3 bg-accent rounded-full mb-2">
                            <Percent className="h-8 w-8 text-accent-foreground" />
                        </div>
                        <p className="text-lg font-bold">NEWBIE20</p>
                        <p className="text-sm text-muted-foreground">8.1% Conversion Rate</p>
                    </div>
                </CardContent>
            </Card>
        </div>
      </section>
    </div>
  );
}
