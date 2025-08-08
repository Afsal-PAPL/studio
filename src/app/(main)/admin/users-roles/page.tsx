
"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoreHorizontal, UserPlus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const usersData = [
  { name: 'Admin User', role: 'Administrator', lastLogin: '2024-07-28 10:00', status: 'Active' },
  { name: 'R. Sharma', role: 'Technician', lastLogin: '2024-07-28 08:55', status: 'Active' },
  { name: 'S. Patel', role: 'Operator', lastLogin: '2024-07-28 09:02', status: 'Active' },
  { name: 'A. Khan', role: 'Technician', lastLogin: '2024-07-27 14:30', status: 'Active' },
  { name: 'Guest User', role: 'Viewer', lastLogin: 'N/A', status: 'Inactive' },
];

const permissions = {
  'View Dashboards': ['Administrator', 'Operator', 'Technician', 'Viewer'],
  'Acknowledge Alerts': ['Administrator', 'Operator'],
  'Create Work Orders': ['Administrator', 'Operator'],
  'Assign Work Orders': ['Administrator'],
  'Manage Inventory': ['Administrator'],
  'Manage Users': ['Administrator'],
  'System Configuration': ['Administrator'],
};

export default function UsersRolesPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-headline">Users & Roles</h1>
                    <p className="text-muted-foreground">Manage user accounts and role-based access control (RBAC).</p>
                </div>
                 <Button><UserPlus className="mr-2 h-4 w-4" /> Add User</Button>
            </div>
            <Tabs defaultValue="users">
                <TabsList>
                    <TabsTrigger value="users">Users</TabsTrigger>
                    <TabsTrigger value="roles">Role Permissions</TabsTrigger>
                </TabsList>
                <TabsContent value="users" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>User List</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Last Login</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {usersData.map((user, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">{user.name}</TableCell>
                                            <TableCell><Badge variant="outline">{user.role}</Badge></TableCell>
                                            <TableCell>{user.lastLogin}</TableCell>
                                            <TableCell>
                                                <Badge variant={user.status === 'Active' ? 'secondary' : 'destructive'} className={user.status === 'Active' ? 'bg-green-100 text-green-800' : ''}>
                                                    {user.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                 <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>Edit User</DropdownMenuItem>
                                                        <DropdownMenuItem>Reset Password</DropdownMenuItem>
                                                        <DropdownMenuItem className="text-destructive">Deactivate User</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="roles" className="mt-4">
                     <Card>
                        <CardHeader>
                            <CardTitle>Role Permissions Matrix</CardTitle>
                            <CardDescription>Define what each role can see and do.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[250px]">Permission</TableHead>
                                            <TableHead className="text-center">Administrator</TableHead>
                                            <TableHead className="text-center">Operator</TableHead>
                                            <TableHead className="text-center">Technician</TableHead>
                                            <TableHead className="text-center">Viewer</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {Object.entries(permissions).map(([permission, roles]) => (
                                            <TableRow key={permission}>
                                                <TableCell className="font-medium">{permission}</TableCell>
                                                {['Administrator', 'Operator', 'Technician', 'Viewer'].map(role => (
                                                    <TableCell key={role} className="text-center">
                                                        <Checkbox checked={roles.includes(role)} disabled={role === 'Administrator'} />
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
