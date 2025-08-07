
import { Breadcrumb } from '@/components/breadcrumb';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const Gauge = ({ label, value, max, unit, progressColor }: { label: string; value: number; max: number; unit: string; progressColor?: string }) => {
    const percentage = (value / max) * 100;
    return (
        <div>
            <div className="flex justify-between mb-1 text-sm font-medium">
                <span className="text-muted-foreground">{label}</span>
                <span>{value}{unit}</span>
            </div>
            <Progress value={percentage} className={progressColor} />
        </div>
    );
}

const MetricDisplay = ({ label, value, unit }: {label: string, value: string | number, unit?: string}) => (
    <div className="flex flex-col items-center justify-center p-4 bg-secondary/50 rounded-lg text-center">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-lg font-bold text-primary">
            {value}{unit && <span className="ml-1 text-base font-medium">{unit}</span>}
        </p>
    </div>
);

const locationNames: { [key: string]: string } = {
    '3': 'Dariyapur WDS',
    '4': 'Mihir Tower WDS',
    '7': 'W-5 Usmanpura SPS',
    '8': 'Moterra SPS',
    '9': 'Vejalpur SWPS',
    '10': 'Jaydeep Tower SWPS',
};

export default function PumpDetailsPage({ params }: { params: { id: string, pumpId: string } }) {
    const locationName = locationNames[params.id] || `Location ${params.id}`;
    const breadcrumbItems = [
        { label: locationName, href: `/location/${params.id}` },
        { label: `Pump ${params.pumpId}` }
    ];
    
    const pumpEfficiency = 82;
    const motorEfficiency = 94;
    const combinedEfficiency = Math.round((pumpEfficiency / 100) * (motorEfficiency / 100) * 100);

    return (
        <div className="space-y-6">
            <Breadcrumb items={breadcrumbItems} />
            <h1 className="text-3xl font-bold font-headline">Pump {params.pumpId} - Detailed View</h1>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Operating Parameters</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <MetricDisplay label="Run Hours" value="3,450" unit="hrs" />
                        <MetricDisplay label="Flow Rate" value="1248" unit="m³/h" />
                        <MetricDisplay label="Pump Speed" value="1480" unit="RPM" />
                        <MetricDisplay label="Discharge Pressure" value="5.2" unit="bar" />
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader><CardTitle>Efficiency Monitoring</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <Gauge label="Pump Efficiency" value={pumpEfficiency} max={100} unit="%" />
                        <Gauge label="Motor Efficiency" value={motorEfficiency} max={100} unit="%" />
                        <Gauge label="Combined Unit Efficiency" value={combinedEfficiency} max={100} unit="%" />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Bearing Temperatures</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <Gauge label="Drive End" value={65} max={100} unit="°C" />
                        <Gauge label="Non-Drive End" value={68} max={100} unit="°C" />
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader><CardTitle>Vibration Levels</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <Gauge label="Pump DE" value={2.1} max={7} unit=" mm/s" />
                        <Gauge label="Motor NDE" value={1.8} max={7} unit=" mm/s" />
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader><CardTitle>Oil Analysis</CardTitle></CardHeader>
                     <CardContent className="space-y-4">
                        <Gauge label="Oil Activity" value={0.8} max={1} unit=" aw" />
                        <Gauge label="Oil Content" value={3} max={100} unit=" ppm" />
                    </CardContent>
                </Card>

                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Motor Winding Temperatures</CardTitle>
                        <CardDescription>Phase 1 / Phase 2 / Phase 3</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        <MetricDisplay label="P11" value="72" unit="°C" />
                        <MetricDisplay label="P12" value="71" unit="°C" />
                        <MetricDisplay label="P21" value="73" unit="°C" />
                        <MetricDisplay label="P22" value="72" unit="°C" />
                        <MetricDisplay label="P31" value="74" value-color="text-yellow-500" unit="°C" />
                        <MetricDisplay label="P32" value="73" unit="°C" />
                    </CardContent>
                </Card>

                 <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Power Supply & Energy</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <MetricDisplay label="Voltage (R-Y)" value="415" unit="V" />
                        <MetricDisplay label="Voltage (Y-B)" value="414" unit="V" />
                        <MetricDisplay label="Voltage (B-R)" value="416" unit="V" />
                        <MetricDisplay label="Specific Power" value="0.12" unit="kWh/m³" />
                        <MetricDisplay label="Power Factor" value="0.92" />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
