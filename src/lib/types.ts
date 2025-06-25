export type BudgetItem = {
  id: 'kaki-lima' | 'umkm' | 'e-comm';
  title: string;
  description: string;
  priceRange: string;
  icon: React.ElementType;
};

export type Service = {
  id: string;
  name: string;
  price: number;
  image: string;
  budgets: Array<BudgetItem['id']>;
  category: string;
};

export type CartItem = {
  id: string;
  name: string;
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

export type OrderStatus = 'Antri' | 'Kerja' | 'Revisi' | 'Selesai' | 'Batal';

export type Order = {
  id: string;
  customerName: string;
  customerTelegram: string;
  items: {
    name: string;
    quantity: number;
    price: number;
    brief: Record<string, string>;
  }[];
  total: number;
  paymentMethod: 'dp' | 'lunas';
  paymentStatus: string;
  status: OrderStatus;
  date: string;
  budget: 'Kaki Lima' | 'UMKM' | 'E-Comm';
  pekan: 'W1' | 'W2' | 'W3' | 'W4';
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
