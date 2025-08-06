
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
                label: "Water Treatment Plant (WTP)",
                items: [
                    { name: "Total Water Treated Today", value: "250 MLD", status: "green", statusLabel: ""},
                    { name: "Intake vs Output vs Loss", value: "260/250/10 MLD", status: "green", statusLabel: ""},
                    { name: "Total Energy Consumed", value: "55 MWh", status: "green", statusLabel: "" },
                ]
            },
            pumps: {
                label: "Water Distribution System (WDS)",
                items: [
                    { name: "WDS Discharge", value: "245 MLD", status: "green" },
                    { name: "Total Energy Consumed", value: "35 MWh", status: "green" },
                ]
            }
        },
        { 
            id: 2, 
            name: "STP network", 
            status: 'Normal Operation', 
            statusColor: 'secondary',
            reservoirs: {
                label: "Sewage Treatment Plant (STP)",
                items: [
                    { name: "Total Sewage Treated", value: "150 MLD", status: "green", statusLabel: "" },
                    { name: "Inlet vs Output", value: "155/150 MLD", status: "green", statusLabel: "" },
                    { name: "Energy Consumed", value: "40 MWh", status: "green", statusLabel: "" },
                    { name: "BOD/COD Reduction", value: "95%", status: "green", statusLabel: "" },
                ]
            },
            pumps: {
                label: "Sewage Pumping Station (SPS)",
                items: [
                    { name: "Total Sewage Pumped", value: "152 MLD", status: "green" },
                    { name: "Energy Consumed", value: "25 MWh", status: "green" },
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
                    { name: "Sump Level", value: "4.2m / 2.1m", status: "green", statusLabel: "(Vejalpur/Jaydeep Tower)" },
                    { name: "Inflow vs Discharge", value: "500/480 m³/h", status: "green", statusLabel: "" },
                    { name: "Total Energy Consumed", value: "15 MWh", status: "green", statusLabel: "" },
                ]
            },
            pumps: {
                label: "Pump Status",
                items: [
                    { name: "Vejalpur Pumps", value: "2/3 Running", status: "green" },
                    { name: "Jaydeep Tower Pumps", value: "1/2 Running", status: "yellow" },
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
                                                <Link href={`/wtp/1`}>View Kotarpur WTP</Link>
                                            </Button>
                                            <Button className="w-full" asChild>
                                                <Link href={`/wtp/2`}>View Raska WTP</Link>
                                            </Button>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="wds">
                                        <AccordionTrigger className="font-semibold text-primary">WDS</AccordionTrigger>
                                        <AccordionContent className="flex flex-col gap-2 pt-2">
                                            <Button className="w-full" asChild>
                                                <Link href={`/location/3`}>View Dariyapur WDS</Link>
                                            </Button>
                                            <Button className="w-full" asChild>
                                                <Link href={`/location/4`}>View Mihir Tower WDS</Link>
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
                                                <Link href={`/stp/1`}>View Daffnala STP</Link>
                                            </Button>
                                            <Button className="w-full" asChild>
                                                <Link href={`/stp/2`}>View Shankar Bhavan STP</Link>
                                            </Button>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="sps">
                                        <AccordionTrigger className="font-semibold text-primary">SPS</AccordionTrigger>
                                        <AccordionContent className="flex flex-col gap-2 pt-2">
                                            <Button className="w-full" asChild>
                                                <Link href={`/location/7`}>View W-5 Usmanpura SPS</Link>
                                            </Button>
                                            <Button className="w-full" asChild>
                                                <Link href={`/location/8`}>View Moterra SPS</Link>
                                            </Button>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            ) : (
                                <div className="flex flex-col gap-2 pt-2">
                                    <Button className="w-full" asChild>
                                        <Link href={`/location/9`}>View Vejalpur</Link>
                                    </Button>
                                    <Button className="w-full" asChild>
                                        <Link href={`/location/10`}>View Jaydeep Tower Vasnala</Link>
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
