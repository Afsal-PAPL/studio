
"use client"
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MapPin } from 'lucide-react';
import React from 'react';

const locations = [
    { id: 1, name: 'Kotarpur WTP', type: 'WTP', status: 'Normal', top: '25%', left: '40%' },
    { id: 2, name: 'Raska WTP', type: 'WTP', status: 'Normal', top: '75%', left: '80%' },
    { id: 3, name: 'Dariyapur WDS', type: 'WDS', status: 'Normal', top: '48%', left: '52%' },
    { id: 4, name: 'Mihir Tower WDS', type: 'WDS', status: 'Normal', top: '60%', left: '30%' },
    { id: 5, name: 'Daffnala STP', type: 'STP', status: 'Normal', top: '40%', left: '65%' },
    { id: 6, name: 'Shankar Bhavan STP', type: 'STP', status: 'Normal', top: '55%', left: '45%' },
    { id: 7, name: 'W-5 Usmanpura SPS', type: 'SPS', status: 'Normal', top: '50%', left: '40%' },
    { id: 8, name: 'Moterra SPS', type: 'SPS', status: 'Normal', top: '15%', left: '35%' },
    { id: 9, name: 'Vejalpur SWPS', type: 'SWPS', status: 'Maintenance', top: '70%', left: '25%' },
    { id: 10, name: 'Jaydeep Tower SWPS', type: 'SWPS', status: 'Normal', top: '80%', left: '50%' }
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

const LocationMarker = ({ location }: { location: typeof locations[0] }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const href = getHref(location.type, location.id);
    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild style={{ top: location.top, left: location.left }} className="absolute -translate-x-1/2 -translate-y-1/2">
                 <div onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
                    <Button variant="ghost" size="icon" className="rounded-full w-8 h-8 bg-background/80 hover:bg-background/100">
                        <MapPin className="w-5 h-5 text-primary animate-pulse" />
                    </Button>
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-64" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
                <div className="space-y-2">
                    <h4 className="font-semibold">{location.name}</h4>
                    <p className="text-sm text-muted-foreground">Type: {location.type}</p>
                    <p className="text-sm text-muted-foreground">Status: <span className={location.status === 'Normal' ? 'text-green-500' : 'text-yellow-500'}>{location.status}</span></p>
                    <Button asChild size="sm" className="w-full">
                        <Link href={href}>View Details</Link>
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
