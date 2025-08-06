
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export default function MapPage() {
    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold font-headline">Location Overview</h1>
            <Card className="w-full h-[calc(100vh-14rem)]">
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                    <Image
                        src="https://th.bing.com/th/id/R.b5a74cdd5259d810b99655e66015ceea?rik=o5Dq4LLodt4W3g&riu=http%3a%2f%2fmapsof.net%2fuploads%2fstatic-maps%2fmap_of_Ahmedabad.jpg&ehk=Y09aosLEdAdXnCVeKTKFfyz%2fP58qBlgbzBJUIQS34GQ%3d&risl=&pid=ImgRaw&r=0"
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
