
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function PortfolioSection() {
    return (
        <section className="py-8 md:py-12 bg-background">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold font-headline tracking-tight sm:text-4xl">Desain Cepat, Hasil Hebat.</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Kami adalah solusi untuk semua kebutuhan desain grafis Anda yang mendesak. Dari konten media sosial hingga materi promosi, kami siap membantu brand Anda tampil profesional tanpa menunggu lama.
                </p>
                <div className="mt-8">
                    <Button asChild size="lg">
                        <Link href="/portfolio">
                            Lihat Portofolio Kami <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
