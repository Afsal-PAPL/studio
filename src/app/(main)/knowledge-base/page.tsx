
"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Upload, AlertTriangle, Wrench, ChevronRight, BookOpenCheck } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Image from 'next/image';
import Link from 'next/link';

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

const causeDetails = {
    'Air entertainment': {
        description: 'Air getting into the pump or suction line. This can be caused by leaks in the suction piping, low liquid levels in the suction tank, or vortexing at the suction inlet. It reduces pump performance and can cause noise and vibration.',
        image: 'https://placehold.co/600x400.png',
        imageHint: 'air bubbles water',
        link: 'https://www.michael-smith-engineers.co.uk/resources/useful-info/pump-cavitation-and-air-entrainment'
    },
    'Suction obstructed': {
        description: 'The suction line is partially or fully blocked, preventing liquid from reaching the pump. This can be caused by a closed or partially closed valve, a clogged strainer, or debris in the pipeline.',
        image: 'https://placehold.co/600x400.png',
        imageHint: 'clogged pipe',
        link: 'https://www.pumpsandsystems.com/troubleshooting-pump-suction-problems-when-net-positive-suction-head-available-npsha-low'
    },
    'Poor pump design': {
        description: 'The selected pump is not suitable for the application\'s requirements (head, flow, liquid properties). This can lead to inefficient operation, cavitation, and premature wear.',
        image: 'https://placehold.co/600x400.png',
        imageHint: 'pump schematic',
        link: 'https://www.worldpumps.com/content/features/what-are-the-main-causes-of-pump-failure'
    },
    'Speed too low': {
        description: 'The pump is running at a lower speed than required, resulting in reduced flow and pressure. This could be due to an incorrect motor speed, a variable frequency drive (VFD) setting, or belt slippage in belt-driven systems.',
        image: 'https://placehold.co/600x400.png',
        imageHint: 'motor speed controller',
        link: 'https://www.pumpsandsystems.com/what-are-considerations-pumping-systems-operating-reduced-speeds'
    },
    'Incorrect rotation': {
        description: 'The pump is spinning in the wrong direction. This will result in very low flow and pressure, and can cause damage to the pump if left uncorrected. It is usually caused by incorrect motor wiring.',
        image: 'https://placehold.co/600x400.png',
        imageHint: 'motor rotation arrow',
        link: 'https://blog.craneengineering.net/how-to-check-pump-rotation'
    },
    'Pump flow too low': {
        description: 'The pump is operating far to the left of its Best Efficiency Point (BEP), leading to recirculation, increased vibration, and potential damage to the impeller and bearings.',
        image: 'https://placehold.co/600x400.png',
        imageHint: 'pump performance curve',
        link: 'https://www.empoweringpumps.com/what-is-minimum-flow-in-a-centrifugal-pump/'
    },
    'Change in viscosity': {
        description: 'The viscosity of the pumped fluid has changed. Higher viscosity increases system friction, requiring more power and reducing flow rate. Lower viscosity can also affect performance.',
        image: 'https://placehold.co/600x400.png',
        imageHint: 'viscous liquid',
        link: 'https://www.crestpumps.co.uk/pump-information/what-is-viscosity-and-how-does-it-affect-a-pumps-performance/'
    },
    'Cavitation': {
        description: 'Vapor bubbles form in the liquid when suction pressure drops too low and then collapse violently inside the pump. This causes noise, vibration, and severe damage to the impeller and casing.',
        image: 'https://placehold.co/600x400.png',
        imageHint: 'damaged impeller',
        link: 'https://www.pumpsandsystems.com/reducing-cavitation-centrifugal-pumps'
    },
    'Leakage joint excessive': {
        description: 'Excessive leakage from mechanical seals, packing, or gaskets. This results in lost product, potential safety hazards, and can indicate a failing seal or improper installation.',
        image: 'https://placehold.co/600x400.png',
        imageHint: 'leaking pipe joint',
        link: 'https://www.dultmeier.com/blog/factors-that-affect-mechanical-seal-life/'
    },
    'Foreign matter in impeller': {
        description: 'Debris such as rags, stones, or plastic has entered the pump and is lodged in the impeller, causing a blockage, imbalance, and reduced flow.',
        image: 'https://placehold.co/600x400.png',
        imageHint: 'clogged impeller',
        link: 'https://www.globalpumps.com.au/blog/what-to-do-when-your-pump-is-clogged'
    },
    'Damaged impeller': {
        description: 'The impeller vanes are bent, broken, or worn down due to abrasion, corrosion, or cavitation. This severely impacts the pump\'s ability to generate flow and pressure.',
        image: 'https://placehold.co/600x400.png',
        imageHint: 'broken pump impeller',
        link: 'https://www.tuvsud.com/en/press-and-media/2021/july/common-causes-for-impeller-damage-and-failure'
    },
    'Incorrect type of packing': {
        description: 'The gland packing material is not suitable for the fluid\'s temperature, pressure, or chemical properties. This leads to premature failure and excessive leakage.',
        image: 'https://placehold.co/600x400.png',
        imageHint: 'gland packing',
        link: 'https://www.sepco.com/blog/choosing-the-right-compression-packing/'
    },
    'Gland too tight': {
        description: 'The gland packing is over-tightened, preventing necessary leakage for lubrication and cooling. This can cause the packing to burn and score the shaft sleeve.',
        image: 'https://placehold.co/600x400.png',
        imageHint: 'pump gland',
        link: 'https://www.waterworld.com/water-utility-management/pumps/article/16203276/a-practical-guide-to-gland-packing'
    },
    'Dirt or grit in pumped liquid': {
        description: 'Abrasive particles in the fluid are causing accelerated wear on the impeller, casing, and seals. This is common in applications like mining, dredging, and wastewater.',
        image: 'https://placehold.co/600x400.png',
        imageHint: 'dirty water',
        link: 'https://www.schurcoslurry.com/blog/pump-failure-due-abrasion-and-wear'
    },
    'Impeller or coupling unbalanced': {
        description: 'An unbalanced impeller or coupling creates excessive vibration, leading to premature bearing and seal failure. Imbalance can be caused by manufacturing defects, uneven wear, or debris.',
        image: 'https://placehold.co/600x400.png',
        imageHint: 'pump coupling',
        link: 'https://www.pumps.org/what-causes-pump-vibration/'
    },
    'Loose impeller': {
        description: 'The impeller is not securely fastened to the shaft, causing it to wobble or spin freely. This results in a loss of performance, noise, and potential damage to the shaft and keyway.',
        image: 'https://placehold.co/600x400.png',
        imageHint: 'pump assembly',
        link: 'https://www.linkedin.com/pulse/impeller-problems-pumps-causes-solutions-muhammad-usman-goni'
    },
    'Speed too high': {
        description: 'Running the pump at a speed higher than its design limit. This can lead to excessive power consumption, high pressure, and increased wear on all components.',
        image: 'https://placehold.co/600x400.png',
        imageHint: 'tachometer',
        link: 'https://www.power-eng.com/renewables/hydro/the-perils-of-running-pumps-too-fast-or-too-slow/'
    },
    'Pump flow too high': {
        description: 'The pump is operating far to the right of its Best Efficiency Point (BEP), which can lead to cavitation, high power consumption, and increased NPSH required.',
        image: 'https://placehold.co/600x400.png',
        imageHint: 'pump flow meter',
        link: 'https://www.pumpsandsystems.com/what-happens-when-centrifugal-pump-operates-far-end-curve'
    },
    'Change in density': {
        description: 'The density of the pumped fluid has changed. A higher density fluid will require more power to pump at the same flow rate, potentially overloading the motor.',
        image: 'https://placehold.co/600x400.png',
        imageHint: 'hydrometer',
        link: 'https://www.engineeringtoolbox.com/pumps-power-d_415.html'
    },
    'Excessive shaft run-out': {
        description: 'The pump shaft is not rotating perfectly true, causing a "wobble". This leads to high vibration and rapid failure of mechanical seals and bearings. It can be caused by a bent shaft or improper assembly.',
        image: 'https://placehold.co/600x400.png',
        imageHint: 'dial indicator shaft',
        link: 'https://reliabilityweb.com/articles/entry/what_is_shaft_runout'
    },
    'Shaft bent': {
        description: 'The pump shaft is physically bent, causing severe vibration and rapid wear of bearings and seals. This can result from hydraulic shocks, operating the pump outside its limits, or improper handling.',
        image: 'https://placehold.co/600x400.png',
        imageHint: 'bent metal shaft',
        link: 'https://www.worldpumps.com/content/features/what-are-the-main-causes-of-pump-failure'
    },
    'Impeller or wear ring rubbing': {
        description: 'The impeller is making physical contact with the stationary pump casing or wear rings. This causes noise, vibration, high power consumption, and damage to the components.',
        image: 'https://placehold.co/600x400.png',
        imageHint: 'worn pump casing',
        link: 'https://www.pumpsandsystems.com/how-do-wear-rings-impact-pump-performance-and-reliability'
    },
    'Packing not installed properly': {
        description: 'Gland packing rings are not seated correctly, are in the wrong order, or the joints are not staggered. This results in excessive leakage and short packing life.',
        image: 'https://placehold.co/600x400.png',
        imageHint: 'installing gland packing',
        link: 'https://www.palmetto-packing.com/the-most-common-packing-failure-and-how-to-prevent-it/'
    },
    'Misalignment': {
        description: 'The pump and motor shafts are not properly aligned. This is a very common cause of vibration, leading to premature failure of bearings, seals, and couplings.',
        image: 'https://placehold.co/600x400.png',
        imageHint: 'laser shaft alignment',
        link: 'https://www.vibralign.com/shaft-alignment/what-is-misalignment'
    },
    'Shaft scored at packing/seal': {
        description: 'The shaft or shaft sleeve has a groove or scratch in the area where the packing or mechanical seal sits. This creates a leak path and will cause any new packing or seal to fail quickly.',
        image: 'https://placehold.co/600x400.png',
        imageHint: 'scored metal shaft',
        link: 'https://mechanicalseals.com/2021/01/scored-shafts-and-sleeves/'
    },
    'Worn bearings': {
        description: 'The pump bearings are worn out, causing excessive shaft movement, vibration, and noise. This can lead to contact between rotating and stationary parts, resulting in major pump failure.',
        image: 'https://placehold.co/600x400.png',
        imageHint: 'worn ball bearing',
        link: 'https://www.processingmagazine.com/pumps-motors-drives/pumps/article/15587428/8-causes-of-bearing-failure-in-industrial-pumps-and-how-to-prevent-them'
    },
    'Stuffing box bush clearance high': {
        description: 'The clearance between the shaft and the stuffing box bushing (or throat bushing) is too large. This reduces the support for the packing and allows excessive leakage.',
        image: 'https://placehold.co/600x400.png',
        imageHint: 'pump stuffing box',
        link: 'https://www.pumpsandsystems.com/what-purpose-throat-bushing-stuffing-box'
    },
    'Foundation not rigid': {
        description: 'The pump baseplate and foundation are not sufficiently stiff or properly grouted, leading to vibration and misalignment issues. A solid foundation is critical for smooth operation.',
        image: 'https://placehold.co/600x400.png',
        imageHint: 'pump on concrete base',
        link: 'https://www.pumpsandsystems.com/pump-baseplate-and-foundation-installation-best-practices'
    },
    'Bearing cooling water failure': {
        description: 'The supply of cooling water to the bearing housing has been interrupted. This will cause the bearings to overheat and fail quickly. Applicable only to pumps with water-cooled bearings.',
        image: 'https://placehold.co/600x400.png',
        imageHint: 'water cooling pipes',
        link: 'https://www.pumpsandsystems.com/what-considerations-should-be-given-cooling-water-systems-centrifugal-pumps'
    },
    'Inadequate bearing lubrication': {
        description: 'Bearings have too little, too much, or the wrong type of lubricant. This is a primary cause of bearing failure, leading to overheating and seizure.',
        image: 'https://placehold.co/600x400.png',
        imageHint: 'lubricant grease gun',
        link: 'https://www.mobil.com/en/industrial/lubricant-expertise/resources/common-causes-of-bearing-failure'
    },
    'High ambient temperature': {
        description: 'The temperature of the environment around the pump is very high, reducing the ability of the bearings and motor to cool down. This can lead to overheating issues.',
        image: 'https://placehold.co/600x400.png',
        imageHint: 'hot industrial environment',
        link: 'https://www.omcocoleads.com/blog/2019/07/26/how-does-ambient-temperature-affect-electric-motor-performance/'
    },
    'High process liquid temperature': {
        description: 'The temperature of the liquid being pumped is higher than the pump or its seals are designed for. This can cause components to fail and may require special high-temperature pumps.',
        image: 'https://placehold.co/600x400.png',
        imageHint: 'hot liquid pipes',
        link: 'https://www.globalpumps.com.au/blog/working-with-high-temperature-liquids-what-pumps-to-use'
    }
};

type CauseDetailKey = keyof typeof causeDetails;

interface Cause {
    name: CauseDetailKey;
}

interface TroubleChartRow {
    symptom: string;
    causes: Cause[];
}


const troubleChartData: TroubleChartRow[] = [
    {
        symptom: 'Insufficient Flow',
        causes: [
            { name: 'Air entertainment' }, { name: 'Suction obstructed' }, { name: 'Poor pump design' }, { name: 'Speed too low' }, { name: 'Incorrect rotation' },
            { name: 'Pump flow too low' }, { name: 'Change in viscosity' }, { name: 'Cavitation' }, { name: 'Leakage joint excessive' }, { name: 'Foreign matter in impeller' },
            { name: 'Damaged impeller' }, { name: 'Incorrect type of packing' }, { name: 'Gland too tight' }, { name: 'Dirt or grit in pumped liquid' }, { name: 'Impeller or coupling unbalanced' }
        ]
    },
    {
        symptom: 'Pressure too Low',
        causes: [
            { name: 'Air entertainment' }, { name: 'Suction obstructed' }, { name: 'Poor pump design' }, { name: 'Speed too low' }, { name: 'Incorrect rotation' },
            { name: 'Pump flow too low' }, { name: 'Change in viscosity' }, { name: 'Cavitation' }, { name: 'Leakage joint excessive' }, { name: 'Loose impeller' }, { name: 'Damaged impeller' }
        ]
    },
    {
        symptom: 'High Amp Reading',
        causes: [
            { name: 'Speed too high' }, { name: 'Incorrect rotation' }, { name: 'Pump flow too high' }, { name: 'Change in density' }, { name: 'Change in viscosity' },
            { name: 'Excessive shaft run-out' }, { name: 'Impeller or coupling unbalanced' }, { name: 'Shaft bent' }, { name: 'Impeller or wear ring rubbing' },
            { name: 'Packing not installed properly' }
        ]
    },
    {
        symptom: 'Packing Leaks too Much',
        causes: [
            { name: 'Misalignment' }, { name: 'Shaft bent' }, { name: 'Shaft scored at packing/seal' }, { name: 'Packing not installed properly' }, { name: 'Incorrect type of packing' },
            { name: 'Worn bearings' }, { name: 'Impeller or coupling unbalanced' }, { name: 'Stuffing box bush clearance high' }, { name: 'Shaft scored at packing/seal' }
        ]
    },
    {
        symptom: 'Seal / Packing Fails Early',
        causes: [
            { name: 'Air entertainment' }, { name: 'Pump flow too low' }, { name: 'Poor pump design' }, { name: 'Cavitation' }, { name: 'Foreign matter in impeller' },
            { name: 'Misalignment' }, { name: 'Dirt or grit in pumped liquid' }, { name: 'Excessive shaft run-out' }, { name: 'Impeller or coupling unbalanced' }
        ]
    },
    {
        symptom: 'High Vibration / Noise',
        causes: [
            { name: 'Air entertainment' }, { name: 'Suction obstructed' }, { name: 'Incorrect rotation' }, { name: 'Pump flow too high' }, { name: 'Change in density' }, { name: 'Misalignment' },
            { name: 'Worn bearings' }, { name: 'Impeller or wear ring rubbing' }, { name: 'Foundation not rigid' }, { name: 'Shaft bent' }
        ]
    },
    {
        symptom: 'Bearings Short Lived',
        causes: [
            { name: 'Misalignment' }, { name: 'Shaft bent' }, { name: 'Cavitation' }, { name: 'Excessive shaft run-out' }, { name: 'Impeller or coupling unbalanced' },
            { name: 'Bearing cooling water failure' }, { name: 'Inadequate bearing lubrication' }
        ]
    },
    {
        symptom: 'Bearings Run too Hot',
        causes: [
            { name: 'Air entertainment' }, { name: 'Pump flow too low' }, { name: 'Cavitation' }, { name: 'Misalignment' }, { name: 'Change in density' }, { name: 'Worn bearings' },
            { name: 'Impeller or coupling unbalanced' }, { name: 'Bearing cooling water failure' }, { name: 'Inadequate bearing lubrication' }, { name: 'High ambient temperature' },
            { name: 'High process liquid temperature' }
        ]
    }
];

export default function KnowledgeBasePage() {
    const [selectedCause, setSelectedCause] = useState<CauseDetailKey | null>(null);

    const handleCauseClick = (causeName: CauseDetailKey) => {
        setSelectedCause(causeName);
    };

    const handleDialogClose = () => {
        setSelectedCause(null);
    };
    
    const currentCauseDetails = selectedCause ? causeDetails[selectedCause] : null;

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
                                            <TableCell className="font-semibold text-primary align-top">{row.symptom}</TableCell>
                                            <TableCell>
                                                <div className="flex flex-wrap gap-2">
                                                    {row.causes.map((cause, causeIndex) => (
                                                        <Button key={causeIndex} variant="outline" size="sm" className="text-xs" onClick={() => handleCauseClick(cause.name)}>
                                                            {cause.name}
                                                        </Button>
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

            <Dialog open={!!selectedCause} onOpenChange={(isOpen) => !isOpen && handleDialogClose()}>
                <DialogContent className="sm:max-w-3xl">
                    {currentCauseDetails && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="text-2xl">{selectedCause}</DialogTitle>
                                <DialogDescription>
                                    {currentCauseDetails.description}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                               <div className="relative aspect-video w-full">
                                     <Image
                                        src={currentCauseDetails.image}
                                        alt={selectedCause || 'Cause illustration'}
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-lg"
                                        data-ai-hint={currentCauseDetails.imageHint}
                                    />
                               </div>
                                <Button asChild variant="link" className="p-0 justify-start">
                                    <Link href={currentCauseDetails.link} target="_blank" rel="noopener noreferrer">
                                        Learn More <BookOpenCheck className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
