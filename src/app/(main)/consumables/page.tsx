
"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertTriangle, Droplets, Filter, FilePlus } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { Badge } from '@/components/ui/badge';

const usageData = [
  { month: 'Jan', usage: 20 },
  { month: 'Feb', usage: 22 },
  { month: 'Mar', usage: 25 },
  { month: 'Apr', usage: 24 },
  { month: 'May', usage: 28 },
  { month: 'Jun', usage: 32 },
];

const chartConfig = {
  usage: { label: 'Usage (Liters)', color: 'hsl(var(--primary))' },
};

const consumablesData = [
  { item: 'Synthetic Gear Oil VG68', avgUsage: '28 L/month', stock: 25, reorder: 'OK', standard: '25 L/month' },
  { item: 'Grease MP3', avgUsage: '5 kg/month', stock: 8, reorder: 'OK', standard: '5 kg/month' },
  { item: 'Mechanical Seal 45mm', avgUsage: '2 units/month', stock: 8, reorder: 'OK', standard: '1 unit/month' },
  { item: 'Air Filter 12"', avgUsage: '1 unit/month', stock: 3, reorder: 'Reorder', standard: '1 unit/month' },
];

export default function ConsumablesPage() {
    const alertItem = consumablesData.find(item => item.item === 'Mechanical Seal 45mm');
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-headline">Consumables Tracking</h1>
                <p className="text-muted-foreground">Optimize usage of consumable materials like oil, grease, and seals.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Oil Usage vs Time (VG68)</CardTitle>
                        <CardDescription>Monthly consumption trend for synthetic gear oil.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="h-64">
                            <LineChart data={usageData}>
                                <CartesianGrid vertical={false} />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip content={<ChartTooltipContent />} />
                                <Line type="monotone" dataKey="usage" stroke="hsl(var(--primary))" strokeWidth={2} />
                            </LineChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-yellow-500" /> Usage Alerts</CardTitle>
                        <CardDescription>Notifications for consumption anomalies.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {alertItem && (
                            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/50 border-l-4 border-yellow-500 rounded-r-lg">
                                <p className="font-semibold text-yellow-800 dark:text-yellow-300">Overuse Detected</p>
                                <p className="text-sm">
                                    {alertItem.item}: Usage ({alertItem.avgUsage}) exceeds OEM recommendation ({alertItem.standard}).
                                </p>
                            </div>
                        )}
                         <div className="p-3 bg-blue-100 dark:bg-blue-900/50 border-l-4 border-blue-500 rounded-r-lg">
                                <p className="font-semibold text-blue-800 dark:text-blue-300">Replenishment Alert</p>
                                <p className="text-sm">
                                    Air Filter 12": Stock is low. Time to reorder based on usage trends.
                                </p>
                            </div>
                    </CardContent>
                </Card>
            </div>
            
            <Card>
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
                            {consumablesData.map((item, index) => (
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
        </div>
    );
}
