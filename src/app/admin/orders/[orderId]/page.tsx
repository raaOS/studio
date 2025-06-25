'use client';

import { useState, useMemo } from 'react';
import { useParams, notFound, useRouter } from 'next/navigation';
import Link from 'next/link';
import { mockOrders } from '@/lib/data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { formatRupiah, cn } from '@/lib/utils';
import { summarizeDesignBrief } from '@/ai/flows/summarize-design-brief';
import { generateMeetingAgenda } from '@/ai/flows/generate-meeting-agenda';
import { ChevronLeft, FileText, Bot, CalendarPlus, Lightbulb } from 'lucide-react';

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = `#${params.orderId}`;

  const [briefSummary, setBriefSummary] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [meetingAgenda, setMeetingAgenda] = useState('');
  const [isGeneratingAgenda, setIsGeneratingAgenda] = useState(false);

  const order = useMemo(() => mockOrders.find(o => o.id === orderId), [orderId]);

  if (!order) {
    notFound();
  }

  const allBriefs = useMemo(() => order.items.map(item => item.brief).filter(brief => Object.keys(brief).length > 0), [order.items]);

  const handleSummarize = async () => {
    if (allBriefs.length === 0) return;
    setIsSummarizing(true);
    try {
      const result = await summarizeDesignBrief({ designBriefs: allBriefs });
      setBriefSummary(result.summary);
    } catch (error) {
      console.error('Failed to summarize brief:', error);
      setBriefSummary('Gagal meringkas brief. Silakan coba lagi.');
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleGenerateAgenda = async () => {
    setIsGeneratingAgenda(true);
    try {
        const orderDetailsText = order.items.map(i => `${i.name} (x${i.quantity})`).join(', ');
      const result = await generateMeetingAgenda({
        orderId: order.id,
        orderDetails: orderDetailsText,
        revisionHistory: 'No revisions yet.',
        customerCommunicationLogs: 'Initial order placement via website.',
      });
      setMeetingAgenda(result.agenda);
    } catch (error) {
        console.error('Failed to generate agenda:', error);
        setMeetingAgenda('Gagal membuat agenda. Silakan coba lagi.');
    } finally {
        setIsGeneratingAgenda(false);
    }
  };

  return (
    <div className="space-y-8">
        <Button variant="outline" size="sm" onClick={() => router.back()}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Orders
        </Button>
      <h1 className="text-2xl md:text-3xl font-bold font-headline">Order Details: {order.id}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Customer & Order Info</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-muted-foreground">Customer</p>
                        <p className="font-medium">{order.customerName}</p>
                        <p className="text-sm text-primary">{order.customerTelegram}</p>
                    </div>
                     <div>
                        <p className="text-sm text-muted-foreground">Date</p>
                        <p className="font-medium">{new Date(order.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric'})}</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Status</p>
                        <Badge className={cn("capitalize text-xs font-medium", {
                            "bg-chart-2 text-primary-foreground border-transparent hover:bg-chart-2/80": order.status === "Completed",
                            "bg-primary text-primary-foreground border-transparent hover:bg-primary/80": order.status === "In Progress",
                            "bg-accent text-accent-foreground border-transparent hover:bg-accent/80": order.status === "Pending",
                            "bg-destructive text-destructive-foreground border-transparent hover:bg-destructive/80": order.status === "Cancelled",
                        })}>{order.status}</Badge>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Payment</p>
                        <p className="font-medium">{formatRupiah(order.total)} ({order.paymentMethod})</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><FileText /> Design Briefs</CardTitle>
                    <CardDescription>Detail brief yang diberikan oleh pelanggan untuk setiap item.</CardDescription>
                </CardHeader>
                <CardContent>
                    {allBriefs.length > 0 ? (
                        <Accordion type="single" collapsible className="w-full">
                        {order.items.map((item, index) => Object.keys(item.brief).length > 0 && (
                            <AccordionItem key={item.name + index} value={`item-${index}`}>
                                <AccordionTrigger>{item.name}</AccordionTrigger>
                                <AccordionContent className="space-y-2">
                                    {Object.entries(item.brief).map(([question, answer]) => (
                                        <div key={question}>
                                            <p className="font-semibold">{question}</p>
                                            <p className="text-muted-foreground pl-2">{answer}</p>
                                        </div>
                                    ))}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                    ) : (
                        <p className="text-muted-foreground text-center py-4">Tidak ada brief yang diberikan untuk pesanan ini.</p>
                    )}
                </CardContent>
                {allBriefs.length > 0 && (
                     <CardFooter>
                        <Button onClick={handleSummarize} disabled={isSummarizing}>
                            <Bot className="mr-2 h-4 w-4" />
                            {isSummarizing ? 'Meringkas...' : 'Minta AI Ringkaskan Brief'}
                        </Button>
                    </CardFooter>
                )}
            </Card>

            {briefSummary && (
                <Alert>
                    <Lightbulb className="h-4 w-4" />
                    <AlertTitle>Ringkasan Brief dari AI</AlertTitle>
                    <AlertDescription className="whitespace-pre-wrap">{briefSummary}</AlertDescription>
                </Alert>
            )}

        </div>

        <div className="lg:col-span-1 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><CalendarPlus /> Meeting Agenda</CardTitle>
                    <CardDescription>Gunakan AI untuk membuat agenda meeting dengan klien.</CardDescription>
                </CardHeader>
                <CardContent>
                    {isGeneratingAgenda ? (
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-20 w-full" />
                        </div>
                    ) : meetingAgenda ? (
                         <div className="prose prose-sm max-w-none text-sm text-foreground whitespace-pre-wrap">{meetingAgenda}</div>
                    ) : (
                        <p className="text-sm text-muted-foreground">Belum ada agenda yang dibuat.</p>
                    )}
                </CardContent>
                <CardFooter>
                    <Button onClick={handleGenerateAgenda} disabled={isGeneratingAgenda} className="w-full">
                        <Bot className="mr-2 h-4 w-4" />
                        {isGeneratingAgenda ? 'Membuat Agenda...' : 'Buat Agenda Meeting'}
                    </Button>
                </CardFooter>
            </Card>
        </div>
      </div>
    </div>
  );
}
