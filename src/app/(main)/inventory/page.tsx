
"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, PackageSearch, AlertTriangle, ArrowRight, Truck } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const inventoryData = [
  { partCode: 'BRG-6203-ZZ', description: 'Ball Bearing 6203 ZZ', stock: 12, min: 10, vendor: 'SKF Bearings', leadTime: '5 days', location: 'Central Store' },
  { partCode: 'SEAL-MEC-45', description: 'Mechanical Seal 45mm', stock: 8, min: 5, vendor: 'John Crane', leadTime: '7 days', location: 'WTP-1 Store' },
  { partCode: 'IMP-KSB-150', description: 'Impeller KSB 150-315', stock: 2, min: 2, vendor: 'KSB Pumps', leadTime: '15 days', location: 'Central Store' },
  { partCode: 'OIL-SYN-VG68', description: 'Synthetic Gear Oil VG68', stock: 25, min: 20, vendor: 'IOCL', leadTime: '3 days', location: 'Consumables' },
  { partCode: 'FIL-AIR-12', description: 'Air Filter 12"', stock: 3, min: 5, vendor: 'Local Supplier', leadTime: '2 days', location: 'Central Store' },
];

const lowStockItems = inventoryData.filter(item => item.stock <= item.min);

export default function InventoryPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-headline">Inventory & Purchase Requisition</h1>
                    <p className="text-muted-foreground">Ensure timely availability of spare parts and manage stock.</p>
                </div>
            </div>

            <Tabs defaultValue="dashboard">
                <TabsList>
                    <TabsTrigger value="dashboard">Inventory Dashboard</TabsTrigger>
                    <TabsTrigger value="catalog">Parts Catalog</TabsTrigger>
                    <TabsTrigger value="pr-create">Create Purchase Requisition</TabsTrigger>
                </TabsList>
                <TabsContent value="dashboard" className="mt-4 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><AlertTriangle className="text-destructive h-5 w-5" /> Low Stock Alerts</CardTitle>
                            <CardDescription>{lowStockItems.length} items are at or below minimum stock level.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Part Code</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Current Stock</TableHead>
                                        <TableHead>Min Stock</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {lowStockItems.map(item => (
                                        <TableRow key={item.partCode} className="bg-destructive/10">
                                            <TableCell className="font-medium">{item.partCode}</TableCell>
                                            <TableCell>{item.description}</TableCell>
                                            <TableCell className="font-bold text-destructive">{item.stock}</TableCell>
                                            <TableCell>{item.min}</TableCell>
                                            <TableCell><Button size="sm">Create PR</Button></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="catalog" className="mt-4">
                    <Card>
                         <CardHeader>
                            <CardTitle className="flex items-center gap-2"><PackageSearch className="h-5 w-5 text-primary" /> Parts Catalog</CardTitle>
                             <CardDescription>Full list of all inventoried parts.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Part Code</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Stock</TableHead>
                                        <TableHead>Min</TableHead>
                                        <TableHead>Vendor</TableHead>
                                        <TableHead>Lead Time</TableHead>
                                        <TableHead>Location</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {inventoryData.map(item => (
                                        <TableRow key={item.partCode}>
                                            <TableCell className="font-medium">{item.partCode}</TableCell>
                                            <TableCell>{item.description}</TableCell>
                                            <TableCell className="font-bold">{item.stock}</TableCell>
                                            <TableCell>{item.min}</TableCell>
                                            <TableCell>{item.vendor}</TableCell>
                                            <TableCell>{item.leadTime}</TableCell>
                                            <TableCell>{item.location}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                 <TabsContent value="pr-create" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><PlusCircle className="h-5 w-5 text-primary" /> Create Purchase Requisition</CardTitle>
                            <CardDescription>Generate a new PR for parts procurement.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-2 gap-6">
                           <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="part-select">Select Part</Label>
                                    <Select>
                                        <SelectTrigger id="part-select"><SelectValue placeholder="Search for a part..." /></SelectTrigger>
                                        <SelectContent>
                                            {inventoryData.map(item => <SelectItem key={item.partCode} value={item.partCode}>{item.description} ({item.partCode})</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                     <Label htmlFor="quantity">Quantity</Label>
                                     <Input id="quantity" type="number" placeholder="e.g., 5" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="vendor-select">Vendor</Label>
                                    <Select>
                                        <SelectTrigger id="vendor-select"><SelectValue placeholder="Select a vendor..." /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="skf">SKF Bearings (Preferred)</SelectItem>
                                            <SelectItem value="john-crane">John Crane</SelectItem>
                                            <SelectItem value="local">Local Supplier</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                     <Label htmlFor="justification">Justification</Label>
                                     <Textarea id="justification" placeholder="e.g., Required for WO-00123" />
                                </div>
                                <Button className="w-full">
                                    Submit PR to ERP <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                           </div>
                           <div className="bg-muted rounded-lg p-6 flex flex-col items-center justify-center text-center">
                                <Truck className="h-16 w-16 text-muted-foreground mb-4" />
                                <h3 className="font-bold">ERP Integration</h3>
                                <p className="text-sm text-muted-foreground">
                                    Once submitted, the Purchase Requisition will be sent to the integrated ERP system for Purchase Order conversion and approval.
                                </p>
                           </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
