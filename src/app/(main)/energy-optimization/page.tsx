
"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart, Tooltip } from 'recharts';
import { Download, Calendar as CalendarIcon, Zap, TrendingUp, CircleDollarSign, Lightbulb } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import type { DateRange } from 'react-day-picker';

const kwhVsFlowData = [
  { date: '2024-07-01', kwh: 350, flow: 1200 },
  { date: '2024-07-02', kwh: 355, flow: 1210 },
  { date: '2024-07-03', kwh: 348, flow: 1190 },
  { date: '2024-07-04', kwh: 352, flow: 1205 },
  { date: '2024-07-05', kwh: 360, flow: 1220 },
  { date: '2024-07-06', kwh: 358, flow: 1215 },
  { date: '2024-07-07', kwh: 365, flow: 1230 },
];

const efficiencyData = [
  { date: '2024-07-01', efficiency: 85 },
  { date: '2024-07-02', efficiency: 86 },
  { date: '2024-07-03', efficiency: 84 },
  { date: '2024-07-04', efficiency: 85 },
  { date: '2024-07-05', efficiency: 87 },
  { date: '2024-07-06', efficiency: 86 },
  { date: '2024-07-07', efficiency: 88 },
];

const chartConfig = {
  kwh: { label: 'kWh', color: 'hsl(var(--chart-1))' },
  flow: { label: 'Flow Rate', color: 'hsl(var(--chart-2))' },
  efficiency: { label: 'Efficiency', color: 'hsl(var(--primary))' },
};

const recommendations = [
    { text: "Pump 2: Reduce runtime during peak tariff hours.", estimatedSave: "Est. Save 3,200 INR/month" },
    { text: "Pump 4: Rotate duty cycle with Pump 3 to balance wear.", estimatedSave: "Improves MTBF" },
    { text: "Kotarpur WTP: Schedule filter backwash during off-peak hours.", estimatedSave: "Est. Save 1,500 INR/month" }
];

function DatePickerWithRange({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2024, 6, 1),
    to: new Date(2024, 6, 31),
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

const MetricCard = ({ title, value, icon: Icon, unit }: { title: string, value: string, icon: React.ElementType, unit?: string }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value} {unit && <span className="text-xs text-muted-foreground">{unit}</span>}</div>
        </CardContent>
    </Card>
);

export default function EnergyOptimizationPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-headline">Energy Optimization</h1>
                    <p className="text-muted-foreground">Reduce energy costs and improve pump operational efficiency.</p>
                </div>
                <div className="flex gap-2">
                    <DatePickerWithRange />
                    <Button><Download className="mr-2 h-4 w-4" /> Export Report</Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <MetricCard title="Total Energy Consumption" value="1.2 M" icon={Zap} unit="kWh" />
                <MetricCard title="Overall Efficiency" value="81.5" icon={TrendingUp} unit="%" />
                <MetricCard title="Total Energy Cost" value="₹ 9.6 L" icon={CircleDollarSign} />
                <MetricCard title="Savings Potential" value="₹ 75,000" icon={Lightbulb} />
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Recommendations</CardTitle>
                        <CardDescription>AI-powered suggestions for cost savings.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {recommendations.map((rec, index) => (
                             <div key={index} className="flex items-start gap-4 p-3 bg-secondary/50 rounded-lg">
                                <Lightbulb className="h-5 w-5 mt-1 text-yellow-500"/>
                                <div>
                                    <p className="text-sm font-medium">{rec.text}</p>
                                    <p className="text-xs text-green-600 font-semibold">{rec.estimatedSave}</p>
                                </div>
                            </div>
                        ))}
                         <Button className="w-full mt-2">View Simulation</Button>
                    </CardContent>
                </Card>

                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>kWh vs Flow Rate</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={chartConfig} className="h-[250px] w-full">
                                <BarChart data={kwhVsFlowData}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}/>
                                    <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--chart-1))" />
                                    <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--chart-2))" />
                                    <Tooltip content={<ChartTooltipContent />} />
                                    <Bar yAxisId="left" dataKey="kwh" fill="hsl(var(--chart-1))" radius={4} />
                                    <Bar yAxisId="right" dataKey="flow" fill="hsl(var(--chart-2))" radius={4} />
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle>Efficiency % vs Time</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <ChartContainer config={chartConfig} className="h-[250px] w-full">
                                <LineChart data={efficiencyData}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })} />
                                    <YAxis domain={[80, 90]} tickFormatter={(value) => `${value}%`} />
                                    <Tooltip content={<ChartTooltipContent />} />
                                    <Line type="monotone" dataKey="efficiency" stroke="hsl(var(--primary))" strokeWidth={2} dot={true} />
                                </LineChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
