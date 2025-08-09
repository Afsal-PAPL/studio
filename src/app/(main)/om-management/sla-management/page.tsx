
"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, PlusCircle, Pencil, Copy, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const slaData = [
  { name: 'Pump Unit Efficiency SLA', category: 'Efficiency', target: '> 80%', contractor: 'Alpha Maintenance', status: 'Active' },
  { name: 'Energy Consumption Reduction', category: 'Energy', target: '5% YoY Decrease', contractor: 'Alpha Maintenance', status: 'Active' },
  { name: 'Asset Uptime Guarantee', category: 'Uptime', target: '> 99.5%', contractor: 'All', status: 'Active' },
  { name: 'MTTR for Critical Failures', category: 'Response Time', target: '< 4 hours', contractor: 'All', status: 'Active' },
  { name: 'Water Quality Compliance (STP)', category: 'Compliance', target: 'BOD < 10mg/l', contractor: 'Beta Utility', status: 'Draft' },
];

export default function SlaManagementPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-headline flex items-center gap-2"><FileText /> SLA Management</h1>
                    <p className="text-muted-foreground">Define, track, and manage Service Level Agreements for O&amp;M contractors.</p>
                </div>
                <Button><PlusCircle className="mr-2 h-4 w-4" /> Create New SLA</Button>
            </div>

            <Card>
                 <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>SLA Definitions</CardTitle>
                        <div className="flex items-center gap-2">
                            <Select defaultValue="all">
                                <SelectTrigger className="w-[180px]"><SelectValue placeholder="Filter by contractor..." /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Contractors</SelectItem>
                                    <SelectItem value="alpha">Alpha Maintenance</SelectItem>
                                    <SelectItem value="beta">Beta Utility</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>SLA Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Target</TableHead>
                                <TableHead>Contractor</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {slaData.map((sla, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{sla.name}</TableCell>
                                    <TableCell>{sla.category}</TableCell>
                                    <TableCell><Badge variant="outline">{sla.target}</Badge></TableCell>
                                    <TableCell>{sla.contractor}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Switch checked={sla.status === 'Active'} />
                                            <span>{sla.status}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="flex gap-1">
                                        <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button>
                                        <Button variant="ghost" size="icon"><Copy className="h-4 w-4" /></Button>
                                        <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
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
