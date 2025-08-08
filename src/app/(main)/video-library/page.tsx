
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Video } from 'lucide-react';

export default function VideoLibraryPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-headline">Video Library</h1>
                <p className="text-muted-foreground">Browse training and instructional videos.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Coming Soon</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center text-center text-muted-foreground py-12">
                    <Video className="h-16 w-16 mb-4" />
                    <p>The Video Library is under construction.</p>
                </CardContent>
            </Card>
        </div>
    );
}
