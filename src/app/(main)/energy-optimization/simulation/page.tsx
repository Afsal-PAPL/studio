
"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart, Tooltip, Legend, ScatterChart, Scatter, ZAxis, ReferenceLine, AreaChart, Area, ComposedChart } from 'recharts';
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

const pumpCurveData = [
    { q: 0, h: 68, designed: 70, actual: 67, designed_eta: 0, actual_eta: 0, system: 20 },
    { q: 200, h: 65, designed: 67, actual: 64, designed_eta: 45, actual_eta: 42, system: 21 },
    { q: 400, h: 62, designed: 64, actual: 61, designed_eta: 65, actual_eta: 62, system: 24 },
    { q: 600, h: 58, designed: 60, actual: 57, designed_eta: 75, actual_eta: 72, system: 29 },
    { q: 800, h: 53, designed: 55, actual: 52, designed_eta: 80, actual_eta: 76, system: 36 },
    { q: 820, h: 52, designed: 54, actual: 51, designed_eta: 80.5, actual_eta: 76.5, system: 37 },
    { q: 1000, h: 45, designed: 47, actual: 44, designed_eta: 78, actual_eta: 74, system: 45 },
    { q: 1200, h: 35, designed: 37, actual: 34, designed_eta: 70, actual_eta: 65, system: 56 },
];
const bepPoint = { q: 820, h: 51, label: 'BEP' };
const dutyPoint = { q: 990, h: 45, label: 'Duty Point'};


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
  q: { label: 'Flow (m³/h)' },
  h: { label: 'Head (m)', color: 'hsl(var(--muted-foreground))' },
  system: { label: 'System Curve', color: 'hsl(var(--chart-1))' },
  designed: { label: 'Designed', color: 'hsl(var(--chart-2))' },
  actual: { label: 'Actual', color: 'hsl(var(--chart-5))' },
  designed_eta: { label: 'Designed Efficiency', color: 'hsl(var(--chart-2))' },
  actual_eta: { label: 'Actual Efficiency', color: 'hsl(var(--chart-5))' },
};

export default function SimulationPage() {
  return (
    <div className="space-y-6">
        <Tabs defaultValue="simulation">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                 <div>
                    <h1 className="text-3xl font-bold font-headline">Energy Simulation &amp; Analysis</h1>
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
            <TabsContent value="pump-curves" className="space-y-6 mt-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Q-H Curve Analysis</CardTitle>
                            <CardDescription>Analyze the pump's performance curve (Flow vs. Head).</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={chartConfig} className="h-[400px] w-full">
                                <ComposedChart data={pumpCurveData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="q" type="number" name="Flow" unit=" m³/h" />
                                    <YAxis dataKey="h" type="number" name="Head" unit=" m" domain={[0, 120]} ticks={[0, 30, 60, 90, 120]} />
                                    <Tooltip content={<ChartTooltipContent />} />
                                    <Legend />
                                    <Line type="monotone" dataKey="system" stroke="var(--color-system)" strokeWidth={2} dot={false} name="System Curve" strokeDasharray="5 5" />
                                    <Line type="monotone" dataKey="designed" stroke="var(--color-designed)" strokeWidth={2} dot={false} name="Designed" />
                                    <Line type="monotone" dataKey="actual" stroke="var(--color-actual)" strokeWidth={2} dot={false} name="Actual" />
                                    <Scatter
                                        data={[bepPoint]}
                                        shape={({ cx, cy }) => (
                                            <g>
                                                <path d={`M${cx},${cy}L${cx-8},${cy+8}L${cx+8},${cy+8}Z`} fill="hsl(var(--primary))" opacity="0.5" />
                                                <text x={cx} y={cy - 12} textAnchor="middle" fill="black" fontSize="10" className="font-bold bg-primary/20 px-1 py-0.5 rounded-sm">{bepPoint.label}</text>
                                            </g>
                                        )}
                                        name="Best Efficiency Point"
                                    />
                                    <Scatter
                                        data={[dutyPoint]}
                                        shape={({ cx, cy }) => (
                                            <g>
                                                <circle cx={cx} cy={cy} r={6} fill="hsl(var(--destructive))" />
                                                <text x={cx} y={cy + 20} textAnchor="middle" fill="hsl(var(--destructive))" fontSize="10" className="font-bold">{dutyPoint.label}</text>
                                            </g>
                                        )}
                                        name="Duty Point (Actual vs System)"
                                    />
                                </ComposedChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle>Efficiency Curve Analysis</CardTitle>
                            <CardDescription>Analyze the pump's efficiency curve (Flow vs. Efficiency).</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={chartConfig} className="h-[400px] w-full">
                                <LineChart data={pumpCurveData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="q" type="number" name="Flow" unit=" m³/h" />
                                    <YAxis type="number" name="Efficiency" unit="%" domain={[0, 100]} />
                                    <Tooltip content={<ChartTooltipContent />} />
                                    <Legend />
                                    <Line type="monotone" dataKey="designed_eta" stroke="var(--color-designed_eta)" strokeWidth={2} dot={false} name="Designed Efficiency" />
                                    <Line type="monotone" dataKey="actual_eta" stroke="var(--color-actual_eta)" strokeWidth={2} dot={false} name="Actual Efficiency" />
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

    

    

