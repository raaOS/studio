import type { BudgetItem, Service, Order } from '@/lib/types';
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
    id: '#DF-1234',
    customerName: 'Budi Santoso',
    customerTelegram: '@budisan',
    items: [
      { 
        name: 'Logo Design', 
        quantity: 1, 
        price: 150000, 
        brief: {
          'Nama Brand': 'Kopi Senja',
          'Slogan': 'Secangkir cerita di kala senja',
          'Warna yang diinginkan': 'Coklat, oranye, dan krem'
        }
      },
      { 
        name: 'Business Card', 
        quantity: 2, 
        price: 75000,
        brief: {
          'Nama & Jabatan': 'Budi Santoso, Owner',
          'Informasi Kontak': '0812345678, kopi.senja@email.com',
          'Alamat': 'Jl. Kenangan No. 10, Jakarta'
        }
      },
    ],
    total: 300000,
    paymentMethod: 'lunas',
    status: 'Completed',
    date: '2024-05-20',
  },
  {
    id: '#DF-5678',
    customerName: 'Siti Aminah',
    customerTelegram: '@sitia',
    items: [
      { 
        name: 'Paket Branding UMKM', 
        quantity: 1, 
        price: 450000,
        brief: {
          'Deskripsi Usaha': 'Menjual aneka kue kering tradisional.',
          'Target Pasar': 'Ibu rumah tangga dan acara keluarga.',
          'Pesan yang ingin disampaikan': 'Rasa klasik, resep warisan.'
        }
      },
    ],
    total: 450000,
    paymentMethod: 'dp',
    status: 'In Progress',
    date: '2024-05-22',
  },
  {
    id: '#DF-9101',
    customerName: 'Rina Wijaya',
    customerTelegram: '@rinaw',
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
    paymentMethod: 'lunas',
    status: 'Pending',
    date: '2024-05-23',
  },
  {
    id: '#DF-1121',
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
    status: 'Cancelled',
    date: '2024-05-24',
  }
];
