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
  ListTodo, 
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
                        <Link href="/admin/queue">
                          <ListTodo />
                          Antrian
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/admin/queue">
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
                        <Link href="#">
                          <Ticket />
                          Kupon
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="#">
                          <ImageIcon />
                          Banner
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="#">
                          <Users />
                          Loyalty
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="#">
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
                        <Link href="#">
                          <BarChart3 />
                          Kapasitas
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="#">
                          <Wrench />
                          Integrasi
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="#">
                          <LineChart />
                          Analytics
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="#">
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
                        <Link href="#">
                          <Send />
                          Telegram
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="#">
                          <Folder />
                          Drive
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="#">
                          <Calendar />
                          Calendar
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="#">
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
