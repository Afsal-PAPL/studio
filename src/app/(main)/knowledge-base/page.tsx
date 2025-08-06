
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Upload } from 'lucide-react';

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

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Document Repository</CardTitle>
                        <div className="relative w-full max-w-sm">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search documents..." className="pl-8" />
                        </div>
                    </div>
                    <CardDescription>
                        Documents will be listed here. You can upload new documents using the button above.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center text-center p-12 border-2 border-dashed rounded-lg">
                        <p className="text-lg font-medium text-muted-foreground">No documents found.</p>
                        <p className="text-sm text-muted-foreground">Start by uploading a document to build your knowledge base.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
