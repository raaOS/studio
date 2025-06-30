'use client';

import React from 'react'; // Removed useState as it might not be needed for placeholders
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'; // Removed CardFooter, Button, Input, Label, Badge, Switch if not used in placeholders
// import { mockDriveActivityLogs, mockCalendarActivityLogs, mockMeetActivityLogs } from '@/lib/data'; // Mock data not needed for placeholders
import { FolderSync, Save, TestTube2, Link as LinkIcon, FolderCog, CheckCircle, Video, CalendarDays, CalendarClock, Clock, KeyRound, FileJson, FolderInput, Lightbulb, UserPlus, Power, Flame } from 'lucide-react';
// import { useToast } from "@/hooks/use-toast"; // Toast not needed for placeholders
// import type { DriveActivityLog } from '@/lib/types'; // Types for mock data not needed
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'; // Table components not needed for placeholders
// import { ResponsiveTableWrapper } from '@/components/ResponsiveTableWrapper';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const DriveTab = () => {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><FolderCog /> Google Drive Integration</CardTitle>
          <CardDescription>Pengaturan integrasi Google Drive akan muncul di sini.</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <Flame className="h-4 w-4" />
            <AlertTitle>Dalam Pengembangan</AlertTitle>
            <AlertDescription>
              Fitur integrasi Google Drive sedang dipersiapkan dan akan segera tersedia.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}

const CalendarTab = () => {
    return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><CalendarClock /> Google Calendar Integration</CardTitle>
          <CardDescription>Pengaturan integrasi Google Calendar akan muncul di sini.</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <Flame className="h-4 w-4" />
            <AlertTitle>Dalam Pengembangan</AlertTitle>
            <AlertDescription>
              Fitur integrasi Google Calendar sedang dipersiapkan dan akan segera tersedia.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
    )
}

const MeetTab = () => {
    return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Video /> Google Meet Integration</CardTitle>
          <CardDescription>Pengaturan integrasi Google Meet akan muncul di sini.</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <Flame className="h-4 w-4" />
            <AlertTitle>Dalam Pengembangan</AlertTitle>
            <AlertDescription>
              Fitur integrasi Google Meet sedang dipersiapkan dan akan segera tersedia.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}

export default function GoogleIntegrationsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-headline">Integrasi Google</h1>
        <p className="text-muted-foreground">Kelola semua otomasi yang terhubung dengan akun Google Workspace Anda.</p>
      </div>
      <Tabs defaultValue="drive" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="drive">Google Drive</TabsTrigger>
          <TabsTrigger value="calendar">Google Calendar</TabsTrigger>
          <TabsTrigger value="meet">Google Meet</TabsTrigger>
        </TabsList>
        <TabsContent value="drive" className="mt-6">
            <DriveTab />
        </TabsContent>
        <TabsContent value="calendar" className="mt-6">
            <CalendarTab />
        </TabsContent>
        <TabsContent value="meet" className="mt-6">
            <MeetTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
