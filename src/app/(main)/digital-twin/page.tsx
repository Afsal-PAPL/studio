
"use client"
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const locations = [
    { value: "all", label: "All Locations" },
    { value: "kotarpur-wtp", label: "Kotarpur WTP" },
    { value: "raska-wtp", label: "Raska WTP" },
    { value: "dariyapur-wds", label: "Dariyapur WDS" },
    { value: "mihir-tower-wds", label: "Mihir Tower WDS" },
    { value: "daffnala-stp", label: "Daffnala STP" },
    { value: "shankar-bhavan-stp", label: "Shankar Bhavan STP" },
    { value: "w-5-usmanpura-sps", label: "W-5 Usmanpura SPS" },
    { value: "moterra-sps", label: "Moterra SPS" },
    { value: "vejalpur-swps", label: "Vejalpur SWPS" },
    { value: "jaydeep-tower-swps", label: "Jaydeep Tower SWPS" }
];


export default function DigitalTwinPage() {
    const [location, setLocation] = React.useState('dariyapur-wds');
    
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-headline">Digital Twin</h1>
                    <p className="text-muted-foreground">Select a location to view its digital twin.</p>
                </div>
                <div className="w-full md:w-auto md:max-w-xs">
                     <Select value={location} onValueChange={setLocation}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select location..." />
                        </SelectTrigger>
                        <SelectContent>
                            {locations.map(loc => (
                                <SelectItem key={loc.value} value={loc.value}>{loc.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Digital Twin Visualization for {locations.find(l => l.value === location)?.label}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center h-96 bg-secondary rounded-md">
                        <p className="text-muted-foreground">Digital Twin content will be displayed here.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
