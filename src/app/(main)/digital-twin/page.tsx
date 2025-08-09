
"use client"
import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Thermometer, Zap, Waves, Rss, AlertTriangle, Workflow, Gauge, Pipette, Fan } from 'lucide-react';
import { cn } from '@/lib/utils';

const locations = [
    { value: "kotarpur-wtp", label: "Kotarpur WTP" },
    { value: "raska-wtp", label: "Raska WTP" },
    { value: "dariyapur-wds", label: "Dariyapur WDS" },
    { value: "mihir-tower-wds", label: "Mihir Tower WDS" },
    { value: "daffnala-stp", label: "Daffnala STP" },
    { value: "shankar-bhavan-stp", label: "Shankar Bhavan STP" },
    { value: "w-5-usmanpura-sps", label: "W-5 Usmanpura SPS" },
    { value: "moterra-sps", label: "Moterra SPS" },
    { value: "vejalpur-swps", label: "Vejalpur SWPS" },
    { value: "jaydeep-tower-swps", label: "Jaydeep Tower SWPS" }
];

const pumps = [
    { value: "pump-1", label: "Pump 1" },
    { value: "pump-2", label: "Pump 2" },
    { value: "pump-3", label: "Pump 3" },
    { value: "pump-4", label: "Pump 4" },
    { value: "pump-5", label: "Pump 5" },
    { value: "pump-6", label: "Pump 6" },
    { value: "pump-7", label: "Pump 7" },
    { value: "pump-8", label: "Pump 8" },
];

const dataPoints = [
    { id: 'power', icon: Zap, top: '85%', left: '15%', popover: { Label: 'Current', Meaning: 'Motor Current Draw', Value: '45 A' }, color: 'text-yellow-400' },
    { id: 'motor-temp', icon: Thermometer, top: '45%', left: '8%', popover: { Label: 'Motor Temp', Meaning: 'Motor Winding Temp', Value: '75 °C' }, color: 'text-blue-400' },
    { id: 'motor-vibration-nde', icon: Waves, top: '35%', left: '8%', popover: { Label: 'Motor Vibration NDE', Meaning: 'Motor Vibration Non-Drive End', Value: '0.18 mm/s' }, color: 'text-blue-400' },
    { id: 'comms', icon: Rss, top: '45%', left: '30%', popover: { Label: 'Comms', Meaning: 'Communication Status', Value: 'Online' }, color: 'text-blue-400' },
    { id: 'motor-vibration-de', icon: Waves, top: '40%', left: '48%', popover: { Label: 'Motor Vibration DE', Meaning: 'Motor Vibration Drive End', Value: '0.12 mm/s' }, color: 'text-purple-400' },
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

const ScadaPump = ({ id, name, status, pressure }: { id: number; name: string, status: 'running' | 'standby' | 'fault'; pressure: string }) => {
    const statusClasses = {
        running: 'text-green-400',
        standby: 'text-red-400',
        fault: 'text-red-400 animate-pulse',
    };
    return (
        <div className="flex flex-col items-center gap-2 relative">
             <div className="absolute -top-10 text-center text-white bg-gray-900/50 px-2 py-1 rounded-md">
                <p className="text-xs">PITS0{id}</p>
                <p className="font-bold text-sm">{pressure}</p>
            </div>
            <Fan className={cn("w-20 h-20", statusClasses[status])} />
            <div className="w-8 h-12 bg-gray-600 border-t-4 border-b-4 border-gray-500" />
            <p className="text-white font-bold text-xs">{name}</p>
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
                                        src="https://forteenergyservices.com/wp-content/uploads/2020/05/0f0c4ec4732ad0fa9bc6c2d7e953cdb8.png"
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
                            <div className="bg-gray-800 text-white p-6 rounded-lg relative aspect-video overflow-hidden">
                                {/* Header */}
                                <div className="text-center font-bold text-xl mb-8">HIGH LIFT PUMPS</div>

                                {/* Main Pipe */}
                                <div className="absolute top-[25%] left-[10%] w-[80%] h-8 bg-gray-500 rounded-md border-2 border-gray-400"></div>

                                {/* Pumps and connecting pipes */}
                                <div className="absolute top-[25%] left-[15%] right-[15%] flex justify-around items-start h-[50%]">
                                    <div className="absolute top-0 w-full h-px">
                                        {[1, 2, 3, 4].map(i => (
                                            <div key={i} style={{ left: `${i * 20 - 10}%`}} className="absolute top-0 h-16 w-4 bg-gray-500 border-x-2 border-gray-400"></div>
                                        ))}
                                    </div>
                                    <div className="flex justify-around w-full mt-16">
                                        <ScadaPump id={1} name="HLP501" status="standby" pressure="2 PSI"/>
                                        <ScadaPump id={2} name="HLP502" status="standby" pressure="-1 PSI"/>
                                        <ScadaPump id={3} name="HLP503" status="running" pressure="97 PSI"/>
                                        <ScadaPump id={4} name="HLP504" status="standby" pressure="2 PSI"/>
                                    </div>
                                </div>
                                
                                {/* Water Tank */}
                                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-cyan-600/50 border-t-4 border-cyan-400">
                                    <div className="absolute bottom-4 left-1/4 text-white text-center">
                                        <p className="font-bold bg-yellow-400 text-black px-2 py-0.5 rounded-sm">LIT-403</p>
                                        <p>3.58 M</p>
                                        <p className="text-xs">PUMP CELL #1</p>
                                    </div>
                                    <div className="absolute bottom-4 right-1/4 text-white text-center">
                                        <p className="font-bold bg-yellow-400 text-black px-2 py-0.5 rounded-sm">LIT-404</p>
                                        <p>3.51 M</p>
                                        <p className="text-xs">PUMP CELL #2</p>
                                    </div>
                                </div>

                                {/* Side chemical pipes */}
                                <div className="absolute top-[25%] right-[5%] w-4 h-[40%] bg-gray-500 border-x-2 border-gray-400"></div>
                                <div className="absolute top-[35%] right-[5%] w-8 h-4 bg-gray-500 border-y-2 border-gray-400"></div>
                                <div className="absolute top-[45%] right-[5%] w-8 h-4 bg-gray-500 border-y-2 border-gray-400"></div>
                                <div className="absolute top-[34%] right-[10%] text-xs text-center text-white">
                                    <p>Fluoride</p>
                                </div>
                                 <div className="absolute top-[44%] right-[10%] text-xs text-center text-white">
                                    <p>Chlorine</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
