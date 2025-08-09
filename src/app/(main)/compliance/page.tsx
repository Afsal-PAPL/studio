
"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { Download, Calendar as CalendarIcon, Upload, AlertCircle, CheckCircle2, ShieldAlert, History } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import type { DateRange } from 'react-day-picker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const complianceData = {
    turbidity: { data: [{ time: '08:00', value: 2.1 }, { time: '10:00', value: 2.3 }, { time: '12:00', value: 2.2 }], status: 'OK', icon: CheckCircle2, color: 'text-green-500' },
    ph: { data: [{ time: '08:00', value: 8.7 }, { time: '10:00', value: 8.8 }, { time: '12:00', value: 8.6 }], status: 'Warning', icon: ShieldAlert, color: 'text-yellow-500' },
    chlorine: { data: [{ time: '08:00', value: 0.3 }, { time: '10:00', value: 0.4 }, { time: '12:00', value: 0.35 }], status: 'OK', icon: CheckCircle2, color: 'text-green-500' },
    bod: { data: [{ time: '08:00', value: 9.1 }, { time: '10:00', value: 9.3 }, { time: '12:00', value: 9.2 }], status: 'OK', icon: CheckCircle2, color: 'text-green-500' },
    cod: { data: [{ time: '08:00', value: 25 }, { time: '10:00', value: 28 }, { time: '12:00', value: 26 }], status: 'OK', icon: CheckCircle2, color: 'text-green-500' },
};

const chartConfig = {
  value: { label: 'Value' },
};

const auditTrailData = [
  { dateTime: '2024-07-28 14:32:01', parameter: 'pH Threshold Max', oldValue: '8.5', newValue: '9.0', user: 'admin_user', source: 'Manual Entry' },
  { dateTime: '2024-07-28 10:05:15', parameter: 'Turbidity Sensor', oldValue: '2.2', newValue: '2.3', user: 'system', source: 'Sensor FT-102' },
  { dateTime: '2024-07-27 18:00:00', parameter: 'BOD Reading', oldValue: '9.8', newValue: '9.5', user: 'lab_tech', source: 'Manual Lab Entry' },
];

function DatePickerWithRange({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2024, 6, 28),
    to: new Date(2024, 6, 28),
  });

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button id="date" variant={'outline'} className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground')}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (date.to ? `${format(date.from, 'LLL dd, y')} - ${format(date.to, 'LLL dd, y')}` : format(date.from, 'LLL dd, y')) : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start"><Calendar initialFocus mode="range" defaultMonth={date?.from} selected={date} onSelect={setDate} numberOfMonths={2} /></PopoverContent>
      </Popover>
    </div>
  );
}

export default function CompliancePage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-headline">Compliance (WTP & STP)</h1>
                    <p className="text-muted-foreground">Ensure adherence to environmental and operational standards.</p>
                </div>
            </div>
             <Card>
                <CardHeader>
                    <CardTitle>Filters</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                     <Select defaultValue="kotarpur-wtp">
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="kotarpur-wtp">Kotarpur WTP</SelectItem>
                            <SelectItem value="raska-wtp">Raska WTP</SelectItem>
                            <SelectItem value="daffnala-stp">Daffnala STP</SelectItem>
                            <SelectItem value="shankar-bhavan-stp">Shankar Bhavan STP</SelectItem>
                        </SelectContent>
                    </Select>
                     <Select defaultValue="all-params">
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all-params">All Parameters</SelectItem>
                            <SelectItem value="turbidity">Turbidity</SelectItem>
                            <SelectItem value="ph">pH</SelectItem>
                            <SelectItem value="chlorine">Residual Chlorine</SelectItem>
                             <SelectItem value="bod">BOD</SelectItem>
                            <SelectItem value="cod">COD</SelectItem>
                        </SelectContent>
                    </Select>
                    <DatePickerWithRange />
                    <Button><Download className="mr-2 h-4 w-4" /> Export PDF</Button>
                </CardContent>
            </Card>

            <Tabs defaultValue="dashboard">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="dashboard">Parameter Dashboard</TabsTrigger>
                    <TabsTrigger value="reports">Compliance Reports</TabsTrigger>
                    <TabsTrigger value="audit">Audit Trails</TabsTrigger>
                </TabsList>
                <TabsContent value="dashboard" className="mt-4 space-y-4">
                     <Card>
                        <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
                            <CardTitle>Compliance Summary</CardTitle>
                            <div className="flex items-center gap-2 text-sm text-yellow-600 animate-pulse">
                                <AlertCircle className="h-4 w-4" />
                                <span>pH exceeded limit at 14:32</span>
                            </div>
                        </CardHeader>
                        <CardContent className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                            {Object.entries(complianceData).map(([key, { data, status, icon: Icon, color }]) => (
                                <Card key={key}>
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-sm font-medium capitalize">{key}</CardTitle>
                                        <Icon className={cn("h-4 w-4", color)} />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{data[data.length - 1].value}</div>
                                        <p className={cn("text-xs", color)}>{status}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </CardContent>
                    </Card>
                    <div className="grid gap-4 md:grid-cols-2">
                         <Card>
                            <CardHeader><CardTitle>pH Trend (Warning)</CardTitle></CardHeader>
                            <CardContent>
                                <ChartContainer config={chartConfig} className="h-64">
                                    <LineChart data={complianceData.ph.data}>
                                        <CartesianGrid vertical={false} /><XAxis dataKey="time" /><YAxis domain={[8, 9]} /><Tooltip content={<ChartTooltipContent />} />
                                        <Line type="monotone" dataKey="value" stroke="hsl(var(--chart-5))" strokeWidth={2} />
                                    </LineChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader><CardTitle>Turbidity Trend (OK)</CardTitle></CardHeader>
                            <CardContent>
                                 <ChartContainer config={chartConfig} className="h-64">
                                    <LineChart data={complianceData.turbidity.data}>
                                        <CartesianGrid vertical={false} /><XAxis dataKey="time" /><YAxis domain={[2, 3]} /><Tooltip content={<ChartTooltipContent />} />
                                        <Line type="monotone" dataKey="value" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                                    </LineChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
                <TabsContent value="reports" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Generated Reports</CardTitle>
                            <CardDescription>View and download historical compliance reports.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center text-muted-foreground py-12">
                                <History className="mx-auto h-12 w-12" />
                                <p className="mt-4">No reports generated for the selected period.</p>
                                <Button className="mt-4">Generate Daily Report</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="audit" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Audit Trail</CardTitle>
                            <CardDescription>Log of all parameter readings, changes, and operator inputs.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Timestamp</TableHead>
                                            <TableHead>Parameter</TableHead>
                                            <TableHead>Old Value</TableHead>
                                            <TableHead>New Value</TableHead>
                                            <TableHead>User</TableHead>
                                            <TableHead>Source</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {auditTrailData.map((log, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{log.dateTime}</TableCell>
                                                <TableCell>{log.parameter}</TableCell>
                                                <TableCell>{log.oldValue}</TableCell>
                                                <TableCell className="font-semibold text-primary">{log.newValue}</TableCell>
                                                <TableCell>{log.user}</TableCell>
                                                <TableCell>{log.source}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
