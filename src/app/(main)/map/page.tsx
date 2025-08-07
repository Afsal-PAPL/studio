
"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger, PopoverPortal } from '@/components/ui/popover';
import { MapPin, X } from 'lucide-react';
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';


const locations = [
    { id: 1, name: 'Kotarpur WTP', type: 'WTP', status: 'Normal', lat: 23.06461, long: 72.38079, data: { designedDischarge: 270, todayFlow: 281.31, reservoirLevel: 13.76, reservoirCapacity: 27.52, efficiency: 78.54, energy: 117314, pf: 0.89, ph: 7.64, turbidity: 2.57, conductivity: 276.42, frc: 0.12, temperature: 24.70, tds: 138.21 } },
    { id: 2, name: 'Raska WTP', type: 'WTP', status: 'Normal', lat: 22.95725, long: 72.54542, data: { designedDischarge: 260, todayFlow: 275.1, reservoirLevel: 12.5, reservoirCapacity: 25.0, efficiency: 80.1, energy: 115000, pf: 0.90, ph: 7.66, turbidity: 2.99, conductivity: 300.98, frc: 0.17, temperature: 25.10, tds: 150.49 } },
    { id: 3, name: 'Dariyapur WDS', type: 'WDS', status: 'Normal', lat: 23.0335, long: 72.5916, data: { designedDischarge: 150, todayFlow: 155.6, reservoirLevel: 10.2, reservoirCapacity: 20.0, efficiency: 82.3, energy: 95000, pf: 0.88 } },
    { id: 4, name: 'Mihir Tower WDS', type: 'WDS', status: 'Normal', lat: 22.99391, long: 72.60356, data: { designedDischarge: 140, todayFlow: 148.2, reservoirLevel: 9.8, reservoirCapacity: 18.0, efficiency: 81.5, energy: 92000, pf: 0.89 } },
    { id: 5, name: 'Daffnala STP', type: 'STP', status: 'Normal', lat: 23.0550, long: 72.5960, data: { totalOutputWater: 34.13, inletWater: 85.88, plantEfficiency: 39.74, bod: 9.8, cod: 27.0, tss: 4.8 } },
    { id: 6, name: 'Shankar Bhavan STP', type: 'STP', status: 'Normal', lat: 23.03756, long: 72.54627, data: { totalOutputWater: 30.5, inletWater: 80.2, plantEfficiency: 41.2, bod: 9.5, cod: 26.2, tss: 4.5 } },
    { id: 7, name: 'W-5 Usmanpura SPS', type: 'SPS', status: 'Normal', lat: 23.0423, long: 72.57186, data: { designedDischarge: 90, todayFlow: 95.3, reservoirLevel: 6.2, reservoirCapacity: 12.0, efficiency: 79.1, energy: 75000, pf: 0.91 } },
    { id: 8, name: 'Moterra SPS', type: 'SPS', status: 'Normal', lat: 23.04143, long: 72.57543, data: { designedDischarge: 85, todayFlow: 91.7, reservoirLevel: 6.0, reservoirCapacity: 11.5, efficiency: 80.0, energy: 72000, pf: 0.92 } },
    { id: 9, name: 'Vejalpur SWPS', type: 'SWPS', status: 'Maintenance', lat: 23.0002, long: 72.51325, data: { designedDischarge: 200, todayFlow: 190.5, reservoirLevel: 4.2, reservoirCapacity: 10.0, efficiency: 70.5, energy: 105000, pf: 0.85 } },
    { id: 10, name: 'Jaydeep Tower SWPS', type: 'SWPS', status: 'Normal', lat: 23.01148, long: 72.54615, data: { designedDischarge: 180, todayFlow: 175.8, reservoirLevel: 3.9, reservoirCapacity: 9.0, efficiency: 72.3, energy: 102000, pf: 0.87 } }
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

// Map dimensions and bounding box for Ahmedabad
const mapConfig = {
    width: 800, // The width of your map image in pixels
    height: 1000, // The height of your map image in pixels
    // Bounding box for Ahmedabad area shown on map
    bounds: {
        lat: { min: 22.95, max: 23.07 },
        long: { min: 72.37, max: 72.62 }
    }
};

const convertCoordsToPixels = (lat: number, long: number) => {
    const { width, height, bounds } = mapConfig;
    const { lat: latBounds, long: longBounds } = bounds;

    const left = ((long - longBounds.min) / (longBounds.max - longBounds.min)) * width;
    const top = ((latBounds.max - lat) / (latBounds.max - latBounds.min)) * height;

    return { left, top };
};

const LocationMarker = ({ location }: { location: (typeof locations)[0] }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const href = getHref(location.type, location.id);
    
    const isStp = location.type === 'STP';
    const isWtp = location.type === 'WTP';
    const data = location.data as any;

    const { top, left } = convertCoordsToPixels(location.lat, location.long);

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <div 
                    style={{ top: `${top}px`, left: `${left}px` }} 
                    className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer"
                >
                    <Button variant="ghost" size="icon" className="rounded-full w-8 h-8 bg-background/80 hover:bg-background/100">
                        <MapPin className="w-5 h-5 text-primary animate-pulse" />
                    </Button>
                    <span className="text-xs font-semibold text-primary-foreground bg-primary/80 px-2 py-1 rounded-md mt-1 whitespace-nowrap">{location.name}</span>
                </div>
            </PopoverTrigger>
            {isOpen && (
                <PopoverPortal>
                     <React.Fragment>
                        <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setIsOpen(false)} />
                        <div className="fixed inset-0 z-50 flex items-center justify-center">
                            <PopoverContent
                                className="w-auto max-w-4xl p-0"
                                onOpenAutoFocus={(e) => e.preventDefault()}
                            >
                                <ScrollArea className="max-h-[80vh] overflow-y-auto">
                                    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-t-lg">
                                        <div className="flex justify-between items-center">
                                            <h3 className="font-bold text-lg">{isStp || isWtp ? `${location.name} - Plant Summary` : `Pumping Station Details - ${location.name}`}</h3>
                                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsOpen(false)}><X className="h-4 w-4" /></Button>
                                        </div>
                                    </div>
                                    <div className="p-4 space-y-4">
                                        {isStp ? (
                                            <Table>
                                                <TableHeader>
                                                    <TableRow className="bg-gray-50 dark:bg-gray-700">
                                                        <TableHead>Total Output Water</TableHead>
                                                        <TableHead>Inlet Water</TableHead>
                                                        <TableHead>Plant Efficiency</TableHead>
                                                        <TableHead>BOD (mg/l)</TableHead>
                                                        <TableHead>COD (ppm)</TableHead>
                                                        <TableHead>TSS (ppm)</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell>{data.totalOutputWater} KL</TableCell>
                                                        <TableCell>{data.inletWater} KLD</TableCell>
                                                        <TableCell>{data.plantEfficiency}%</TableCell>
                                                        <TableCell>{data.bod}</TableCell>
                                                        <TableCell>{data.cod}</TableCell>
                                                        <TableCell>{data.tss}</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        ) : isWtp ? (
                                            <Table>
                                                <TableHeader>
                                                    <TableRow className="bg-gray-50 dark:bg-gray-700">
                                                        <TableHead>pH (6.5-8.5)</TableHead>
                                                        <TableHead>Turbidity (&lt;5 NTU)</TableHead>
                                                        <TableHead>Elec. conductivity (&lt;1000 µS/cm)</TableHead>
                                                        <TableHead>FRC (&lt;0.2 ppm)</TableHead>
                                                        <TableHead>Temperature (15-30 °C)</TableHead>
                                                        <TableHead>TDS (&lt;500 ppm)</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell>{data.ph.toFixed(2)}</TableCell>
                                                        <TableCell>{data.turbidity.toFixed(2)}</TableCell>
                                                        <TableCell>{data.conductivity.toFixed(2)}</TableCell>
                                                        <TableCell>{data.frc.toFixed(2)}</TableCell>
                                                        <TableCell>{data.temperature.toFixed(2)}</TableCell>
                                                        <TableCell>{data.tds.toFixed(2)}</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
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
                                            </>
                                        )}
                                         <Button asChild size="sm" className="w-full mt-4">
                                            <Link href={href}>View More Details</Link>
                                        </Button>
                                    </div>
                                </ScrollArea>
                            </PopoverContent>
                        </div>
                    </React.Fragment>
                </PopoverPortal>
            )}
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
                        width={mapConfig.width}
                        height={mapConfig.height}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        data-ai-hint="city map"
                    />
                    {locations.map(loc => <LocationMarker key={loc.id} location={loc} />)}
                </div>
            </Card>
        </div>
    );
}

