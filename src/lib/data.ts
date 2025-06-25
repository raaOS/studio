import type { BudgetItem, Service, Order, Promo, Coupon, Banner, AdminUser, DriveActivityLog, CalendarActivityLog, MeetActivityLog } from '@/lib/types';
import { Briefcase, ShoppingCart, Store } from 'lucide-react';

export const budgetItems: BudgetItem[] = [
  {
    id: 'kaki-lima',
    title: 'Budget Kaki Lima',
    description: 'Cocok untuk usaha rintisan dan kebutuhan personal dengan budget terjangkau.',
    priceRange: 'Mulai dari Rp 15K',
    icon: Store,
  },
  {
    id: 'umkm',
    title: 'Budget UMKM',
    description: 'Untuk UMKM dan startup yang ingin membangun identitas brand yang kuat.',
    priceRange: 'Mulai dari Rp 25K',
    icon: Briefcase,
  },
  {
    id: 'e-comm',
    title: 'Budget E-Commerce',
    description: 'Paket komprehensif untuk bisnis e-commerce yang butuh aset visual lengkap.',
    priceRange: 'Mulai dari Rp 65K',
    icon: ShoppingCart,
  },
];

export const services: Service[] = [
  // Kategori: Konten Media Sosial
  {
    id: 'desain-konten-feed',
    name: 'Desain Konten Feed (Single Post)',
    prices: { 'kaki-lima': 15000, 'umkm': 25000, 'e-comm': 70000 },
    image: 'https://placehold.co/400x300/FF5733/FFFFFF.png',
    category: 'Konten Media Sosial',
    dataAiHint: 'social media',
  },
  {
    id: 'desain-konten-carousel',
    name: 'Desain Konten Carousel (3 Slide)',
    prices: { 'kaki-lima': 30000, 'umkm': 60000, 'e-comm': 180000 },
    image: 'https://placehold.co/400x300/33FF57/FFFFFF.png',
    category: 'Konten Media Sosial',
    dataAiHint: 'social media',
  },
  {
    id: 'desain-konten-story',
    name: 'Desain Konten Story (Vertikal)',
    prices: { 'kaki-lima': 15000, 'umkm': 25000, 'e-comm': 70000 },
    image: 'https://placehold.co/400x300/3357FF/FFFFFF.png',
    category: 'Konten Media Sosial',
    dataAiHint: 'instagram story',
  },
  {
    id: 'desain-frame-foto-profil',
    name: 'Desain Frame Foto Profil (Twibbon)',
    prices: { 'kaki-lima': 18000, 'umkm': 35000, 'e-comm': 80000 },
    image: 'https://placehold.co/400x300/FF33A1/FFFFFF.png',
    category: 'Konten Media Sosial',
    dataAiHint: 'profile frame',
  },
  // Kategori: Branding & Kantor
  {
    id: 'desain-kop-surat',
    name: 'Desain Kop Surat (Letterhead)',
    prices: { 'kaki-lima': 15000, 'umkm': 28000, 'e-comm': 65000 },
    image: 'https://placehold.co/400x300/A133FF/FFFFFF.png',
    category: 'Branding & Kantor',
    dataAiHint: 'stationery branding',
  },
  {
    id: 'desain-kartu-nama',
    name: 'Desain Kartu Nama',
    prices: { 'kaki-lima': 18000, 'umkm': 30000, 'e-comm': 70000 },
    image: 'https://placehold.co/400x300/33FFA1/FFFFFF.png',
    category: 'Branding & Kantor',
    dataAiHint: 'business card',
  },
  {
    id: 'desain-sertifikat',
    name: 'Desain Sertifikat / Piagam',
    prices: { 'kaki-lima': 20000, 'umkm': 45000, 'e-comm': 105000 },
    image: 'https://placehold.co/400x300/FFC300/FFFFFF.png',
    category: 'Branding & Kantor',
    dataAiHint: 'certificate design',
  },
  {
    id: 'desain-lanyard',
    name: 'Desain Lanyard / Tali ID Card',
    prices: { 'kaki-lima': 20000, 'umkm': 35000, 'e-comm': 85000 },
    image: 'https://placehold.co/400x300/C70039/FFFFFF.png',
    category: 'Branding & Kantor',
    dataAiHint: 'lanyard design',
  },
  // Kategori: Materi Promosi
  {
    id: 'desain-poster-a4',
    name: 'Desain Poster (Ukuran A4)',
    prices: { 'kaki-lima': 22000, 'umkm': 50000, 'e-comm': 125000 },
    image: 'https://placehold.co/400x300/900C3F/FFFFFF.png',
    category: 'Materi Promosi',
    dataAiHint: 'poster design',
  },
  {
    id: 'desain-buku-menu',
    name: 'Desain Buku Menu',
    prices: { 'kaki-lima': 25000, 'umkm': 60000, 'e-comm': 160000 },
    image: 'https://placehold.co/400x300/581845/FFFFFF.png',
    category: 'Materi Promosi',
    dataAiHint: 'menu design',
  },
  {
    id: 'desain-undangan',
    name: 'Desain Undangan Digital / Cetak',
    prices: { 'kaki-lima': 25000, 'umkm': 60000, 'e-comm': 145000 },
    image: 'https://placehold.co/400x300/1ABC9C/FFFFFF.png',
    category: 'Materi Promosi',
    dataAiHint: 'invitation design',
  },
  {
    id: 'desain-brosur',
    name: 'Desain Brosur / Pamflet Promosi',
    prices: { 'kaki-lima': 35000, 'umkm': 75000, 'e-comm': 195000 },
    image: 'https://placehold.co/400x300/2ECC71/FFFFFF.png',
    category: 'Materi Promosi',
    dataAiHint: 'brochure design',
  },
  {
    id: 'desain-x-banner',
    name: 'Desain X-Banner',
    prices: { 'kaki-lima': 35000, 'umkm': 75000, 'e-comm': 185000 },
    image: 'https://placehold.co/400x300/3498DB/FFFFFF.png',
    category: 'Materi Promosi',
    dataAiHint: 'banner stand',
  },
  {
    id: 'desain-spanduk',
    name: 'Desain Spanduk / Banner Outdoor',
    prices: { 'kaki-lima': 40000, 'umkm': 85000, 'e-comm': 210000 },
    image: 'https://placehold.co/400x300/9B59B6/FFFFFF.png',
    category: 'Materi Promosi',
    dataAiHint: 'outdoor banner',
  },
  {
    id: 'desain-roll-up-banner',
    name: 'Desain Roll-Up Banner',
    prices: { 'kaki-lima': 45000, 'umkm': 90000, 'e-comm': 240000 },
    image: 'https://placehold.co/400x300/34495E/FFFFFF.png',
    category: 'Materi Promosi',
    dataAiHint: 'rollup banner',
  },
  // Kategori: Desain Digital & Event
  {
    id: 'desain-sampul-ebook',
    name: 'Desain Sampul E-book',
    prices: { 'kaki-lima': 35000, 'umkm': 70000, 'e-comm': 175000 },
    image: 'https://placehold.co/400x300/F1C40F/FFFFFF.png',
    category: 'Desain Digital & Event',
    dataAiHint: 'ebook cover',
  },
  {
    id: 'desain-gate-acara',
    name: 'Desain Gerbang Acara (Gate)',
    prices: { 'kaki-lima': 70000, 'umkm': 150000, 'e-comm': 375000 },
    image: 'https://placehold.co/400x300/E67E22/FFFFFF.png',
    category: 'Desain Digital & Event',
    dataAiHint: 'event gate',
  },
  {
    id: 'desain-slide-presentasi',
    name: 'Desain Slide Presentasi (PPT)',
    prices: { 'kaki-lima': 70000, 'umkm': 150000, 'e-comm': 425000 },
    image: 'https://placehold.co/400x300/E74C3C/FFFFFF.png',
    category: 'Desain Digital & Event',
    dataAiHint: 'presentation slide',
  },
  {
    id: 'desain-visual-landing-page',
    name: 'Desain Visual Landing Page',
    prices: { 'kaki-lima': 125000, 'umkm': 350000, 'e-comm': 950000 },
    image: 'https://placehold.co/400x300/95A5A6/FFFFFF.png',
    category: 'Desain Digital & Event',
    dataAiHint: 'web page',
  },
];


export const mockOrders: Order[] = [
  {
    id: '#001',
    customerName: 'John Doe',
    customerTelegram: '@johndoe',
    items: [
      { 
        name: 'Desain Kartu Nama', 
        quantity: 2, 
        price: 30000, 
        brief: {
          'Nama Brand': 'Kopi Senja',
          'Slogan': 'Secangkir cerita di kala senja',
          'Warna yang diinginkan': 'Coklat, oranye, dan krem'
        }
      },
      { 
        name: 'Desain Kop Surat (Letterhead)', 
        quantity: 1, 
        price: 28000,
        brief: {
          'Nama & Jabatan': 'John Doe, Owner',
          'Informasi Kontak': '0812345678, kopi.senja@email.com',
          'Alamat': 'Jl. Kenangan No. 10, Jakarta'
        }
      },
    ],
    total: 88000,
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
        name: 'Desain Konten Feed (Single Post)', 
        quantity: 5, 
        price: 15000,
        brief: {
          'Tema Konten': 'Promosi diskon 50% untuk produk fashion.',
          'Platform': 'Instagram & Facebook',
          'Call to Action': 'Belanja sekarang, klik link di bio!'
        }
      },
    ],
    total: 75000,
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
        name: 'Desain Visual Landing Page', 
        quantity: 1, 
        price: 950000,
        brief: {
          'Deskripsi Produk': 'Keripik singkong aneka rasa',
          'Target Pasar': 'Anak muda, penyuka cemilan pedas',
          'Pesan yang ingin disampaikan': 'Renyah, gurih, bikin nagih!'
        }
      },
    ],
    total: 950000,
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
          name: 'Desain Spanduk / Banner Outdoor', 
          quantity: 1, 
          price: 85000,
          brief: {
            'Ukuran Banner': '3x1 meter',
            'Teks Utama': 'Grand Opening Toko "Maju Jaya"',
            'Informasi Tambahan': 'Diskon 20% selama minggu pertama.'
          }
        },
    ],
    total: 85000,
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
        name: 'Desain Brosur / Pamflet Promosi', 
        quantity: 1, 
        price: 35000,
        brief: {
          'Judul': 'Promo Jasa Desain Grafis',
          'Isi': 'Diskon 30% untuk semua layanan',
        }
      },
    ],
    total: 35000,
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
    productName: 'Desain Konten Carousel',
    promoText: '20% OFF',
    period: '1-31 Des',
    status: 'Aktif',
  },
  {
    id: 'p2',
    productName: 'Desain Kartu Nama',
    promoText: 'Buy 2 Get 1',
    period: '15-25 Des',
    status: 'Aktif',
  },
  {
    id: 'p3',
    productName: 'Desain X-Banner',
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
