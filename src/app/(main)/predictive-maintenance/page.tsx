
"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart, Tooltip, PieChart, Pie, Cell, Legend, ReferenceLine, Area, AreaChart } from 'recharts';
import { Calendar as CalendarIcon, Droplets, Gauge, Zap, AlertCircle, RefreshCw, XCircle, ArrowRight, TrendingUp, Cpu, Info } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import type { DateRange } from 'react-day-picker';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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

const motorPredictors = [
  { component: 'Drive End Bearing', status: 'Warning', details: 'Vibration spike at 2:15 PM' },
  { component: 'Non-Drive End Bearing', status: 'Healthy', details: 'Normal operation' },
  { component: 'Stator Winding Phase U', status: 'Healthy', details: 'Normal temperature curve' },
  { component: 'Stator Winding Phase V', status: 'Healthy', details: 'Normal temperature curve' },
  { component: 'Stator Winding Phase W', status: 'Critical', details: 'Insulation resistance drop detected' },
];

const pumpPredictors = [
    { component: 'Impeller', status: 'Healthy', details: 'Efficiency at 98% of design curve' },
    { component: 'Mechanical Seal', status: 'Warning', details: 'Minor leakage detected via pressure drop' },
    { component: 'Casing', status: 'Healthy', details: 'No signs of erosion or cavitation' },
    { component: 'Drive End Bearing', status: 'Warning', details: 'Temperature 5% above baseline' },
];

const anomalyChartData = [
    { date: 'Jul 1', temp_anomaly: 0.5, insulation_anomaly: 1.2 },
    { date: 'Jul 2', temp_anomaly: 0.6, insulation_anomaly: 1.3 },
    { date: 'Jul 3', temp_anomaly: 0.5, insulation_anomaly: 1.2 },
    { date: 'Jul 4', temp_anomaly: 2.1, insulation_anomaly: 3.5 },
    { date: 'Jul 5', temp_anomaly: 2.5, insulation_anomaly: 4.1 },
    { date: 'Jul 6', temp_anomaly: 2.3, insulation_anomaly: 3.8 },
    { date: 'Jul 7', temp_anomaly: 2.6, insulation_anomaly: 4.5 },
];

const anomalyChartConfig = {
    temp_anomaly: { label: 'Temp Anomaly Score', color: 'hsl(var(--chart-1))' },
    insulation_anomaly: { label: 'Insulation Anomaly Score', color: 'hsl(var(--chart-2))' },
}

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

const DiagramHotspot = ({ top, left, label, status }: {top: string, left: string, label: string, status: 'Healthy' | 'Warning' | 'Critical'}) => {
    const statusClasses = {
        Healthy: 'bg-green-500',
        Warning: 'bg-yellow-500',
        Critical: 'bg-red-500',
    }
    return (
         <Popover>
            <PopoverTrigger asChild>
                <div className="absolute cursor-pointer group" style={{top, left}}>
                    <div className={cn("h-3 w-3 rounded-full animate-pulse", statusClasses[status])} />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block">
                        <div className="bg-background text-foreground text-xs rounded py-1 px-2 shadow-lg whitespace-nowrap">{label}</div>
                    </div>
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto text-sm">
                <p><strong>{label}</strong></p>
                <p>Status: <span className={cn(status === 'Healthy' ? 'text-green-500' : status === 'Warning' ? 'text-yellow-500' : 'text-red-500')}>{status}</span></p>
            </PopoverContent>
        </Popover>
    )
}

export default function PredictiveMaintenancePage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-headline">Predictive Maintenance</h1>
                    <p className="text-muted-foreground">Analyze asset health and predict potential failures.</p>
                </div>
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

             <Tabs defaultValue="snapshot" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="snapshot">Overall Snapshot</TabsTrigger>
                    <TabsTrigger value="motor-faults">Motor Faults & Predictors</TabsTrigger>
                    <TabsTrigger value="pump-faults">Pump Faults & Predictors</TabsTrigger>
                </TabsList>

                <TabsContent value="snapshot" className="mt-4">
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
                                            <Pie data={failureProbabilityData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={2} labelLine={false}>
                                                {failureProbabilityData.map((entry) => (<Cell key={entry.name} fill={entry.fill} />))}
                                            </Pie>
                                             <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} content={<ChartTooltipContent hideLabel />} />
                                             <Legend content={({ payload }) => (
                                                <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center text-xs">
                                                {payload?.map((entry) => (
                                                    <div key={entry.value} className="flex items-center gap-1.5">
                                                        <div className="h-2.5 w-2.5 rounded-full" style={{backgroundColor: entry.color}}/>
                                                        <span>{entry.value}</span>
                                                    </div>
                                                ))}
                                                </div>
                                            )} />
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
                </TabsContent>
                <TabsContent value="motor-faults" className="mt-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-1 space-y-6">
                            <Card>
                                <CardHeader><CardTitle>Interactive Motor Diagram</CardTitle></CardHeader>
                                <CardContent>
                                    <div className="relative w-full aspect-square bg-muted rounded-lg p-4">
                                        <Image src="https://i.ibb.co/6gZ0GzP/motor-diagram.png" alt="Motor Diagram" layout="fill" objectFit='contain' data-ai-hint="electric motor diagram" unoptimized/>
                                        <DiagramHotspot top="30%" left="15%" label="Winding U" status="Healthy" />
                                        <DiagramHotspot top="50%" left="15%" label="Winding V" status="Healthy" />
                                        <DiagramHotspot top="70%" left="15%" label="Winding W" status="Critical" />
                                        <DiagramHotspot top="40%" left="85%" label="NDE Bearing" status="Healthy" />
                                        <DiagramHotspot top="60%" left="50%" label="DE Bearing" status="Warning" />
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader><CardTitle>Temperature Anomaly</CardTitle></CardHeader>
                                <CardContent>
                                    <ChartContainer config={anomalyChartConfig} className="h-48 w-full">
                                        <BarChart data={anomalyChartData} margin={{left: -20}}>
                                            <CartesianGrid vertical={false} />
                                            <XAxis dataKey="date" fontSize={12} />
                                            <YAxis />
                                            <Tooltip content={<ChartTooltipContent />} />
                                            <Bar dataKey="temp_anomaly" fill="var(--color-temp_anomaly)" radius={2} />
                                        </BarChart>
                                    </ChartContainer>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="lg:col-span-2 space-y-6">
                            <Card>
                                <CardHeader><CardTitle>Predictor Status: Motor</CardTitle></CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader><TableRow><TableHead>Component</TableHead><TableHead>Status</TableHead><TableHead>Details</TableHead></TableRow></TableHeader>
                                        <TableBody>
                                            {motorPredictors.map(p => (
                                                <TableRow key={p.component}>
                                                    <TableCell className="font-medium">{p.component}</TableCell>
                                                    <TableCell>
                                                        <span className={cn('px-2 py-1 rounded-full text-xs font-semibold', p.status === 'Healthy' ? 'bg-green-100 text-green-800' : p.status === 'Warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800')}>
                                                            {p.status}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell>{p.details}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader><CardTitle>Insulation Resistance Degradation</CardTitle><CardDescription>Anomaly score over time. Higher score indicates faster degradation.</CardDescription></CardHeader>
                                <CardContent>
                                    <ChartContainer config={anomalyChartConfig} className="h-64 w-full">
                                        <AreaChart data={anomalyChartData} margin={{left: -20}}>
                                            <CartesianGrid vertical={false} />
                                            <XAxis dataKey="date" />
                                            <YAxis />
                                            <Tooltip content={<ChartTooltipContent indicator="dot" />} />
                                            <Area type="monotone" dataKey="insulation_anomaly" strokeWidth={2} stroke="var(--color-insulation_anomaly)" fill="var(--color-insulation_anomaly)" fillOpacity={0.2} />
                                            <ReferenceLine y={3.0} stroke="hsl(var(--destructive))" strokeDasharray="3 3" label={{ value: "Warning Threshold", position: "insideTopLeft", fill: "hsl(var(--destructive))", fontSize: 12 }} />
                                        </AreaChart>
                                    </ChartContainer>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="pump-faults" className="mt-4">
                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-1 space-y-6">
                             <Card>
                                <CardHeader><CardTitle>Interactive Pump Diagram</CardTitle></CardHeader>
                                <CardContent>
                                    <div className="relative w-full aspect-square bg-muted rounded-lg p-4">
                                        <Image src="https://i.ibb.co/hK9Yv0K/pump-diagram.png" alt="Pump Diagram" layout="fill" objectFit='contain' data-ai-hint="water pump diagram" unoptimized/>
                                        <DiagramHotspot top="55%" left="20%" label="Suction" status="Healthy" />
                                        <DiagramHotspot top="65%" left="45%" label="Impeller" status="Healthy" />
                                        <DiagramHotspot top="45%" left="60%" label="Mechanical Seal" status="Warning" />
                                        <DiagramHotspot top="60%" left="75%" label="Bearing" status="Warning" />
                                        <DiagramHotspot top="25%" left="80%" label="Discharge" status="Healthy" />
                                    </div>
                                </CardContent>
                            </Card>
                             <Card>
                                <CardHeader><CardTitle>Efficiency Degradation</CardTitle></CardHeader>
                                <CardContent>
                                     <ChartContainer config={{ efficiency: {label: 'Efficiency', color: 'hsl(var(--primary))'}}} className="h-48 w-full">
                                        <LineChart data={[ {date: 'Jan', efficiency: 88}, {date: 'Feb', efficiency: 88}, {date: 'Mar', efficiency: 87}, {date: 'Apr', efficiency: 87}, {date: 'May', efficiency: 86}, {date: 'Jun', efficiency: 85}, {date: 'Jul', efficiency: 84}]} margin={{left: -20}}>
                                            <CartesianGrid vertical={false} />
                                            <XAxis dataKey="date" fontSize={12} />
                                            <YAxis domain={[80, 90]} unit="%"/>
                                            <Tooltip content={<ChartTooltipContent />} />
                                            <Line type="monotone" dataKey="efficiency" strokeWidth={2} stroke="var(--color-efficiency)" dot={{r: 2}}/>
                                        </LineChart>
                                    </ChartContainer>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="lg:col-span-2 space-y-6">
                            <Card>
                                <CardHeader><CardTitle>Predictor Status: Pump</CardTitle></CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader><TableRow><TableHead>Component</TableHead><TableHead>Status</TableHead><TableHead>Details</TableHead></TableRow></TableHeader>
                                        <TableBody>
                                            {pumpPredictors.map(p => (
                                                <TableRow key={p.component}>
                                                    <TableCell className="font-medium">{p.component}</TableCell>
                                                    <TableCell>
                                                        <span className={cn('px-2 py-1 rounded-full text-xs font-semibold', p.status === 'Healthy' ? 'bg-green-100 text-green-800' : p.status === 'Warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800')}>
                                                            {p.status}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell>{p.details}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Cavitation Risk Analysis</CardTitle>
                                    <CardDescription>Probability of cavitation based on suction pressure and flow rate deviations.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                     <ChartContainer config={{ risk: {label: 'Risk Score', color: 'hsl(var(--chart-5))'}}} className="h-64 w-full">
                                        <AreaChart data={[ {time: '12 AM', risk: 5}, {time: '4 AM', risk: 8}, {time: '8 AM', risk: 12}, {time: '12 PM', risk: 25}, {time: '4 PM', risk: 18}, {time: '8 PM', risk: 10} ]} margin={{left: -20}}>
                                            <CartesianGrid vertical={false} />
                                            <XAxis dataKey="time" />
                                            <YAxis unit="%"/>
                                            <Tooltip content={<ChartTooltipContent indicator="dot" />} />
                                            <Area type="monotone" dataKey="risk" strokeWidth={2} stroke="var(--color-risk)" fill="var(--color-risk)" fillOpacity={0.2} />
                                            <ReferenceLine y={20} stroke="hsl(var(--destructive))" strokeDasharray="3 3" label={{ value: "High Risk", position: "insideTopLeft", fill: "hsl(var(--destructive))", fontSize: 12 }} />
                                        </AreaChart>
                                    </ChartContainer>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
