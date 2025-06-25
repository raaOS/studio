import type { BudgetItem, Service, Order, Promo, Coupon, Banner, AdminUser, DriveActivityLog, CalendarActivityLog, MeetActivityLog } from '@/lib/types';
import { Briefcase, ShoppingCart, Store } from 'lucide-react';

export const budgetItems: BudgetItem[] = [
  {
    id: 'kaki-lima',
    title: 'Budget Kaki Lima',
    description: 'Cocok untuk usaha rintisan dan kebutuhan personal dengan budget terjangkau.',
    priceRange: 'Mulai dari Rp 35K',
    icon: Store,
  },
  {
    id: 'umkm',
    title: 'Budget UMKM',
    description: 'Untuk UMKM dan startup yang ingin membangun identitas brand yang kuat.',
    priceRange: 'Mulai dari Rp 70K',
    icon: Briefcase,
  },
  {
    id: 'e-comm',
    title: 'Budget E-Commerce',
    description: 'Paket komprehensif untuk bisnis e-commerce yang butuh aset visual lengkap.',
    priceRange: 'Mulai dari Rp 120K',
    icon: ShoppingCart,
  },
];

export const services: Service[] = [
    // Kategori: Branding
  {
    id: 'logo-design',
    name: 'Logo Design',
    prices: { 'kaki-lima': 75000, 'umkm': 150000, 'e-comm': 300000 },
    image: 'https://placehold.co/400x300',
    category: 'Branding',
  },
  {
    id: 'company-profile',
    name: 'Company Profile',
    prices: { 'kaki-lima': 100000, 'umkm': 200000, 'e-comm': 400000 },
    image: 'https://placehold.co/400x300',
    category: 'Branding',
  },
  {
    id: 'brand-guideline',
    name: 'Brand Guideline',
    prices: { 'kaki-lima': 150000, 'umkm': 300000, 'e-comm': 600000 },
    image: 'https://placehold.co/400x300',
    category: 'Branding',
  },
  {
    id: 'business-card',
    name: 'Business Card',
    prices: { 'kaki-lima': 50000, 'umkm': 100000, 'e-comm': 150000 },
    image: 'https://placehold.co/400x300',
    category: 'Branding',
  },
  // Kategori: Marketing & Promosi
  {
    id: 'social-media-feeds',
    name: 'Social Media Feeds',
    prices: { 'kaki-lima': 35000, 'umkm': 70000, 'e-comm': 120000 },
    image: 'https://placehold.co/400x300',
    category: 'Marketing & Promosi',
  },
  {
    id: 'social-media-banner',
    name: 'Social Media Banner',
    prices: { 'kaki-lima': 40000, 'umkm': 80000, 'e-comm': 130000 },
    image: 'https://placehold.co/400x300',
    category: 'Marketing & Promosi',
  },
  {
    id: 'flyer',
    name: 'Flyer',
    prices: { 'kaki-lima': 60000, 'umkm': 120000, 'e-comm': 200000 },
    image: 'https://placehold.co/400x300',
    category: 'Marketing & Promosi',
  },
  {
    id: 'poster',
    name: 'Poster',
    prices: { 'kaki-lima': 65000, 'umkm': 130000, 'e-comm': 220000 },
    image: 'https://placehold.co/400x300',
    category: 'Marketing & Promosi',
  },
  {
    id: 'banner-spanduk',
    name: 'Banner/Spanduk',
    prices: { 'kaki-lima': 80000, 'umkm': 160000, 'e-comm': 280000 },
    image: 'https://placehold.co/400x300',
    category: 'Marketing & Promosi',
  },
  {
    id: 'menu-book',
    name: 'Menu Book',
    prices: { 'kaki-lima': 90000, 'umkm': 180000, 'e-comm': 350000 },
    image: 'https://placehold.co/400x300',
    category: 'Marketing & Promosi',
  },
  // Kategori: Desain Produk
  {
    id: 'packaging',
    name: 'Packaging',
    prices: { 'kaki-lima': 120000, 'umkm': 250000, 'e-comm': 500000 },
    image: 'https://placehold.co/400x300',
    category: 'Desain Produk',
  },
  {
    id: 'label-design',
    name: 'Label Design',
    prices: { 'kaki-lima': 45000, 'umkm': 90000, 'e-comm': 160000 },
    image: 'https://placehold.co/400x300',
    category: 'Desain Produk',
  },
  {
    id: 'pouch-design',
    name: 'Pouch Design',
    prices: { 'kaki-lima': 70000, 'umkm': 140000, 'e-comm': 250000 },
    image: 'https://placehold.co/400x300',
    category: 'Desain Produk',
  },
  // Kategori: Digital & Web
  {
    id: 'menu-digital',
    name: 'Menu Digital',
    prices: { 'kaki-lima': 60000, 'umkm': 120000, 'e-comm': 200000 },
    image: 'https://placehold.co/400x300',
    category: 'Digital & Web',
  },
  {
    id: 'katalog-digital',
    name: 'Katalog Digital',
    prices: { 'kaki-lima': 100000, 'umkm': 200000, 'e-comm': 380000 },
    image: 'https://placehold.co/400x300',
    category: 'Digital & Web',
  },
  // Kategori: Kreatif & Personal
  {
    id: 'illustrasi',
    name: 'Illustrasi',
    prices: { 'kaki-lima': 150000, 'umkm': 300000, 'e-comm': 600000 },
    image: 'https://placehold.co/400x300',
    category: 'Kreatif & Personal',
  },
  {
    id: 'tshirt-design',
    name: 'T-shirt Design',
    prices: { 'kaki-lima': 85000, 'umkm': 170000, 'e-comm': 300000 },
    image: 'https://placehold.co/400x300',
    category: 'Kreatif & Personal',
  },
  {
    id: 'cv',
    name: 'CV',
    prices: { 'kaki-lima': 50000, 'umkm': 100000, 'e-comm': 150000 },
    image: 'https://placehold.co/400x300',
    category: 'Kreatif & Personal',
  },
  {
    id: 'portofolio',
    name: 'Portofolio',
    prices: { 'kaki-lima': 100000, 'umkm': 200000, 'e-comm': 400000 },
    image: 'https://placehold.co/400x300',
    category: 'Kreatif & Personal',
  },
];


export const mockOrders: Order[] = [
  {
    id: '#001',
    customerName: 'John Doe',
    customerTelegram: '@johndoe',
    items: [
      { 
        name: 'Logo Design', 
        quantity: 2, 
        price: 150000, 
        brief: {
          'Nama Brand': 'Kopi Senja',
          'Slogan': 'Secangkir cerita di kala senja',
          'Warna yang diinginkan': 'Coklat, oranye, dan krem'
        }
      },
      { 
        name: 'Business Card', 
        quantity: 1, 
        price: 75000,
        brief: {
          'Nama & Jabatan': 'John Doe, Owner',
          'Informasi Kontak': '0812345678, kopi.senja@email.com',
          'Alamat': 'Jl. Kenangan No. 10, Jakarta'
        }
      },
    ],
    total: 375000,
    paymentMethod: 'lunas',
    paymentStatus: 'Lunas',
    status: 'Antri',
    date: '2024-05-20',
    budget: 'UMKM',
    pekan: 'W1',
  },
  {
    id: '#002',
    customerName: 'Jane Smith',
    customerTelegram: '@janesmith',
    items: [
      { 
        name: 'Social Media Feeds', 
        quantity: 5, 
        price: 80000,
        brief: {
          'Tema Konten': 'Promosi diskon 50% untuk produk fashion.',
          'Platform': 'Instagram & Facebook',
          'Call to Action': 'Belanja sekarang, klik link di bio!'
        }
      },
    ],
    total: 400000,
    paymentMethod: 'dp',
    paymentStatus: 'DP',
    status: 'Kerja',
    date: '2024-05-22',
    budget: 'Kaki Lima',
    pekan: 'W1',
  },
  {
    id: '#003',
    customerName: 'Bob Johnson',
    customerTelegram: '@bobjohnson',
    items: [
      { 
        name: 'Packaging', 
        quantity: 1, 
        price: 600000,
        brief: {
          'Deskripsi Produk': 'Keripik singkong aneka rasa',
          'Target Pasar': 'Anak muda, penyuka cemilan pedas',
          'Pesan yang ingin disampaikan': 'Renyah, gurih, bikin nagih!'
        }
      },
    ],
    total: 600000,
    paymentMethod: 'lunas',
    paymentStatus: 'Lunas',
    status: 'Revisi',
    date: '2024-05-23',
    budget: 'E-Comm',
    pekan: 'W2',
  },
  {
    id: '#004',
    customerName: 'Agus Setiawan',
    customerTelegram: '@agusset',
    items: [
        { 
          name: 'Banner/Spanduk', 
          quantity: 1, 
          price: 200000,
          brief: {
            'Ukuran Banner': '3x1 meter',
            'Teks Utama': 'Grand Opening Toko "Maju Jaya"',
            'Informasi Tambahan': 'Diskon 20% selama minggu pertama.'
          }
        },
    ],
    total: 200000,
    paymentMethod: 'dp',
    paymentStatus: 'Lunas',
    status: 'Selesai',
    date: '2024-05-24',
    budget: 'UMKM',
    pekan: 'W1',
  },
  {
    id: '#005',
    customerName: 'Siti Aminah',
    customerTelegram: '@sitiaminah',
    items: [
      { 
        name: 'Flyer', 
        quantity: 1, 
        price: 100000,
        brief: {
          'Judul': 'Promo Jasa Desain Grafis',
          'Isi': 'Diskon 30% untuk semua layanan',
        }
      },
    ],
    total: 100000,
    paymentMethod: 'lunas',
    paymentStatus: 'Belum Lunas',
    status: 'Antri',
    date: '2024-05-25',
    budget: 'Kaki Lima',
    pekan: 'W2',
  }
];

export const mockPromos: Promo[] = [
  {
    id: 'p1',
    productName: 'Logo Design',
    promoText: '20% OFF',
    period: '1-31 Des',
    status: 'Aktif',
  },
  {
    id: 'p2',
    productName: 'Business Card',
    promoText: 'Buy 2 Get 1',
    period: '15-25 Des',
    status: 'Aktif',
  },
  {
    id: 'p3',
    productName: 'Banner',
    promoText: '15% OFF',
    period: '1-15 Jan',
    status: 'Draft',
  },
];

export const mockCoupons: Coupon[] = [
  {
    id: 'c1',
    code: 'NEWBIE20',
    discount: '20%',
    usage: '15/50',
    period: '1-31 Des',
    status: 'Aktif',
  },
  {
    id: 'c2',
    code: 'LOYAL50',
    discount: 'Rp 50.000',
    usage: '3/10',
    period: '1-15 Jan',
    status: 'Aktif',
  },
  {
    id: 'c3',
    code: 'XMAS2024',
    discount: '25%',
    usage: '0/100',
    period: '20-26 Des',
    status: 'Draft',
  },
  {
    id: 'c4',
    code: 'FLASH1212',
    discount: 'Rp 12.000',
    usage: '100/100',
    period: '12 Des',
    status: 'Expired',
  },
];

export const mockBanners: Banner[] = [
  {
    id: 'b1',
    name: 'Promo Akhir Tahun',
    position: 'Top Banner',
    period: '1-31 Des',
    status: 'Aktif',
    type: 'Text',
    content: '🎉 PROMO AKHIR TAHUN - DISKON 25% SEMUA LAYANAN! 🎉 Gunakan kode: YEAR2024 | Berlaku s/d 31 Desember',
  },
  {
    id: 'b2',
    name: 'Promo Tahun Baru',
    position: 'Top Banner',
    period: '1-15 Jan',
    status: 'Draft',
    type: 'Image',
    image: 'https://placehold.co/800x100.png',
    content: 'Selamat Tahun Baru 2025!',
  },
  {
    id: 'b3',
    name: 'Promo Valentine',
    position: 'Popup',
    period: '1-14 Feb',
    status: 'Draft',
    type: 'Text',
    content: '💖 Spesial Valentine, diskon 14% untuk semua paket branding! 💖',
  },
];

export const mockAdminUsers: AdminUser[] = [
  {
    id: 'user-1',
    name: 'Admin Utama',
    email: 'admin@designflow.com',
    role: 'Admin',
    status: 'Active',
    avatar: 'https://placehold.co/40x40.png'
  },
  {
    id: 'user-2',
    name: 'Desainer Hebat',
    email: 'desainer@designflow.com',
    role: 'Designer',
    status: 'Active',
    avatar: 'https://placehold.co/40x40.png'
  },
  {
    id: 'user-3',
    name: 'Marketer Pro',
    email: 'marketing@designflow.com',
    role: 'Marketing',
    status: 'Active',
    avatar: 'https://placehold.co/40x40.png'
  },
  {
    id: 'user-4',
    name: 'User Nonaktif',
    email: 'nonaktif@designflow.com',
    role: 'Designer',
    status: 'Inactive',
    avatar: 'https://placehold.co/40x40.png'
  }
];

export const mockDriveActivityLogs: DriveActivityLog[] = [
  { id: 'd1', orderId: '#002', activity: 'Folder Created', timestamp: '2024-05-22 10:05 AM', user: 'System' },
  { id: 'd2', orderId: '#002', activity: 'File Uploaded: initial_brief.pdf', timestamp: '2024-05-22 10:06 AM', user: 'System' },
  { id: 'd3', orderId: '#003', activity: 'Folder Created', timestamp: '2024-05-23 09:00 AM', user: 'System' },
  { id: 'd4', orderId: '#004', activity: 'Folder Created', timestamp: '2024-05-24 11:30 AM', user: 'System' },
  { id: 'd5', orderId: '#004', activity: 'File Uploaded: final_assets.zip', timestamp: '2024-05-25 04:15 PM', user: 'Admin' },
];

export const mockCalendarActivityLogs: CalendarActivityLog[] = [
  { id: 'c1', orderId: '#002', activity: 'Event Created: "Deadline: Social Media Post..."', timestamp: '2024-05-22 10:10 AM', trigger: 'Order Status Change' },
  { id: 'c2', orderId: '#003', activity: 'Event Created: "Deadline: Packaging Design..."', timestamp: '2024-05-23 09:05 AM', trigger: 'Order Status Change' },
  { id: 'c3', orderId: '#003', activity: 'Event Created: "Meeting: DesignFlow - Bob..."', timestamp: '2024-05-23 09:30 AM', trigger: 'Manual Scheduling' },
  { id: 'c4', orderId: '#004', activity: 'Event Created: "Deadline: Banner/Spanduk..."', timestamp: '2024-05-24 11:35 AM', trigger: 'Order Status Change' },
];

export const mockMeetActivityLogs: MeetActivityLog[] = [
  { id: 'm1', orderId: '#003', activity: 'Meeting Scheduled: "Konsultasi Revisi..."', timestamp: '2024-05-23 10:00 AM', trigger: 'Revisi > 2x' },
  { id: 'm2', orderId: '#001', activity: 'Meeting Scheduled: "Kickoff Meeting..."', timestamp: '2024-05-20 11:00 AM', trigger: 'Pesanan Baru' },
];
