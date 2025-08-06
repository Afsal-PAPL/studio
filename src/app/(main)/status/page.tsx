
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const StatusIndicator = ({ color = 'gray' }: { color: 'green' | 'yellow' | 'red' | 'gray' }) => (
    <span className={`inline-block h-2.5 w-2.5 rounded-full mr-2 shrink-0 ${
        { green: 'bg-green-500', yellow: 'bg-yellow-500', red: 'bg-red-500', gray: 'bg-gray-400' }[color]
    }`} />
);

export default function StatusPage() {
    const locations = [
        { 
            id: 1, 
            name: "Drinking Water Distribution Network ( WTP & WDS)", 
            status: 'Normal Operation', 
            statusColor: 'secondary',
            reservoirs: {
                label: "Reservoir Levels",
                items: [
                    { name: "Reservoir A", value: "8.2m", status: "green", statusLabel: ""},
                    { name: "Reservoir B", value: "5.1m", status: "yellow", statusLabel: "(Low)"},
                ]
            },
            pumps: {
                label: "Water Discharge",
                items: [
                    { name: "Line 1", value: "1250 m³/h", status: "green" },
                    { name: "Line 2", value: "1245 m³/h", status: "green" },
                ]
            }
        },
        { 
            id: 2, 
            name: "STP network", 
            status: 'Normal Operation', 
            statusColor: 'secondary',
            reservoirs: {
                label: "Reservoir Levels",
                items: [
                    { name: "Reservoir A", value: "8.2m", status: "green", statusLabel: ""},
                    { name: "Reservoir B", value: "5.1m", status: "yellow", statusLabel: "(Low)"},
                ]
            },
            pumps: {
                label: "Water Discharge",
                items: [
                    { name: "Pump 1", value: "1250 m³/h", status: "green" },
                    { name: "Pump 2", value: "1245 m³/h", status: "green" },
                ]
            }
        },
        { 
            id: 3, 
            name: "Storm Water Pumping Station Network", 
            status: 'Maintenance Required', 
            statusColor: 'destructive',
            reservoirs: {
                label: "Sump Levels",
                items: [
                    { name: "Sump A", value: "8.2m", status: "green", statusLabel: "" },
                    { name: "Sump B", value: "5.1m", status: "yellow", statusLabel: "(Low)" },
                ]
            },
            pumps: {
                label: "Water Discharge",
                items: [
                    { name: "Pump 1", value: "1250 m³/h", status: "green" },
                    { name: "Pump 2", value: "1245 m³/h", status: "green" },
                ]
            }
        },
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
                                <Badge variant={location.statusColor as 'secondary' | 'destructive'}>{location.status}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h3 className="font-semibold mb-2 text-primary">{location.reservoirs.label}</h3>
                                <ul className="space-y-1 text-sm text-muted-foreground">
                                    {location.reservoirs.items.map(item => (
                                         <li key={item.name} className="flex items-center">
                                            <StatusIndicator color={item.status as 'green' | 'yellow' | 'red' | 'gray'} />
                                            {item.name}: {item.value} {item.statusLabel}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2 text-primary">{location.pumps.label}</h3>
                                <ul className="space-y-1 text-sm text-muted-foreground">
                                    {location.pumps.items.map(item => (
                                         <li key={item.name} className="flex items-center">
                                            <StatusIndicator color={item.status as 'green' | 'yellow' | 'red' | 'gray'} />
                                            {item.name}: {item.value}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {location.id === 1 ? (
                                <Accordion type="multiple" className="w-full">
                                    <AccordionItem value="wtp">
                                        <AccordionTrigger className="font-semibold text-primary">WTP</AccordionTrigger>
                                        <AccordionContent className="flex flex-col gap-2 pt-2">
                                            <Button className="w-full" asChild>
                                                <Link href={`/location/1`}>View Station 1</Link>
                                            </Button>
                                            <Button className="w-full" asChild>
                                                <Link href={`/location/2`}>View Station 2</Link>
                                            </Button>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="wds">
                                        <AccordionTrigger className="font-semibold text-primary">WDS</AccordionTrigger>
                                        <AccordionContent className="flex flex-col gap-2 pt-2">
                                            <Button className="w-full" asChild>
                                                <Link href={`/location/3`}>View Station 3</Link>
                                            </Button>
                                            <Button className="w-full" asChild>
                                                <Link href={`/location/4`}>View Station 4</Link>
                                            </Button>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            ) : location.id === 2 ? (
                                <Accordion type="multiple" className="w-full">
                                    <AccordionItem value="stp">
                                        <AccordionTrigger className="font-semibold text-primary">STP</AccordionTrigger>
                                        <AccordionContent className="flex flex-col gap-2 pt-2">
                                            <Button className="w-full" asChild>
                                                <Link href={`/location/5`}>View Station 1</Link>
                                            </Button>
                                            <Button className="w-full" asChild>
                                                <Link href={`/location/6`}>View Station 2</Link>
                                            </Button>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="sps">
                                        <AccordionTrigger className="font-semibold text-primary">SPS</AccordionTrigger>
                                        <AccordionContent className="flex flex-col gap-2 pt-2">
                                            <Button className="w-full" asChild>
                                                <Link href={`/location/7`}>View Station 3</Link>
                                            </Button>
                                            <Button className="w-full" asChild>
                                                <Link href={`/location/8`}>View Station 4</Link>
                                            </Button>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            ) : (
                                <div className="flex flex-col gap-2 pt-2">
                                    <Button className="w-full" asChild>
                                        <Link href={`/location/9`}>View Station 1</Link>
                                    </Button>
                                    <Button className="w-full" asChild>
                                        <Link href={`/location/10`}>View Station 2</Link>
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
