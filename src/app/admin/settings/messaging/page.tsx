'use client';

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockMessageTemplates } from '@/lib/data';
import { PlusCircle } from 'lucide-react';
import { MessageTemplateFormDialog } from '@/components/MessageTemplateFormDialog';
import type { MessageTemplate } from '@/lib/types';


export default function AdminMessagingPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<MessageTemplate | null>(null);

  const handleCreateTemplate = () => {
    setSelectedTemplate(null);
    setIsDialogOpen(true);
  };
  
  const handleEditTemplate = (template: MessageTemplate) => {
    setSelectedTemplate(template);
    setIsDialogOpen(true);
  };


  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-headline">Template Pesan Bot</h1>
            <p className="text-muted-foreground">Kelola semua pesan otomatis yang dikirim oleh bot Telegram.</p>
          </div>
          <Button onClick={handleCreateTemplate}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Buat Template Baru
          </Button>
        </div>
        
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Template ID</TableHead>
                  <TableHead>Deskripsi</TableHead>
                  <TableHead>Terakhir Diubah</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockMessageTemplates.length > 0 ? (
                  mockMessageTemplates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell className="font-mono text-xs">{template.id}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{template.description}</TableCell>
                      <TableCell>{template.lastUpdated}</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="outline" onClick={() => handleEditTemplate(template)}>Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center h-24">
                      Belum ada template pesan yang dibuat.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <MessageTemplateFormDialog
        template={selectedTemplate}
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </>
  );
}
