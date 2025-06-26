import type { BudgetItem, Service, Order, Promo, Coupon, Banner, AdminUser, DriveActivityLog, CalendarActivityLog, MeetActivityLog, Category, CustomerProfile, OrderStatus } from '@/lib/types';

export const budgetItems: BudgetItem[] = [
  {
    id: 'kaki-lima',
    title: 'Budget Kaki Lima',
    description: 'Buat yang baru mulai atau iseng-iseng. Sat-set, harga bestie.',
    priceRange: 'Mulai dari Rp 15K',
    image: 'https://placehold.co/128x128.png',
    dataAiHint: 'street stall'
  },
  {
    id: 'umkm',
    title: 'Budget UMKM',
    description: 'Level up-in brand kamu. Biar makin pro dan dikenal luas.',
    priceRange: 'Mulai dari Rp 25K',
    image: 'https://placehold.co/128x128.png',
    dataAiHint: 'small business'
  },
  {
    id: 'e-comm',
    title: 'Budget E-Commerce',
    description: 'Paket all-in buat para suhu e-comm. Visual auto-gacor.',
    priceRange: 'Mulai dari Rp 65K',
    image: 'https://placehold.co/128x128.png',
    dataAiHint: 'online shopping'
  },
];

export const mockCategories: Category[] = [
  { id: 'konten-medsos', name: 'Konten Media Sosial' },
  { id: 'branding-kantor', name: 'Branding & Kantor' },
  { id: 'materi-promosi', name: 'Materi Promosi' },
  { id: 'desain-digital-event', name: 'Desain Digital & Event' },
];

export const services: Service[] = [
  // Kategori: Konten Media Sosial
  {
    id: 'desain-konten-feed',
    name: 'Desain Konten Feed (Single Post)',
    prices: { 'kaki-lima': 15000, 'umkm': 25000, 'e-comm': 70000 },
    image: 'https://placehold.co/400x300/FF5733/FFFFFF.png',
    category: 'konten-medsos',
    dataAiHint: 'social media',
  },
  {
    id: 'desain-konten-carousel',
    name: 'Desain Konten Carousel (3 Slide)',
    prices: { 'kaki-lima': 30000, 'umkm': 60000, 'e-comm': 180000 },
    image: 'https://placehold.co/400x300/33FF57/FFFFFF.png',
    category: 'konten-medsos',
    dataAiHint: 'social media',
  },
  {
    id: 'desain-konten-story',
    name: 'Desain Konten Story (Vertikal)',
    prices: { 'kaki-lima': 15000, 'umkm': 25000, 'e-comm': 70000 },
    image: 'https://placehold.co/400x300/3357FF/FFFFFF.png',
    category: 'konten-medsos',
    dataAiHint: 'instagram story',
  },
  {
    id: 'desain-frame-foto-profil',
    name: 'Desain Frame Foto Profil (Twibbon)',
    prices: { 'kaki-lima': 18000, 'umkm': 35000, 'e-comm': 80000 },
    image: 'https://placehold.co/400x300/FF33A1/FFFFFF.png',
    category: 'konten-medsos',
    dataAiHint: 'profile frame',
  },
  // Kategori: Branding & Kantor
  {
    id: 'desain-kop-surat',
    name: 'Desain Kop Surat (Letterhead)',
    prices: { 'kaki-lima': 15000, 'umkm': 28000, 'e-comm': 65000 },
    image: 'https://placehold.co/400x300/A133FF/FFFFFF.png',
    category: 'branding-kantor',
    dataAiHint: 'stationery branding',
  },
  {
    id: 'desain-kartu-nama',
    name: 'Desain Kartu Nama',
    prices: { 'kaki-lima': 18000, 'umkm': 30000, 'e-comm': 70000 },
    image: 'https://placehold.co/400x300/33FFA1/FFFFFF.png',
    category: 'branding-kantor',
    dataAiHint: 'business card',
  },
  {
    id: 'desain-sertifikat',
    name: 'Desain Sertifikat / Piagam',
    prices: { 'kaki-lima': 20000, 'umkm': 45000, 'e-comm': 105000 },
    image: 'https://placehold.co/400x300/FFC300/FFFFFF.png',
    category: 'branding-kantor',
    dataAiHint: 'certificate design',
  },
  {
    id: 'desain-lanyard',
    name: 'Desain Lanyard / Tali ID Card',
    prices: { 'kaki-lima': 20000, 'umkm': 35000, 'e-comm': 85000 },
    image: 'https://placehold.co/400x300/C70039/FFFFFF.png',
    category: 'branding-kantor',
    dataAiHint: 'lanyard design',
  },
  // Kategori: Materi Promosi
  {
    id: 'desain-poster-a4',
    name: 'Desain Poster (Ukuran A4)',
    prices: { 'kaki-lima': 22000, 'umkm': 50000, 'e-comm': 125000 },
    image: 'https://placehold.co/400x300/900C3F/FFFFFF.png',
    category: 'materi-promosi',
    dataAiHint: 'poster design',
  },
  {
    id: 'desain-buku-menu',
    name: 'Desain Buku Menu',
    prices: { 'kaki-lima': 25000, 'umkm': 60000, 'e-comm': 160000 },
    image: 'https://placehold.co/400x300/581845/FFFFFF.png',
    category: 'materi-promosi',
    dataAiHint: 'menu design',
  },
  {
    id: 'desain-undangan',
    name: 'Desain Undangan Digital / Cetak',
    prices: { 'kaki-lima': 25000, 'umkm': 60000, 'e-comm': 145000 },
    image: 'https://placehold.co/400x300/1ABC9C/FFFFFF.png',
    category: 'materi-promosi',
    dataAiHint: 'invitation design',
  },
  {
    id: 'desain-brosur',
    name: 'Desain Brosur / Pamflet Promosi',
    prices: { 'kaki-lima': 35000, 'umkm': 75000, 'e-comm': 195000 },
    image: 'https://placehold.co/400x300/2ECC71/FFFFFF.png',
    category: 'materi-promosi',
    dataAiHint: 'brochure design',
  },
  {
    id: 'desain-x-banner',
    name: 'Desain X-Banner',
    prices: { 'kaki-lima': 35000, 'umkm': 75000, 'e-comm': 185000 },
    image: 'https://placehold.co/400x300/3498DB/FFFFFF.png',
    category: 'materi-promosi',
    dataAiHint: 'banner stand',
  },
  {
    id: 'desain-spanduk',
    name: 'Desain Spanduk / Banner Outdoor',
    prices: { 'kaki-lima': 40000, 'umkm': 85000, 'e-comm': 210000 },
    image: 'https://placehold.co/400x300/9B59B6/FFFFFF.png',
    category: 'materi-promosi',
    dataAiHint: 'outdoor banner',
  },
  {
    id: 'desain-roll-up-banner',
    name: 'Desain Roll-Up Banner',
    prices: { 'kaki-lima': 45000, 'umkm': 90000, 'e-comm': 240000 },
    image: 'https://placehold.co/400x300/34495E/FFFFFF.png',
    category: 'materi-promosi',
    dataAiHint: 'rollup banner',
  },
  // Kategori: Desain Digital & Event
  {
    id: 'desain-sampul-ebook',
    name: 'Desain Sampul E-book',
    prices: { 'kaki-lima': 35000, 'umkm': 70000, 'e-comm': 175000 },
    image: 'https://placehold.co/400x300/F1C40F/FFFFFF.png',
    category: 'desain-digital-event',
    dataAiHint: 'ebook cover',
  },
  {
    id: 'desain-gate-acara',
    name: 'Desain Gerbang Acara (Gate)',
    prices: { 'kaki-lima': 70000, 'umkm': 150000, 'e-comm': 375000 },
    image: 'https://placehold.co/400x300/E67E22/FFFFFF.png',
    category: 'desain-digital-event',
    dataAiHint: 'event gate',
  },
  {
    id: 'desain-slide-presentasi',
    name: 'Desain Slide Presentasi (PPT)',
    prices: { 'kaki-lima': 70000, 'umkm': 150000, 'e-comm': 425000 },
    image: 'https://placehold.co/400x300/E74C3C/FFFFFF.png',
    category: 'desain-digital-event',
    dataAiHint: 'presentation slide',
  },
  {
    id: 'desain-visual-landing-page',
    name: 'Desain Visual Landing Page',
    prices: { 'kaki-lima': 125000, 'umkm': 350000, 'e-comm': 950000 },
    image: 'https://placehold.co/400x300/95A5A6/FFFFFF.png',
    category: 'desain-digital-event',
    dataAiHint: 'web page',
  },
];

export const allOrderStatusesCategorized: { label: string; statuses: OrderStatus[] }[] = [
    {
        label: 'Status Otomatis (Sistem)',
        statuses: [
            'Menunggu Pembayaran',
            'Masuk Antrian',
            'Masuk Antrian (Minggu Depan)',
            'Sedang Direvisi',
            'Menunggu Respon Klien',
            'Selesai',
            'Dibatalkan (Belum Dikerjakan)',
            'Dibatalkan (Sudah Dikerjakan)',
            'Tidak Puas (Refund 50%)',
            'Ditutup (Tanpa Refund)',
        ],
    },
    {
        label: 'Status Manual (Desainer)',
        statuses: [
            'Sedang Dikerjakan',
            'Siap Kirim Pratinjau',
            'Eskalasi: Revisi di Luar Lingkup',
        ],
    },
    {
        label: 'Status Intervensi (Owner)',
        statuses: ['Perlu Tinjauan Owner'],
    },
];

export const mockOrders: Order[] = [];

// Generate mock customer data from orders
const customerData = new Map<string, { id: string; name: string; email: string; telegram: string; totalOrders: number; ltv: number; lastOrderDate: string; avatar: string; }>();

mockOrders.forEach((order, index) => {
  const customerName = order.nama_klien;
  if (!customerData.has(customerName)) {
    customerData.set(customerName, {
      id: `cust-${index + 1}`,
      name: customerName,
      email: `${customerName.toLowerCase().replace(/\s/g, '.')}@example.com`,
      telegram: order.customerTelegram,
      totalOrders: 0,
      ltv: 0,
      lastOrderDate: '1970-01-01',
      avatar: `https://i.pravatar.cc/40?u=${customerName}`
    });
  }

  const currentCustomer = customerData.get(customerName)!;
  currentCustomer.totalOrders += 1;
  currentCustomer.ltv += order.jumlah_transfer;
  if (order.timestamp > currentCustomer.lastOrderDate) {
    currentCustomer.lastOrderDate = order.timestamp;
  }
});

export const mockCustomers: CustomerProfile[] = Array.from(customerData.values());

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
