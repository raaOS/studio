export type BudgetTier = 'kaki-lima' | 'umkm' | 'e-comm';

export type BudgetItem = {
  id: BudgetTier;
  title: string;
  description: string;
  priceRange: string;
  icon: React.ElementType;
};

export type Service = {
  id: string;
  name: string;
  prices: { [key in BudgetTier]: number };
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
};

export type Customer = {
  name: string;
  phone: string;
  telegram: string;
};

export type OrderStatus =
  | 'Menunggu Pembayaran'
  | 'Masuk Antrian'
  | 'Masuk Antrian (Minggu Depan)'
  | 'Sedang Direvisi'
  | 'Menunggu Respon Klien'
  | 'Selesai'
  | 'Dibatalkan (Belum Dikerjakan)'
  | 'Dibatalkan (Sudah Dikerjakan)'
  | 'Tidak Puas (Refund 50%)'
  | 'Ditutup (Tanpa Refund)'
  | 'Perlu Tinjauan Owner'
  | 'Sedang Dikerjakan'
  | 'Siap Kirim Pratinjau'
  | 'Eskalasi: Revisi di Luar Lingkup';

// Struktur data baru sesuai spesifikasi
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
  status_refund: 'Sudah' | 'Belum' | '';
  log_aktivitas: {
    aksi: string;
    oleh: 'klien' | 'owner' | 'desainer' | 'sistem';
    waktu: string;
  }[];
  timestamp: string;

  // Fields tambahan yang diperlukan oleh UI
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
  position: 'Top Banner' | 'Hero Section' | 'Popup' | 'Footer';
  period: string;
  status: 'Aktif' | 'Draft' | 'Selesai';
  image?: string;
  content: string;
  type: 'Image' | 'Text';
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
