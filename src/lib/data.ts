
import type { BudgetItem, Service, Order, Promo, Coupon, Banner, AdminUser, DriveActivityLog, CalendarActivityLog, MeetActivityLog, Category, CustomerProfile, OrderStatus } from '@/lib/types';

export const budgetItems: BudgetItem[] = [
  {
    id: 'kaki-lima',
    title: 'Budget Kaki Lima',
    description: 'Buat yang baru mulai atau iseng-iseng. Sat-set, harga bestie.',
    image: 'https://placehold.co/40x40/f8fafc/64748b.png',
  },
  {
    id: 'umkm',
    title: 'Budget UMKM',
    description: 'Level up-in brand kamu. Biar makin pro dan dikenal luas.',
    image: 'https://placehold.co/40x40/f1f5f9/334155.png',
  },
  {
    id: 'e-comm',
    title: 'Budget E-Commerce',
    description: 'Paket all-in buat para suhu e-comm. Visual auto-gacor.',
    image: 'https://placehold.co/40x40/e2e8f0/1e293b.png',
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
    tierImages: {
      'kaki-lima': 'https://placehold.co/128x128/f8fafc/64748b.png',
      'umkm': 'https://placehold.co/128x128/f1f5f9/334155.png',
      'e-comm': 'https://placehold.co/128x128/e2e8f0/1e293b.png',
    },
    image: 'https://placehold.co/400x300.png',
    category: 'konten-medsos',
    dataAiHint: 'social media',
  },
  {
    id: 'desain-konten-carousel',
    name: 'Desain Konten Carousel (3 Slide)',
    prices: { 'kaki-lima': 30000, 'umkm': 60000, 'e-comm': 180000 },
    tierImages: {
      'kaki-lima': 'https://placehold.co/128x128/f8fafc/64748b.png',
      'umkm': 'https://placehold.co/128x128/f1f5f9/334155.png',
      'e-comm': 'https://placehold.co/128x128/e2e8f0/1e293b.png',
    },
    image: 'https://placehold.co/400x300.png',
    category: 'konten-medsos',
    dataAiHint: 'social media',
  },
  {
    id: 'desain-konten-story',
    name: 'Desain Konten Story (Vertikal)',
    prices: { 'kaki-lima': 15000, 'umkm': 25000, 'e-comm': 70000 },
    tierImages: {
      'kaki-lima': 'https://placehold.co/128x128/f8fafc/64748b.png',
      'umkm': 'https://placehold.co/128x128/f1f5f9/334155.png',
      'e-comm': 'https://placehold.co/128x128/e2e8f0/1e293b.png',
    },
    image: 'https://placehold.co/400x300.png',
    category: 'konten-medsos',
    dataAiHint: 'instagram story',
  },
  {
    id: 'desain-frame-foto-profil',
    name: 'Desain Frame Foto Profil (Twibbon)',
    prices: { 'kaki-lima': 18000, 'umkm': 35000, 'e-comm': 80000 },
    tierImages: {
      'kaki-lima': 'https://placehold.co/128x128/f8fafc/64748b.png',
      'umkm': 'https://placehold.co/128x128/f1f5f9/334155.png',
      'e-comm': 'https://placehold.co/128x128/e2e8f0/1e293b.png',
    },
    image: 'https://placehold.co/400x300.png',
    category: 'konten-medsos',
    dataAiHint: 'profile frame',
  },
  // Kategori: Branding & Kantor
  {
    id: 'desain-kop-surat',
    name: 'Desain Kop Surat',
    prices: { 'kaki-lima': 15000, 'umkm': 28000, 'e-comm': 65000 },
    tierImages: {
      'kaki-lima': 'https://placehold.co/128x128/f8fafc/64748b.png',
      'umkm': 'https://placehold.co/128x128/f1f5f9/334155.png',
      'e-comm': 'https://placehold.co/128x128/e2e8f0/1e293b.png',
    },
    image: 'https://placehold.co/400x300.png',
    category: 'branding-kantor',
    dataAiHint: 'stationery branding',
  },
  {
    id: 'desain-kartu-nama',
    name: 'Desain Kartu Nama',
    prices: { 'kaki-lima': 18000, 'umkm': 30000, 'e-comm': 70000 },
    tierImages: {
      'kaki-lima': 'https://placehold.co/128x128/f8fafc/64748b.png',
      'umkm': 'https://placehold.co/128x128/f1f5f9/334155.png',
      'e-comm': 'https://placehold.co/128x128/e2e8f0/1e293b.png',
    },
    image: 'https://placehold.co/400x300.png',
    category: 'branding-kantor',
    dataAiHint: 'business card',
  },
  {
    id: 'desain-sertifikat',
    name: 'Desain Sertifikat / Piagam',
    prices: { 'kaki-lima': 20000, 'umkm': 45000, 'e-comm': 105000 },
    tierImages: {
      'kaki-lima': 'https://placehold.co/128x128/f8fafc/64748b.png',
      'umkm': 'https://placehold.co/128x128/f1f5f9/334155.png',
      'e-comm': 'https://placehold.co/128x128/e2e8f0/1e293b.png',
    },
    image: 'https://placehold.co/400x300.png',
    category: 'branding-kantor',
    dataAiHint: 'certificate design',
  },
  {
    id: 'desain-lanyard',
    name: 'Desain Lanyard / Tali ID Card',
    prices: { 'kaki-lima': 20000, 'umkm': 35000, 'e-comm': 85000 },
    tierImages: {
      'kaki-lima': 'https://placehold.co/128x128/f8fafc/64748b.png',
      'umkm': 'https://placehold.co/128x128/f1f5f9/334155.png',
      'e-comm': 'https://placehold.co/128x128/e2e8f0/1e293b.png',
    },
    image: 'https://placehold.co/400x300.png',
    category: 'branding-kantor',
    dataAiHint: 'lanyard design',
  },
  // Kategori: Materi Promosi
  {
    id: 'desain-poster-a4',
    name: 'Desain Poster (Ukuran A4)',
    prices: { 'kaki-lima': 22000, 'umkm': 50000, 'e-comm': 125000 },
    tierImages: {
      'kaki-lima': 'https://placehold.co/128x128/f8fafc/64748b.png',
      'umkm': 'https://placehold.co/128x128/f1f5f9/334155.png',
      'e-comm': 'https://placehold.co/128x128/e2e8f0/1e293b.png',
    },
    image: 'https://placehold.co/400x300.png',
    category: 'materi-promosi',
    dataAiHint: 'poster design',
  },
  {
    id: 'desain-buku-menu',
    name: 'Desain Buku Menu',
    prices: { 'kaki-lima': 25000, 'umkm': 60000, 'e-comm': 160000 },
    tierImages: {
      'kaki-lima': 'https://placehold.co/128x128/f8fafc/64748b.png',
      'umkm': 'https://placehold.co/128x128/f1f5f9/334155.png',
      'e-comm': 'https://placehold.co/128x128/e2e8f0/1e293b.png',
    },
    image: 'https://placehold.co/400x300.png',
    category: 'materi-promosi',
    dataAiHint: 'menu design',
  },
  {
    id: 'desain-undangan',
    name: 'Desain Undangan Digital / Cetak',
    prices: { 'kaki-lima': 25000, 'umkm': 60000, 'e-comm': 145000 },
    tierImages: {
      'kaki-lima': 'https://placehold.co/128x128/f8fafc/64748b.png',
      'umkm': 'https://placehold.co/128x128/f1f5f9/334155.png',
      'e-comm': 'https://placehold.co/128x128/e2e8f0/1e293b.png',
    },
    image: 'https://placehold.co/400x300.png',
    category: 'materi-promosi',
    dataAiHint: 'invitation design',
  },
  {
    id: 'desain-brosur',
    name: 'Desain Brosur / Pamflet Promosi',
    prices: { 'kaki-lima': 35000, 'umkm': 75000, 'e-comm': 195000 },
    tierImages: {
      'kaki-lima': 'https://placehold.co/128x128/f8fafc/64748b.png',
      'umkm': 'https://placehold.co/128x128/f1f5f9/334155.png',
      'e-comm': 'https://placehold.co/128x128/e2e8f0/1e293b.png',
    },
    image: 'https://placehold.co/400x300.png',
    category: 'materi-promosi',
    dataAiHint: 'brochure design',
  },
  {
    id: 'desain-x-banner',
    name: 'Desain X-Banner',
    prices: { 'kaki-lima': 35000, 'umkm': 75000, 'e-comm': 185000 },
    tierImages: {
      'kaki-lima': 'https://placehold.co/128x128/f8fafc/64748b.png',
      'umkm': 'https://placehold.co/128x128/f1f5f9/334155.png',
      'e-comm': 'https://placehold.co/128x128/e2e8f0/1e293b.png',
    },
    image: 'https://placehold.co/400x300.png',
    category: 'materi-promosi',
    dataAiHint: 'banner stand',
  },
  {
    id: 'desain-spanduk',
    name: 'Desain Spanduk / Banner Outdoor',
    prices: { 'kaki-lima': 40000, 'umkm': 85000, 'e-comm': 210000 },
    tierImages: {
      'kaki-lima': 'https://placehold.co/128x128/f8fafc/64748b.png',
      'umkm': 'https://placehold.co/128x128/f1f5f9/334155.png',
      'e-comm': 'https://placehold.co/128x128/e2e8f0/1e293b.png',
    },
    image: 'https://placehold.co/400x300.png',
    category: 'materi-promosi',
    dataAiHint: 'outdoor banner',
  },
  {
    id: 'desain-roll-up-banner',
    name: 'Desain Roll-Up Banner',
    prices: { 'kaki-lima': 45000, 'umkm': 90000, 'e-comm': 240000 },
    tierImages: {
      'kaki-lima': 'https://placehold.co/128x128/f8fafc/64748b.png',
      'umkm': 'https://placehold.co/128x128/f1f5f9/334155.png',
      'e-comm': 'https://placehold.co/128x128/e2e8f0/1e293b.png',
    },
    image: 'https://placehold.co/400x300.png',
    category: 'materi-promosi',
    dataAiHint: 'rollup banner',
  },
  // Kategori: Desain Digital & Event
  {
    id: 'desain-sampul-ebook',
    name: 'Desain Sampul E-book',
    prices: { 'kaki-lima': 35000, 'umkm': 70000, 'e-comm': 175000 },
    tierImages: {
      'kaki-lima': 'https://placehold.co/128x128/f8fafc/64748b.png',
      'umkm': 'https://placehold.co/128x128/f1f5f9/334155.png',
      'e-comm': 'https://placehold.co/128x128/e2e8f0/1e293b.png',
    },
    image: 'https://placehold.co/400x300.png',
    category: 'desain-digital-event',
    dataAiHint: 'ebook cover',
  },
  {
    id: 'desain-gate-acara',
    name: 'Desain Gerbang Acara (Gate)',
    prices: { 'kaki-lima': 70000, 'umkm': 150000, 'e-comm': 375000 },
    tierImages: {
      'kaki-lima': 'https://placehold.co/128x128/f8fafc/64748b.png',
      'umkm': 'https://placehold.co/128x128/f1f5f9/334155.png',
      'e-comm': 'https://placehold.co/128x128/e2e8f0/1e293b.png',
    },
    image: 'https://placehold.co/400x300.png',
    category: 'desain-digital-event',
    dataAiHint: 'event gate',
  },
  {
    id: 'desain-slide-presentasi',
    name: 'Desain Slide Presentasi (PPT)',
    prices: { 'kaki-lima': 70000, 'umkm': 150000, 'e-comm': 425000 },
    tierImages: {
      'kaki-lima': 'https://placehold.co/128x128/f8fafc/64748b.png',
      'umkm': 'https://placehold.co/128x128/f1f5f9/334155.png',
      'e-comm': 'https://placehold.co/128x128/e2e8f0/1e293b.png',
    },
    image: 'https://placehold.co/400x300.png',
    category: 'desain-digital-event',
    dataAiHint: 'presentation slide',
  },
  {
    id: 'desain-visual-landing-page',
    name: 'Desain Visual Landing Page',
    prices: { 'kaki-lima': 125000, 'umkm': 350000, 'e-comm': 950000 },
    tierImages: {
      'kaki-lima': 'https://placehold.co/128x128/f8fafc/64748b.png',
      'umkm': 'https://placehold.co/128x128/f1f5f9/334155.png',
      'e-comm': 'https://placehold.co/128x128/e2e8f0/1e293b.png',
    },
    image: 'https://placehold.co/400x300.png',
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
    type: 'Image',
    image: 'https://placehold.co/1200x200.png',
    dataAiHint: 'sale banner',
    content: 'Promo diskon akhir tahun untuk semua layanan desain grafis.',
    href: '#catalog-section'
  },
  {
    id: 'b2',
    name: 'Branding UMKM',
    position: 'Top Banner',
    period: 'Bulan Ini',
    status: 'Aktif',
    type: 'Image',
    image: 'https://placehold.co/1200x200.png',
    dataAiHint: 'business branding',
    content: 'Tingkatkan brand UMKM Anda dengan paket branding lengkap dari kami.',
    href: '#catalog-section'
  },
  {
    id: 'b3',
    name: 'Desain Konten Medsos',
    position: 'Top Banner',
    period: 'Bulan Ini',
    status: 'Aktif',
    type: 'Image',
    image: 'https://placehold.co/1200x200.png',
    dataAiHint: 'social media design',
    content: 'Buat konten media sosial Anda lebih menarik dengan desain profesional.',
    href: '#catalog-section'
  },
  {
    id: 'b4',
    name: 'Kupon Bulan Depan',
    position: 'Info Card',
    period: 'Ongoing',
    status: 'Aktif',
    type: 'Text',
    icon: 'Gift',
    image: 'https://placehold.co/400x400.png',
    dataAiHint: 'coupon gift',
    content: 'Siap-siap! Bulan depan akan ada kupon spesial untuk pelanggan setia. Pastikan Anda sudah terdaftar di program loyalitas kami.',
    href: '#'
  },
  {
    id: 'b5',
    name: 'Promo Akhir Pekan',
    position: 'Info Card',
    period: 'Weekend',
    status: 'Aktif',
    type: 'Text',
    icon: 'Percent',
    image: 'https://placehold.co/400x400.png',
    dataAiHint: 'special offer',
    content: 'Dapatkan diskon tambahan 10% untuk semua desain konten media sosial setiap akhir pekan. Hubungi kami untuk info lebih lanjut!',
    href: '#'
  }
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
