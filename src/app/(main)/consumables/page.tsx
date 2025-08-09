
"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertTriangle, Droplets, Filter, FilePlus, ChevronsRight } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const oilUsageData = [
  { month: 'Jan', usage: 20 },
  { month: 'Feb', usage: 22 },
  { month: 'Mar', usage: 25 },
  { month: 'Apr', usage: 24 },
  { month: 'May', usage: 28 },
  { month: 'Jun', usage: 32 },
];

const oilChartConfig = {
  usage: { label: 'Usage (Liters)', color: 'hsl(var(--primary))' },
};

const mechanicalConsumables = [
  { item: 'Synthetic Gear Oil VG68', avgUsage: '28 L/month', stock: 25, reorder: 'OK', standard: '25 L/month' },
  { item: 'Grease MP3', avgUsage: '5 kg/month', stock: 8, reorder: 'OK', standard: '5 kg/month' },
  { item: 'Mechanical Seal 45mm', avgUsage: '2 units/month', stock: 8, reorder: 'OK', standard: '1 unit/month' },
  { item: 'Air Filter 12"', avgUsage: '1 unit/month', stock: 3, reorder: 'Reorder', standard: '1 unit/month' },
];

const chemicalUsageData = [
  { month: 'Jan', usage: 450 },
  { month: 'Feb', usage: 460 },
  { month: 'Mar', usage: 480 },
  { month: 'Apr', usage: 475 },
  { month: 'May', usage: 490 },
  { month: 'Jun', usage: 510 },
];

const chemicalChartConfig = {
  usage: { label: 'Usage (kg)', color: 'hsl(var(--chart-2))' },
};

const chemicalConsumables = [
    { item: 'Chlorine Gas Cylinder', avgUsage: '500 kg/month', stock: 15, reorder: 'Reorder', standard: '480 kg/month' },
    { item: 'Alum (Liquid)', avgUsage: '1200 L/month', stock: 2500, reorder: 'OK', standard: '1100 L/month' },
    { item: 'Polymer', avgUsage: '150 kg/month', stock: 200, reorder: 'OK', standard: '150 kg/month' },
    { item: 'Caustic Soda', avgUsage: '80 kg/month', stock: 50, reorder: 'OK', standard: '100 kg/month' },
];


export default function ConsumablesPage() {
    const oilAlertItem = mechanicalConsumables.find(item => item.item === 'Synthetic Gear Oil VG68');
    const chemicalAlertItem = chemicalConsumables.find(item => item.item === 'Chlorine Gas Cylinder');

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-headline">Consumables Tracking</h1>
                <p className="text-muted-foreground">Optimize usage of consumable materials like oil, grease, seals, and chemicals.</p>
            </div>
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-yellow-500" /> Consumption Alerts</CardTitle>
                    <CardDescription>Notifications for consumption anomalies and low stock.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                     {oilAlertItem && (
                        <div className="p-3 bg-yellow-100 dark:bg-yellow-900/50 border-l-4 border-yellow-500 rounded-r-lg">
                            <p className="font-semibold text-yellow-800 dark:text-yellow-300">Overuse Detected (Lube)</p>
                            <p className="text-sm">
                                {oilAlertItem.item}: Usage ({oilAlertItem.avgUsage}) exceeds OEM recommendation ({oilAlertItem.standard}).
                            </p>
                        </div>
                    )}
                     {chemicalAlertItem && (
                        <div className="p-3 bg-yellow-100 dark:bg-yellow-900/50 border-l-4 border-yellow-500 rounded-r-lg">
                            <p className="font-semibold text-yellow-800 dark:text-yellow-300">Overuse Detected (Chemical)</p>
                            <p className="text-sm">
                                {chemicalAlertItem.item}: Usage ({chemicalAlertItem.avgUsage}) exceeds recommended dosing ({chemicalAlertItem.standard}).
                            </p>
                        </div>
                    )}
                     <div className="p-3 bg-blue-100 dark:bg-blue-900/50 border-l-4 border-blue-500 rounded-r-lg">
                            <p className="font-semibold text-blue-800 dark:text-blue-300">Replenishment Alert</p>
                            <p className="text-sm">
                                Air Filter 12" & Chlorine Gas Cylinder: Stock is low. Time to reorder based on usage trends.
                            </p>
                        </div>
                </CardContent>
            </Card>
            
            <Tabs defaultValue="mechanical">
                <TabsList>
                    <TabsTrigger value="mechanical">Mechanical & Lube</TabsTrigger>
                    <TabsTrigger value="chemical">Chemical Dosing</TabsTrigger>
                </TabsList>

                <TabsContent value="mechanical" className="mt-4">
                     <div className="grid gap-6 md:grid-cols-5">
                        <Card className="md:col-span-3">
                            <CardHeader>
                                <CardTitle>Consumable Stock & Usage</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Consumable Item</TableHead>
                                            <TableHead>Avg. Usage</TableHead>
                                            <TableHead>Current Stock</TableHead>
                                            <TableHead>OEM Standard</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {mechanicalConsumables.map((item, index) => (
                                            <TableRow key={index} className={item.reorder === 'Reorder' ? 'bg-destructive/10' : ''}>
                                                <TableCell className="font-medium">{item.item}</TableCell>
                                                <TableCell>{item.avgUsage}</TableCell>
                                                <TableCell className="font-bold">{item.stock}</TableCell>
                                                <TableCell>{item.standard}</TableCell>
                                                <TableCell>
                                                    <Badge variant={item.reorder === 'Reorder' ? 'destructive' : 'secondary'}>
                                                        {item.reorder}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle>Oil Usage vs Time (VG68)</CardTitle>
                                <CardDescription>Monthly consumption trend for synthetic gear oil.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer config={oilChartConfig} className="h-64">
                                    <LineChart data={oilUsageData}>
                                        <CartesianGrid vertical={false} />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip content={<ChartTooltipContent />} />
                                        <Line type="monotone" dataKey="usage" stroke="hsl(var(--primary))" strokeWidth={2} />
                                    </LineChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="chemical" className="mt-4">
                    <div className="grid gap-6 md:grid-cols-5">
                        <Card className="md:col-span-3">
                            <CardHeader>
                                <CardTitle>Chemical Stock & Dosage</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Chemical</TableHead>
                                            <TableHead>Avg. Dosage</TableHead>
                                            <TableHead>Current Stock</TableHead>
                                            <TableHead>Recommended</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {chemicalConsumables.map((item, index) => (
                                            <TableRow key={index} className={item.reorder === 'Reorder' ? 'bg-destructive/10' : ''}>
                                                <TableCell className="font-medium">{item.item}</TableCell>
                                                <TableCell>{item.avgUsage}</TableCell>
                                                <TableCell className="font-bold">{item.stock}</TableCell>
                                                <TableCell>{item.standard}</TableCell>
                                                <TableCell>
                                                    <Badge variant={item.reorder === 'Reorder' ? 'destructive' : 'secondary'}>
                                                        {item.reorder}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                         <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle>Chlorine Usage vs Time</CardTitle>
                                <CardDescription>Monthly consumption trend for chlorine gas.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer config={chemicalChartConfig} className="h-64">
                                    <LineChart data={chemicalUsageData}>
                                        <CartesianGrid vertical={false} />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip content={<ChartTooltipContent />} />
                                        <Line type="monotone" dataKey="usage" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                                    </LineChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
