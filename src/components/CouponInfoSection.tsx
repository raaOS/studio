
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Gift, Percent } from "lucide-react";

export function CouponInfoSection() {
    return (
        <section className="container mx-auto px-0 py-12 md:py-16">
            <div className="grid md:grid-cols-2 gap-8">
                <Card className="overflow-hidden flex flex-col md:flex-row items-center shadow-lg">
                    <div className="w-full md:w-1/3 shrink-0">
                        <Image
                            src="https://placehold.co/400x400.png"
                            alt="Kupon Bulan Depan"
                            width={400}
                            height={400}
                            className="object-cover w-full h-48 md:h-full"
                            data-ai-hint="coupon gift"
                        />
                    </div>
                    <div className="p-6 flex-1">
                        <CardHeader className="p-0">
                            <CardTitle className="flex items-center gap-2"><Gift/> Kupon Bulan Depan</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 pt-4">
                            <p className="text-muted-foreground">
                                Siap-siap! Bulan depan akan ada kupon spesial untuk pelanggan setia. Pastikan Anda sudah terdaftar di program loyalitas kami.
                            </p>
                        </CardContent>
                    </div>
                </Card>
                <Card className="overflow-hidden flex flex-col md:flex-row items-center shadow-lg">
                    <div className="w-full md:w-1/3 shrink-0">
                        <Image
                            src="https://placehold.co/400x400.png"
                            alt="Promo Spesial"
                            width={400}
                            height={400}
                            className="object-cover w-full h-48 md:h-full"
                            data-ai-hint="special offer"
                        />
                    </div>
                    <div className="p-6 flex-1">
                         <CardHeader className="p-0">
                            <CardTitle className="flex items-center gap-2"><Percent/> Promo Akhir Pekan</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 pt-4">
                            <p className="text-muted-foreground">
                                Dapatkan diskon tambahan 10% untuk semua desain konten media sosial setiap akhir pekan. Hubungi kami untuk info lebih lanjut!
                            </p>
                        </CardContent>
                    </div>
                </Card>
            </div>
        </section>
    );
}
