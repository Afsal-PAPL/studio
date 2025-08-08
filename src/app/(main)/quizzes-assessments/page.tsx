
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileQuestion } from 'lucide-react';

export default function QuizzesAssessmentsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-headline">Quizzes & Assessments</h1>
                <p className="text-muted-foreground">Test your knowledge and complete assessments.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Coming Soon</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center text-center text-muted-foreground py-12">
                    <FileQuestion className="h-16 w-16 mb-4" />
                    <p>The Quizzes & Assessments module is under construction.</p>
                </CardContent>
            </Card>
        </div>
    );
}
