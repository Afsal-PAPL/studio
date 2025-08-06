
"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';
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
        location: { name: "Dariyapur WDS", level1: 3.88, level2: 3.83 },
        warnings: [
            { type: "Station", color: "yellow", items: ["Surge Tank Air Receiver Pressure (bar): 0", "Surge Tank 1 Air Vessel Pressure (bar): 0", "Surge Tank 2 Air Vessel Pressure (bar): 0", "Surge Tank 3 Air Vessel Pressure (bar): 0", "Surge Tank 1 Level Transmitter (m): 0", "Surge Tank 2 Level Transmitter (m): 0", "Surge Tank 3 Level Transmitter (m): 0"] }
        ],
        pumps: [
            { name: "Pump 2", color: "red", alerts: ["Pump Drive End Bearing Oil Water Activity (%): 0.8"] },
            { name: "Pump 4", color: "red", alerts: ["Motor Drive End Bearing Temperature (°C): 90.8"] }
        ]
    },
    {
        location: { name: "Moterra SPS", level1: 4.44, level2: 4.47 },
        warnings: [
            { type: "Station", color: "yellow", items: ["Surge Tank 1 Level Transmitter (m): 0", "Surge Tank 2 Level Transmitter (m): 0", "Surge Tank 3 Level Transmitter (m): 0", "Surge Tank 4 Level Transmitter (m): 0"] }
        ],
        pumps: [
            { name: "Pump 1", color: "red", alerts: ["Suction Temperature (T1) (°C): -908"] },
            { name: "Pump 8", color: "red", alerts: ["Motor Winding Temperature Pole 11 (°C): 135", "Motor Winding Temperature Pole 12 (°C): 134.4", "Motor Winding Temperature Pole 21 (°C): 137.2", "Motor Winding Temperature Pole 31 (°C): 151.8"] }
        ]
    },
     {
        location: { name: "Vejalpur SWPS", level1: 4.67, level2: 4.62 },
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

const pumpSequencingData = [
  { combination: 'Pump 2,3,4,7,8', efficiency: 81.530, power: 703614, flow: 1431, spc: 491.56, count: 5, runHours: 109 },
  { combination: 'Pump 2,3,4,6,8', efficiency: 81.320, power: 2941679, flow: 5947, spc: 494.63, count: 5, runHours: 458 },
  { combination: 'Pump 1,3,4,6,8', efficiency: 81.090, power: 1212551, flow: 2438, spc: 497.26, count: 5, runHours: 188 },
  { combination: 'Pump 1,2,4,6,8', efficiency: 80.620, power: 627659, flow: 1261, spc: 497.78, count: 5, runHours: 97 },
  { combination: 'Pump 1,2,6,7,8', efficiency: 80.260, power: 3211341, flow: 6422, spc: 500.07, count: 5, runHours: 496 },
];

const pieChartConfig = {
  combinations: {
    label: 'Combinations',
  },
  'Pump 2,3,4,7,8': { label: 'Pump 2,3,4,7,8', color: '#22c55e' },
  'Pump 2,3,4,6,8': { label: 'Pump 2,3,4,6,8', color: '#84cc16' },
  'Pump 1,3,4,6,8': { label: 'Pump 1,3,4,6,8', color: '#facc15' },
  'Pump 1,2,4,6,8': { label: 'Pump 1,2,4,6,8', color: '#f97316' },
  'Pump 1,2,6,7,8': { label: 'Pump 1,2,6,7,8', color: '#ef4444' },
} satisfies ChartConfig;

const SequencingMetricCard = ({ title, value, unit }: { title: string, value: string | number, unit?: string }) => (
    <Card className="text-center bg-primary/10">
        <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-primary/80">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-2xl font-bold text-primary">
                {value} {unit && <span className="text-base font-normal">{unit}</span>}
            </p>
        </CardContent>
    </Card>
);

const stationData = {
    'kotarpur-wtp': {
        totalFlow: '281.31 MLD',
        avgEfficiency: '78.54%',
        efficiencyChange: '+1.2% from previous period',
        totalEnergy: '117,314 kWh',
        chartData: chartData,
    },
    'raska-wtp': {
        totalFlow: '275.10 MLD',
        avgEfficiency: '80.10%',
        efficiencyChange: '-0.5% from previous period',
        totalEnergy: '115,000 kWh',
        chartData: chartData.map(d => ({ ...d, efficiency: d.efficiency - 2, flow: d.flow - 50, energy: d.energy - 20 })),
    },
    'dariyapur-wds': {
        totalFlow: '155.60 MLD',
        avgEfficiency: '82.30%',
        efficiencyChange: '+2.1% from previous period',
        totalEnergy: '95,000 kWh',
        chartData: chartData.map(d => ({ ...d, efficiency: d.efficiency + 3, flow: d.flow + 200, energy: d.energy + 100 })),
    },
    'mihir-tower-wds': {
        totalFlow: '148.20 MLD',
        avgEfficiency: '81.50%',
        efficiencyChange: '+1.8% from previous period',
        totalEnergy: '92,000 kWh',
        chartData: chartData.map(d => ({ ...d, efficiency: d.efficiency + 2, flow: d.flow + 150, energy: d.energy + 80 })),
    },
    'daffnala-stp': {
        totalFlow: '34.13 KL',
        avgEfficiency: '39.74%',
        efficiencyChange: '+0.5% from previous period',
        totalEnergy: 'N/A',
        chartData: chartData.map(d => ({ ...d, efficiency: d.efficiency + 6, flow: d.flow - 700, energy: d.energy - 200 })),
    },
    'shankar-bhavan-stp': {
        totalFlow: '30.50 KL',
        avgEfficiency: '41.20%',
        efficiencyChange: '+0.2% from previous period',
        totalEnergy: 'N/A',
        chartData: chartData.map(d => ({ ...d, efficiency: d.efficiency + 5, flow: d.flow - 750, energy: d.energy - 210 })),
    },
    'w-5-usmanpura-sps': {
        totalFlow: '95.30 MLD',
        avgEfficiency: '79.10%',
        efficiencyChange: '-1.1% from previous period',
        totalEnergy: '75,000 kWh',
        chartData: chartData.map(d => ({ ...d, efficiency: d.efficiency - 3, flow: d.flow - 600, energy: d.energy - 150 })),
    },
    'moterra-sps': {
        totalFlow: '91.70 MLD',
        avgEfficiency: '80.00%',
        efficiencyChange: '-0.9% from previous period',
        totalEnergy: '72,000 kWh',
        chartData: chartData.map(d => ({ ...d, efficiency: d.efficiency - 2, flow: d.flow - 650, energy: d.energy - 160 })),
    },
    'vejalpur-swps': {
        totalFlow: '190.50 MLD',
        avgEfficiency: '70.50%',
        efficiencyChange: '-2.5% from previous period',
        totalEnergy: '105,000 kWh',
        chartData: chartData.map(d => ({ ...d, efficiency: d.efficiency - 5, flow: d.flow - 250, energy: d.energy + 50 })),
    },
    'jaydeep-tower-swps': {
        totalFlow: '175.80 MLD',
        avgEfficiency: '72.30%',
        efficiencyChange: '-2.1% from previous period',
        totalEnergy: '102,000 kWh',
        chartData: chartData.map(d => ({ ...d, efficiency: d.efficiency - 4, flow: d.flow - 300, energy: d.energy + 30 })),
    }
};

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

const energyCostData = [
  { name: 'Kotarpur WTP', designedFlow: 270, actualFlow: 281.31, designedEnergy: 110000, actualEnergy: 117314, designedRpm: 2767, actualRpm: 3078, designedTotal: 27788400, actualTotal: 25044119 },
  { name: 'Raska WTP', designedFlow: 260, actualFlow: 275.1, designedEnergy: 112000, actualEnergy: 115000, designedRpm: 2997, actualRpm: 3170, designedTotal: 25086750, actualTotal: 24780606 },
  { name: 'Dariyapur WDS', designedFlow: 150, actualFlow: 155.6, designedEnergy: 94000, actualEnergy: 95000, designedRpm: 2536, actualRpm: 2633, designedTotal: 21227250, actualTotal: 21080438 },
  { name: 'Mihir Tower WDS', designedFlow: 140, actualFlow: 148.2, designedEnergy: 90000, actualEnergy: 92000, designedRpm: 2400, actualRpm: 2500, designedTotal: 18000000, actualTotal: 17750000 },
  { name: 'Daffnala STP', designedFlow: 0, actualFlow: 34.13, designedEnergy: 0, actualEnergy: 0, designedRpm: 0, actualRpm: 0, designedTotal: 0, actualTotal: 0 },
  { name: 'Shankar Bhavan STP', designedFlow: 0, actualFlow: 30.5, designedEnergy: 0, actualEnergy: 0, designedRpm: 0, actualRpm: 0, designedTotal: 0, actualTotal: 0 },
  { name: 'W-5 Usmanpura SPS', designedFlow: 90, actualFlow: 95.3, designedEnergy: 74000, actualEnergy: 75000, designedRpm: 1900, actualRpm: 1950, designedTotal: 8550000, actualTotal: 8385000 },
  { name: 'Moterra SPS', designedFlow: 85, actualFlow: 91.7, designedEnergy: 70000, actualEnergy: 72000, designedRpm: 1800, actualRpm: 1850, designedTotal: 7200000, actualTotal: 7030000 },
  { name: 'Vejalpur SWPS', designedFlow: 200, actualFlow: 190.5, designedEnergy: 100000, actualEnergy: 105000, designedRpm: 2800, actualRpm: 2900, designedTotal: 25200000, actualTotal: 24650000 },
  { name: 'Jaydeep Tower SWPS', designedFlow: 180, actualFlow: 175.8, designedEnergy: 100000, actualEnergy: 102000, designedRpm: 2600, actualRpm: 2700, designedTotal: 20800000, actualTotal: 20520000 },
];

const EnergyCostRow = ({ data }: { data: typeof energyCostData[0] }) => {
    const difference = data.designedTotal - data.actualTotal;
    return (
        <div className="flex flex-col md:flex-row items-stretch border-b last:border-b-0">
            <div className="w-full md:w-1/6 bg-primary/10 flex items-center justify-center p-4 font-bold text-primary text-center">
                {data.name}
            </div>
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-5">
                <div className="p-4 border-l">
                    <h4 className="font-semibold text-sm mb-2 text-center text-muted-foreground border-b pb-1">Total Flow (MLD)</h4>
                    <div className="flex justify-around mt-2">
                        <div className="text-center"><p className="text-xs">Designed</p><p className="font-bold">{data.designedFlow.toLocaleString()}</p></div>
                        <div className="text-center"><p className="text-xs">Actual</p><p className="font-bold">{data.actualFlow.toLocaleString()}</p></div>
                    </div>
                </div>
                <div className="p-4 border-l">
                    <h4 className="font-semibold text-sm mb-2 text-center text-muted-foreground border-b pb-1">Energy (kWh)</h4>
                     <div className="flex justify-around mt-2">
                        <div className="text-center"><p className="text-xs">Designed</p><p className="font-bold">{data.designedEnergy.toLocaleString()}</p></div>
                        <div className="text-center"><p className="text-xs">Actual</p><p className="font-bold">{data.actualEnergy.toLocaleString()}</p></div>
                    </div>
                </div>
                 <div className="p-4 border-l">
                    <h4 className="font-semibold text-sm mb-2 text-center text-muted-foreground border-b pb-1">Rupees per ML</h4>
                     <div className="flex justify-around mt-2">
                        <div className="text-center"><p className="text-xs">Designed</p><p className="font-bold">{data.designedRpm.toLocaleString()}</p></div>
                        <div className="text-center"><p className="text-xs">Actual</p><p className="font-bold">{data.actualRpm.toLocaleString()}</p></div>
                    </div>
                </div>
                <div className="p-4 border-l">
                    <h4 className="font-semibold text-sm mb-2 text-center text-muted-foreground border-b pb-1">Total (Rs)</h4>
                     <div className="flex justify-around mt-2">
                        <div className="text-center"><p className="text-xs">Designed</p><p className="font-bold">{data.designedTotal.toLocaleString('en-IN')}</p></div>
                        <div className="text-center"><p className="text-xs">Actual</p><p className="font-bold">{data.actualTotal.toLocaleString('en-IN')}</p></div>
                    </div>
                </div>
                <div className="p-4 border-l flex flex-col items-center justify-center">
                     <h4 className="font-semibold text-sm mb-2 text-center text-muted-foreground border-b pb-1">Difference (+/-)</h4>
                     <p className="font-bold text-lg mt-2">{difference.toLocaleString('en-IN')}</p>
                </div>
            </div>
        </div>
    );
};

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
            
            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-flex md:grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="alerts">Alerts</TabsTrigger>
                    <TabsTrigger value="energy">Energy Analysis</TabsTrigger>
                    <TabsTrigger value="energy-cost">Energy Cost</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4 mt-4">
                    <Card>
                        <CardHeader><CardTitle>Filters</CardTitle></CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Select defaultValue="loc1"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="loc1">Location 1</SelectItem><SelectItem value="loc2">Location 2</SelectItem></SelectContent></Select>
                            <Select defaultValue="perf"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="perf">Performance Summary</SelectItem><SelectItem value="energy">Energy Consumption</SelectItem></SelectContent></Select>
                            <DatePickerWithRange />
                            <Button className="w-full lg:w-auto lg:self-end">Generate Report</Button>
                        </CardContent>
                    </Card>

                    <Tabs defaultValue="kotarpur-wtp" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:w-auto lg:inline-flex overflow-x-auto">
                            {stationTabs.map(tab => (
                                <TabsTrigger key={tab.value} value={tab.value}>{tab.label}</TabsTrigger>
                            ))}
                        </TabsList>
                        {stationTabs.map(tab => {
                            const data = stationData[tab.value as keyof typeof stationData];
                            return (
                                <TabsContent key={tab.value} value={tab.value} className="space-y-4 mt-4">
                                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Total Flow</CardTitle><Droplets className="h-4 w-4 text-muted-foreground"/></CardHeader><CardContent><div className="text-2xl font-bold">{data.totalFlow}</div><p className="text-xs text-muted-foreground">over selected period</p></CardContent></Card>
                                        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Average Efficiency</CardTitle><Gauge className="h-4 w-4 text-muted-foreground"/></CardHeader><CardContent><div className="text-2xl font-bold">{data.avgEfficiency}</div><p className="text-xs text-muted-foreground">{data.efficiencyChange}</p></CardContent></Card>
                                        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Total Energy</CardTitle><Zap className="h-4 w-4 text-muted-foreground"/></CardHeader><CardContent><div className="text-2xl font-bold">{data.totalEnergy}</div><p className="text-xs text-muted-foreground">consumed in this period</p></CardContent></Card>
                                    </div>
                                    <div className="grid gap-4 md:grid-cols-2">
                                      <Card>
                                          <CardHeader><CardTitle>Efficiency Over Time</CardTitle></CardHeader>
                                          <CardContent>
                                              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                                                  <LineChart accessibilityLayer data={data.chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
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
                                            <BarChart accessibilityLayer data={data.chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
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
                            );
                        })}
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

                <TabsContent value="energy" className="space-y-4 mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Pump Sequencing Analysis</CardTitle>
                            <CardDescription>Based on data from the last three months (April, May, June)</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                <SequencingMetricCard title="Best Combination" value={pumpSequencingData[0].combination} />
                                <SequencingMetricCard title="Best Efficiency" value={pumpSequencingData[0].efficiency.toFixed(3)} unit="%" />
                                <SequencingMetricCard title="Best SPC" value={pumpSequencingData[0].spc.toFixed(2)} unit="kWh/MLD" />
                                <SequencingMetricCard title="Total Run Hours" value={pumpSequencingData[0].runHours} unit="hrs" />
                            </div>

                            <div className="grid gap-6 md:grid-cols-3">
                                <div className="md:col-span-2">
                                     <Card>
                                        <CardHeader>
                                            <CardTitle>Sequencing Details</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Pump Combination</TableHead>
                                                        <TableHead>Efficiency (%)</TableHead>
                                                        <TableHead>Power (kWh)</TableHead>
                                                        <TableHead>Flow (MLD)</TableHead>
                                                        <TableHead>SPC (kWh/MLD)</TableHead>
                                                        <TableHead>Pump Count</TableHead>
                                                        <TableHead>Run Hours</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {pumpSequencingData.map((row, i) => (
                                                        <TableRow key={i} className={i === 0 ? 'bg-primary/10' : ''}>
                                                            <TableCell className="font-medium">{row.combination}</TableCell>
                                                            <TableCell>{row.efficiency.toFixed(3)}</TableCell>
                                                            <TableCell>{row.power.toLocaleString()}</TableCell>
                                                            <TableCell>{row.flow.toLocaleString()}</TableCell>
                                                            <TableCell>{row.spc.toFixed(2)}</TableCell>
                                                            <TableCell>{row.count}</TableCell>
                                                            <TableCell>{row.runHours}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </CardContent>
                                     </Card>
                                </div>
                                <div className="md:col-span-1">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>SPC & Combination by Efficiency</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <ChartContainer config={pieChartConfig} className="h-[300px] w-full">
                                                 <PieChart accessibilityLayer>
                                                    <Tooltip
                                                        formatter={(value, name, props) => {
                                                            const { payload } = props;
                                                            return [`Efficiency: ${value}%`, `SPC: ${payload.spc.toFixed(2)}`];
                                                        }}
                                                    />
                                                    <Pie
                                                        data={pumpSequencingData}
                                                        dataKey="efficiency"
                                                        nameKey="combination"
                                                        cx="50%"
                                                        cy="50%"
                                                        outerRadius={80}
                                                        labelLine={false}
                                                        label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                                                    >
                                                        {pumpSequencingData.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={pieChartConfig[entry.combination as keyof typeof pieChartConfig]?.color || '#8884d8'} />
                                                        ))}
                                                    </Pie>
                                                    <Legend wrapperStyle={{fontSize: '12px'}}/>
                                                </PieChart>
                                            </ChartContainer>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                
                <TabsContent value="energy-cost" className="space-y-4 mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Energy Cost Comparison</CardTitle>
                            <CardDescription>A comparison of designed vs. actual energy costs for all stations.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                           {energyCostData.map(station => (
                                <EnergyCostRow key={station.name} data={station} />
                           ))}
                        </CardContent>
                    </Card>
                </TabsContent>

            </Tabs>
        </div>
    );
}
