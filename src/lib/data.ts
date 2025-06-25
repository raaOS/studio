import type { BudgetItem, Service } from '@/lib/types';
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
