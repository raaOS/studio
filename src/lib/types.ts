import { Timestamp } from "firebase/firestore";

export type BudgetTier = 'kaki-lima' | 'umkm' | 'e-comm';

export type BudgetItem = {
  id: BudgetTier;
  title: string;
  description: string;
  image: string;
};

export type Service = {
  id: string;
  name: string;
  prices: { [key in BudgetTier]: number };
  tierImages: { [key in BudgetTier]: string };
  image: string;
  category: string;
  dataAiHint: string;
};

export type CartItem = {
  id: string;
  name:string;
  price: number;
  quantity: number;
  brief: Record<string, string>;
  image: string;
  budgetTier: BudgetTier;
  budgetName: string;
};

export type Customer = {
  name: string;
  phone: string;
  telegram: string;
};

export type OrderStatus =
  | 'Menunggu Pembayaran'
  | 'Menunggu Pengerjaan'
  | 'Sedang Dikerjakan'
  | 'Menunggu Respon Klien'
  | 'Sedang Direvisi'
  | 'Eskalasi'
  | 'Menunggu Jadwal Meeting'
  | 'Menunggu Proses Refund'
  | 'Selesai'
  | 'Dibatalkan';

export type Order = {
  kode_order: string;
  nama_klien: string;
  status_pesanan: OrderStatus;
  tipe_pembayaran: 'DP' | 'LUNAS';
  jumlah_transfer: number;
  total_harga: number;
  potongan_refund: number;
  jenis_potongan: string;
  total_refund: number;
  status_refund: 'Belum' | 'Sudah' | '';
  log_aktivitas: {
    aksi: string;
    oleh: 'klien' | 'owner' | 'desainer' | 'sistem';
    waktu: string;
  }[];
  timestamp: string;
  revisionCount: number;
  customerTelegram: string;
  items: {
    name: string;
    quantity: number;
    price: number;
    brief: Record<string, string>;
  }[];
  budget: 'Kaki Lima' | 'UMKM' | 'E-Comm';
  pekan: 'W1' | 'W2' | 'W3' | 'W4';
  driveFolderUrl?: string;
  paymentStatus: string;
  cancellationDetails?: {
    reason: string;
    rating: number;
    timestamp: string;
  };
};

export type Promo = {
  id: string;
  productName: string;
  promoText: string;
  period: string;
  status: 'Aktif' | 'Draft' | 'Selesai';
};

export type Coupon = {
  id: string;
  code: string;
  discount: string;
  usage: string;
  period: string;
  status: 'Aktif' | 'Draft' | 'Expired';
};

export type Banner = {
  id: string;
  name: string;
  position: 'Top Banner' | 'Hero Section' | 'Popup' | 'Footer' | 'Info Card';
  period: string;
  status: 'Aktif' | 'Draft' | 'Selesai';
  image?: string;
  icon?: string;
  dataAiHint?: string;
  content: string;
  type: 'Image' | 'Text';
  href?: string;
};

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Designer' | 'Marketing';
  status: 'Active' | 'Inactive';
  avatar: string;
};

export type CustomerProfile = {
  id: string;
  name: string;
  email: string;
  telegram: string;
  avatar: string;
  totalOrders: number;
  ltv: number; // Lifetime Value
  lastOrderDate: string;
};

export type DriveActivityLog = {
  id: string;
  orderId: string;
  activity: string;
  timestamp: string;
  user: string;
};

export type CalendarActivityLog = {
  id: string;
  orderId: string;
  activity: string;
  timestamp: string;
  trigger: string;
};

export type MeetActivityLog = {
  id: string;
  orderId: string;
  activity: string;
  timestamp: string;
  trigger: string;
};

export type Category = {
  id: string;
  name: string;
};

export type MessageTemplate = {
  id: string; // e.g., 'order_confirmation'
  description: string;
  content: string;
  lastUpdated: string;
};

// Represents the data structure saved to Firestore when a user checks out
export type PendingOrder = {
  customer: Customer;
  cartItems: Omit<CartItem, 'image'>[]; // Don't need the image in the DB
  totalPrice: number;
  paymentMethod: 'dp' | 'lunas';
  createdAt: Timestamp;
};
