
"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, TrendingUp, TrendingDown, Handshake } from 'lucide-react';

const performanceData = [
  { contractor: 'Alpha Maintenance Services', sla: 'Pump Unit Efficiency SLA', achievement: '81.2%', status: 'Met', trend: '+0.5%' },
  { contractor: 'Alpha Maintenance Services', sla: 'Asset Uptime Guarantee', achievement: '99.8%', status: 'Met', trend: '+0.1%' },
  { contractor: 'Beta Utility Solutions', sla: 'MTTR for Critical Failures', achievement: '4.5 hours', status: 'Breached', trend: '+0.5 hours' },
  { contractor: 'Gamma Infra Ltd.', sla: 'Asset Uptime Guarantee', achievement: '99.4%', status: 'Breached', trend: '-0.2%' },
];

const PerformanceCard = ({ data }: { data: typeof performanceData[0] }) => {
    const isMet = data.status === 'Met';
    const isPositiveTrend = data.trend.startsWith('+');

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">{data.sla}</CardTitle>
                <CardDescription>{data.contractor}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <p className="text-sm text-muted-foreground">Achievement</p>
                    <p className="text-2xl font-bold">{data.achievement}</p>
                </div>
                <div className="flex justify-between items-center">
                     <div className={`flex items-center gap-1 font-semibold ${isMet ? 'text-green-600' : 'text-red-600'}`}>
                        {isMet ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                        {data.status}
                    </div>
                     <div className={`flex items-center gap-1 text-xs ${isPositiveTrend ? 'text-green-600' : 'text-red-600'}`}>
                        {isPositiveTrend ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        {data.trend}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
};

export default function ContractorPerformancePage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-headline flex items-center gap-2"><Handshake /> Contractor Performance</h1>
                    <p className="text-muted-foreground">Monitor and evaluate contractor performance against defined SLAs.</p>
                </div>
            </div>

             <Card>
                <CardHeader>
                    <CardTitle>Performance Filters</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Select defaultValue="all">
                        <SelectTrigger><SelectValue placeholder="Select Contractor..." /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Contractors</SelectItem>
                            <SelectItem value="alpha">Alpha Maintenance Services</SelectItem>
                            <SelectItem value="beta">Beta Utility Solutions</SelectItem>
                            <SelectItem value="gamma">Gamma Infra Ltd.</SelectItem>
                        </SelectContent>
                    </Select>
                     <Select defaultValue="all">
                        <SelectTrigger><SelectValue placeholder="Select SLA Category..." /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="efficiency">Efficiency</SelectItem>
                            <SelectItem value="uptime">Uptime</SelectItem>
                            <SelectItem value="response">Response Time</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button>Apply Filters</Button>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {performanceData.map((item, index) => (
                    <PerformanceCard key={index} data={item} />
                ))}
            </div>
        </div>
    );
}
