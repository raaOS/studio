import type { BudgetItem, Service, Order, Promo, Coupon, Banner } from '@/lib/types';
import { Briefcase, ShoppingCart, Store } from 'lucide-react';

export const budgetItems: BudgetItem[] = [
  {
    id: 'kaki-lima',
    title: 'Budget Kaki Lima',
    description: 'Cocok untuk usaha rintisan dan kebutuhan personal dengan budget terjangkau.',
    priceRange: 'Rp 50K - 150K',
    icon: Store,
  },
  {
    id: 'umkm',
    title: 'Budget UMKM',
    description: 'Untuk UMKM dan startup yang ingin membangun identitas brand yang kuat.',
    priceRange: 'Rp 150K - 500K',
    icon: Briefcase,
  },
  {
    id: 'e-comm',
    title: 'Budget E-comm',
    description: 'Paket komprehensif untuk bisnis e-commerce yang butuh aset visual lengkap.',
    priceRange: 'Rp 500K+',
    icon: ShoppingCart,
  },
];

export const services: Service[] = [
  {
    id: 'logo-design',
    name: 'Logo Design',
    price: 150000,
    image: 'https://placehold.co/400x300',
    budgets: ['kaki-lima', 'umkm', 'e-comm'],
    category: 'Populer',
  },
  {
    id: 'business-card',
    name: 'Business Card',
    price: 75000,
    image: 'https://placehold.co/400x300',
    budgets: ['kaki-lima', 'umkm'],
    category: 'Populer',
  },
  {
    id: 'banner',
    name: 'Banner/Spanduk',
    price: 200000,
    image: 'https://placehold.co/400x300',
    budgets: ['umkm', 'e-comm'],
    category: 'Populer',
  },
  {
    id: 'flyer',
    name: 'Flyer/Brosur',
    price: 100000,
    image: 'https://placehold.co/400x300',
    budgets: ['kaki-lima', 'umkm'],
    category: 'Populer',
  },
  {
    id: 'social-media-post',
    name: 'Social Media Post',
    price: 80000,
    image: 'https://placehold.co/400x300',
    budgets: ['kaki-lima', 'umkm', 'e-comm'],
    category: 'Digital',
  },
  {
    id: 'packaging-design',
    name: 'Packaging Design',
    price: 600000,
    image: 'https://placehold.co/400x300',
    budgets: ['e-comm'],
    category: 'Paket Hemat',
  },
  {
    id: 'company-profile',
    name: 'Company Profile',
    price: 750000,
    image: 'https://placehold.co/400x300',
    budgets: ['e-comm'],
    category: 'Paket Hemat',
  },
  {
    id: 'paket-branding-umkm',
    name: 'Paket Branding UMKM',
    price: 450000,
    image: 'https://placehold.co/400x300',
    budgets: ['umkm'],
    category: 'Paket Hemat',
  }
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
        name: 'Social Media Post', 
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
        name: 'Packaging Design', 
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
        name: 'Flyer/Brosur', 
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
