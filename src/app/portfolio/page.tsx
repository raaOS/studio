
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Image from 'next/image';

const portfolioItems = [
  { src: 'https://placehold.co/600x400.png', alt: 'Project 1', hint: 'logo design' },
  { src: 'https://placehold.co/600x400.png', alt: 'Project 2', hint: 'social media' },
  { src: 'https://placehold.co/600x400.png', alt: 'Project 3', hint: 'brochure' },
  { src: 'https://placehold.co/600x400.png', alt: 'Project 4', hint: 'packaging' },
  { src: 'https://placehold.co/600x400.png', alt: 'Project 5', hint: 'web design' },
  { src: 'https://placehold.co/600x400.png', alt: 'Project 6', hint: 'poster' },
];

export default function PortfolioPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-headline tracking-tight">Portofolio Kami</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Beberapa hasil karya terbaik yang pernah kami buat untuk klien-klien hebat.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <div key={index} className="overflow-hidden rounded-lg shadow-lg group">
              <Image 
                src={item.src}
                alt={item.alt}
                width={600}
                height={400}
                className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={item.hint}
              />
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
