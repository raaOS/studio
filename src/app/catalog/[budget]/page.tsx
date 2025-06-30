"use client";

import React, { useEffect, useState } from 'react'; // Added React, useEffect, useState
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ServiceCard } from '@/components/ServiceCard';
import { mockCategories } from '@/lib/data'; // Removed services, kept mockCategories for now
import { notFound, useParams } from 'next/navigation';
import { CartProvider } from '@/contexts/CartContext';
import type { Service } from '@/lib/types'; // Import Service type

const getCategoryBySlug = (slug: string) => {
    return mockCategories.find(c => c.id === slug);
}

// The param is named `budget` due to the folder structure [budget]
function CategoryPageContent() {
    const { budget } = useParams();
    const budgetSlug = Array.isArray(budget) ? budget[0] : budget;

    const [allServices, setAllServices] = useState<Service[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5328';
        fetch(`${apiUrl}/api/services`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data: Service[]) => {
                setAllServices(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Error fetching services:", err);
                setError(`Gagal memuat layanan: ${err.message}. Pastikan server backend berjalan.`);
                setIsLoading(false);
            });
    }, []);

    if (!budgetSlug) {
        notFound();
    }
    
    const category = getCategoryBySlug(budgetSlug);
    
    if (!category) {
        // This check might need to happen after services are loaded if categories also come from backend
        notFound();
    }
    
    // Filter services on the client side for now
    const categoryServices = allServices.filter(service => service.category === category?.id);

    if (isLoading) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow container mx-auto px-4 py-12 md:py-16">
                    <p className="text-center">Memuat layanan...</p>
                </main>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow container mx-auto px-4 py-12 md:py-16">
                    <p className="text-center text-red-500">{error}</p>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-12 md:py-16">
                <div className="mb-12">
                <h1 className="text-4xl font-bold font-headline tracking-tight">{category.name}</h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    Semua layanan yang kami tawarkan untuk kategori {category.name}.
                </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categoryServices.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}

// The param is named `budget` due to the folder structure [budget]
export default function CatalogPage() {
  return (
    <CartProvider>
      <CategoryPageContent />
    </CartProvider>
  )
}
