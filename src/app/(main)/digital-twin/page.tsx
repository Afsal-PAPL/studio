
"use client"
import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Thermometer, Zap, Waves, Rss, AlertTriangle, Workflow } from 'lucide-react';
import { cn } from '@/lib/utils';

const locations = [
    { value: "dariyapur-wds", label: "Dariyapur WDS" },
    { value: "mihir-tower-wds", label: "Mihir Tower WDS" },
    { value: "moterra-sps", label: "Moterra SPS" },
];

const pumps = [
    { value: "pump-1", label: "Pump 1" },
    { value: "pump-2", label: "Pump 2" },
    { value: "pump-3", label: "Pump 3" },
    { value: "pump-4", label: "Pump 4" },
];

const dataPoints = [
    { id: 'power', icon: Zap, top: '85%', left: '15%', popover: { Label: 'Current', Meaning: 'Motor Current Draw', Value: '45 A' }, color: 'text-yellow-400' },
    { id: 'motor-temp', icon: Thermometer, top: '45%', left: '8%', popover: { Label: 'Motor Temp', Meaning: 'Motor Winding Temp', Value: '75 °C' }, color: 'text-blue-400' },
    { id: 'motor-vibration', icon: Waves, top: '35%', left: '8%', popover: { Label: 'Motor VDE', Meaning: 'Motor Vibration Drive End', Value: '0.18 mm/s' }, color: 'text-blue-400' },
    { id: 'comms', icon: Rss, top: '45%', left: '30%', popover: { Label: 'Comms', Meaning: 'Communication Status', Value: 'Online' }, color: 'text-blue-400' },
    { id: 'coupling', icon: Waves, top: '40%', left: '48%', popover: { Label: 'Coupling Vib', Meaning: 'Coupling Vibration', Value: '0.12 mm/s' }, color: 'text-purple-400' },
    { id: 'pump-vibration', icon: Waves, top: '35%', left: '60%', popover: { Label: 'Pump VDE', Meaning: 'Pump Vibration Drive End', Value: '0.21 mm/s' }, color: 'text-purple-400' },
    { id: 'bearing-temp', icon: Thermometer, top: '65%', left: '65%', popover: { Label: 'Bearing Temp', Meaning: 'Pump Bearing Temperature', Value: '68 °C' }, color: 'text-purple-400' },
    { id: 'seal-temp', icon: Thermometer, top: '38%', left: '75%', popover: { Label: 'Seal Temp', Meaning: 'Mechanical Seal Temperature', Value: '62 °C' }, color: 'text-purple-400' },
    { id: 'discharge-pressure', icon: Waves, top: '85%', left: '85%', popover: { Label: 'Discharge', Meaning: 'Discharge Pressure', Value: '5.2 bar' }, color: 'text-green-400' },
];

const voltageData = [
    { phase: 'VR', value: '6745.63 V', min: 6500, max: 6600 },
    { phase: 'VY', value: '6736.16 V', min: 6500, max: 6600 },
    { phase: 'VB', value: '6720.62 V', min: 6500, max: 6600 },
]

const DataPoint = ({ point }: { point: typeof dataPoints[0] }) => (
    <Popover>
        <PopoverTrigger asChild>
            <div
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{ top: point.top, left: point.left }}
            >
                <point.icon className={cn("h-6 w-6 animate-pulse", point.color)} />
            </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Label</TableHead>
                        <TableHead>Meaning</TableHead>
                        <TableHead>Value</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>{point.popover.Label}</TableCell>
                        <TableCell>{point.popover.Meaning}</TableCell>
                        <TableCell className="font-bold">{point.popover.Value}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </PopoverContent>
    </Popover>
);

const SCADAPump = ({ id, status }: { id: number; status: 'running' | 'standby' | 'fault' }) => {
    const statusClasses = {
        running: 'bg-green-500/20 border-green-500 text-green-300',
        standby: 'bg-yellow-500/20 border-yellow-500 text-yellow-300',
        fault: 'bg-red-500/20 border-red-500 text-red-300',
    };
    const statusIndicator = {
        running: 'bg-green-500',
        standby: 'bg-yellow-500',
        fault: 'bg-red-500',
    }
    return (
        <div className={cn('p-4 rounded-lg border-2 flex flex-col items-center gap-2', statusClasses[status])}>
            <div className="flex items-center gap-2">
                <div className={cn('h-3 w-3 rounded-full', statusIndicator[status])} />
                <span className="font-bold">Pump {id}</span>
            </div>
            <Workflow className="w-16 h-16" />
            <span className="capitalize text-sm">{status}</span>
        </div>
    );
};

export default function DigitalTwinPage() {
    const [location, setLocation] = React.useState('dariyapur-wds');
    const [pump, setPump] = React.useState('pump-2');
    
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-headline">Digital Twin</h1>
                <p className="text-muted-foreground">Visualize and monitor your assets in real-time.</p>
            </div>
            
            <Tabs defaultValue="pumpset">
                <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
                    <TabsTrigger value="pumpset">Pumpset View</TabsTrigger>
                    <TabsTrigger value="scada">Process Overview</TabsTrigger>
                </TabsList>
                
                <TabsContent value="pumpset" className="mt-4">
                    <Card>
                        <CardHeader>
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <CardTitle>Pumpset Digital Twin</CardTitle>
                                <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                                    <Select value={location} onValueChange={setLocation}>
                                        <SelectTrigger className="w-full md:w-[200px]"><SelectValue /></SelectTrigger>
                                        <SelectContent>{locations.map(l => <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>)}</SelectContent>
                                    </Select>
                                    <Select value={pump} onValueChange={setPump}>
                                        <SelectTrigger className="w-full md:w-[200px]"><SelectValue /></SelectTrigger>
                                        <SelectContent>{pumps.map(p => <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>)}</SelectContent>
                                    </Select>
                                    <Button variant="outline">Reset</Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                           <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                               <div className="lg:col-span-3 relative w-full aspect-[4/3] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                                   <Image 
                                        src="https://i.imgur.com/gO9H32j.png"
                                        alt="Industrial pump digital twin"
                                        layout="fill"
                                        objectFit="contain"
                                        data-ai-hint="industrial water pump"
                                        unoptimized
                                   />
                                   {dataPoints.map(point => <DataPoint key={point.id} point={point} />)}
                               </div>
                               <div className="lg:col-span-1 space-y-4">
                                   <h3 className="font-semibold text-center">Live Parameters</h3>
                                   <div className="space-y-2">
                                       {voltageData.map(v => (
                                           <div key={v.phase} className="p-2 rounded-md bg-destructive/10 border border-destructive/50 text-sm">
                                               <span className="font-bold">{v.phase}:</span> {v.value} 
                                               <span className="text-xs opacity-80"> (Min: {v.min}, Max: {v.max})</span>
                                           </div>
                                       ))}
                                   </div>
                               </div>
                           </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                
                <TabsContent value="scada" className="mt-4">
                    <Card>
                        <CardHeader>
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <CardTitle>Process Overview for {locations.find(l => l.value === location)?.label}</CardTitle>
                                <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                                     <Select value={location} onValueChange={setLocation}>
                                        <SelectTrigger className="w-full md:w-[200px]"><SelectValue /></SelectTrigger>
                                        <SelectContent>{locations.map(l => <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>)}</SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardHeader>
                         <CardContent>
                            <div className="bg-gray-800 text-white p-6 rounded-lg relative aspect-[2/1]">
                                {/* Main Pipes */}
                                <div className="absolute top-1/2 left-0 w-1/4 h-8 bg-gray-600 -translate-y-1/2 rounded-r-md flex items-center px-4">
                                    <p className="font-bold text-lg">Inlet</p>
                                </div>
                                <div className="absolute top-1/2 right-0 w-1/4 h-8 bg-gray-600 -translate-y-1/2 rounded-l-md flex items-center justify-end px-4">
                                     <p className="font-bold text-lg">Outlet</p>
                                </div>
                                <div className="absolute top-1/2 left-1/4 w-1/2 h-8 bg-gray-700 -translate-y-1/2" />
                                
                                {/* Pumps Area */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[150%] w-3/4 h-1/2">
                                    <div className="grid grid-cols-4 gap-x-8 h-full">
                                        <SCADAPump id={1} status="running" />
                                        <SCADAPump id={2} status="running" />
                                        <SCADAPump id={3} status="standby" />
                                        <SCADAPump id={4} status="fault" />
                                    </div>
                                </div>
                                
                                {/* Connections */}
                                <div className="absolute top-1/2 left-[34%] w-px h-1/4 bg-gray-500 -translate-y-full" />
                                <div className="absolute top-1/2 left-[46%] w-px h-1/4 bg-gray-500 -translate-y-full" />
                                <div className="absolute top-1/2 left-[58%] w-px h-1/4 bg-gray-500 -translate-y-full" />
                                <div className="absolute top-1/2 left-[70%] w-px h-1/4 bg-gray-500 -translate-y-full" />

                                {/* Data overlays */}
                                <div className="absolute top-1/3 left-4 bg-black/50 p-2 rounded">
                                    <p>Flow: 1250 m³/h</p>
                                    <p>Pressure: 2.1 bar</p>
                                </div>
                                <div className="absolute top-1/3 right-4 bg-black/50 p-2 rounded text-right">
                                    <p>Flow: 1245 m³/h</p>
                                    <p>Pressure: 5.2 bar</p>
                                </div>
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 p-2 rounded flex gap-4">
                                    <p><span className="font-bold">Total Energy:</span> 120 MWh</p>
                                    <p><span className="font-bold">Status:</span> <span className="text-yellow-400">Warning</span></p>
                                </div>

                                <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 text-red-400 animate-pulse">
                                    <AlertTriangle className="w-5 h-5" />
                                    <p>Pump 4 Fault: High Vibration</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
