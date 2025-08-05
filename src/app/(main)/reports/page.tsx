"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart, Tooltip } from 'recharts';
import { Printer, Calendar as CalendarIcon, Droplets, Gauge, Zap } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import type { DateRange } from 'react-day-picker';

const chartData = [
  { date: '2024-07-01', efficiency: 85, flow: 1200, energy: 350 },
  { date: '2024-07-02', efficiency: 86, flow: 1210, energy: 355 },
  { date: '2024-07-03', efficiency: 84, flow: 1190, energy: 348 },
  { date: '2024-07-04', efficiency: 85, flow: 1205, energy: 352 },
  { date: '2024-07-05', efficiency: 87, flow: 1220, energy: 360 },
  { date: '2024-07-06', efficiency: 86, flow: 1215, energy: 358 },
  { date: '2024-07-07', efficiency: 88, flow: 1230, energy: 365 },
];

const chartConfig = {
  efficiency: { label: 'Efficiency', color: 'hsl(var(--primary))' },
  flow: { label: 'Flow', color: 'hsl(var(--accent))' },
} satisfies ChartConfig;

function DatePickerWithRange({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2024, 6, 1),
    to: new Date(2024, 6, 7),
  });

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground')}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default function ReportsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <h1 className="text-3xl font-bold font-headline">Reports & Analysis</h1>
                <Button><Printer className="mr-2 h-4 w-4" /> Print Reports</Button>
            </div>
            
            <Card>
                <CardHeader><CardTitle>Filters</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Select defaultValue="loc1"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="loc1">Location 1</SelectItem><SelectItem value="loc2">Location 2</SelectItem></SelectContent></Select>
                    <Select defaultValue="perf"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="perf">Performance Summary</SelectItem><SelectItem value="energy">Energy Consumption</SelectItem></SelectContent></Select>
                    <DatePickerWithRange />
                    <Button className="w-full lg:w-auto lg:self-end">Generate Report</Button>
                </CardContent>
            </Card>

            <Tabs defaultValue="pump1" className="w-full">
                <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
                    <TabsTrigger value="pump1">Pump 1</TabsTrigger>
                    <TabsTrigger value="pump2">Pump 2</TabsTrigger>
                    <TabsTrigger value="pump3">Pump 3</TabsTrigger>
                </TabsList>
                <TabsContent value="pump1" className="space-y-4 mt-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Total Flow</CardTitle><Droplets className="h-4 w-4 text-muted-foreground"/></CardHeader><CardContent><div className="text-2xl font-bold">8,460 m³</div><p className="text-xs text-muted-foreground">over selected period</p></CardContent></Card>
                        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Average Efficiency</CardTitle><Gauge className="h-4 w-4 text-muted-foreground"/></CardHeader><CardContent><div className="text-2xl font-bold">85.7%</div><p className="text-xs text-muted-foreground">+1.2% from previous period</p></CardContent></Card>
                        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Total Energy</CardTitle><Zap className="h-4 w-4 text-muted-foreground"/></CardHeader><CardContent><div className="text-2xl font-bold">2,488 kWh</div><p className="text-xs text-muted-foreground">consumed in this period</p></CardContent></Card>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Card>
                          <CardHeader><CardTitle>Efficiency Over Time</CardTitle></CardHeader>
                          <CardContent>
                              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                                  <LineChart accessibilityLayer data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                      <CartesianGrid vertical={false} />
                                      <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })} />
                                      <YAxis yAxisId="left" orientation="left" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
                                      <Tooltip content={<ChartTooltipContent />} />
                                      <Line yAxisId="left" type="monotone" dataKey="efficiency" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                                  </LineChart>
                              </ChartContainer>
                          </CardContent>
                      </Card>
                      <Card>
                        <CardHeader><CardTitle>Flow vs Energy</CardTitle></CardHeader>
                        <CardContent>
                          <ChartContainer config={chartConfig} className="h-[300px] w-full">
                            <BarChart accessibilityLayer data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                              <CartesianGrid vertical={false} />
                              <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })} />
                              <YAxis />
                              <Tooltip content={<ChartTooltipContent indicator="dot" />} />
                              <Bar dataKey="flow" fill="hsl(var(--accent))" radius={4} />
                            </BarChart>
                          </ChartContainer>
                        </CardContent>
                      </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
