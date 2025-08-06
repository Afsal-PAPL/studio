
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, ArrowLeft, Droplets, Zap, Gauge } from 'lucide-react';

const StatusIndicator = ({ color = 'gray' }: { color: 'green' | 'yellow' | 'gray' }) => (
    <div className="flex items-center gap-2">
        <span className={`h-3 w-3 rounded-full animate-pulse ${ { green: 'bg-green-500', yellow: 'bg-yellow-500', gray: 'bg-gray-400' }[color] }`} />
        <span className="text-sm font-medium capitalize">{color === 'green' ? 'Running' : color === 'yellow' ? 'Standby' : 'No Data'}</span>
    </div>
);

const pumpData = [
    { id: 1, status: 'green', discharge: '1250 m³/h', efficiency: '88%', energy: '12 MWh' },
    { id: 2, status: 'green', discharge: '1248 m³/h', efficiency: '87%', energy: '11.8 MWh' },
    { id: 3, status: 'yellow', discharge: '0 m³/h', efficiency: '0%', energy: '21 MWh' },
    { id: 4, status: 'gray', discharge: 'N/A', efficiency: 'N/A', energy: '0 MWh' },
];

const locationNames: { [key: string]: string } = {
    '3': 'Dariyapur WDS',
    '4': 'Mihir Tower WDS',
    '7': 'W-5 Usmanpura SPS',
    '8': 'Moterra SPS',
    '9': 'Vejalpur SWPS',
    '10': 'Jaydeep Tower SWPS',
};

export default function LocationDetailsPage({ params }: { params: { id: string } }) {
    const locationName = locationNames[params.id] || `Location ${params.id}`;

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                     <Button variant="ghost" asChild className="-ml-4">
                        <Link href="/status">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Locations
                        </Link>
                    </Button>
                    <h1 className="text-3xl font-bold font-headline">{locationName} Equipment</h1>
                </div>
                <Button variant="outline"><RefreshCw className="mr-2 h-4 w-4" /> Refresh</Button>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {pumpData.map(pump => (
                    <Card key={pump.id} className="flex flex-col">
                        <CardHeader className="flex flex-row items-start justify-between">
                            <CardTitle>Pump {pump.id}</CardTitle>
                            <StatusIndicator color={pump.status as 'green' | 'yellow' | 'gray'} />
                        </CardHeader>
                        <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
                            <div className="grid grid-cols-1 gap-y-3 text-sm">
                                <div className="flex items-center gap-2"><Droplets className="w-4 h-4 text-muted-foreground" /> <span>Discharge: <strong>{pump.discharge}</strong></span></div>
                                <div className="flex items-center gap-2"><Gauge className="w-4 h-4 text-muted-foreground" /> <span>Efficiency: <strong>{pump.efficiency}</strong></span></div>
                                <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-muted-foreground" /> <span>Energy: <strong>{pump.energy}</strong></span></div>
                            </div>
                            <Button className="w-full mt-4" asChild>
                                <Link href={`/location/${params.id}/pump/${pump.id}`}>View Details</Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
