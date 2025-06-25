import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockOrders } from "@/lib/data"
import { formatRupiah, cn } from "@/lib/utils"
import { DollarSign, CreditCard, ShoppingCart, Activity } from "lucide-react"

export default function AdminPage() {
  const totalRevenue = mockOrders.reduce((acc, order) => acc + order.total, 0);
  const totalOrders = mockOrders.length;
  const inProgressOrders = mockOrders.filter(o => o.status === 'In Progress').length;
  const pendingPayments = mockOrders.filter(o => o.paymentMethod === 'dp').length;
  
  return (
    <div className="space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold font-headline">Orders Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                  <div className="text-2xl font-bold">{formatRupiah(totalRevenue)}</div>
                  <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
          </Card>
          <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                  <div className="text-2xl font-bold">+{totalOrders}</div>
                  <p className="text-xs text-muted-foreground">+15.2% from last month</p>
              </CardContent>
          </Card>
          <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                  <div className="text-2xl font-bold">+{inProgressOrders}</div>
                  <p className="text-xs text-muted-foreground">-5% from last month</p>
              </CardContent>
          </Card>
          <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                  <div className="text-2xl font-bold">+{pendingPayments}</div>
                  <p className="text-xs text-muted-foreground">+10% from last month</p>
              </CardContent>
          </Card>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                      <div className="font-medium">{order.customerName}</div>
                      <div className="text-sm text-muted-foreground">{order.customerTelegram}</div>
                  </TableCell>
                  <TableCell>{order.items.map(item => `${item.name} (x${item.quantity})`).join(', ')}</TableCell>
                  <TableCell>{formatRupiah(order.total)}</TableCell>
                  <TableCell>
                    <Badge className={cn(
                        "capitalize text-xs font-medium",
                        {
                            "bg-chart-2 text-primary-foreground border-transparent hover:bg-chart-2/80": order.status === "Completed",
                            "bg-primary text-primary-foreground border-transparent hover:bg-primary/80": order.status === "In Progress",
                            "bg-accent text-accent-foreground border-transparent hover:bg-accent/80": order.status === "Pending",
                            "bg-destructive text-destructive-foreground border-transparent hover:bg-destructive/80": order.status === "Cancelled",
                        }
                    )}
                    >{order.status}</Badge>
                  </TableCell>
                  <TableCell>{new Date(order.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric'})}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
