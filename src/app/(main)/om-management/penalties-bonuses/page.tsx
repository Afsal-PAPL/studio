
"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileWarning, PlusCircle, CircleDollarSign } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const transactionData = [
  { date: '2024-07-01', contractor: 'Beta Utility Solutions', type: 'Penalty', amount: -5000, reason: 'SLA Breach: MTTR > 4.5 hours' },
  { date: '2024-06-30', contractor: 'Alpha Maintenance', type: 'Bonus', amount: 10000, reason: 'Exceeded uptime target by 0.2%' },
  { date: '2024-06-15', contractor: 'Gamma Infra Ltd.', type: 'Penalty', amount: -2500, reason: 'SLA Breach: Uptime < 99.5%' },
];

export default function PenaltiesBonusesPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-headline flex items-center gap-2"><FileWarning /> Penalties &amp; Bonuses</h1>
                    <p className="text-muted-foreground">Manage and track financial penalties and bonuses for contractors.</p>
                </div>
                <Button><PlusCircle className="mr-2 h-4 w-4" /> Configure Rules</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader className="flex-row items-center justify-between">
                        <CardTitle>Total Penalties (Last 30d)</CardTitle>
                        <CircleDollarSign className="h-5 w-5 text-destructive" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-destructive">₹ 7,500</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex-row items-center justify-between">
                        <CardTitle>Total Bonuses (Last 30d)</CardTitle>
                        <CircleDollarSign className="h-5 w-5 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-green-500">₹ 10,000</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Contractor</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Amount (INR)</TableHead>
                                <TableHead>Reason</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactionData.map((t, index) => (
                                <TableRow key={index}>
                                    <TableCell>{t.date}</TableCell>
                                    <TableCell className="font-medium">{t.contractor}</TableCell>
                                    <TableCell>
                                        <Badge variant={t.type === 'Penalty' ? 'destructive' : 'secondary'} className={t.type === 'Bonus' ? 'bg-green-100 text-green-800' : ''}>
                                            {t.type}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className={`font-semibold ${t.type === 'Penalty' ? 'text-destructive' : 'text-green-600'}`}>
                                        {t.amount.toLocaleString()}
                                    </TableCell>
                                    <TableCell>{t.reason}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
