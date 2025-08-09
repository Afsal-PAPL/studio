
"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoreHorizontal, UserPlus, Handshake } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const contractorsData = [
  { name: 'Alpha Maintenance Services', contactPerson: 'Ramesh Kumar', startDate: '2023-01-01', endDate: '2025-12-31', status: 'Active', scope: 'WTP & WDS Network' },
  { name: 'Beta Utility Solutions', contactPerson: 'Suresh Singh', startDate: '2023-06-01', endDate: '2024-05-31', status: 'Expired', scope: 'STP Network' },
  { name: 'Gamma Infra Ltd.', contactPerson: 'Anjali Sharma', startDate: '2024-01-01', endDate: '2026-12-31', status: 'Active', scope: 'Storm Water Pumping Stations' },
  { name: 'Delta Operators Inc.', contactPerson: 'Vikas Patel', startDate: '2023-08-15', endDate: '2024-08-14', status: 'Active', scope: 'SPS Network' },
];

export default function ContractsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-headline flex items-center gap-2"><Handshake /> O&amp;M Contracts</h1>
                    <p className="text-muted-foreground">Manage contracts and details for all O&amp;M contractors.</p>
                </div>
                 <Button><UserPlus className="mr-2 h-4 w-4" /> Add New Contractor</Button>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Contractor List</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Contractor Name</TableHead>
                                <TableHead>Scope</TableHead>
                                <TableHead>Term</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {contractorsData.map((contractor, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">
                                        <div>{contractor.name}</div>
                                        <div className="text-xs text-muted-foreground">{contractor.contactPerson}</div>
                                    </TableCell>
                                    <TableCell>{contractor.scope}</TableCell>
                                    <TableCell>{contractor.startDate} to {contractor.endDate}</TableCell>
                                    <TableCell>
                                        <Badge variant={contractor.status === 'Active' ? 'secondary' : 'destructive'} className={contractor.status === 'Active' ? 'bg-green-100 text-green-800' : ''}>
                                            {contractor.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                         <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                                <DropdownMenuItem>Edit Contract</DropdownMenuItem>
                                                <DropdownMenuItem>Renew Contract</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
