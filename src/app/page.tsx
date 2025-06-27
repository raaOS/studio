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

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <CartWrapper>
        <main className="flex-grow">
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
