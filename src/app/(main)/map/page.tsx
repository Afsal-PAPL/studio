"use client"
import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MapPin } from 'lucide-react';

const stationData = {
  name: "Pumping Station - Location 2",
  dischargeRate: "1,200 m³/h",
  flow: "1,150 m³/h",
  reservoirLevel: "7.5 m",
  efficiency: "85%",
  energy: "350 kWh",
  powerFactor: "0.92",
};

const LocationMarker = ({ name, top, left }: { name: string; top: string; left: string }) => (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant="secondary" className="absolute flex items-center gap-2 shadow-lg" style={{ top, left }}>
                <MapPin className="h-4 w-4 text-primary" />
                {name}
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
    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold font-headline">Location Overview</h1>
            <Card className="w-full h-[calc(100vh-14rem)]">
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                    <Image src="https://i.imgur.com/kYq2Q5B.png" layout="fill" objectFit="cover" alt="Map of Ahmedabad" data-ai-hint="Ahmedabad map" />
                    <LocationMarker name="Location 1" top="20%" left="30%" />
                    <LocationMarker name="Location 2" top="50%" left="50%" />
                    <LocationMarker name="Location 3" top="65%" left="70%" />
                </div>
            </Card>
        </div>
    );
}
