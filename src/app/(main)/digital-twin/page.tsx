
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DigitalTwinPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-headline">Digital Twin</h1>
                <p className="text-muted-foreground">This is a placeholder for the Digital Twin page.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Digital Twin Visualization</CardTitle>
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
