
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { OrderStatus } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatRupiah(amount: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Returns Tailwind classes for outline-style status badges.
 * Used in lists and tables.
 */
export function getOrderStatusClass(status: OrderStatus): string {
  switch (status) {
    // Waiting / Neutral
    case 'Menunggu Pembayaran':
      return 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30';
    case 'Menunggu Pengerjaan':
      return 'bg-gray-500/20 text-gray-700 border-gray-500/30';
    case 'Menunggu Respon Klien':
      return 'bg-amber-500/20 text-amber-700 border-amber-500/30';
    case 'Menunggu Jadwal Meeting':
      return 'bg-orange-500/20 text-orange-700 border-orange-500/30';

    // In Progress
    case 'Sedang Dikerjakan':
      return 'bg-blue-500/20 text-blue-700 border-blue-500/30';
    case 'Sedang Direvisi':
      return 'bg-indigo-500/20 text-indigo-700 border-indigo-500/30';

    // Needs Attention
    case 'Eskalasi':
      return 'bg-purple-500/20 text-purple-700 border-purple-500/30 font-semibold';
    
    // Final - Positive
    case 'Selesai':
      return 'bg-green-500/20 text-green-700 border-green-500/30';
      
    // Final - Negative
    case 'Dibatalkan (Pra-Desain)':
      return 'bg-red-500/20 text-red-700 border-red-500/30';
    case 'Dibatalkan (Pasca-Desain)':
      return 'bg-red-600/20 text-red-800 border-red-600/30';
    case 'Ditutup (Tanpa Refund)':
      return 'bg-neutral-600/20 text-neutral-700 border-neutral-500/30';

    default:
      return 'bg-gray-500/20 text-gray-700 border-gray-500/30';
  }
}

/**
 * Returns Tailwind classes for solid-style status badges.
 * Used for main status indicators on detail pages.
 */
export function getOrderStatusSolidClass(status: OrderStatus): string {
  switch (status) {
    case 'Menunggu Pembayaran':
      return 'bg-yellow-500 text-yellow-50';
    case 'Menunggu Pengerjaan':
      return 'bg-gray-500 text-gray-50';
    case 'Sedang Dikerjakan':
      return 'bg-blue-500 text-blue-50';
    case 'Menunggu Respon Klien':
      return 'bg-amber-500 text-amber-50';
    case 'Sedang Direvisi':
      return 'bg-indigo-500 text-indigo-50';
    case 'Menunggu Jadwal Meeting':
      return 'bg-orange-500 text-orange-50';
    case 'Eskalasi':
      return 'bg-purple-600 text-purple-50 font-bold';
    case 'Selesai':
      return 'bg-green-500 text-green-50';
    case 'Dibatalkan (Pra-Desain)':
    case 'Dibatalkan (Pasca-Desain)':
    case 'Ditutup (Tanpa Refund)':
      return 'bg-red-600 text-red-50';
    default:
      return 'bg-gray-600 text-gray-50';
  }
}
