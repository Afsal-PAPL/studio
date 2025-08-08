
"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, XCircle, Settings, Plug, Pencil } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

const integrations = [
  { name: 'SAP ERP', logo: '/sap-logo.png', description: 'For Purchase Requisition to Purchase Order flow.', status: 'Connected' },
  { name: 'PeopleSoft HRMS', logo: '/peoplesoft-logo.png', description: 'For workforce attendance and records sync.', status: 'Connected' },
  { name: 'SCADA System', logo: '/scada-logo.png', description: 'Primary source for real-time sensor data.', status: 'Connected' },
  { name: 'External Weather API', logo: '/weather-logo.png', description: 'Provides weather data for predictive analytics.', status: 'Disconnected' },
];

const IntegrationCard = ({ name, description, status }: { name: string, description: string, status: string }) => (
    <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
            <div className="flex justify-between items-start">
                <CardTitle className="flex items-center gap-3">
                    <Plug className="h-6 w-6 text-primary" />
                    {name}
                </CardTitle>
                <Badge variant={status === 'Connected' ? 'secondary' : 'destructive'} className={status === 'Connected' ? 'bg-green-100 text-green-800' : ''}>
                    {status === 'Connected' ? <CheckCircle className="mr-1 h-3 w-3"/> : <XCircle className="mr-1 h-3 w-3"/>}
                    {status}
                </Badge>
            </div>
             <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
            <Button variant="outline" size="sm"><Pencil className="mr-2 h-3 w-3" /> Configure</Button>
        </CardContent>
    </Card>
)

export default function IntegrationsPage() {
    return (
        <div className="space-y-6">
             <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-headline">Integrations</h1>
                    <p className="text-muted-foreground">Manage connections to external systems like ERP and HRMS.</p>
                </div>
                <Button><Plug className="mr-2 h-4 w-4" /> Add Integration</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {integrations.map((integration, index) => (
                     <IntegrationCard key={index} {...integration} />
                ))}
            </div>
        </div>
    );
}
