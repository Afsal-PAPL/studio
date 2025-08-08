
"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertTriangle, PlusCircle, Pencil, Bell, SlidersHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const rulesData = [
  { name: 'High Vibration Alert', assetType: 'Pump', parameter: 'Vibration (DE)', condition: '> 5.0 mm/s', priority: 'High', enabled: true },
  { name: 'Motor Overheating Warning', assetType: 'Motor', parameter: 'Winding Temp', condition: '> 85°C', priority: 'High', enabled: true },
  { name: 'Low Efficiency Alert', assetType: 'Pump Unit', parameter: 'Combined Efficiency', condition: '< 75%', priority: 'Medium', enabled: true },
  { name: 'Compliance pH Breach', assetType: 'WTP Output', parameter: 'pH', condition: '> 8.5', priority: 'Critical', enabled: true },
  { name: 'Low Oil Level', assetType: 'Pump', parameter: 'Oil Level', condition: '< 20%', priority: 'Low', enabled: false },
];

export default function AlertsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-headline">Alerts & Rules</h1>
                    <p className="text-muted-foreground">Configure rules to automatically generate alerts and work orders.</p>
                </div>
                 <Button><PlusCircle className="mr-2 h-4 w-4" /> Create New Rule</Button>
            </div>
            
             <Card>
                <CardHeader>
                    <CardTitle>Active Alerts Summary</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="border-destructive border-2">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
                            <AlertTriangle className="h-4 w-4 text-destructive" />
                        </CardHeader>
                        <CardContent><p className="text-2xl font-bold text-destructive">5</p></CardContent>
                    </Card>
                     <Card className="border-yellow-500 border-2">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Warning Alerts</CardTitle>
                            <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        </CardHeader>
                        <CardContent><p className="text-2xl font-bold text-yellow-500">12</p></CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Total Active Alerts</CardTitle>
                            <Bell className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent><p className="text-2xl font-bold">17</p></CardContent>
                    </Card>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Alert Rules</CardTitle>
                        <div className="flex items-center gap-2">
                             <Select defaultValue="all">
                                <SelectTrigger className="w-[180px]"><SelectValue placeholder="Filter by asset type..." /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Asset Types</SelectItem>
                                    <SelectItem value="pump">Pump</SelectItem>
                                    <SelectItem value="motor">Motor</SelectItem>
                                     <SelectItem value="wtp">WTP</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Rule Name</TableHead>
                                <TableHead>Asset Type</TableHead>
                                <TableHead>Parameter</TableHead>
                                <TableHead>Condition</TableHead>
                                <TableHead>Priority</TableHead>
                                <TableHead>Enabled</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rulesData.map((rule, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{rule.name}</TableCell>
                                    <TableCell>{rule.assetType}</TableCell>
                                    <TableCell>{rule.parameter}</TableCell>
                                    <TableCell><Badge variant="outline">{rule.condition}</Badge></TableCell>
                                    <TableCell>
                                        <Badge variant={rule.priority === 'High' || rule.priority === 'Critical' ? 'destructive' : rule.priority === 'Medium' ? 'secondary' : 'default'} className={rule.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : ''}>
                                            {rule.priority}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Switch checked={rule.enabled} />
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button>
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
