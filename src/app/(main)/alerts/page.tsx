
"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertTriangle, PlusCircle, Pencil, Bell, SlidersHorizontal, RefreshCw, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

const rulesData = [
  { name: 'High Vibration Alert', assetType: 'Pump', parameter: 'Vibration (DE)', condition: '> 5.0 mm/s', priority: 'High', enabled: true },
  { name: 'Motor Overheating Warning', assetType: 'Motor', parameter: 'Winding Temp', condition: '> 85°C', priority: 'High', enabled: true },
  { name: 'Low Efficiency Alert', assetType: 'Pump Unit', parameter: 'Combined Efficiency', condition: '< 75%', priority: 'Medium', enabled: true },
  { name: 'Compliance pH Breach', assetType: 'WTP Output', parameter: 'pH', condition: '> 8.5', priority: 'Critical', enabled: true },
  { name: 'Low Oil Level', assetType: 'Pump', parameter: 'Oil Level', condition: '< 20%', priority: 'Low', enabled: false },
];

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
        red: "bg-red-500/80 text-white",
        yellow: "bg-yellow-500/80 text-white",
        amber: "bg-green-500/80 text-white",
    };
    
    return (
        <Card className={cn("border-0", colorClasses[color])}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 pt-3 px-4">
                <CardTitle className="text-base font-bold">{title}</CardTitle>
                <button className="text-white/80 hover:text-white"><XCircle className="h-5 w-5"/></button>
            </CardHeader>
            <CardContent className="px-4 pb-3">
                <ul className="text-sm list-none p-0">
                    {alerts.map((alert, i) => <li key={i}>{alert}</li>)}
                </ul>
            </CardContent>
        </Card>
    );
};

const StationWarningCard = ({ warnings, color }: { warnings: string[], color: "red" | "yellow" | "amber" }) => {
    const colorClasses = {
        red: "bg-red-500/80 text-white",
        yellow: "bg-yellow-500/80 text-white",
        amber: "bg-green-500/80 text-white",
    };
    return (
        <Card className={cn("border-0", colorClasses[color])}>
            <CardContent className="p-3">
                <div className="flex items-start gap-3">
                    <p className="font-bold text-sm">Station Warnings:</p>
                    <p className="text-sm flex-1">{warnings.join(' | ')}</p>
                </div>
            </CardContent>
        </Card>
    )
}

export default function AlertsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-headline">Alerts & Rules</h1>
                    <p className="text-muted-foreground">Configure rules and view active station alerts.</p>
                </div>
                 <Button><PlusCircle className="mr-2 h-4 w-4" /> Create New Rule</Button>
            </div>
            
            <Tabs defaultValue="station-alerts">
                <TabsList>
                    <TabsTrigger value="station-alerts">Station-wise Alerts</TabsTrigger>
                    <TabsTrigger value="alert-rules">Alert Rules</TabsTrigger>
                </TabsList>

                <TabsContent value="station-alerts" className="mt-4">
                     <Card>
                        <CardHeader className="flex-row justify-between items-center">
                            <div className="flex flex-wrap items-center gap-6">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="show-all-alerts" />
                                    <label htmlFor="show-all-alerts" className="text-sm font-medium">Show All</label>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="h-2.5 w-2.5 bg-green-500 rounded-full" />
                                    <span>In Operation</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="h-2.5 w-2.5 bg-yellow-500 rounded-full" />
                                    <span>Standby</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="h-2.5 w-2.5 bg-gray-500 rounded-full" />
                                    <span>No Data</span>
                                </div>
                            </div>
                            <Button variant="outline"><RefreshCw className="mr-2 h-4 w-4" /> Refresh</Button>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {alertsData.map((station, index) => (
                                <div key={index} className="space-y-3">
                                    <div className="flex flex-wrap justify-between items-center gap-2 bg-primary/90 text-primary-foreground p-2 rounded-md">
                                        <h3 className="font-bold text-lg">{station.location.name}</h3>
                                        <div className="flex gap-4 text-sm font-semibold">
                                            <span>Reservoir Level - 1: {station.location.level1}m</span>
                                            <span>Reservoir Level - 2: {station.location.level2}m</span>
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
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="alert-rules" className="mt-4 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Active Alerts Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card className="border-destructive border-2">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
                                    <AlertTriangle className="h-4 w-4 text-destructive" />
                                </CardHeader>
                                <CardContent><p className="text-2xl font-bold text-destructive">5</p></CardContent>
                            </Card>
                            <Card className="border-yellow-500 border-2">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium">Warning Alerts</CardTitle>
                                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                </CardHeader>
                                <CardContent><p className="text-2xl font-bold text-yellow-500">12</p></CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium">Total Active Alerts</CardTitle>
                                    <Bell className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent><p className="text-2xl font-bold">17</p></CardContent>
                            </Card>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle>Alert Rules</CardTitle>
                                <div className="flex items-center gap-2">
                                    <Select defaultValue="all">
                                        <SelectTrigger className="w-[180px]"><SelectValue placeholder="Filter by asset type..." /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Asset Types</SelectItem>
                                            <SelectItem value="pump">Pump</SelectItem>
                                            <SelectItem value="motor">Motor</SelectItem>
                                            <SelectItem value="wtp">WTP</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Rule Name</TableHead>
                                        <TableHead>Asset Type</TableHead>
                                        <TableHead>Parameter</TableHead>
                                        <TableHead>Condition</TableHead>
                                        <TableHead>Priority</TableHead>
                                        <TableHead>Enabled</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {rulesData.map((rule, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">{rule.name}</TableCell>
                                            <TableCell>{rule.assetType}</TableCell>
                                            <TableCell>{rule.parameter}</TableCell>
                                            <TableCell><Badge variant="outline">{rule.condition}</Badge></TableCell>
                                            <TableCell>
                                                <Badge variant={rule.priority === 'High' || rule.priority === 'Critical' ? 'destructive' : rule.priority === 'Medium' ? 'secondary' : 'default'} className={rule.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : ''}>
                                                    {rule.priority}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Switch checked={rule.enabled} />
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
