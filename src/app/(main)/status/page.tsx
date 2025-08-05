import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, Thermometer, Gauge, Clock } from 'lucide-react';
import Link from 'next/link';

const StatusIndicator = ({ color = 'gray' }: { color: 'green' | 'yellow' | 'red' | 'gray' }) => (
    <span className={`inline-block h-2.5 w-2.5 rounded-full mr-2 shrink-0 ${
        { green: 'bg-green-500', yellow: 'bg-yellow-500', red: 'bg-red-500', gray: 'bg-gray-400' }[color]
    }`} />
);

export default function StatusPage() {
    const locations = [
        { id: 1, name: "WTP and stations", status: 'Normal Operation', statusColor: 'secondary' },
        { id: 2, name: "STP network", status: 'Normal Operation', statusColor: 'secondary' },
        { id: 3, name: "Water Supply and Distribution Stations", status: 'Maintenance Required', statusColor: 'destructive' },
    ];

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h1 className="text-3xl font-bold font-headline">Location Wise Status</h1>
                <Button variant="outline"><RefreshCw className="mr-2 h-4 w-4" /> Refresh Data</Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {locations.map(location => (
                    <Card key={location.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <CardTitle>{location.name}</CardTitle>
                                <Badge variant={location.statusColor}>{location.status}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h3 className="font-semibold mb-2 text-primary">Reservoir Levels</h3>
                                <ul className="space-y-1 text-sm text-muted-foreground">
                                    <li className="flex items-center"><StatusIndicator color="green" />Reservoir A: 8.2m</li>
                                    <li className="flex items-center"><StatusIndicator color="yellow" />Reservoir B: 5.1m (Low)</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2 text-primary">Water Discharge</h3>
                                <ul className="space-y-1 text-sm text-muted-foreground">
                                    <li className="flex items-center"><StatusIndicator color="green" />Pump 1: 1250 m³/h</li>
                                    <li className="flex items-center"><StatusIndicator color="green" />Pump 2: 1245 m³/h</li>
                                </ul>
                            </div>
                            <Button className="w-full" asChild>
                                <Link href={`/location/${location.id}`}>View Station</Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <h2 className="text-2xl font-bold font-headline mt-4">Sensor Metrics Overview</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Reservoir Level Sensor</CardTitle>
                        <Gauge className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">7.8m</div>
                        <p className="text-xs text-muted-foreground">WTP and stations - Main Reservoir</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Discharge Pressure</CardTitle>
                        <Thermometer className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">5.2 bar</div>
                        <p className="text-xs text-muted-foreground">STP network - Pump 1</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Flow Rate</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">450 m³/h</div>
                        <p className="text-xs text-muted-foreground">Water Supply Stations - Outlet 1</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">212 days</div>
                        <p className="text-xs text-muted-foreground">Since last maintenance</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
