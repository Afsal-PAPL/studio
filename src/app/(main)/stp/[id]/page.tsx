
"use client"
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { Breadcrumb } from '@/components/breadcrumb';

const chartData = [
  { time: '12am', bod: 9.8, cod: 27.0, tss: 4.8, ph: 7.52 },
  { time: '2am', bod: 9.6, cod: 26.5, tss: 4.6, ph: 7.50 },
  { time: '4am', bod: 9.4, cod: 26.0, tss: 4.5, ph: 7.48 },
  { time: '6am', bod: 9.7, cod: 26.8, tss: 4.7, ph: 7.51 },
  { time: '8am', bod: 10.0, cod: 27.5, tss: 5.0, ph: 7.55 },
  { time: '10am', bod: 10.1, cod: 27.8, tss: 5.1, ph: 7.58 },
  { time: '12pm', bod: 9.9, cod: 27.2, tss: 4.9, ph: 7.54 },
  { time: '2pm', bod: 9.5, cod: 26.2, tss: 4.5, ph: 7.49 },
  { time: '4pm', bod: 9.8, cod: 27.1, tss: 4.8, ph: 7.53 },
  { time: '6pm', bod: 10.2, cod: 28.0, tss: 5.3, ph: 7.60 },
  { time: '8pm', bod: 10.1, cod: 27.7, tss: 5.2, ph: 7.59 },
  { time: '10pm', bod: 9.9, cod: 27.3, tss: 4.9, ph: 7.56 },
];

const chartConfig = {
  bod: { label: 'BOD (mg/l)', color: 'hsl(var(--chart-1))' },
  cod: { label: 'COD (ppm)', color: 'hsl(var(--chart-2))' },
  tss: { label: 'TSS (ppm)', color: 'hsl(var(--chart-3))' },
  ph: { label: 'pH', color: 'hsl(var(--chart-4))' },
} satisfies ChartConfig;

const MetricCard = ({ title, value, unit, description }: { title: string, value: string, unit?: string, description?: string }) => (
    <Card className="text-center">
        <CardHeader className="p-4">
            <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
            <p className="text-2xl font-bold text-primary">{value}
                {unit && <span className="text-sm font-normal text-muted-foreground ml-1">{unit}</span>}
            </p>
            {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        </CardContent>
    </Card>
);

const QualityChartCard = ({ dataKey, title }: { dataKey: keyof typeof chartConfig, title: string }) => (
    <Card>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
                <LineChart data={chartData} accessibilityLayer>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis domain={['dataMin - 1', 'dataMax + 1']} hide/>
                    <Tooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey={dataKey} stroke={`var(--color-${dataKey})`} strokeWidth={2} dot={true}/>
                </LineChart>
            </ChartContainer>
        </CardContent>
    </Card>
);

export default function STPDetailsPage({ params }: { params: { id: string } }) {
    const breadcrumbItems = [
        { label: "Location Wise Status", href: "/status" },
        { label: `STP Station ${params.id}` }
    ];
    
    return (
        <div className="space-y-6">
            <Breadcrumb items={breadcrumbItems} />
            <h1 className="text-3xl font-bold font-headline">STP Station {params.id} - Plant Summary</h1>
            
            <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
                <MetricCard title="Total Outlet Water" value="34.13" unit="KL" description="Outlet Water" />
                <MetricCard title="Inlet Water" value="85.88" unit="KLD" description="Inlet Water" />
                <MetricCard title="MBR Tank Levels" value="82.32" unit="%" description="MBR Tank Level" />
                <MetricCard title="Plant Efficiency" value="39.74" unit="%" description="Plant Efficiency" />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Inlet and Outlet Water Quality</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <QualityChartCard dataKey="bod" title="Treated Water BOD (Ref: <10 mg/l)" />
                    <QualityChartCard dataKey="cod" title="Treated Water COD (Ref: <50 ppm)" />
                    <QualityChartCard dataKey="tss" title="Treated Water TSS (Ref: <20 ppm)" />
                    <QualityChartCard dataKey="ph" title="Treated Water pH (Ref: 6.5-8.5)" />
                </CardContent>
            </Card>
        </div>
    );
}
