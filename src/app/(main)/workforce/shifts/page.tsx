
"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertTriangle, UserPlus, Calendar as CalendarIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const shiftsData = {
  'Morning (06:00 - 14:00)': [
    { station: 'Kotarpur WTP', technician: 'S. Patel', status: 'Covered' },
    { station: 'Dariyapur WDS', technician: 'R. Sharma', status: 'Covered' },
    { station: 'Moterra SPS', technician: 'A. Khan', status: 'Covered' },
    { station: 'Vejalpur SWPS', technician: 'M. Desai', status: 'Covered' },
  ],
  'Afternoon (14:00 - 22:00)': [
    { station: 'Kotarpur WTP', technician: 'P. Joshi', status: 'Covered' },
    { station: 'Dariyapur WDS', technician: 'K. Mehta', status: 'Covered' },
    { station: 'Moterra SPS', technician: 'Unassigned', status: 'Alert' },
    { station: 'Vejalpur SWPS', technician: 'N. Shah', status: 'Covered' },
  ],
  'Night (22:00 - 06:00)': [
    { station: 'Kotarpur WTP', technician: 'B. Trivedi', status: 'Covered' },
    { station: 'Dariyapur WDS', technician: 'J. Dave', status: 'Covered' },
    { station: 'Moterra SPS', technician: 'H. Bhatt', status: 'Covered' },
    { station: 'Vejalpur SWPS', technician: 'Unassigned', status: 'Alert' },
  ]
};

const ShiftCard = ({ station, technician, status }: { station: string, technician: string, status: string }) => (
    <div className="flex items-center justify-between p-3 bg-card rounded-md border">
        <p className="font-semibold">{station}</p>
        <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">{technician}</p>
            <Badge variant={status === 'Covered' ? 'secondary' : 'destructive'} className={status === 'Covered' ? 'bg-green-100 text-green-800' : ''}>
                {status === 'Covered' ? 'Covered' : 'Unassigned'}
            </Badge>
        </div>
    </div>
)

export default function ShiftsPage() {
    const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-headline">Shift Management</h1>
                    <p className="text-muted-foreground">Assign shifts to stations and manage technician coverage.</p>
                </div>
                 <div className="flex gap-2">
                     <Select defaultValue="today">
                        <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="today">Today</SelectItem>
                            <SelectItem value="tomorrow">Tomorrow</SelectItem>
                            <SelectItem value="custom">Custom Date</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button><UserPlus className="mr-2 h-4 w-4" /> Assign Technician</Button>
                </div>
            </div>

            <Card className="bg-yellow-50 border-yellow-200">
                <CardHeader className="flex-row items-center gap-4">
                    <AlertTriangle className="h-8 w-8 text-yellow-500" />
                    <div>
                         <CardTitle className="text-yellow-800">Coverage Alerts</CardTitle>
                         <CardDescription className="text-yellow-700">2 stations have unassigned technicians for upcoming shifts.</CardDescription>
                    </div>
                </CardHeader>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><CalendarIcon className="h-5 w-5" /> Shift Calendar</CardTitle>
                    <CardDescription>{today}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {Object.entries(shiftsData).map(([shiftTime, assignments]) => (
                        <div key={shiftTime}>
                            <h3 className="font-bold text-lg text-primary mb-2">{shiftTime}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {assignments.map((assignment, index) => (
                                    <ShiftCard key={index} {...assignment} />
                                ))}
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

        </div>
    );
}
