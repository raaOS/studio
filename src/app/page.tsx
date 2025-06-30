import React, { useEffect, useState } from 'react'; // Added useEffect, useState
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PortfolioSection } from '@/components/PortfolioSection';
import { ProductCarousel } from '@/components/ProductCarousel';
import { PromotionalBannerCarousel } from '@/components/PromotionalBannerCarousel';
import { CouponInfoSection } from '@/components/CouponInfoSection';
import { FloatingCart } from '@/components/FloatingCart';
import { CartWrapper } from '@/components/CartWrapper';
import { services, mockCategories } from '@/lib/data';
import { CheckoutSection } from '@/components/CheckoutSection';

export default function Home() {
  const categoryOrder = [
    'Konten Media Sosial',
    'Branding & Kantor',
    'Materi Promosi',
    'Desain Digital & Event',
  ];

  const [backendMessage, setBackendMessage] = useState("Loading message from backend...");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5328';
    fetch(`${apiUrl}/api/hello`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setBackendMessage(data.message || "No message field in response");
      })
      .catch(error => {
        console.error("Error fetching from backend:", error);
        setBackendMessage("Failed to fetch message from backend.");
        setErrorMessage(`Error: ${error.message}. Is the Flask server running on port 5328?`);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <CartWrapper>
        <main className="flex-grow">
          {/* Backend Message Test */}
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 container mx-auto my-4">
            <p className="font-bold">Backend Status:</p>
            <p>{backendMessage}</p>
            {errorMessage && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
          </div>

          <PortfolioSection />
          <PromotionalBannerCarousel />

          {/* Catalog */}
          <section id="catalog-section" className="pt-8 pb-12">
            <div className="container mx-auto px-4 space-y-12">
              {categoryOrder.map((categoryName) => {
                const category = mockCategories.find(c => c.name === categoryName);
                if (!category) return null;

                const servicesInCategory = services.filter(s => s.category === category.id);
                if (servicesInCategory.length === 0) return null;

                return (
                  <div key={category.id}>
                    <ProductCarousel
                      title={category.name}
                      services={servicesInCategory}
                      categoryId={category.id}
                    />
                    {category.name === 'Branding & Kantor' && <CouponInfoSection />}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Desktop-only Track Order & Order Summary */}
          <CheckoutSection />
        </main>
        <FloatingCart />
      </CartWrapper>
      <Footer />
    </div>
  );
}
