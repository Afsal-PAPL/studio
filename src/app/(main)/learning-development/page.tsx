
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap } from 'lucide-react';

export default function LearningDevelopmentPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-headline">Learning & Development</h1>
                <p className="text-muted-foreground">Access learning modules and track progress.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Coming Soon</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center text-center text-muted-foreground py-12">
                    <GraduationCap className="h-16 w-16 mb-4" />
                    <p>The Learning & Development module is under construction.</p>
                </CardContent>
            </Card>
        </div>
    );
}
