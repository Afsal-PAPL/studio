
"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { MapPin } from 'lucide-react';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';

const stationsData = [
    {
        id: 1,
        name: "Pumping Station - Location 1",
        dischargeRate: "2500 m³",
        flow: "1150 m³/h",
        reservoirLevel: "7.5 m",
        efficiency: "85%",
        energy: "325 kWh",
        powerFactor: "0.93",
        position: { lat: 23.0225, lng: 72.5714 } // Ahmedabad
    },
    {
        id: 2,
        name: "Pumping Station - Location 2",
        dischargeRate: "1200 m³",
        flow: "1150 m³/h",
        reservoirLevel: "7.5 m",
        efficiency: "85%",
        energy: "325 kWh",
        powerFactor: "0.91",
        position: { lat: 23.033, lng: 72.585 } // Navrangpura
    },
    {
        id: 3,
        name: "Pumping Station - Location 3",
        dischargeRate: "1500 m³",
        flow: "1300 m³/h",
        reservoirLevel: "8.1 m",
        efficiency: "88%",
        energy: "400 kWh",
        powerFactor: "0.92",
        position: { lat: 23.039, lng: 72.56 } // Satellite
    },
    {
        id: 4,
        name: "Pumping Station - Location 4",
        dischargeRate: "2000 m³",
        flow: "1400 m³/h",
        reservoirLevel: "9.0 m",
        efficiency: "90%",
        energy: "450 kWh",
        powerFactor: "0.95",
        position: { lat: 23.07, lng: 72.53 } // Chandkheda
    },
    {
        id: 5,
        name: "Pumping Station - Location 5",
        dischargeRate: "1800 m³",
        flow: "1350 m³/h",
        reservoirLevel: "8.5 m",
        efficiency: "89%",
        energy: "420 kWh",
        powerFactor: "0.94",
        position: { lat: 22.99, lng: 72.6 } // Maninagar
    },
    {
        id: 6,
        name: "Pumping Station - Location 6",
        dischargeRate: "2200 m³",
        flow: "1500 m³/h",
        reservoirLevel: "9.2 m",
        efficiency: "91%",
        energy: "480 kWh",
        powerFactor: "0.96",
        position: { lat: 23.08, lng: 72.63 } // Bapunagar
    },
    {
        id: 7,
        name: "Pumping Station - Location 7",
        dischargeRate: "1600 m³",
        flow: "1250 m³/h",
        reservoirLevel: "7.8 m",
        efficiency: "86%",
        energy: "380 kWh",
        powerFactor: "0.92",
        position: { lat: 23.0, lng: 72.51 } // Vasna
    },
    {
        id: 8,
        name: "Pumping Station - Location 8",
        dischargeRate: "2800 m³",
        flow: "1600 m³/h",
        reservoirLevel: "9.5 m",
        efficiency: "92%",
        energy: "500 kWh",
        powerFactor: "0.97",
        position: { lat: 23.045, lng: 72.65 } // Vastral
    },
    {
        id: 9,
        name: "Pumping Station - Location 9",
        dischargeRate: "1300 m³",
        flow: "1100 m³/h",
        reservoirLevel: "7.2 m",
        efficiency: "84%",
        energy: "300 kWh",
        powerFactor: "0.90",
        position: { lat: 23.01, lng: 72.53 } // Paldi
    },
    {
        id: 10,
        name: "Pumping Station - Location 10",
        dischargeRate: "2600 m³",
        flow: "1550 m³/h",
        reservoirLevel: "8.8 m",
        efficiency: "90%",
        energy: "460 kWh",
        powerFactor: "0.95",
        position: { lat: 23.09, lng: 72.56 } // Sabarmati
    }
];

const LocationMarker = ({ stationData }: { stationData: typeof stationsData[0] }) => (
    <Dialog>
        <DialogTrigger asChild>
             <Button variant="secondary" className="flex items-center gap-2 shadow-lg">
                <MapPin className="h-4 w-4 text-primary" />
                Location {stationData.id}
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
                <DialogTitle>{stationData.name}</DialogTitle>
                <DialogDescription>Real-time summary data for the pumping station.</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
                <Card>
                    <CardHeader><CardTitle>Total Discharge</CardTitle></CardHeader>
                    <CardContent><p className="text-3xl font-bold text-primary">{stationData.dischargeRate}</p></CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Current Flow</CardTitle></CardHeader>
                    <CardContent><p className="text-3xl font-bold text-primary">{stationData.flow}</p></CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Energy Consumed</CardTitle></CardHeader>
                    <CardContent><p className="text-3xl font-bold text-primary">{stationData.energy}</p></CardContent>
                </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Live Parameters</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                    <TableBody>
                        <TableRow><TableCell className="font-medium">Reservoir Level</TableCell><TableCell>{stationData.reservoirLevel}</TableCell></TableRow>
                        <TableRow><TableCell className="font-medium">Overall Efficiency</TableCell><TableCell>{stationData.efficiency}</TableCell></TableRow>
                        <TableRow><TableCell className="font-medium">Power Factor</TableCell><TableCell>{stationData.powerFactor}</TableCell></TableRow>
                    </TableBody>
                </Table>
              </CardContent>
            </Card>
        </DialogContent>
    </Dialog>
);

export default function MapPage() {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <p className="text-red-500">Google Maps API key is missing.</p>
                <p>Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your environment variables.</p>
            </div>
        )
    }

    return (
        <APIProvider apiKey={apiKey}>
            <div className="flex flex-col gap-6">
                <h1 className="text-3xl font-bold font-headline">Location Overview</h1>
                <Card className="w-full h-[calc(100vh-14rem)]">
                    <div className="relative w-full h-full rounded-lg overflow-hidden">
                        <Map
                            defaultCenter={{ lat: 23.0225, lng: 72.5714 }} // Centered on Ahmedabad
                            defaultZoom={11}
                            mapId="ahmedabad_map"
                        >
                            {stationsData.map(station => (
                                <AdvancedMarker key={station.id} position={station.position}>
                                    <LocationMarker stationData={station} />
                                </AdvancedMarker>
                            ))}
                        </Map>
                    </div>
                </Card>
            </div>
        </APIProvider>
    );
}
