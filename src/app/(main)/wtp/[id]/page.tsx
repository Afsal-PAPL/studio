
"use client"
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart } from 'recharts';
import { Breadcrumb } from '@/components/breadcrumb';

const chartData = [
  { time: '12:00am', inlet: 400, outlet: 250, energy: 50 },
  { time: '02:00am', inlet: 600, outlet: 300, energy: 75 },
  { time: '04:00am', inlet: 800, outlet: 450, energy: 120 },
  { time: '06:00am', inlet: 1000, outlet: 600, energy: 160 },
  { time: '08:00am', inlet: 1200, outlet: 750, energy: 200 },
  { time: '10:00am', inlet: 1400, outlet: 900, energy: 240 },
  { time: '12:00pm', inlet: 1600, outlet: 1100, energy: 280 },
  { time: '02:00pm', inlet: 1800, outlet: 1350, energy: 320 },
  { time: '04:00pm', inlet: 2000, outlet: 1600, energy: 360 },
  { time: '06:00pm', inlet: 2200, outlet: 1850, energy: 400 },
  { time: '08:00pm', inlet: 2300, outlet: 2100, energy: 420 },
  { time: '10:00pm', inlet: 2400, outlet: 2250, energy: 440 },
];

const chartConfig = {
  inlet: { label: 'Inlet Flow', color: 'hsl(var(--chart-1))' },
  outlet: { label: 'Outlet Flow', color: 'hsl(var(--chart-2))' },
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


export default function WTPDetailsPage({ params }: { params: { id: string } }) {
    const breadcrumbItems = [
        { label: "Location Wise Status", href: "/status" },
        { label: `WTP Station ${params.id}` }
    ];
    
    return (
        <div className="space-y-6">
            <Breadcrumb items={breadcrumbItems} />
            <h1 className="text-3xl font-bold font-headline">WTP Station {params.id} - Plant Summary</h1>
            
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
                    <CardHeader><CardTitle>Outlet Flow (KLD)</CardTitle></CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="h-[250px] w-full">
                            <LineChart data={chartData} accessibilityLayer>
                                <CartesianGrid vertical={false} />
                                <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} />
                                <YAxis />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Line type="monotone" dataKey="outlet" stroke="var(--color-outlet)" strokeWidth={2} dot={false}/>
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
                        <CardTitle>Outlet Quality</CardTitle>
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
                <MetricCard title="pH at Outlet" refValue="6.5-8.5" value="7.66" description="Outlet pH" />
                <MetricCard title="Elec. Cond." refValue="<1000µS/cm" value="300.98" description="TDS at Outlet" />
                <MetricCard title="TDS at outlet" refValue="<500 ppm" value="150.49" description="Channel TDS Sensor 1" />
                <MetricCard title="FRC at Outlet" refValue="0.2-0.5 ppm" value="0.17" description="Outlet Chlorine" />
                <MetricCard title="Turbidity at Outlet" refValue="<5 NTU" value="2.99" description="Outlet Turbidity" />
            </div>
        </div>
    );
}
