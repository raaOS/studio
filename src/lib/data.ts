import type { BudgetItem, Service, Order, Promo, Coupon, Banner, AdminUser, DriveActivityLog, CalendarActivityLog, MeetActivityLog, Category, CustomerProfile, OrderStatus, MessageTemplate } from '@/lib/types';

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
    name: 'Konten Feed (Single Post)',
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
    name: 'Konten Carousel (3 Slide)',
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
    name: 'Konten Story (Vertikal)',
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
    name: 'Frame Foto Profil (Twibbon)',
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
    name: 'Kop Surat',
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
    name: 'Kartu Nama',
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
    name: 'Sertifikat / Piagam',
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
    name: 'Lanyard / Tali ID Card',
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
    name: 'Poster (Ukuran A4)',
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
    name: 'Buku Menu',
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
    name: 'Undangan Digital / Cetak',
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
    name: 'Brosur / Pamflet Promosi',
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
    name: 'X-Banner',
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
    name: 'Spanduk / Banner Outdoor',
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
    name: 'Roll-Up Banner',
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
    name: 'Sampul E-book',
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
    name: 'Gerbang Acara (Gate)',
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
    name: 'Slide Presentasi (PPT)',
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
    name: 'Visual Landing Page',
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
        label: 'Proses Aktif',
        statuses: [
            'Menunggu Pengerjaan',
            'Sedang Dikerjakan',
            'Menunggu Respon Klien',
            'Sedang Direvisi',
        ],
    },
    {
        label: 'Membutuhkan Tindakan',
        statuses: [
            'Menunggu Pembayaran',
            'Eskalasi',
            'Menunggu Jadwal Meeting',
        ],
    },
    {
        label: 'Status Final',
        statuses: [
            'Selesai',
            'Dibatalkan (Pra-Desain)',
            'Dibatalkan (Pasca-Desain)',
            'Ditutup (Tanpa Refund)',
        ],
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
];

export const mockDriveActivityLogs: DriveActivityLog[] = [
  { id: 'd1', orderId: '#002', activity: 'Folder Created', timestamp: '2024-05-22 10:05 AM', user: 'System' },
];

export const mockCalendarActivityLogs: CalendarActivityLog[] = [
  { id: 'c1', orderId: '#002', activity: 'Event Created: "Deadline: Social Media Post..."', timestamp: '2024-05-22 10:10 AM', trigger: 'Order Status Change' },
];

export const mockMeetActivityLogs: MeetActivityLog[] = [
  { id: 'm1', orderId: '#003', activity: 'Meeting Scheduled: "Konsultasi Revisi..."', timestamp: '2024-05-23 10:00 AM', trigger: 'Revisi > 2x' },
];

export const mockMessageTemplates: MessageTemplate[] = [
  {
    id: 'welcome_start',
    description: 'Pesan balasan saat pengguna baru mengirim /start tanpa payload pesanan.',
    content: 'Selamat datang di Urgent Studio Bot! 🤖\n\nUntuk memesan, silakan kembali ke website kami, isi keranjang Anda, dan klik tombol "Selesaikan via Telegram".',
    lastUpdated: '2024-05-20 09:00 AM',
  },
  {
    id: 'order_confirmation',
    description: 'Pesan yang dikirim saat pesanan baru berhasil diterima oleh bot.',
    content: '✅ *Pesanan Anda Diterima!*\n\n*Order ID:* `{{orderId}}`\n*Nama:* {{customerName}}\n\nTerima kasih! Tim kami akan segera menghubungi Anda untuk konfirmasi pembayaran.',
    lastUpdated: '2024-05-25 10:00 AM',
  },
   {
    id: 'payment_pending',
    description: 'Pesan yang dikirim setelah checkout, meminta pembayaran (jika diperlukan).',
    content: '⏳ *Menunggu Pembayaran*\n\nHalo {{customerName}},\n\nPesanan Anda `{{orderId}}` telah kami terima. Total tagihan Anda adalah *{{totalPrice}}*.\n\nSilakan lakukan pembayaran ke rekening berikut:\n**BCA: 1234567890 (a/n Urgent Studio)**\n\nSetelah melakukan pembayaran, pesanan Anda akan otomatis masuk ke antrian pengerjaan. Terima kasih!',
    lastUpdated: '2024-05-26 10:00 AM',
  },
  {
    id: 'order_queued',
    description: 'Pesan yang dikirim setelah pembayaran terkonfirmasi dan pesanan masuk antrian.',
    content: '👍 *Pembayaran Diterima & Masuk Antrian*\n\nHalo {{customerName}},\n\nPembayaran untuk pesanan `{{orderId}}` telah kami konfirmasi. Pesanan Anda sekarang resmi masuk ke dalam antrian pengerjaan.\n\nKami akan memberi tahu Anda lagi setelah pratinjau desain pertama siap.',
    lastUpdated: '2024-05-26 10:05 AM',
  },
  {
    id: 'preview_ready',
    description: 'Pesan yang dikirim saat pratinjau siap dan status diubah menjadi "Menunggu Respon Klien".',
    content: '🎨 *Pratinjau Desain Siap!* 🎨\n\nHalo {{customerName}},\n\nKabar baik! Pratinjau untuk pesanan `{{orderId}}` sudah siap.\n\nSilakan cek hasilnya di folder Google Drive Anda:\n{{driveUrl}}\n\nBalas pesan ini dengan "Setuju" untuk menyetujui atau "Revisi: [catatan Anda]" untuk meminta perbaikan.',
    lastUpdated: '2024-05-25 11:30 AM',
  },
  {
    id: 'cancel_pre_design',
    description: 'Balasan saat klien membatalkan SEBELUM pratinjau pertama dikirim.',
    content: 'Permintaan pembatalan untuk pesanan `{{orderId}}` telah diterima. Karena pengerjaan belum dimulai, Anda berhak atas refund 90% dari total pembayaran atau 80% dari DP yang telah dibayarkan. Tim finance kami akan segera memprosesnya.',
    lastUpdated: '2024-06-01 11:00 AM',
  },
    {
    id: 'cancel_post_design',
    description: 'Balasan saat klien membatalkan SETELAH pratinjau pertama dikirim.',
    content: 'Permintaan pembatalan untuk pesanan `{{orderId}}` telah diterima. Karena pengerjaan desain telah dilakukan, sesuai kebijakan kami, Anda berhak atas refund 50% dari total pembayaran (jika lunas) atau DP Anda akan hangus.',
    lastUpdated: '2024-06-01 11:05 AM',
  },
  {
    id: 'offer_gmeet',
    description: 'Pesan yang menawarkan G-Meet setelah 2x revisi.',
    content: 'Kami melihat Anda telah melakukan 2x revisi untuk pesanan `{{orderId}}`. Untuk memastikan revisi ke-3 lebih efektif, kami ingin mengundang Anda ke sesi revisi langsung via Google Meet (durasi 2 jam).\n\nSilakan balas dengan "/jadwal" untuk memilih slot waktu yang tersedia.',
    lastUpdated: '2024-06-01 11:10 AM',
  },
   {
    id: 'status_check_response',
    description: 'Balasan bot saat pengguna menanyakan status pesanan mereka.',
    content: 'Halo {{customerName}}! Berikut status terbaru untuk pesanan `{{orderId}}`:\n\n*Status Saat Ini:* {{currentStatus}}\n*Antrian Pengerjaan:* Posisi ke-{{queuePosition}} dari {{totalInQueue}}.\n\nKami akan segera memberi tahu Anda jika ada pembaruan lebih lanjut. Terima kasih atas kesabaran Anda!',
    lastUpdated: '2024-06-01 11:15 AM',
  }
];
