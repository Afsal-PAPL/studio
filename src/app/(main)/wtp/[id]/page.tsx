
"use client"
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart } from 'recharts';
import { Breadcrumb } from '@/components/breadcrumb';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Droplets, Gauge, Zap } from 'lucide-react';
import Link from 'next/link';

const chartData = [
  { time: '12:00am', inlet: 400, output: 250, energy: 50 },
  { time: '02:00am', inlet: 600, output: 300, energy: 75 },
  { time: '04:00am', inlet: 800, output: 450, energy: 120 },
  { time: '06:00am', inlet: 1000, output: 600, energy: 160 },
  { time: '08:00am', inlet: 1200, output: 750, energy: 200 },
  { time: '10:00am', inlet: 1400, output: 900, energy: 240 },
  { time: '12:00pm', inlet: 1600, output: 1100, energy: 280 },
  { time: '02:00pm', inlet: 1800, output: 1350, energy: 320 },
  { time: '04:00pm', inlet: 2000, output: 1600, energy: 360 },
  { time: '06:00pm', inlet: 2200, output: 1850, energy: 400 },
  { time: '08:00pm', inlet: 2300, output: 2100, energy: 420 },
  { time: '10:00pm', inlet: 2400, output: 2250, energy: 440 },
];

const chartConfig = {
  inlet: { label: 'Inlet Flow', color: 'hsl(var(--chart-1))' },
  output: { label: 'Output Flow', color: 'hsl(var(--chart-2))' },
  energy: { label: 'Energy Consumption', color: 'hsl(var(--chart-4))' },
} satisfies ChartConfig;

const MetricCard = ({ title, value, unit, description, refValue }: { title: string, value: string, unit?: string, description?: string, refValue?: string }) => (
    <Card className="text-center">
        <CardHeader className="p-4">
            <CardTitle className="text-sm font-medium text-muted-foreground">{title} {refValue && <span className="text-xs">({refValue})</span>}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
            <p className="text-2xl font-bold text-primary">{value}
                {unit && <span className="text-sm font-normal text-muted-foreground ml-1">{unit}</span>}
            </p>
            {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        </CardContent>
    </Card>
);

const QualityRow = ({ parameter, refValue, value }: { parameter: string, refValue: string, value: string }) => (
    <TableRow>
        <TableCell className="font-medium text-muted-foreground">{parameter} <span className="text-xs">({refValue})</span></TableCell>
        <TableCell className="text-right font-semibold">{value}</TableCell>
    </TableRow>
);

const StatusIndicator = ({ color = 'gray' }: { color: 'green' | 'yellow' | 'gray' }) => (
    <div className="flex items-center gap-2">
        <span className={`h-3 w-3 rounded-full animate-pulse ${ { green: 'bg-green-500', yellow: 'bg-yellow-500', gray: 'bg-gray-400' }[color] }`} />
        <span className="text-sm font-medium capitalize">{color === 'green' ? 'Running' : color === 'yellow' ? 'Standby' : 'No Data'}</span>
    </div>
);

const PumpCard = ({ stationId, pump, type }: { stationId: string, pump: any, type: string }) => (
     <Card className="flex flex-col">
        <CardHeader className="flex flex-row items-start justify-between">
            <CardTitle>{type} Pump {pump.id}</CardTitle>
            <StatusIndicator color={pump.status as 'green' | 'yellow' | 'gray'} />
        </CardHeader>
        <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
            <div className="grid grid-cols-1 gap-y-3 text-sm">
                <div className="flex items-center gap-2"><Droplets className="w-4 h-4 text-muted-foreground" /> <span>Discharge: <strong>{pump.discharge}</strong></span></div>
                <div className="flex items-center gap-2"><Gauge className="w-4 h-4 text-muted-foreground" /> <span>Efficiency: <strong>{pump.efficiency}</strong></span></div>
                <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-muted-foreground" /> <span>Energy: <strong>{pump.energy}</strong></span></div>
            </div>
            <Button className="w-full mt-4" asChild>
                <Link href={`/location/${stationId}/pump/${pump.id}`}>View Details</Link>
            </Button>
        </CardContent>
    </Card>
);

const rawWaterPumps = [
    { id: 1, status: 'green', discharge: '1400 m³/h', efficiency: '85%', energy: '15 MWh' },
    { id: 2, status: 'green', discharge: '1405 m³/h', efficiency: '86%', energy: '15.2 MWh' },
];

const treatedWaterPumps = [
    { id: 3, status: 'green', discharge: '1350 m³/h', efficiency: '88%', energy: '14 MWh' },
    { id: 4, status: 'yellow', discharge: '0 m³/h', efficiency: '0%', energy: '1.5 MWh' },
];


export default function WTPDetailsPage({ params }: { params: { id: string } }) {
    const stationNames: { [key: string]: string } = {
        '1': 'Kotarpur WTP',
        '2': 'Raska WTP'
    };

    const stationName = stationNames[params.id] || `WTP Station ${params.id}`;
    
    const breadcrumbItems = [
        { label: "Location Wise Status", href: "/status" },
        { label: stationName }
    ];
    
    return (
        <div className="space-y-6">
            <Breadcrumb items={breadcrumbItems} />
            <h1 className="text-3xl font-bold font-headline">{stationName}</h1>

            <Tabs defaultValue="summary" className="w-full">
                <TabsList>
                    <TabsTrigger value="summary">Plant Summary</TabsTrigger>
                    <TabsTrigger value="raw-water">Raw Water Pump House</TabsTrigger>
                    <TabsTrigger value="treated-water">Treated Water Pump House</TabsTrigger>
                </TabsList>
                <TabsContent value="summary" className="mt-4 space-y-6">
                     <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                         <Card className="col-span-1 lg:col-span-2">
                            <CardHeader><CardTitle>Inlet Flow - Cascade Aerator (KLD)</CardTitle></CardHeader>
                            <CardContent>
                                <ChartContainer config={chartConfig} className="h-[250px] w-full">
                                    <BarChart data={chartData} accessibilityLayer>
                                        <CartesianGrid vertical={false} />
                                        <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} />
                                        <YAxis />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Bar dataKey="inlet" fill="var(--color-inlet)" radius={4} />
                                    </BarChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                         <Card className="col-span-1 lg:col-span-2">
                            <CardHeader><CardTitle>Output Flow (KLD)</CardTitle></CardHeader>
                            <CardContent>
                                <ChartContainer config={chartConfig} className="h-[250px] w-full">
                                    <LineChart data={chartData} accessibilityLayer>
                                        <CartesianGrid vertical={false} />
                                        <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} />
                                        <YAxis />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Line type="monotone" dataKey="output" stroke="var(--color-output)" strokeWidth={2} dot={false}/>
                                    </LineChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                         <Card className="col-span-full lg:col-span-3">
                            <CardHeader><CardTitle>Total Energy Consumption</CardTitle></CardHeader>
                            <CardContent>
                                <ChartContainer config={chartConfig} className="h-[250px] w-full">
                                    <LineChart data={chartData} accessibilityLayer>
                                        <CartesianGrid vertical={false} />
                                        <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} />
                                        <YAxis />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Line type="monotone" dataKey="energy" stroke="var(--color-energy)" strokeWidth={2} dot={false}/>
                                    </LineChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>

                         <Card className="col-span-full lg:col-span-1">
                            <CardHeader>
                                <CardTitle>Output Quality</CardTitle>
                                <CardDescription>Real-time water quality metrics</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableBody>
                                        <QualityRow parameter="pH" refValue="6.5-8.5" value="7.64" />
                                        <QualityRow parameter="Turbidity" refValue="<5 NTU" value="2.57" />
                                        <QualityRow parameter="Elec. conductivity" refValue="<1000 µS/cm" value="276.42" />
                                        <QualityRow parameter="FRC" refValue="<0.2 ppm" value="0.12" />
                                        <QualityRow parameter="Temperature" refValue="15-30 °C" value="24.70" />
                                        <QualityRow parameter="TDS" refValue="<500 ppm" value="138.21" />
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                    
                    <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                        <MetricCard title="Energy Per KL" value="0.19" description="Energyperkl"/>
                        <MetricCard title="pH at Output" refValue="6.5-8.5" value="7.66" description="Output pH" />
                        <MetricCard title="Elec. Cond." refValue="<1000µS/cm" value="300.98" description="TDS at Output" />
                        <MetricCard title="TDS at output" refValue="<500 ppm" value="150.49" description="Channel TDS Sensor 1" />
                        <MetricCard title="FRC at Output" refValue="0.2-0.5 ppm" value="0.17" description="Output Chlorine" />
                        <MetricCard title="Turbidity at Output" refValue="<5 NTU" value="2.99" description="Output Turbidity" />
                    </div>
                </TabsContent>
                <TabsContent value="raw-water" className="mt-4">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                       {rawWaterPumps.map(pump => <PumpCard key={pump.id} stationId={params.id} pump={pump} type="Raw Water" />)}
                    </div>
                </TabsContent>
                <TabsContent value="treated-water" className="mt-4">
                     <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                       {treatedWaterPumps.map(pump => <PumpCard key={pump.id} stationId={params.id} pump={pump} type="Treated Water" />)}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
