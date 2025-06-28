import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { 
  LayoutDashboard, 
  Package,
  CreditCard,
  Archive,
  ImageIcon,
  Users,
  Settings,
  Wrench,
  LineChart,
  UserCog,
  Send,
  Sparkles,
  CircleDollarSign,
  Paintbrush,
  Wallet,
  BrainCircuit,
  PercentCircle,
  Bot
} from 'lucide-react';
import Link from 'next/link';
import { AdminHeader } from '@/components/AdminHeader';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-muted/40">
        <Sidebar>
            <SidebarContent>
              {/* RUANG OWNER */}
              <SidebarGroup>
                  <SidebarGroupLabel className="flex items-center gap-2">
                    <BrainCircuit />
                    RUANG OWNER
                  </SidebarGroupLabel>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/admin/analytics">
                          <LayoutDashboard />
                          Dashboard & Analytics
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/admin/customers">
                          <Users />
                          Pelanggan & Loyalitas
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/admin/marketing/discounts">
                          <PercentCircle />
                          Diskon & Promo
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/admin/marketing/banners">
                          <ImageIcon />
                          Banner
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
              </SidebarGroup>

              <SidebarSeparator />

              {/* RUANG DESAINER */}
              <SidebarGroup>
                <SidebarGroupLabel className="flex items-center gap-2">
                    <Paintbrush/>
                    RUANG DESAINER
                </SidebarGroupLabel>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/admin/orders">
                          <Package />
                          Pesanan
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/admin/products">
                          <Archive />
                          Produk
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
              </SidebarGroup>
              
              <SidebarSeparator />

               {/* RUANG FINANCE */}
              <SidebarGroup>
                <SidebarGroupLabel className="flex items-center gap-2">
                    <Wallet/>
                    RUANG FINANCE
                </SidebarGroupLabel>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/admin/payments">
                          <CreditCard />
                          Pembayaran
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/admin/refunds">
                                <CircleDollarSign />
                                Refund
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
              </SidebarGroup>

              <SidebarSeparator />

              {/* RUANG OTAK (SISTEM) */}
              <SidebarGroup>
                <SidebarGroupLabel className="flex items-center gap-2">
                  <Sparkles />
                  RUANG SISTEM
                </SidebarGroupLabel>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/admin/settings/general">
                          <Settings />
                          Pengaturan Umum
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/admin/automation/google">
                          <Sparkles />
                          Integrasi Google
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/admin/automation/telegram">
                          <Send />
                          Integrasi Telegram
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/admin/simulasi">
                          <Bot />
                          Simulasi Bot
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/admin/settings/user-mgmt">
                          <UserCog />
                          Manajemen User
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/admin/settings/integrations">
                          <Wrench />
                          Panduan Deployment
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
              </SidebarGroup>

            </SidebarContent>
        </Sidebar>
        <div className="flex flex-1 flex-col">
            <AdminHeader />
            <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
                {children}
            </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
