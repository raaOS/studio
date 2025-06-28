'use client';

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { mockAdminUsers } from '@/lib/data';
import { cn } from '@/lib/utils';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import type { AdminUser } from '@/lib/types';

export default function AdminUserManagementPage() {
  
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-500/20 text-green-700 border-green-500/30';
      case 'Inactive': return 'bg-gray-500/20 text-gray-700 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-700 border-gray-500/30';
    }
  };

  const getRoleClass = (role: string) => {
    switch (role) {
      case 'Admin': return 'bg-primary/20 text-primary border-primary/30';
      case 'Designer': return 'bg-blue-500/20 text-blue-700 border-blue-500/30';
      case 'Marketing': return 'bg-orange-500/20 text-orange-700 border-orange-500/30';
      default: return '';
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-2xl md:text-3xl font-bold font-headline">Manajemen User</h1>
            <p className="text-muted-foreground">Kelola pengguna dan peran di panel admin.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Tambah User
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Daftar User</CardTitle>
          <CardDescription>Total {mockAdminUsers.length} user terdaftar.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockAdminUsers.length > 0 ? (
            mockAdminUsers.map((user: AdminUser) => (
              <Card key={user.id}>
                <CardContent className="p-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="user avatar" />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Badge variant="outline" className={cn(getRoleClass(user.role))}>{user.role}</Badge>
                        <Badge variant="outline" className={cn("capitalize", getStatusClass(user.status))}>
                            {user.status}
                        </Badge>
                       <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>{user.status === 'Active' ? 'Deactivate' : 'Activate'}</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center text-muted-foreground py-12">
              <p>Tidak ada user yang ditemukan.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
