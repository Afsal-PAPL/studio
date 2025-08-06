
"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart, Tooltip } from 'recharts';
import { Printer, Calendar as CalendarIcon, Droplets, Gauge, Zap, AlertCircle, RefreshCw, XCircle } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import type { DateRange } from 'react-day-picker';
import { Checkbox } from '@/components/ui/checkbox';

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

const alertsData = [
    {
        location: { name: "Station 1 - Loc 3", level1: 3.88, level2: 3.83 },
        warnings: [
            { type: "Station", color: "yellow", items: ["Surge Tank Air Receiver Pressure (bar): 0", "Surge Tank 1 Air Vessel Pressure (bar): 0", "Surge Tank 2 Air Vessel Pressure (bar): 0", "Surge Tank 3 Air Vessel Pressure (bar): 0", "Surge Tank 1 Level Transmitter (m): 0", "Surge Tank 2 Level Transmitter (m): 0", "Surge Tank 3 Level Transmitter (m): 0"] }
        ],
        pumps: [
            { name: "Pump 2", color: "red", alerts: ["Pump Drive End Bearing Oil Water Activity (%): 0.8"] },
            { name: "Pump 4", color: "red", alerts: ["Motor Drive End Bearing Temperature (°C): 90.8"] }
        ]
    },
    {
        location: { name: "Station 1 - Loc 2", level1: 4.44, level2: 4.47 },
        warnings: [
            { type: "Station", color: "yellow", items: ["Surge Tank 1 Level Transmitter (m): 0", "Surge Tank 2 Level Transmitter (m): 0", "Surge Tank 3 Level Transmitter (m): 0", "Surge Tank 4 Level Transmitter (m): 0"] }
        ],
        pumps: [
            { name: "Pump 1", color: "red", alerts: ["Suction Temperature (T1) (°C): -908"] },
            { name: "Pump 8", color: "red", alerts: ["Motor Winding Temperature Pole 11 (°C): 135", "Motor Winding Temperature Pole 12 (°C): 134.4", "Motor Winding Temperature Pole 21 (°C): 137.2", "Motor Winding Temperature Pole 31 (°C): 151.8"] }
        ]
    },
     {
        location: { name: "Station 1 - Loc 1", level1: 4.67, level2: 4.62 },
        warnings: [],
        pumps: [
            { name: "Pump 3", color: "amber", alerts: ["Combined Efficiency (%): 79.02"] },
            { name: "Pump 7", color: "red", alerts: ["Motor Winding Temperature Pole 21 (°C): 144.8"] }
        ]
    }
];

const AlertCard = ({ title, alerts, color }: { title: string, alerts: string[], color: "red" | "yellow" | "amber" }) => {
    const colorClasses = {
        red: "bg-red-100 border-red-500 text-red-800",
        yellow: "bg-yellow-100 border-yellow-500 text-yellow-800",
        amber: "bg-orange-100 border-orange-500 text-orange-800",
    };
    const iconColorClasses = {
        red: "text-red-500",
        yellow: "text-yellow-500",
        amber: "text-orange-500",
    }
    
    return (
        <Card className={cn("border-2", colorClasses[color])}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-bold">{title}</CardTitle>
                <XCircle className={cn("h-6 w-6", iconColorClasses[color])}/>
            </CardHeader>
            <CardContent>
                <ul className="text-sm list-disc list-inside">
                    {alerts.map((alert, i) => <li key={i}>{alert}</li>)}
                </ul>
            </CardContent>
        </Card>
    );
};


const StationWarningCard = ({ warnings, color }: { warnings: string[], color: "red" | "yellow" | "amber" }) => {
    const colorClasses = {
        red: "bg-red-100 border-red-500 text-red-800",
        yellow: "bg-yellow-100 border-yellow-500 text-yellow-800",
        amber: "bg-orange-100 border-orange-500 text-orange-800",
    };
    const iconColorClasses = {
        red: "text-red-500",
        yellow: "text-yellow-500",
        amber: "text-orange-500",
    }
    return (
        <Card className={cn("border-l-4", colorClasses[color])}>
            <CardContent className="p-4">
                <div className="flex items-start gap-4">
                     <AlertCircle className={cn("h-6 w-6 shrink-0", iconColorClasses[color])} />
                    <div>
                        <p className="font-bold">Station Warnings:</p>
                        <p className="text-sm">{warnings.join(' | ')}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default function ReportsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <h1 className="text-3xl font-bold font-headline">Reports &amp; Analysis</h1>
                <div className="flex gap-2">
                    <Button><Printer className="mr-2 h-4 w-4" /> Print Reports</Button>
                    <Button variant="outline"><RefreshCw className="mr-2 h-4 w-4" /> Refresh Data</Button>
                </div>
            </div>
            
            <Tabs defaultValue="analysis" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-flex">
                    <TabsTrigger value="analysis">Analysis</TabsTrigger>
                    <TabsTrigger value="alerts">Alerts</TabsTrigger>
                </TabsList>

                <TabsContent value="analysis" className="space-y-4 mt-4">
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
                </TabsContent>

                <TabsContent value="alerts" className="space-y-4 mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Filters</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-wrap items-center gap-6">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="show-all-alerts" />
                                <label htmlFor="show-all-alerts" className="text-sm font-medium">Show All</label>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <span className="h-2.5 w-2.5 bg-red-500 rounded-full" />
                                <span>Critical</span>
                            </div>
                             <div className="flex items-center gap-2 text-sm">
                                <span className="h-2.5 w-2.5 bg-orange-500 rounded-full" />
                                <span>Amber</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <span className="h-2.5 w-2.5 bg-yellow-500 rounded-full" />
                                <span>Warning</span>
                            </div>
                           
                        </CardContent>
                    </Card>

                    <div className="space-y-6">
                        {alertsData.map((station, index) => (
                            <div key={index} className="space-y-4 p-4 rounded-lg bg-card border">
                                <div className="flex flex-wrap justify-between items-center gap-2 bg-muted p-2 rounded-md">
                                    <h3 className="font-bold text-lg">{station.location.name}</h3>
                                    <div className="flex gap-4 text-sm font-semibold">
                                        <span>Reservoir Level - 1: {station.location.level1}</span>
                                        <span>Reservoir Level - 2: {station.location.level2}</span>
                                    </div>
                                </div>
                                
                                {station.warnings.length > 0 && (
                                    <StationWarningCard warnings={station.warnings[0].items} color={station.warnings[0].color as "yellow"} />
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {station.pumps.map((pump, pumpIndex) => (
                                        <AlertCard key={pumpIndex} title={pump.name} alerts={pump.alerts} color={pump.color as "red" | "yellow" | "amber"} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                </TabsContent>
            </Tabs>
        </div>
    );
}
