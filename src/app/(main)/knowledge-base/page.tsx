
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Upload, AlertTriangle, CheckCircle, Wrench, ChevronRight } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const failureModes = [
    "Excessive Power Consumption",
    "Cavitation",
    "Bearing Failure",
    "Excessive Vibration",
    "Less Flow Yield Than Expected",
    "Pump Operating without Discharge",
    "Leakage",
    "Seal Failure",
    "Overheating",
    "Corrosion",
    "Lubrication Failure",
    "Imbalance / Damaged Shaft",
];

const troubleChartData = [
    {
        symptom: 'Insufficient Flow',
        causes: [
            'Air entertainment', 'Suction obstructed', 'Poor pump design', 'Speed too low', 'Incorrect rotation',
            'Pump flow too low', 'Change in viscosity', 'Cavitation', 'Leakage joint excessive', 'Foreign matter in impeller',
            'Damaged impeller', 'Incorrect type of packing', 'Gland too tight', 'Dirt or grit in pumped liquid', 'Impeller or coupling unbalanced'
        ]
    },
    {
        symptom: 'Pressure too Low',
        causes: [
            'Air entertainment', 'Suction obstructed', 'Poor pump design', 'Speed too low', 'Incorrect rotation',
            'Pump flow too low', 'Change in viscosity', 'Cavitation', 'Leakage joint excessive', 'Loose impeller', 'Damaged impeller'
        ]
    },
    {
        symptom: 'High Amp Reading',
        causes: [
            'Speed too high', 'Incorrect rotation', 'Pump flow too high', 'Change in density', 'Change in viscosity',
            'Excessive shaft run-out', 'Impeller or coupling unbalanced', 'Shaft bent', 'Impeller or wear ring rubbing',
            'Packing not installed properly'
        ]
    },
    {
        symptom: 'Packing Leaks too Much',
        causes: [
            'Misalignment', 'Shaft bent', 'Shaft scored at packing/seal', 'Packing not installed properly', 'Incorrect type of packing',
            'Shaft bent', 'Worn bearings', 'Impeller or coupling unbalanced', 'Stuffing box bush clearance high', 'Shaft scored at packing/seal'
        ]
    },
    {
        symptom: 'Seal / Packing Fails Early',
        causes: [
            'Air entertainment', 'Pump flow too low', 'Poor pump design', 'Pump flow too low', 'Cavitation', 'Foreign matter in impeller',
            'Misalignment', 'Dirt or grit in pumped liquid', 'Excessive shaft run-out', 'Impeller or coupling unbalanced'
        ]
    },
    {
        symptom: 'High Vibration / Noise',
        causes: [
            'Air entertainment', 'Suction obstructed', 'Incorrect rotation', 'Pump flow too high', 'Change in density', 'Misalignment',
            'Worn bearings', 'Impeller or wear ring rubbing', 'Foundation not rigid', 'Shaft bent', 'Impeller or wear ring rubbing', 'Worn bearings'
        ]
    },
    {
        symptom: 'Bearings Short Lived',
        causes: [
            'Misalignment', 'Shaft bent', 'Cavitation', 'Misalignment', 'Shaft bent', 'Excessive shaft run-out', 'Impeller or coupling unbalanced',
            'Impeller or coupling unbalanced', 'Bearing cooling water failure', 'Inadequate bearing lubrication'
        ]
    },
    {
        symptom: 'Bearings Run too Hot',
        causes: [
            'Air entertainment', 'Pump flow too low', 'Cavitation', 'Misalignment', 'Change in density', 'Cavitation', 'Worn bearings',
            'Impeller or coupling unbalanced', 'Bearing cooling water failure', 'Inadequate bearing lubrication', 'High ambient temperature',
            'High process liquid temperature'
        ]
    }
];

export default function KnowledgeBasePage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-headline">Knowledge Base</h1>
                    <p className="text-muted-foreground">Find documents, manuals, and troubleshooting guides.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline"><Upload className="mr-2 h-4 w-4" /> Upload Document</Button>
                </div>
            </div>

            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Document Repository</h2>
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search documents..." className="pl-8" />
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Indicative Pump Major Failure Modes</CardTitle>
                    <CardDescription>A guide to common pump failures and their potential causes.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center"><AlertTriangle className="w-5 h-5 mr-2 text-destructive" /> Common Failure Modes</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3">
                            {failureModes.map((mode, index) => (
                                <div key={index} className="flex items-center">
                                    <ChevronRight className="h-4 w-4 mr-2 text-primary" />
                                    <span className="text-sm">{mode}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center"><Wrench className="w-5 h-5 mr-2 text-primary" /> Pump Trouble Chart</h3>
                        <div className="border rounded-lg overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-1/4 bg-muted font-bold">Symptom</TableHead>
                                        <TableHead className="bg-muted font-bold">Potential Causes (in order of likelihood)</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {troubleChartData.map((row, rowIndex) => (
                                        <TableRow key={rowIndex}>
                                            <TableCell className="font-semibold text-primary">{row.symptom}</TableCell>
                                            <TableCell>
                                                <div className="flex flex-wrap gap-x-4 gap-y-2">
                                                    {row.causes.map((cause, causeIndex) => (
                                                         <span key={causeIndex} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">{cause}</span>
                                                    ))}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
