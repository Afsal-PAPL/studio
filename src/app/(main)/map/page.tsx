
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export default function MapPage() {
    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold font-headline">Location Overview</h1>
            <Card className="w-full h-[calc(100vh-14rem)]">
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                    <Image
                        src="https://i.imgur.com/G5O4Y5A.png"
                        alt="Map of Ahmedabad with pumping stations"
                        layout="fill"
                        objectFit="cover"
                        data-ai-hint="city map"
                    />
                </div>
            </Card>
        </div>
    );
}
