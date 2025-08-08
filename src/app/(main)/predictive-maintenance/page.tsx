
"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart, Tooltip, PieChart, Pie, Cell, Legend, ReferenceLine, Area, AreaChart } from 'recharts';
import { Calendar as CalendarIcon, Droplets, Gauge, Zap, AlertCircle, RefreshCw, XCircle, ArrowRight, TrendingUp, Cpu } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import type { DateRange } from 'react-day-picker';
import { Progress } from '@/components/ui/progress';

const stationTabs = [
    { value: 'kotarpur-wtp', label: 'Kotarpur WTP' },
    { value: 'raska-wtp', label: 'Raska WTP' },
    { value: 'dariyapur-wds', label: 'Dariyapur WDS' },
    { value: 'mihir-tower-wds', label: 'Mihir Tower WDS' },
    { value: 'daffnala-stp', label: 'Daffnala STP' },
    { value: 'shankar-bhavan-stp', label: 'Shankar Bhavan STP' },
    { value: 'w-5-usmanpura-sps', label: 'W-5 Usmanpura SPS' },
    { value: 'moterra-sps', label: 'Moterra SPS' },
    { value: 'vejalpur-swps', label: 'Vejalpur SWPS' },
    { value: 'jaydeep-tower-swps', label: 'Jaydeep Tower SWPS' },
];

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

const predictiveChartData = [
  { time: '00:00', vibration: 2.1, load: 75, temp: 65 },
  { time: '02:00', vibration: 2.2, load: 76, temp: 66 },
  { time: '04:00', vibration: 2.0, load: 74, temp: 65 },
  { time: '06:00', vibration: 2.3, load: 78, temp: 67 },
  { time: '08:00', vibration: 2.5, load: 80, temp: 68 },
  { time: '10:00', vibration: 2.4, load: 79, temp: 68 },
  { time: '12:00', vibration: 3.5, load: 85, temp: 72 },
  { time: '14:00', vibration: 4.8, load: 88, temp: 75 },
  { time: '16:00', vibration: 5.1, load: 90, temp: 76 },
  { time: '18:00', vibration: 5.0, load: 89, temp: 75 },
  { time: '20:00', vibration: 4.9, load: 88, temp: 74 },
  { time: '22:00', vibration: 5.2, load: 91, temp: 77 },
];

const predictiveChartConfig = {
  vibration: { label: 'Vibration (mm/s)', color: 'hsl(var(--chart-1))' },
  load: { label: 'Load (%)', color: 'hsl(var(--chart-2))' },
  temp: { label: 'Temperature (°C)', color: 'hsl(var(--chart-3))' },
} satisfies ChartConfig;

const failureProbabilityData = [
  { name: 'Bearing Failure', value: 40, fill: 'hsl(var(--chart-1))' },
  { name: 'Seal Leakage', value: 30, fill: 'hsl(var(--chart-2))' },
  { name: 'Motor Winding', value: 20, fill: 'hsl(var(--chart-3))' },
  { name: 'Other', value: 10, fill: 'hsl(var(--muted))' },
];

const HealthScoreGauge = ({ score }: { score: number }) => {
    let scoreColor = 'text-green-500';
    if (score < 75) scoreColor = 'text-yellow-500';
    if (score < 50) scoreColor = 'text-red-500';

    return (
        <Card className="flex flex-col items-center justify-center">
            <CardHeader>
                <CardTitle className="text-base font-medium text-muted-foreground">Overall Health Score</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center">
                 <div className="relative h-24 w-48">
                    <svg viewBox="0 0 100 50" className="w-full">
                        <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
                        <path
                            d="M 10 50 A 40 40 0 0 1 90 50"
                            fill="none"
                            stroke="hsl(var(--primary))"
                            strokeWidth="10"
                            strokeDasharray={`${(score * 125.6) / 100} 125.6`}
                            className="transition-all duration-500"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`text-3xl font-bold ${scoreColor}`}>{score}%</span>
                    </div>
                </div>
                <p className={`mt-2 text-lg font-semibold ${scoreColor}`}>
                    {score >= 75 ? "Good" : score >= 50 ? "Warning" : "Critical"}
                </p>
            </CardContent>
        </Card>
    )
}

export default function PredictiveMaintenancePage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <h1 className="text-3xl font-bold font-headline">Predictive Maintenance</h1>
                <p className="text-muted-foreground">Analyze asset health and predict potential failures.</p>
            </div>
            
             <Card>
                <CardHeader>
                    <CardTitle>Predictive Analytics Filters</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Select defaultValue="dariyapur-wds">
                        <SelectTrigger><SelectValue placeholder="Select Station..." /></SelectTrigger>
                        <SelectContent>
                            {stationTabs.map(tab => (
                                <SelectItem key={tab.value} value={tab.value}>{tab.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select defaultValue="pump-2">
                        <SelectTrigger><SelectValue placeholder="Select Pump..." /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pump-1">Pump 1</SelectItem>
                            <SelectItem value="pump-2">Pump 2</SelectItem>
                            <SelectItem value="pump-3">Pump 3</SelectItem>
                            <SelectItem value="pump-4">Pump 4</SelectItem>
                            <SelectItem value="pump-5">Pump 5</SelectItem>
                            <SelectItem value="pump-6">Pump 6</SelectItem>
                            <SelectItem value="pump-7">Pump 7</SelectItem>
                            <SelectItem value="pump-8">Pump 8</SelectItem>
                        </SelectContent>
                    </Select>
                    <DatePickerWithRange />
                    <Button className="w-full lg:w-auto lg:self-end">Analyze</Button>
                </CardContent>
            </Card>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-1 space-y-6">
                    <HealthScoreGauge score={48} />
                     <Card>
                        <CardHeader>
                            <CardTitle>Remaining Useful Life (RUL)</CardTitle>
                            <CardDescription>Prediction of time until next maintenance</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-baseline justify-center gap-2">
                                <p className="text-4xl font-bold text-primary">45</p>
                                <span className="text-lg font-medium text-muted-foreground">days</span>
                            </div>
                            <Progress value={60} className="mt-4 h-2" />
                            <p className="text-xs text-center text-muted-foreground mt-2">Based on current operating conditions</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Failure Probability</CardTitle>
                            <CardDescription>Likelihood of different failure modes</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <ChartContainer config={{}} className="h-48 w-full">
                                <PieChart accessibilityLayer layout="vertical" margin={{left: 30}}>
                                    <Pie data={failureProbabilityData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={2} label={({name, value}) => `${name}: ${value}%`} labelLine={false} />
                                     <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} content={<ChartTooltipContent hideLabel />} />
                                </PieChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-2 space-y-6">
                     <Card>
                        <CardHeader>
                            <CardTitle>Vibrations (RMS)</CardTitle>
                            <CardDescription>Real-time vibration monitoring for Dariyapur WDS - Pump 2</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={predictiveChartConfig} className="h-64 w-full">
                                <AreaChart data={predictiveChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} />
                                    <YAxis unit="mm/s" />
                                    <Tooltip content={<ChartTooltipContent indicator="dot" />} />
                                    <defs>
                                        <linearGradient id="colorVibration" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="var(--color-vibration)" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="var(--color-vibration)" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <Area type="monotone" dataKey="vibration" stroke="var(--color-vibration)" fill="url(#colorVibration)" strokeWidth={2} />
                                    <ReferenceLine y={8.5} label={{ value: "Alarm", position: 'insideTopRight', fill: 'hsl(var(--destructive))' }} stroke="hsl(var(--destructive))" strokeDasharray="3 3" />
                                    <ReferenceLine y={5.0} label={{ value: "Warning", position: 'insideTopRight', fill: 'hsl(var(--chart-5))' }} stroke="hsl(var(--chart-5))" strokeDasharray="3 3" />
                                </AreaChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Load Conditions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer config={predictiveChartConfig} className="h-64 w-full">
                                    <BarChart data={predictiveChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                        <CartesianGrid vertical={false} />
                                        <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} />
                                        <YAxis unit="%" />
                                        <Tooltip content={<ChartTooltipContent indicator="dot" />} />
                                        <Bar dataKey="load" fill="var(--color-load)" radius={4} />
                                        <ReferenceLine y={90} label={{ value: "Overload", position: 'insideTop', fill: 'hsl(var(--destructive))' }} stroke="hsl(var(--destructive))" strokeDasharray="3 3" />
                                    </BarChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader>
                                <CardTitle>Bearing Temperature</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer config={predictiveChartConfig} className="h-64 w-full">
                                    <LineChart data={predictiveChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                        <CartesianGrid vertical={false} />
                                        <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} />
                                        <YAxis unit="°C" />
                                        <Tooltip content={<ChartTooltipContent indicator="dot" />} />
                                        <Line type="monotone" dataKey="temp" stroke="var(--color-temp)" strokeWidth={2} dot={false}/>
                                        <ReferenceLine y={80} label={{ value: "High", position: 'insideTopRight', fill: 'hsl(var(--destructive))' }} stroke="hsl(var(--destructive))" strokeDasharray="3 3" />
                                    </LineChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
