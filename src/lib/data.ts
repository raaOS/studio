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
            'Sedang Direvisi (Jalur Ekspres)',
        ],
    },
    {
        label: 'Membutuhkan Tindakan',
        statuses: [
            'Menunggu Pembayaran',
            'Eskalasi',
            'Menunggu Jadwal Meeting',
            'Menunggu Proses Refund',
            'Menunggu Pembayaran Re-Aktivasi',
        ],
    },
    {
        label: 'Status Final',
        statuses: [
            'Selesai',
            'Dibatalkan (Pra-Desain)',
            'Dibatalkan (Pasca-Desain)',
            'Ditutup (Tanpa Refund)',
            'Selesai Otomatis (Tanpa Respon)',
        ],
    },
];

export const mockOrders: Order[] = [
  // SIMULASI 0: Lancar Jaya (5 Orders)
  { kode_order: '#001', nama_klien: 'Ahmad Lancar', status_pesanan: 'Selesai', tipe_pembayaran: 'LUNAS', jumlah_transfer: 125000, total_harga: 125000, potongan_refund: 0, jenis_potongan: '', total_refund: 0, status_refund: '', log_aktivitas: [], timestamp: '2024-05-20T10:00:00Z', revisionCount: 0, customerTelegram: '@ahmadlancar', items: [{ name: 'Poster A4', quantity: 1, price: 125000, brief: {} }], budget: 'E-Comm', pekan: 'W1', driveFolderUrl: 'https://example.com', paymentStatus: 'Lunas' },
  { kode_order: '#002', nama_klien: 'Budi Mulus', status_pesanan: 'Selesai', tipe_pembayaran: 'DP', jumlah_transfer: 150000, total_harga: 150000, potongan_refund: 0, jenis_potongan: '', total_refund: 0, status_refund: '', log_aktivitas: [], timestamp: '2024-05-21T11:00:00Z', revisionCount: 1, customerTelegram: '@budimulus', items: [{ name: 'Buku Menu', quantity: 1, price: 150000, brief: {} }], budget: 'E-Comm', pekan: 'W1', driveFolderUrl: 'https://example.com', paymentStatus: 'Lunas' },
  { kode_order: '#003', nama_klien: 'Citra Cepat', status_pesanan: 'Sedang Dikerjakan', tipe_pembayaran: 'LUNAS', jumlah_transfer: 70000, total_harga: 70000, potongan_refund: 0, jenis_potongan: '', total_refund: 0, status_refund: '', log_aktivitas: [], timestamp: '2024-05-28T09:00:00Z', revisionCount: 0, customerTelegram: '@citracepat', items: [{ name: 'Konten Feed', quantity: 1, price: 70000, brief: {} }], budget: 'E-Comm', pekan: 'W2', driveFolderUrl: 'https://example.com', paymentStatus: 'Lunas' },
  { kode_order: '#004', nama_klien: 'Dodi Damai', status_pesanan: 'Sedang Dikerjakan', tipe_pembayaran: 'LUNAS', jumlah_transfer: 30000, total_harga: 30000, potongan_refund: 0, jenis_potongan: '', total_refund: 0, status_refund: '', log_aktivitas: [], timestamp: '2024-05-29T14:00:00Z', revisionCount: 0, customerTelegram: '@dodidamai', items: [{ name: 'Kartu Nama', quantity: 1, price: 30000, brief: {} }], budget: 'UMKM', pekan: 'W2', driveFolderUrl: 'https://example.com', paymentStatus: 'Lunas' },
  { kode_order: '#005', nama_klien: 'Eka Elok', status_pesanan: 'Menunggu Pengerjaan', tipe_pembayaran: 'DP', jumlah_transfer: 22500, total_harga: 45000, potongan_refund: 0, jenis_potongan: '', total_refund: 0, status_refund: '', log_aktivitas: [], timestamp: '2024-06-01T16:00:00Z', revisionCount: 0, customerTelegram: '@ekaelok', items: [{ name: 'Sertifikat', quantity: 1, price: 45000, brief: {} }], budget: 'UMKM', pekan: 'W3', paymentStatus: 'DP' },
  
  // SIMULASI 1: Pembatalan (5 Orders)
  { kode_order: '#006', nama_klien: 'Fajar Batal', status_pesanan: 'Dibatalkan (Pra-Desain)', tipe_pembayaran: 'DP', jumlah_transfer: 50000, total_harga: 100000, potongan_refund: 10000, jenis_potongan: 'Potongan 10% Pra-Desain', total_refund: 40000, status_refund: 'Belum', log_aktivitas: [], timestamp: '2024-05-22T10:00:00Z', revisionCount: 0, customerTelegram: '@fajarbatal', items: [], budget: 'UMKM', pekan: 'W1', paymentStatus: 'DP', cancellationDetails: { reason: "Tidak jadi buka usaha", rating: 3, timestamp: "2024-05-23T10:00:00Z" } },
  { kode_order: '#007', nama_klien: 'Gita Gugur', status_pesanan: 'Dibatalkan (Pra-Desain)', tipe_pembayaran: 'LUNAS', jumlah_transfer: 200000, total_harga: 200000, potongan_refund: 20000, jenis_potongan: 'Potongan 10% Pra-Desain', total_refund: 180000, status_refund: 'Belum', log_aktivitas: [], timestamp: '2024-05-22T11:00:00Z', revisionCount: 0, customerTelegram: '@gitagugur', items: [], budget: 'E-Comm', pekan: 'W1', paymentStatus: 'Lunas', cancellationDetails: { reason: "Ganti konsep mendadak", rating: 4, timestamp: "2024-05-23T11:00:00Z" } },
  { kode_order: '#008', nama_klien: 'Hadi Hangus', status_pesanan: 'Dibatalkan (Pasca-Desain)', tipe_pembayaran: 'DP', jumlah_transfer: 75000, total_harga: 150000, potongan_refund: 75000, jenis_potongan: 'Potongan 50% Pasca-Desain', total_refund: 0, status_refund: '', log_aktivitas: [], timestamp: '2024-05-23T12:00:00Z', revisionCount: 0, customerTelegram: '@hadihangus', items: [], budget: 'E-Comm', pekan: 'W1', paymentStatus: 'DP', cancellationDetails: { reason: "Desain tidak sesuai harapan sama sekali.", rating: 1, timestamp: "2024-05-25T12:00:00Z" } },
  { kode_order: '#009', nama_klien: 'Indah Ilang', status_pesanan: 'Dibatalkan (Pasca-Desain)', tipe_pembayaran: 'LUNAS', jumlah_transfer: 300000, total_harga: 300000, potongan_refund: 150000, jenis_potongan: 'Potongan 50% Pasca-Desain', total_refund: 150000, status_refund: 'Belum', log_aktivitas: [], timestamp: '2024-05-24T13:00:00Z', revisionCount: 0, customerTelegram: '@indahilang', items: [], budget: 'E-Comm', pekan: 'W2', paymentStatus: 'Lunas', cancellationDetails: { reason: "Sudah dapat desainer lain.", rating: 2, timestamp: "2024-05-26T13:00:00Z" } },
  { kode_order: '#010', nama_klien: 'Joko Rumit', status_pesanan: 'Ditutup (Tanpa Refund)', tipe_pembayaran: 'LUNAS', jumlah_transfer: 90000, total_harga: 90000, potongan_refund: 90000, jenis_potongan: 'Hangus Pasca 2x Revisi', total_refund: 0, status_refund: '', log_aktivitas: [], timestamp: '2024-05-25T14:00:00Z', revisionCount: 2, customerTelegram: '@jokorumit', items: [], budget: 'E-Comm', pekan: 'W2', paymentStatus: 'Lunas', cancellationDetails: { reason: "Tidak puas setelah revisi kedua.", rating: 1, timestamp: "2024-05-29T14:00:00Z" } },

  // SIMULASI 2 & 3: Revisi & G-Meet (5 Orders)
  { kode_order: '#011', nama_klien: 'Kiki Koreksi', status_pesanan: 'Sedang Direvisi', tipe_pembayaran: 'LUNAS', jumlah_transfer: 60000, total_harga: 60000, potongan_refund: 0, jenis_potongan: '', total_refund: 0, status_refund: '', log_aktivitas: [], timestamp: '2024-05-28T08:00:00Z', revisionCount: 1, customerTelegram: '@kikikoreksi', items: [{ name: 'Konten Carousel', quantity: 1, price: 60000, brief: {} }], budget: 'UMKM', pekan: 'W2', driveFolderUrl: 'https://example.com', paymentStatus: 'Lunas' },
  { kode_order: '#012', nama_klien: 'Lulu Lelah', status_pesanan: 'Menunggu Respon Klien', tipe_pembayaran: 'DP', jumlah_transfer: 90000, total_harga: 180000, potongan_refund: 0, jenis_potongan: '', total_refund: 0, status_refund: '', log_aktivitas: [], timestamp: '2024-05-29T09:00:00Z', revisionCount: 1, customerTelegram: '@lululelah', items: [{ name: 'Konten Carousel', quantity: 1, price: 180000, brief: {} }], budget: 'E-Comm', pekan: 'W2', driveFolderUrl: 'https://example.com', paymentStatus: 'DP' },
  { kode_order: '#013', nama_klien: 'Mira Meeting', status_pesanan: 'Menunggu Jadwal Meeting', tipe_pembayaran: 'LUNAS', jumlah_transfer: 175000, total_harga: 175000, potongan_refund: 0, jenis_potongan: '', total_refund: 0, status_refund: '', log_aktivitas: [], timestamp: '2024-05-30T10:00:00Z', revisionCount: 2, customerTelegram: '@mirameeting', items: [{ name: 'Sampul E-book', quantity: 1, price: 175000, brief: {} }], budget: 'E-Comm', pekan: 'W3', driveFolderUrl: 'https://example.com', paymentStatus: 'Lunas' },
  { kode_order: '#014', nama_klien: 'Nana Normal', status_pesanan: 'Selesai', tipe_pembayaran: 'LUNAS', jumlah_transfer: 25000, total_harga: 25000, potongan_refund: 0, jenis_potongan: '', total_refund: 0, status_refund: '', log_aktivitas: [], timestamp: '2024-05-15T10:00:00Z', revisionCount: 1, customerTelegram: '@nananormal', items: [{ name: 'Konten Feed', quantity: 1, price: 25000, brief: {} }], budget: 'UMKM', pekan: 'W1', driveFolderUrl: 'https://example.com', paymentStatus: 'Lunas' },
  { kode_order: '#015', nama_klien: 'Otto Oke', status_pesanan: 'Selesai', tipe_pembayaran: 'LUNAS', jumlah_transfer: 35000, total_harga: 35000, potongan_refund: 0, jenis_potongan: '', total_refund: 0, status_refund: '', log_aktivitas: [], timestamp: '2024-05-16T11:00:00Z', revisionCount: 2, customerTelegram: '@ottooke', items: [{ name: 'Lanyard', quantity: 1, price: 35000, brief: {} }], budget: 'UMKM', pekan: 'W1', driveFolderUrl: 'https://example.com', paymentStatus: 'Lunas' },

  // SIMULASI 4: Ghosting & Re-Aktivasi (5 Orders)
  { kode_order: '#016', nama_klien: 'Putri Pergi', status_pesanan: 'Selesai Otomatis (Tanpa Respon)', tipe_pembayaran: 'LUNAS', jumlah_transfer: 45000, total_harga: 45000, potongan_refund: 0, jenis_potongan: '', total_refund: 0, status_refund: '', log_aktivitas: [], timestamp: '2024-05-10T09:00:00Z', revisionCount: 0, customerTelegram: '@putripergi', items: [], budget: 'UMKM', pekan: 'W4', paymentStatus: 'Lunas' },
  { kode_order: '#017', nama_klien: 'Qori Hilang', status_pesanan: 'Selesai Otomatis (Tanpa Respon)', tipe_pembayaran: 'DP', jumlah_transfer: 75000, total_harga: 150000, potongan_refund: 0, jenis_potongan: '', total_refund: 0, status_refund: '', log_aktivitas: [], timestamp: '2024-05-11T10:00:00Z', revisionCount: 1, customerTelegram: '@qorihilang', items: [], budget: 'UMKM', pekan: 'W4', paymentStatus: 'DP' },
  { kode_order: '#018', nama_klien: 'Rian Kembali', status_pesanan: 'Menunggu Pembayaran Re-Aktivasi', tipe_pembayaran: 'LUNAS', jumlah_transfer: 85000, total_harga: 85000, potongan_refund: 0, jenis_potongan: '', total_refund: 0, status_refund: '', log_aktivitas: [], timestamp: '2024-05-12T11:00:00Z', revisionCount: 0, customerTelegram: '@riankembali', items: [], budget: 'E-Comm', pekan: 'W4', paymentStatus: 'Lunas' },
  { kode_order: '#019', nama_klien: 'Sari Sibuk', status_pesanan: 'Sedang Direvisi (Jalur Ekspres)', tipe_pembayaran: 'LUNAS', jumlah_transfer: 70000, total_harga: 70000, potongan_refund: 0, jenis_potongan: '', total_refund: 0, status_refund: '', log_aktivitas: [], timestamp: '2024-05-13T12:00:00Z', revisionCount: 0, customerTelegram: '@sarisibuk', items: [], budget: 'E-Comm', pekan: 'W4', paymentStatus: 'Lunas' },
  { kode_order: '#020', nama_klien: 'Tono Telat', status_pesanan: 'Selesai', tipe_pembayaran: 'DP', jumlah_transfer: 35000, total_harga: 70000, potongan_refund: 0, jenis_potongan: '', total_refund: 0, status_refund: '', log_aktivitas: [], timestamp: '2024-05-14T13:00:00Z', revisionCount: 1, customerTelegram: '@tonotelat', items: [], budget: 'UMKM', pekan: 'W4', paymentStatus: 'Lunas' },

  // Miscellaneous Orders (5 Orders)
  { kode_order: '#021', nama_klien: 'Umar Utang', status_pesanan: 'Menunggu Pembayaran', tipe_pembayaran: 'LUNAS', jumlah_transfer: 0, total_harga: 240000, potongan_refund: 0, jenis_potongan: '', total_refund: 0, status_refund: '', log_aktivitas: [], timestamp: '2024-06-03T09:00:00Z', revisionCount: 0, customerTelegram: '@umarutang', items: [{ name: 'Roll-Up Banner', quantity: 1, price: 240000, brief: {} }], budget: 'E-Comm', pekan: 'W3', paymentStatus: 'Belum Dibayar' },
  { kode_order: '#022', nama_klien: 'Vina Validasi', status_pesanan: 'Menunggu Pembayaran', tipe_pembayaran: 'DP', jumlah_transfer: 0, total_harga: 50000, potongan_refund: 0, jenis_potongan: '', total_refund: 0, status_refund: '', log_aktivitas: [], timestamp: '2024-06-03T10:00:00Z', revisionCount: 0, customerTelegram: '@vinavalidasi', items: [{ name: 'Poster A4', quantity: 1, price: 50000, brief: {} }], budget: 'UMKM', pekan: 'W3', paymentStatus: 'Belum Dibayar' },
  { kode_order: '#023', nama_klien: 'Wawan Warning', status_pesanan: 'Eskalasi', tipe_pembayaran: 'LUNAS', jumlah_transfer: 425000, total_harga: 425000, potongan_refund: 0, jenis_potongan: '', total_refund: 0, status_refund: '', log_aktivitas: [], timestamp: '2024-05-28T15:00:00Z', revisionCount: 1, customerTelegram: '@wawanwarning', items: [{ name: 'Slide Presentasi', quantity: 1, price: 425000, brief: {} }], budget: 'E-Comm', pekan: 'W2', driveFolderUrl: 'https://example.com', paymentStatus: 'Lunas' },
  { kode_order: '#024', nama_klien: 'Yani Yakin', status_pesanan: 'Menunggu Respon Klien', tipe_pembayaran: 'DP', jumlah_transfer: 17500, total_harga: 35000, potongan_refund: 0, jenis_potongan: '', total_refund: 0, status_refund: '', log_aktivitas: [], timestamp: '2024-06-02T11:00:00Z', revisionCount: 0, customerTelegram: '@yaniyakin', items: [{ name: 'Frame Foto Profil', quantity: 1, price: 35000, brief: {} }], budget: 'UMKM', pekan: 'W3', driveFolderUrl: 'https://example.com', paymentStatus: 'DP' },
  { kode_order: '#025', nama_klien: 'Zul Zabar', status_pesanan: 'Menunggu Respon Klien', tipe_pembayaran: 'LUNAS', jumlah_transfer: 15000, total_harga: 15000, potongan_refund: 0, jenis_potongan: '', total_refund: 0, status_refund: '', log_aktivitas: [], timestamp: '2024-06-02T12:00:00Z', revisionCount: 0, customerTelegram: '@zulzabar', items: [{ name: 'Konten Story', quantity: 1, price: 15000, brief: {} }], budget: 'Kaki Lima', pekan: 'W3', driveFolderUrl: 'https://example.com', paymentStatus: 'Lunas' },
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
    description: 'Balasan saat pengguna mengirim /start tanpa payload.',
    content: 'Selamat datang di Urgent Studio Bot! 🤖\n\nUntuk memesan, silakan kembali ke website kami, isi keranjang Anda, dan klik tombol "Selesaikan via Telegram".',
    lastUpdated: '2024-06-02 09:00 AM',
  },
  {
    id: 'payment_pending',
    description: 'Pesan yang dikirim setelah checkout, meminta pembayaran.',
    content: '⏳ *Menunggu Pembayaran*\n\nHalo {{customerName}},\n\nPesanan Anda `{{orderId}}` telah kami terima. Total tagihan Anda adalah *{{totalPrice}}*.\n\nSilakan lakukan pembayaran ke rekening berikut:\n**BCA: 1234567890 (a/n Urgent Studio)**\n\nSetelah transfer, mohon balas pesan ini dengan "sudah bayar" untuk kami proses.',
    lastUpdated: '2024-06-02 09:05 AM',
  },
    {
    id: 'preview_ready',
    description: 'Pesan saat pratinjau siap & status menjadi "Menunggu Respon Klien".',
    content: '🎨 *Pratinjau Desain Siap!* 🎨\n\nHalo {{customerName}},\n\nKabar baik! Pratinjau untuk pesanan `{{orderId}}` sudah siap.\n\nSilakan cek hasilnya di folder Google Drive Anda:\n{{driveUrl}}\n\nBalas pesan ini dengan "Setuju" untuk menyetujui atau "Revisi: [catatan Anda]" untuk meminta perbaikan.',
    lastUpdated: '2024-05-25 11:30 AM',
  },
  {
    id: 'auto_complete_notification',
    description: 'Pesan saat pesanan ditutup otomatis karena tidak ada respon.',
    content: '🔔 *Informasi Pesanan*\n\nHalo {{customerName}}, karena tidak ada respon selama lebih dari 3 hari, pesanan Anda `{{orderId}}` telah kami selesaikan secara otomatis. File terakhir dapat diakses di:\n{{driveUrl}}\n\nJika Anda masih memerlukan revisi, Anda dapat membuka kembali pesanan ini dengan biaya re-aktivasi. Balas dengan "/lanjutkan" untuk info lebih lanjut.',
    lastUpdated: '2024-06-03 10:00 AM',
  },
  {
    id: 'reactivate_offer',
    description: 'Menawarkan opsi re-aktivasi untuk pesanan yang sudah ditutup.',
    content: '🔁 *Re-aktivasi Pesanan*\n\nPesanan ini sudah ditutup. Untuk melanjutkannya, Anda perlu membayar biaya re-aktivasi & prioritas jalur ekspres sebesar *Rp 50.000*.\n\nIni akan menempatkan revisi Anda di antrian terdepan.\n\nBalas "/bayar_aktivasi" untuk melanjutkan.',
    lastUpdated: '2024-06-03 10:05 AM',
  },
   {
    id: 'cancellation_prompt',
    description: 'Meminta konfirmasi dan alasan saat klien ingin membatalkan.',
    content: '⚠️ *Konfirmasi Pembatalan*\n\nKami memahami jika Anda ingin membatalkan pesanan. Sebelum kami proses, mohon berikan kami umpan balik agar kami bisa lebih baik lagi.\n\nBalas pesan ini dengan format:\n`/konfirmasi_batal BINTANG:[1-5] ALASAN:[Alasan singkat Anda]`\n\nContoh: `/konfirmasi_batal BINTANG:2 ALASAN:Desainnya tidak cocok dengan selera saya.`\n\nTerima kasih atas pengertiannya.',
    lastUpdated: '2024-06-04 14:00 PM',
  },
  {
    id: 'cancellation_to_owner',
    description: 'Notifikasi ke owner saat ada pembatalan yang butuh proses refund.',
    content: '‼️ *Pembatalan & Proses Refund Diperlukan*\n\nOrder `{{orderId}}` oleh *{{customerName}}* telah dibatalkan dengan detail:\n- Rating: {{rating}} bintang\n- Alasan: {{reason}}\n- Status saat batal: {{cancellationStage}}\n\nJumlah yang harus di-refund: *{{refundAmount}}*\n\nMohon segera proses refund dan tandai di panel admin jika sudah selesai.',
    lastUpdated: '2024-06-04 14:05 PM',
  },
  {
    id: 'refund_complete_to_customer',
    description: 'Notifikasi ke klien bahwa refund telah diproses.',
    content: '✅ *Refund Selesai Diproses*\n\nHalo {{customerName}},\n\nPengembalian dana untuk pesanan Anda `{{orderId}}` sejumlah *{{refundAmount}}* telah kami proses. Dana diperkirakan akan masuk dalam 1-2 hari kerja.\n\nTerima kasih atas pengertiannya dan kami harap dapat melayani Anda lagi di lain waktu.',
    lastUpdated: '2024-06-04 14:10 PM',
  },
  {
    id: 'gmeet_offer',
    description: 'Menawarkan G-Meet setelah 2x revisi.',
    content: '💬 *Diskusi Lebih Lanjut?*\n\nAnda telah mencapai batas 2x revisi gratis untuk pesanan `{{orderId}}`. Untuk memastikan kami memahami keinginan Anda sepenuhnya, kami ingin mengundang Anda ke sesi revisi langsung via Google Meet (gratis).\n\nSilakan balas dengan `/jadwalkan_meeting` untuk memilih slot waktu yang tersedia.',
    lastUpdated: '2024-06-04 14:15 PM',
  },
];
