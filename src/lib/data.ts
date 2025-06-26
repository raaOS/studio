import type { BudgetItem, Service, Order, Promo, Coupon, Banner, AdminUser, DriveActivityLog, CalendarActivityLog, MeetActivityLog, Category, CustomerProfile, OrderStatus } from '@/lib/types';
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

export const mockOrders: Order[] = [
  {
    kode_order: 'DSN-240520-A1',
    nama_klien: 'John Doe',
    customerTelegram: '@johndoe',
    items: [
      { name: 'Desain Kartu Nama', quantity: 2, price: 30000, brief: {'Nama Brand': 'Kopi Senja', 'Slogan': 'Secangkir cerita di kala senja', 'Warna yang diinginkan': 'Coklat, oranye, dan krem'} },
      { name: 'Desain Kop Surat (Letterhead)', quantity: 1, price: 28000, brief: {'Nama & Jabatan': 'John Doe, Owner', 'Informasi Kontak': '0812345678, kopi.senja@email.com', 'Alamat': 'Jl. Kenangan No. 10, Jakarta'} },
    ],
    jumlah_transfer: 88000,
    total_harga: 88000,
    tipe_pembayaran: 'LUNAS',
    paymentStatus: 'Lunas',
    status_pesanan: 'Masuk Antrian',
    timestamp: '2024-05-20T10:00:00Z',
    budget: 'UMKM',
    pekan: 'W1',
    driveFolderUrl: '/uploads/orders/DSN-240520-A1',
    potongan_refund: 0,
    jenis_potongan: '',
    total_refund: 0,
    status_refund: '',
    log_aktivitas: [
        { aksi: "Pesanan dibuat oleh klien", oleh: 'klien', waktu: '2024-05-20 10:00' },
        { aksi: "Pembayaran divalidasi", oleh: 'owner', waktu: '2024-05-20 11:30' }
    ]
  },
  {
    kode_order: 'DSN-240522-B2',
    nama_klien: 'Jane Smith',
    customerTelegram: '@janesmith',
    items: [
      { name: 'Desain Konten Feed (Single Post)', quantity: 5, price: 15000, brief: {'Tema Konten': 'Promosi diskon 50% untuk produk fashion.', 'Platform': 'Instagram & Facebook', 'Call to Action': 'Belanja sekarang, klik link di bio!'} },
    ],
    jumlah_transfer: 37500,
    total_harga: 75000,
    tipe_pembayaran: 'DP',
    paymentStatus: 'DP',
    status_pesanan: 'Sedang Dikerjakan',
    timestamp: '2024-05-22T14:00:00Z',
    budget: 'Kaki Lima',
    pekan: 'W1',
    driveFolderUrl: '/uploads/orders/DSN-240522-B2',
    potongan_refund: 0,
    jenis_potongan: '',
    total_refund: 0,
    status_refund: '',
    log_aktivitas: [
        { aksi: "Pesanan dibuat", oleh: 'klien', waktu: '2024-05-22 13:00' },
        { aksi: "Pembayaran DP divalidasi", oleh: 'owner', waktu: '2024-05-22 13:30' },
        { aksi: "Status diubah ke 'Sedang Dikerjakan'", oleh: 'desainer', waktu: '2024-05-22 14:00' }
    ]
  },
  {
    kode_order: 'DSN-240528-C1',
    nama_klien: 'Eko Prasetyo',
    customerTelegram: '@ekopras',
    items: [
      { name: 'Desain Konten Carousel (3 Slide)', quantity: 1, price: 180000, brief: { 'Detail': 'Carousel untuk produk mobil baru' } },
    ],
    jumlah_transfer: 180000,
    total_harga: 180000,
    tipe_pembayaran: 'LUNAS',
    paymentStatus: 'Lunas',
    status_pesanan: 'Dibatalkan (Sudah Dikerjakan)',
    timestamp: '2024-05-28T11:00:00Z',
    budget: 'E-Comm',
    pekan: 'W3',
    driveFolderUrl: '/uploads/orders/DSN-240528-C1',
    potongan_refund: 90000, // 50% dari total_harga
    jenis_potongan: 'Sudah Masuk Produksi',
    total_refund: 90000,
    status_refund: 'Sudah',
    log_aktivitas: [
        { aksi: "Pesanan dibuat", oleh: 'klien', waktu: '2024-05-28 09:00' },
        { aksi: "Status diubah ke 'Sedang Dikerjakan'", oleh: 'desainer', waktu: '2024-05-28 10:00' },
        { aksi: "Pesanan dibatalkan oleh klien", oleh: 'klien', waktu: '2024-05-28 11:00' }
    ]
  },
  {
    kode_order: 'DSN-240527-D4',
    nama_klien: 'Rina Wati',
    customerTelegram: '@rinawati',
    items: [
      { name: 'Desain Buku Menu', quantity: 1, price: 60000, brief: { 'Detail': 'Menu untuk restoran seafood' } },
    ],
    jumlah_transfer: 30000,
    total_harga: 60000,
    tipe_pembayaran: 'DP',
    paymentStatus: 'DP',
    status_pesanan: 'Dibatalkan (Belum Dikerjakan)',
    timestamp: '2024-05-27T16:00:00Z',
    budget: 'UMKM',
    pekan: 'W3',
    driveFolderUrl: undefined,
    potongan_refund: 0,
    jenis_potongan: 'DP Hangus',
    total_refund: 0,
    status_refund: 'Sudah',
    log_aktivitas: [
        { aksi: "Pesanan dibuat", oleh: 'klien', waktu: '2024-05-27 15:00' },
        { aksi: "Pesanan dibatalkan oleh klien", oleh: 'klien', waktu: '2024-05-27 16:00' },
    ]
  },
];

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
