
"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, XCircle, Clock, TrendingUp, TrendingDown, SlidersHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { DatePickerWithRange } from '../components/date-picker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

const slaData = [
  { woId: 'WO-00125', sla: '24h', timeTaken: '18h', status: 'Met' },
  { woId: 'WO-00124', sla: '48h', timeTaken: '52h', status: 'Breached' },
  { woId: 'WO-00123', sla: '72h', timeTaken: '68h', status: 'Met' },
  { woId: 'WO-00120', sla: '24h', timeTaken: '26h', status: 'Breached' },
  { woId: 'WO-00119', sla: '8h', timeTaken: '6h', status: 'Met' },
];

const MetricCard = ({ title, value, icon: Icon, trend, trendValue }: { title: string, value: string, icon: React.ElementType, trend?: 'up' | 'down', trendValue?: string }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
            {trend && trendValue && (
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                    {trend === 'up' ? <TrendingUp className="h-3 w-3 text-green-500" /> : <TrendingDown className="h-3 w-3 text-red-500" />}
                    {trendValue} from last month
                </p>
            )}
        </CardContent>
    </Card>
);

export default function SlaTrackingPage() {
    return (
        <div className="space-y-6">
             <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-headline">SLA Tracking</h1>
                    <p className="text-muted-foreground">Monitor and report on Service Level Agreement adherence.</p>
                </div>
            </div>

             <Card>
                <CardHeader>
                    <CardTitle>Filters</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
                     <Select defaultValue="all">
                        <SelectTrigger><SelectValue placeholder="Select Technician" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Technicians</SelectItem>
                            <SelectItem value="r-sharma">R. Sharma</SelectItem>
                            <SelectItem value="s-patel">S. Patel</SelectItem>
                        </SelectContent>
                    </Select>
                     <Select defaultValue="all-prio">
                        <SelectTrigger><SelectValue placeholder="Select Priority" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all-prio">All Priorities</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                             <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                    </Select>
                    <DatePickerWithRange />
                    <Button>Apply Filters</Button>
                </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-3">
                <MetricCard title="Overall SLA Adherence" value="60%" icon={CheckCircle} trend="down" trendValue="-5%" />
                <MetricCard title="Mean Time To Repair (MTTR)" value="34 Hours" icon={Clock} trend="up" trendValue="+2 hours" />
                <MetricCard title="SLA Breaches" value="2" icon={XCircle} trend="up" trendValue="+1" />
            </div>
            
            <Card>
                 <CardHeader>
                    <CardTitle>Work Order SLA Status</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Work Order ID</TableHead>
                                <TableHead>SLA</TableHead>
                                <TableHead>Time Taken</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {slaData.map((sla, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{sla.woId}</TableCell>
                                    <TableCell>{sla.sla}</TableCell>
                                    <TableCell>{sla.timeTaken}</TableCell>
                                    <TableCell>
                                        <Badge variant={sla.status === 'Met' ? 'secondary' : 'destructive'} className="flex items-center gap-1 w-fit">
                                            {sla.status === 'Met' ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                                            {sla.status}
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
