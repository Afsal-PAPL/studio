
"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { History, Star, TrendingUp, CircleDollarSign } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const vendorData = [
  { name: 'SKF Bearings', category: 'Mechanical Spares', sla: 98, contact: 'sales.skf@example.com' },
  { name: 'John Crane', category: 'Seals & Packing', sla: 95, contact: 'contact.jc@example.com' },
  { name: 'KSB Pumps India', category: 'OEM Spares', sla: 92, contact: 'service.ksb@example.com' },
  { name: 'Local Electricals', category: 'Electrical', sla: 85, contact: 'localelec@example.com' },
  { name: 'IOCL', category: 'Consumables', sla: 99, contact: 'iocl.support@example.com' },
];

const serviceHistoryData = [
  { asset: 'Dariyapur WDS - Pump 2', date: '2024-05-15', vendor: 'SKF Bearings', type: 'Bearing Replacement', cost: 15000, mtbfImpact: '+5%' },
  { asset: 'Kotarpur WTP - Motor 1', date: '2024-04-20', vendor: 'Local Electricals', type: 'Winding Repair', cost: 25000, mtbfImpact: '-2%' },
  { asset: 'Moterra SPS - Pump 8', date: '2024-03-10', vendor: 'John Crane', type: 'Seal Replacement', cost: 22000, mtbfImpact: '+8%' },
];

const vendorPerformanceData = [
  { vendor: 'SKF Bearings', slaCompliance: 98, avgCost: 18000, mtbfImpact: 5, rating: 4.8 },
  { vendor: 'John Crane', slaCompliance: 95, avgCost: 25000, mtbfImpact: 7, rating: 4.5 },
  { vendor: 'KSB Pumps India', slaCompliance: 92, avgCost: 45000, mtbfImpact: 3, rating: 4.2 },
  { vendor: 'Local Electricals', slaCompliance: 85, avgCost: 15000, mtbfImpact: -2, rating: 3.5 },
];

export default function VendorsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-headline">Vendors & Service History</h1>
                <p className="text-muted-foreground">Maintain reliable vendor relationships and historical maintenance data.</p>
            </div>

            <Tabs defaultValue="directory">
                <TabsList>
                    <TabsTrigger value="directory">Vendor Directory</TabsTrigger>
                    <TabsTrigger value="history">Service History by Asset</TabsTrigger>
                    <TabsTrigger value="performance">Vendor Performance</TabsTrigger>
                </TabsList>
                <TabsContent value="directory" className="mt-4">
                    <Card>
                        <CardHeader><CardTitle>Vendor Master List</CardTitle></CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Vendor Name</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>SLA Compliance</TableHead>
                                        <TableHead>Contact</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {vendorData.map((vendor, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">{vendor.name}</TableCell>
                                            <TableCell><Badge variant="outline">{vendor.category}</Badge></TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Progress value={vendor.sla} className="w-24 h-2" />
                                                    <span className="text-sm font-semibold">{vendor.sla}%</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>{vendor.contact}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="history" className="mt-4">
                    <Card>
                        <CardHeader><CardTitle>Asset Service History</CardTitle></CardHeader>
                        <CardContent>
                             <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Asset</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Vendor</TableHead>
                                        <TableHead>Service Type</TableHead>
                                        <TableHead>Cost (INR)</TableHead>
                                        <TableHead>MTBF Impact</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {serviceHistoryData.map((entry, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">{entry.asset}</TableCell>
                                            <TableCell>{entry.date}</TableCell>
                                            <TableCell>{entry.vendor}</TableCell>
                                            <TableCell>{entry.type}</TableCell>
                                            <TableCell>{entry.cost.toLocaleString()}</TableCell>
                                            <TableCell className={entry.mtbfImpact.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                                                {entry.mtbfImpact}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="performance" className="mt-4">
                    <Card>
                        <CardHeader><CardTitle>Vendor Performance Scorecard</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            {vendorPerformanceData.map((vendor, index) => (
                                <Card key={index} className="p-4">
                                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                                        <h3 className="text-lg font-bold text-primary">{vendor.vendor}</h3>
                                        <div className="flex items-center gap-2">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star key={i} className={cn("h-5 w-5", i < vendor.rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground")}/>
                                            ))}
                                            <span className="font-bold text-lg ml-2">{vendor.rating}/5.0</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                                        <div className="flex items-center gap-3 bg-muted p-3 rounded-lg">
                                            <TrendingUp className="h-6 w-6 text-muted-foreground" />
                                            <div>
                                                <p className="text-xs text-muted-foreground">SLA Compliance</p>
                                                <p className="font-bold text-lg">{vendor.slaCompliance}%</p>
                                            </div>
                                        </div>
                                         <div className="flex items-center gap-3 bg-muted p-3 rounded-lg">
                                            <CircleDollarSign className="h-6 w-6 text-muted-foreground" />
                                            <div>
                                                <p className="text-xs text-muted-foreground">Avg. Service Cost</p>
                                                <p className="font-bold text-lg">₹ {vendor.avgCost.toLocaleString()}</p>
                                            </div>
                                        </div>
                                         <div className="flex items-center gap-3 bg-muted p-3 rounded-lg">
                                            <History className="h-6 w-6 text-muted-foreground" />
                                            <div>
                                                <p className="text-xs text-muted-foreground">MTBF Impact</p>
                                                <p className={cn("font-bold text-lg", vendor.mtbfImpact > 0 ? 'text-green-600' : 'text-red-600')}>
                                                    {vendor.mtbfImpact > 0 ? `+${vendor.mtbfImpact}`: vendor.mtbfImpact}%
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
