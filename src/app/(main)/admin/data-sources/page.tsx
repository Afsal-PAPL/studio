
"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Database, Rss, PlusCircle, Pencil } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const dataSources = [
  { name: 'SCADA-Primary', type: 'OPC-UA', status: 'Connected', lastSync: 'Just now', details: 'opc.tcp://192.168.1.10:4840' },
  { name: 'IoT-Vibration-Sensors', type: 'MQTT', status: 'Connected', lastSync: '2 seconds ago', details: 'mqtt://iot.broker.com:1883' },
  { name: 'Lab-Data-CSV-Import', type: 'Manual Upload', status: 'Idle', lastSync: '2 hours ago', details: 'Awaiting next file upload' },
  { name: 'Backup-SCADA', type: 'OPC-UA', status: 'Disconnected', lastSync: '1 day ago', details: 'opc.tcp://192.168.1.11:4840' },
];

export default function DataSourcesPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-headline">Data Sources</h1>
                    <p className="text-muted-foreground">Configure and monitor data sources for sensor and manual readings.</p>
                </div>
                <Button><PlusCircle className="mr-2 h-4 w-4" /> Add Data Source</Button>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Configured Data Sources</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Last Sync</TableHead>
                                <TableHead>Details</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {dataSources.map((source, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium flex items-center gap-2">
                                        <Database className="h-4 w-4 text-muted-foreground" />
                                        {source.name}
                                    </TableCell>
                                    <TableCell>{source.type}</TableCell>
                                    <TableCell>
                                        <Badge variant={source.status === 'Connected' ? 'secondary' : 'destructive'} className={source.status === 'Connected' ? 'bg-green-100 text-green-800' : ''}>
                                            <Rss className="mr-1 h-3 w-3" />
                                            {source.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{source.lastSync}</TableCell>
                                    <TableCell className="text-xs text-muted-foreground">{source.details}</TableCell>
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
