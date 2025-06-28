"use client";

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ServiceCard } from '@/components/ServiceCard';
import { services, mockCategories } from '@/lib/data';
import { notFound, useParams } from 'next/navigation';
import { CartProvider } from '@/contexts/CartContext';

const getCategoryBySlug = (slug: string) => {
    return mockCategories.find(c => c.id === slug);
}

const getServicesByCategory = (categoryId: string) => {
  return services.filter(service => service.category === categoryId);
};

// The param is named `budget` due to the folder structure [budget]
function CategoryPageContent() {
    const { budget } = useParams();
    const budgetSlug = Array.isArray(budget) ? budget[0] : budget;
    
    const category = getCategoryBySlug(budgetSlug);
    
    if (!category) {
        notFound();
    }
    
    const categoryServices = getServicesByCategory(category.id);

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
