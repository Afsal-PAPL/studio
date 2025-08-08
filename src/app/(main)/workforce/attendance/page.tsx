
"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, XCircle, MapPin, Calendar as CalendarIcon, Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { DatePickerWithRange } from '../components/date-picker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const attendanceData = [
  { name: 'R. Sharma', date: '2024-07-28', station: 'Dariyapur WDS', checkIn: '08:55', gps: true, status: 'Present' },
  { name: 'S. Patel', date: '2024-07-28', station: 'Kotarpur WTP', checkIn: '09:02', gps: true, status: 'Present' },
  { name: 'A. Khan', date: '2024-07-28', station: 'Moterra SPS', checkIn: 'N/A', gps: false, status: 'Absent' },
  { name: 'V. Singh', date: '2024-07-28', station: 'Raska WTP', checkIn: '09:15', gps: false, status: 'Present (Manual)' },
  { name: 'M. Desai', date: '2024-07-28', station: 'Vejalpur SWPS', checkIn: '08:48', gps: true, status: 'Present' },
];

export default function AttendancePage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-headline">Workforce Attendance</h1>
                    <p className="text-muted-foreground">Monitor daily attendance logs and geofenced check-ins.</p>
                </div>
                 <div className="flex gap-2">
                    <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export Log</Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Filters</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     <Select defaultValue="all">
                        <SelectTrigger><SelectValue placeholder="Select Station" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Stations</SelectItem>
                            <SelectItem value="dariyapur-wds">Dariyapur WDS</SelectItem>
                            <SelectItem value="kotarpur-wtp">Kotarpur WTP</SelectItem>
                        </SelectContent>
                    </Select>
                    <DatePickerWithRange />
                     <Button>Apply Filters</Button>
                </CardContent>
            </Card>

            <Card>
                 <CardHeader>
                    <CardTitle>Daily Attendance Log</CardTitle>
                    <CardDescription>Showing records for {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Employee Name</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Station</TableHead>
                                <TableHead>Check-in Time</TableHead>
                                <TableHead>GPS Verified</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {attendanceData.map((log, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{log.name}</TableCell>
                                    <TableCell>{log.date}</TableCell>
                                    <TableCell>{log.station}</TableCell>
                                    <TableCell>{log.checkIn}</TableCell>
                                    <TableCell className="text-center">
                                        {log.gps ? <CheckCircle className="h-5 w-5 text-green-500" /> : <XCircle className="h-5 w-5 text-red-500" />}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={log.status === 'Present' ? 'default' : log.status === 'Absent' ? 'destructive' : 'secondary'} className={log.status === 'Present (Manual)' ? 'bg-yellow-500 text-white' : ''}>
                                            {log.status}
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
