'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
// import { assistWithBrief, type BriefAssistantOutput } from '@/ai/flows/brief-assistant';
import { Lightbulb, Loader2, Wand2 } from 'lucide-react';
import { Badge } from './ui/badge';

// Placeholder type if original is not available
type BriefAssistantOutput = {
  suggested_title: string;
  keywords: string[];
  style_suggestions: string[];
};

export function BriefAssistant() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [idea, setIdea] = useState('');
  const [result, setResult] = useState<BriefAssistantOutput | null>(null);

  const handleGenerateBrief = async () => {
    if (!idea.trim()) {
      toast({
        title: 'Ide Kosong',
        description: 'Mohon tuliskan ide desain Anda terlebih dahulu.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    // try {
    //   const response = await assistWithBrief({ raw_description: idea });
    //   setResult(response);
    // } catch (error: any) {
    //   console.error('Brief assistant failed:', error);
    //   toast({
    //     title: 'Gagal Memproses Ide',
    //     description: error.message || 'Terjadi kesalahan pada asisten AI.',
    //     variant: 'destructive',
    //   });
    // } finally {
    //   setIsLoading(false);
    // }
    toast({
      title: 'Fitur Dalam Pengembangan',
      description: 'Asisten AI untuk brief sedang dinonaktifkan sementara.',
    });
    // Mock response for UI development
    // setResult({
    //   suggested_title: "Pengembangan Mockup Logo Kopi Senja",
    //   keywords: ["kopi", "senja", "modern", "elegan", "simpel"],
    //   style_suggestions: ["Minimalis", "Kontemporer", "Klasik Modern"]
    // });
    setIsLoading(false);
  };

  return (
    <Card className="bg-muted/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          Butuh Bantuan Brief?
        </CardTitle>
        <CardDescription>
          Jelaskan idemu dengan kata-katamu sendiri, dan biarkan AI kami membantu menyusunnya menjadi brief yang lebih terstruktur.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Contoh: saya mau buat logo untuk usaha kopi saya namanya 'Kopi Senja', pengennya yang simpel tapi keliatan modern dan elegan..."
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          disabled={isLoading}
        />
        <Button onClick={handleGenerateBrief} disabled={isLoading} className="w-full">
          {isLoading ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Menganalisis...</>
          ) : (
            <><Wand2 className="mr-2 h-4 w-4" /> Bantu Saya Buatkan Brief</>
          )}
        </Button>

        {result && (
          <div className="space-y-3 pt-4 border-t animate-in fade-in-0">
            <h4 className="font-semibold">Saran dari AI:</h4>
            <div className="text-sm">
              <p className="text-muted-foreground">Judul Proyek:</p>
              <p className="font-medium">{result.suggested_title}</p>
            </div>
             <div className="text-sm">
              <p className="text-muted-foreground">Kata Kunci:</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {result.keywords.map(kw => <Badge key={kw} variant="secondary">{kw}</Badge>)}
              </div>
            </div>
             <div className="text-sm">
              <p className="text-muted-foreground">Saran Gaya Desain:</p>
               <div className="flex flex-wrap gap-2 mt-1">
                {result.style_suggestions.map(style => <Badge key={style} variant="secondary">{style}</Badge>)}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
