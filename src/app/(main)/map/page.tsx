
"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MapPin, X } from 'lucide-react';
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';


const locations = [
    { id: 1, name: 'Kotarpur WTP', type: 'WTP', status: 'Normal', top: '25%', left: '40%', data: { designedDischarge: 270, todayFlow: 281.31, reservoirLevel: 13.76, reservoirCapacity: 27.52, efficiency: 78.54, energy: 117314, pf: 0.89 } },
    { id: 2, name: 'Raska WTP', type: 'WTP', status: 'Normal', top: '75%', left: '80%', data: { designedDischarge: 260, todayFlow: 275.1, reservoirLevel: 12.5, reservoirCapacity: 25.0, efficiency: 80.1, energy: 115000, pf: 0.90 } },
    { id: 3, name: 'Dariyapur WDS', type: 'WDS', status: 'Normal', top: '48%', left: '52%', data: { designedDischarge: 150, todayFlow: 155.6, reservoirLevel: 10.2, reservoirCapacity: 20.0, efficiency: 82.3, energy: 95000, pf: 0.88 } },
    { id: 4, name: 'Mihir Tower WDS', type: 'WDS', status: 'Normal', top: '60%', left: '30%', data: { designedDischarge: 140, todayFlow: 148.2, reservoirLevel: 9.8, reservoirCapacity: 18.0, efficiency: 81.5, energy: 92000, pf: 0.89 } },
    { id: 5, name: 'Daffnala STP', type: 'STP', status: 'Normal', top: '40%', left: '65%', data: { totalOutletWater: 34.13, inletWater: 85.88, plantEfficiency: 39.74 } },
    { id: 6, name: 'Shankar Bhavan STP', type: 'STP', status: 'Normal', top: '55%', left: '45%', data: { totalOutletWater: 30.5, inletWater: 80.2, plantEfficiency: 41.2 } },
    { id: 7, name: 'W-5 Usmanpura SPS', type: 'SPS', status: 'Normal', top: '50%', left: '40%', data: { designedDischarge: 90, todayFlow: 95.3, reservoirLevel: 6.2, reservoirCapacity: 12.0, efficiency: 79.1, energy: 75000, pf: 0.91 } },
    { id: 8, name: 'Moterra SPS', type: 'SPS', status: 'Normal', top: '15%', left: '35%', data: { designedDischarge: 85, todayFlow: 91.7, reservoirLevel: 6.0, reservoirCapacity: 11.5, efficiency: 80.0, energy: 72000, pf: 0.92 } },
    { id: 9, name: 'Vejalpur SWPS', type: 'SWPS', status: 'Maintenance', top: '70%', left: '25%', data: { designedDischarge: 200, todayFlow: 190.5, reservoirLevel: 4.2, reservoirCapacity: 10.0, efficiency: 70.5, energy: 105000, pf: 0.85 } },
    { id: 10, name: 'Jaydeep Tower SWPS', type: 'SWPS', status: 'Normal', top: '80%', left: '50%', data: { designedDischarge: 180, todayFlow: 175.8, reservoirLevel: 3.9, reservoirCapacity: 9.0, efficiency: 72.3, energy: 102000, pf: 0.87 } }
];

const getHref = (type: string, id: number) => {
    switch (type) {
        case 'WTP':
            return `/wtp/${id <= 2 ? id : 1}`;
        case 'STP':
             return `/stp/${id <= 6 && id > 4 ? id - 4 : 1}`;
        case 'WDS':
        case 'SPS':
        case 'SWPS':
            return `/location/${id}`;
        default:
            return '#';
    }
}

const LocationMarker = ({ location }: { location: (typeof locations)[0] }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const href = getHref(location.type, location.id);
    
    const isStp = location.type === 'STP';
    const data = location.data as any;

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild style={{ top: location.top, left: location.left }} className="absolute -translate-x-1/2 -translate-y-1/2">
                 <div onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
                    <Button variant="ghost" size="icon" className="rounded-full w-8 h-8 bg-background/80 hover:bg-background/100">
                        <MapPin className="w-5 h-5 text-primary animate-pulse" />
                    </Button>
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-[40rem] p-0" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-t-lg">
                    <div className="flex justify-between items-center">
                        <h3 className="font-bold text-lg">{isStp ? `${location.name} - Plant Summary` : `Pumping Station Details - ${location.name}`}</h3>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsOpen(false)}><X className="h-4 w-4" /></Button>
                    </div>
                </div>
                <div className="p-4 space-y-4">
                    {isStp ? (
                        <div className="grid grid-cols-3 gap-4">
                            <Card>
                                <CardHeader><CardTitle className="text-sm font-medium">Total Outlet Water</CardTitle></CardHeader>
                                <CardContent>
                                    <p className="text-2xl font-bold">{data.totalOutletWater}<span className="text-sm font-normal"> KL</span></p>
                                    <p className="text-xs text-muted-foreground">Outlet Water</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader><CardTitle className="text-sm font-medium">Inlet Water</CardTitle></CardHeader>
                                <CardContent>
                                    <p className="text-2xl font-bold">{data.inletWater}<span className="text-sm font-normal"> KLD</span></p>
                                    <p className="text-xs text-muted-foreground">Inlet Water</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader><CardTitle className="text-sm font-medium">Plant Efficiency</CardTitle></CardHeader>
                                <CardContent>
                                    <p className="text-2xl font-bold">{data.plantEfficiency}%</p>
                                    <p className="text-xs text-muted-foreground">Plant Efficiency</p>
                                </CardContent>
                            </Card>
                        </div>
                    ) : (
                        <>
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-gray-50 dark:bg-gray-700">
                                        <TableHead>Station</TableHead>
                                        <TableHead>Designed Discharge Rate (MLD)</TableHead>
                                        <TableHead>Today Flow (ML)</TableHead>
                                        <TableHead>Reservoir Level (m)</TableHead>
                                        <TableHead>Reservoir Capacity</TableHead>
                                        <TableHead>Efficiency (%)</TableHead>
                                        <TableHead>Energy Today (kWh)</TableHead>
                                        <TableHead>PF</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>{location.name}</TableCell>
                                        <TableCell>{data.designedDischarge.toFixed(2)}</TableCell>
                                        <TableCell>{data.todayFlow.toFixed(2)}</TableCell>
                                        <TableCell>{data.reservoirLevel.toFixed(2)}</TableCell>
                                        <TableCell>{data.reservoirCapacity.toFixed(2)}</TableCell>
                                        <TableCell>{data.efficiency.toFixed(2)}</TableCell>
                                        <TableCell>{data.energy.toLocaleString()}</TableCell>
                                        <TableCell>{data.pf.toFixed(2)}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <div className="grid grid-cols-3 gap-4">
                                <Card className="bg-slate-800 text-white">
                                    <CardHeader>
                                        <CardTitle className="text-sm font-medium">Total Designed Discharge (MLD)</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-2xl font-bold">{data.designedDischarge}</p>
                                    </CardContent>
                                </Card>
                                <Card className="bg-slate-800 text-white">
                                    <CardHeader>
                                        <CardTitle className="text-sm font-medium">Total Flow Today (ML)</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-2xl font-bold">{data.todayFlow}</p>
                                    </CardContent>
                                </Card>
                                 <Card className="bg-slate-800 text-white">
                                    <CardHeader>
                                        <CardTitle className="text-sm font-medium">Total Energy Today (kWh)</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-2xl font-bold">{data.energy.toLocaleString()}</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </>
                    )}
                     <Button asChild size="sm" className="w-full">
                        <Link href={href}>View More Details</Link>
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default function MapPage() {
    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold font-headline">Location Overview</h1>
            <Card className="w-full h-[calc(100vh-14rem)]">
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                    <Image
                        src="https://th.bing.com/th/id/R.b5a74cdd5259d810b99655e66015ceea?rik=o5Dq4LLodt4W3g&riu=http%3a%2f%2fmapsof.net%2fuploads%2fstatic-maps%2fmap_of_Ahmedabad.jpg&ehk=Y09aosLEdAdXnCVeKTKFfyz%2fP58qBlgbzBJUIQS34GQ%3d&risl=&pid=ImgRaw&r=0"
                        alt="Map of Ahmedabad with pumping stations"
                        layout="fill"
                        objectFit="cover"
                        data-ai-hint="city map"
                    />
                    {locations.map(loc => <LocationMarker key={loc.id} location={loc} />)}
                </div>
            </Card>
        </div>
    );
}
