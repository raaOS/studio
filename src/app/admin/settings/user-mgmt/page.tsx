'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
            <h1 className="text-2xl md:text-3xl font-bold font-headline">User Management</h1>
            <p className="text-muted-foreground">Kelola pengguna dan peran di panel admin.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[250px]">User</TableHead>
                <TableHead className="whitespace-nowrap">Role</TableHead>
                <TableHead className="whitespace-nowrap">Status</TableHead>
                <TableHead className="text-right whitespace-nowrap">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAdminUsers.length > 0 ? (
                mockAdminUsers.map((user: AdminUser) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="user avatar" />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="whitespace-normal">{user.name}</p>
                                <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                        </div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                        <Badge variant="outline" className={cn(getRoleClass(user.role))}>{user.role}</Badge>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <Badge variant="outline" className={cn("capitalize", getStatusClass(user.status))}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right whitespace-nowrap">
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
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center h-24">
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
