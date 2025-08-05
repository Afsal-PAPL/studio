import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, ArrowLeft, Droplets, ArrowUpRight, Zap, Gauge, Clock, Battery } from 'lucide-react';

const StatusIndicator = ({ color = 'gray' }: { color: 'green' | 'yellow' | 'gray' }) => (
    <div className="flex items-center gap-2">
        <span className={`h-3 w-3 rounded-full animate-pulse ${ { green: 'bg-green-500', yellow: 'bg-yellow-500', gray: 'bg-gray-400' }[color] }`} />
        <span className="text-sm font-medium capitalize">{color === 'green' ? 'Running' : color === 'yellow' ? 'Standby' : 'No Data'}</span>
    </div>
);

const pumpData = [
    { id: 1, status: 'green', discharge: '1250 m³/h', head: '75m', efficiency: '88%', voltage: '415V', hours: 2340, energy: '12 MWh' },
    { id: 2, status: 'green', discharge: '1248 m³/h', head: '75m', efficiency: '87%', voltage: '416V', hours: 2310, energy: '11.8 MWh' },
    { id: 3, status: 'yellow', discharge: '0 m³/h', head: '0m', efficiency: '0%', voltage: '0V', hours: 5102, energy: '21 MWh' },
    { id: 4, status: 'gray', discharge: 'N/A', head: 'N/A', efficiency: 'N/A', voltage: 'N/A', hours: 0, energy: '0 MWh' },
];

export default function LocationDetailsPage({ params }: { params: { id: string } }) {
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
                    <h1 className="text-3xl font-bold font-headline">Location {params.id} Equipment</h1>
                </div>
                <Button variant="outline"><RefreshCw className="mr-2 h-4 w-4" /> Refresh</Button>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card><CardHeader><CardTitle>Total Discharge</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">2498 m³/h</p></CardContent></Card>
                <Card><CardHeader><CardTitle>Avg. Efficiency</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">87.5%</p></CardContent></Card>
                <Card><CardHeader><CardTitle>Pumps Online</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">2 / 4</p></CardContent></Card>
                <Card><CardHeader><CardTitle>Total Energy</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">23.8 MWh</p></CardContent></Card>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {pumpData.map(pump => (
                    <Card key={pump.id} className="flex flex-col">
                        <CardHeader className="flex flex-row items-start justify-between">
                            <CardTitle>Pump {pump.id}</CardTitle>
                            <StatusIndicator color={pump.status as 'green' | 'yellow' | 'gray'} />
                        </CardHeader>
                        <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
                            <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                                <div className="flex items-center gap-2"><Droplets className="w-4 h-4 text-muted-foreground" /> <span>{pump.discharge}</span></div>
                                <div className="flex items-center gap-2"><ArrowUpRight className="w-4 h-4 text-muted-foreground" /> <span>{pump.head}</span></div>
                                <div className="flex items-center gap-2"><Gauge className="w-4 h-4 text-muted-foreground" /> <span>{pump.efficiency}</span></div>
                                <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-muted-foreground" /> <span>{pump.voltage}</span></div>
                                <div className="flex items-center gap-2 col-span-2"><Clock className="w-4 h-4 text-muted-foreground" /> <span>{pump.hours} hrs run</span></div>
                                <div className="flex items-center gap-2 col-span-2"><Battery className="w-4 h-4 text-muted-foreground" /> <span>{pump.energy} consumed</span></div>
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
