
"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart, Tooltip, Legend, ScatterChart, Scatter, ZAxis } from 'recharts';
import { Download, Calendar as CalendarIcon, Zap, TrendingUp, SlidersHorizontal, BarChart2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import type { DateRange } from 'react-day-picker';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const kwhVsFlowData = [
  { name: 'Day 1', kwh: 350, flow: 1200 }, { name: 'Day 2', kwh: 355, flow: 1210 }, { name: 'Day 3', kwh: 348, flow: 1190 },
  { name: 'Day 4', kwh: 352, flow: 1205 }, { name: 'Day 5', kwh: 360, flow: 1220 }, { name: 'Day 6', kwh: 358, flow: 1215 },
  { name: 'Day 7', kwh: 365, flow: 1230 },
];
const costVsTimeData = [
    { name: 'Day 1', cost: 2800, isPeak: false }, { name: 'Day 2', cost: 2840, isPeak: false }, { name: 'Day 3', cost: 3480, isPeak: true },
    { name: 'Day 4', cost: 3520, isPeak: true }, { name: 'Day 5', cost: 2880, isPeak: false }, { name: 'Day 6', cost: 2864, isPeak: false },
    { name: 'Day 7', cost: 3700, isPeak: true },
];
const runtimeDistributionData = [
    { name: 'Pump 1', onPeak: 4, offPeak: 18 }, { name: 'Pump 2', onPeak: 6, offPeak: 16 }, { name: 'Pump 3', onPeak: 8, offPeak: 14 },
    { name: 'Pump 4', onPeak: 5, offPeak: 17 }, { name: 'Pump 5', onPeak: 7, offPeak: 15 },
];
const operatingCloudData = [
    { flow: 1200, head: 55, kw: 25 }, { flow: 1210, head: 56, kw: 26 }, { flow: 1190, head: 54, kw: 24 },
    { flow: 1205, head: 55, kw: 25 }, { flow: 1220, head: 57, kw: 27 }, { flow: 1215, head: 56, kw: 26 },
    { flow: 1230, head: 58, kw: 28 }, { flow: 1300, head: 60, kw: 30 }, { flow: 1310, head: 61, kw: 31 },
];

const chartConfig = {
  kwh: { label: 'kWh', color: 'hsl(var(--chart-1))' },
  flow: { label: 'Avg Flow (m³/h)', color: 'hsl(var(--chart-2))' },
  sec: { label: 'SEC (kWh/m³)', color: 'hsl(var(--primary))' },
  efficiency: { label: 'Efficiency (%)', color: 'hsl(var(--chart-3))' },
  cost: { label: 'Cost (INR)', color: 'hsl(var(--chart-4))' },
  onPeak: { label: 'On-Peak (hrs)', color: 'hsl(var(--destructive))' },
  offPeak: { label: 'Off-Peak (hrs)', color: 'hsl(var(--chart-2))' },
  kw: { label: 'kW' },
  head: { label: 'Head (m)' },
};

function DatePickerWithRange({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2024, 6, 1),
    to: new Date(2024, 6, 31),
  });
  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild><Button id="date" variant={'outline'} className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground')}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (date.to ? (<>{format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}</>) : (format(date.from, 'LLL dd, y'))) : (<span>Pick a date</span>)}
          </Button></PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start"><Calendar initialFocus mode="range" defaultMonth={date?.from} selected={date} onSelect={setDate} numberOfMonths={2} /></PopoverContent>
      </Popover>
    </div>
  );
}

export default function SimulationPage() {
  return (
    <div className="space-y-6">
        <Tabs defaultValue="simulation">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                 <div>
                    <h1 className="text-3xl font-bold font-headline">Energy Simulation & Analysis</h1>
                    <p className="text-muted-foreground">Perform "what-if" analysis to optimize energy consumption.</p>
                </div>
                <TabsList>
                    <TabsTrigger value="simulation">Simulation View</TabsTrigger>
                    <TabsTrigger value="pump-curves">Pump Curves</TabsTrigger>
                </TabsList>
            </div>

            <TabsContent value="simulation" className="space-y-6 mt-4">
                 <Card>
                    <CardHeader><CardTitle>What-If Controls</CardTitle></CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="speed-pct">Speed (%)</Label>
                            <Input id="speed-pct" type="number" defaultValue="100" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="k-delta-pct">System Friction Change (%)</Label>
                            <Input id="k-delta-pct" type="number" defaultValue="0" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="target-flow">Target Flow (m³/h)</Label>
                            <Input id="target-flow" type="number" defaultValue="1200" />
                        </div>
                        <div className="flex items-center space-x-2 pt-6">
                            <Switch id="duty-rotation" />
                            <Label htmlFor="duty-rotation">Duty Rotation</Label>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Simulation Analytics</CardTitle>
                        <CardDescription>Results based on the selected "what-if" parameters.</CardDescription>
                    </CardHeader>
                     <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <ChartCard title="kWh vs Flow Rate" description="Daily energy consumption vs. average flow rate.">
                             <BarChart data={kwhVsFlowData}>
                                <CartesianGrid vertical={false} />
                                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--chart-1))" />
                                <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--chart-2))" />
                                <Tooltip content={<ChartTooltipContent />} />
                                <Legend />
                                <Bar yAxisId="left" dataKey="kwh" name="kWh" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                                <Bar yAxisId="right" dataKey="flow" name="Flow" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ChartCard>
                        <ChartCard title="Cost vs Time" description="Daily operational cost with peak hours highlighted.">
                           <BarChart data={costVsTimeData}>
                                <CartesianGrid vertical={false} />
                                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis unit="₹" stroke="hsl(var(--muted-foreground))" />
                                <Tooltip content={<ChartTooltipContent formatter={(value, name, props) => {
                                    return `₹${value}`
                                }} />} />
                                <Legend />
                                <Bar dataKey="cost" name="Cost" radius={[4, 4, 0, 0]}>
                                    {costVsTimeData.map((entry, index) => (
                                        <div key={`cell-${index}`} fill={entry.isPeak ? 'hsl(var(--destructive))' : 'hsl(var(--chart-4))'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ChartCard>
                        <ChartCard title="Runtime Distribution" description="On-peak vs. off-peak runtime hours for each pump.">
                            <BarChart data={runtimeDistributionData} layout="vertical" stackOffset="expand">
                                <CartesianGrid horizontal={false} />
                                <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(value) => `${value * 100}%`} />
                                <Tooltip content={<ChartTooltipContent />} />
                                <Legend />
                                <Bar dataKey="onPeak" fill="var(--color-onPeak)" stackId="a" radius={[0, 4, 4, 0]}/>
                                <Bar dataKey="offPeak" fill="var(--color-offPeak)" stackId="a" radius={[4, 0, 0, 4]}/>
                            </BarChart>
                        </ChartCard>
                        <ChartCard title="Operating Cloud" description="Pump operating points showing Head vs. Flow, colored by kW.">
                            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                <CartesianGrid />
                                <XAxis type="number" dataKey="flow" name="Flow" unit=" m³/h" />
                                <YAxis type="number" dataKey="head" name="Head" unit=" m" />
                                <ZAxis type="number" dataKey="kw" range={[100, 500]} name="kW" />
                                <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<ChartTooltipContent />} />
                                <Legend />
                                <Scatter name="Operating Points" data={operatingCloudData} fill="hsl(var(--primary))" />
                            </ScatterChart>
                        </ChartCard>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="pump-curves">
                 <p className="text-center text-muted-foreground p-12">Pump Curves view is under construction.</p>
            </TabsContent>
        </Tabs>
    </div>
  );
}

const ChartCard = ({ title, description, children }: { title: string, description: string, children: React.ReactNode }) => (
    <Card>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
            <ChartContainer config={chartConfig} className="h-64 w-full">
                {children}
            </ChartContainer>
        </CardContent>
    </Card>
);

    