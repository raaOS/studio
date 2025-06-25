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
  Gift,
  Ticket,
  Image as ImageIcon,
  Users,
  Mail,
  Settings,
  BarChart3,
  Wrench,
  LineChart,
  UserCog,
  Bot,
  Send,
  Folder,
  Calendar,
  Video
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
              <SidebarGroup>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/admin">
                          <LayoutDashboard />
                          Dashboard
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
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
                        <Link href="/admin/payments">
                          <CreditCard />
                          Pembayaran
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
              </SidebarGroup>

              <SidebarSeparator />

              <SidebarGroup>
                <SidebarGroupLabel>MARKETING</SidebarGroupLabel>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/admin/marketing/promos">
                          <Gift />
                          Promo
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/admin/marketing/coupons">
                          <Ticket />
                          Kupon
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
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/admin/marketing/loyalty">
                          <Users />
                          Loyalty
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/admin/marketing/email">
                          <Mail />
                          Email
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
              </SidebarGroup>
              
              <SidebarSeparator />

              <SidebarGroup>
                <SidebarGroupLabel className="flex items-center gap-2">
                  <Settings />
                  SETTINGS
                </SidebarGroupLabel>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/admin/settings/capacity">
                          <BarChart3 />
                          Kapasitas
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/admin/settings/integrations">
                          <Wrench />
                          Integrasi
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/admin/analytics">
                          <LineChart />
                          Analytics
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/admin/settings/user-mgmt">
                          <UserCog />
                          User Mgmt
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
              </SidebarGroup>
              
              <SidebarSeparator />

              <SidebarGroup>
                <SidebarGroupLabel className="flex items-center gap-2">
                  <Bot />
                  AUTOMATION
                </SidebarGroupLabel>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/admin/automation/telegram">
                          <Send />
                          Telegram
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/admin/automation/drive">
                          <Folder />
                          Drive
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/admin/automation/calendar">
                          <Calendar />
                          Calendar
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/admin/automation/meet">
                          <Video />
                          Meet
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
