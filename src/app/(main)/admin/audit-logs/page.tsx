
"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, SlidersHorizontal, ListChecks } from 'lucide-react';
import { DatePickerWithRange } from '../../workforce/components/date-picker';
import { Input } from '@/components/ui/input';

const auditLogsData = [
  { timestamp: '2024-07-28 14:32:01', user: 'admin_user', action: 'Update', object: 'pH Threshold Max', oldValue: '8.5', newValue: '9.0' },
  { timestamp: '2024-07-28 10:00:15', user: 'admin_user', action: 'Login', object: 'System Access', oldValue: '-', newValue: 'Success' },
  { timestamp: '2024-07-28 09:02:00', user: 'S. Patel', action: 'Login', object: 'System Access', oldValue: '-', newValue: 'Success' },
  { timestamp: '2024-07-27 18:30:00', user: 'system', action: 'Auto-Generate', object: 'Work Order WO-00125', oldValue: '-', newValue: 'Created' },
  { timestamp: '2024-07-27 15:00:00', user: 'A. Khan', action: 'Update', object: 'Work Order WO-00123', oldValue: 'In Progress', newValue: 'Waiting Parts' },
];

export default function AuditLogsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-headline flex items-center gap-2"><ListChecks /> Audit Logs</h1>
                    <p className="text-muted-foreground">Track all critical changes, logins, and system events.</p>
                </div>
                <Button><Download className="mr-2 h-4 w-4" /> Export Logs</Button>
            </div>
            
             <Card>
                <CardHeader>
                    <CardTitle>Filter Logs</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input placeholder="Filter by user or action..." />
                    <DatePickerWithRange />
                    <Button>Apply Filters</Button>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="pt-6">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Timestamp</TableHead>
                                    <TableHead>User</TableHead>
                                    <TableHead>Action</TableHead>
                                    <TableHead>Object/Entity</TableHead>
                                    <TableHead>Old Value</TableHead>
                                    <TableHead>New Value</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {auditLogsData.map((log, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="text-sm">{log.timestamp}</TableCell>
                                        <TableCell className="font-medium">{log.user}</TableCell>
                                        <TableCell>{log.action}</TableCell>
                                        <TableCell>{log.object}</TableCell>
                                        <TableCell className="text-muted-foreground">{log.oldValue}</TableCell>
                                        <TableCell className="font-semibold text-primary">{log.newValue}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
