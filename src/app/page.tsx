
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PortfolioSection } from '@/components/PortfolioSection';
import { ProductCarousel } from '@/components/ProductCarousel';
import { PromotionalBannerCarousel } from '@/components/PromotionalBannerCarousel';
import { CouponInfoSection } from '@/components/CouponInfoSection';
import { TrackOrderForm } from '@/components/TrackOrderForm';
import { OrderSummary } from '@/components/OrderSummary';
import { FloatingCart } from '@/components/FloatingCart';
import { CartWrapper } from '@/components/CartWrapper';
import { services, mockCategories } from '@/lib/data';

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
          <section id="summary-section" className="hidden md:block container mx-auto px-4 pb-12">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-2xl font-headline font-semibold text-foreground text-center mb-6">Lacak Status Pesanan Anda</h2>
                <TrackOrderForm />
              </div>
              <div>
                <h2 className="text-2xl font-headline font-semibold text-foreground text-center mb-6">Periksa & Kirim Pesanan Anda</h2>
                <OrderSummary />
              </div>
            </div>
          </section>
        </main>
        <FloatingCart />
      </CartWrapper>
      <Footer />
    </div>
  );
}
