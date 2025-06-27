'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from "@/hooks/use-toast";
import { simulateTelegramResponse } from '@/ai/flows/simulate-telegram-response';
import { Bot, Loader2, Send, User } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';


interface Message {
  from: 'user' | 'bot';
  text: string;
}

export default function BotSimulationPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { from: 'bot', text: 'Selamat datang di simulator bot. Ketik pesan di bawah ini untuk melihat bagaimana bot akan merespons.' },
  ]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = { from: 'user', text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const result = await simulateTelegramResponse({
        text: inputValue,
        chatId: 12345, // A dummy chat ID for simulation
      });
      
      const botMessage: Message = { from: 'bot', text: result.response };
      setMessages(prev => [...prev, botMessage]);

    } catch (error: any) {
      console.error("Simulation failed:", error);
      toast({
        title: 'Simulasi Gagal',
        description: error.message || 'Terjadi kesalahan saat menjalankan simulasi.',
        variant: 'destructive',
      });
       const errorMessage: Message = { from: 'bot', text: 'Maaf, terjadi error pada sistem simulasi.' };
       setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-headline">Simulasi Bot Telegram</h1>
        <p className="text-muted-foreground">Uji coba respons bot terhadap berbagai pesan pelanggan di sini.</p>
      </div>

      <Card className="w-full max-w-2xl mx-auto flex flex-col h-[70vh]">
        <CardHeader>
          <CardTitle>Chat dengan Bot</CardTitle>
          <CardDescription>Ketik pesan dan tekan Kirim untuk melihat balasan bot.</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden p-0">
          <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={cn("flex items-end gap-2", message.from === 'user' ? 'justify-end' : 'justify-start')}>
                  {message.from === 'bot' && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback><Bot className="h-5 w-5"/></AvatarFallback>
                    </Avatar>
                  )}
                  <div className={cn("max-w-[75%] rounded-lg p-3 text-sm whitespace-pre-wrap", 
                    message.from === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  )}>
                    {message.text}
                  </div>
                   {message.from === 'user' && (
                    <Avatar className="h-8 w-8">
                       <AvatarFallback><User className="h-5 w-5"/></AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
               {isLoading && (
                    <div className="flex items-end gap-2 justify-start">
                         <Avatar className="h-8 w-8">
                             <AvatarFallback><Bot className="h-5 w-5"/></AvatarFallback>
                         </Avatar>
                        <div className="bg-muted rounded-lg p-3 text-sm flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin"/>
                            <span>Bot sedang mengetik...</span>
                        </div>
                    </div>
                )}
            </div>
          </ScrollArea>
        </CardContent>
        <form onSubmit={handleSendMessage} className="p-4 border-t">
          <div className="relative">
            <Input 
              placeholder="Ketik pesan Anda..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
              autoComplete="off"
            />
            <Button type="submit" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" disabled={isLoading || !inputValue.trim()}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Kirim</span>
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
