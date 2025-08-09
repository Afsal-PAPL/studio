
"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Upload, Film, PlayCircle, BarChart2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Image from 'next/image';

const videos = [
    { title: 'How to Perform a Shaft Alignment', category: 'Maintenance', level: 'Intermediate', thumbnail: 'https://media.licdn.com/dms/image/v2/D5612AQFuYM16t1pWmA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1688961449432?e=1759968000&v=beta&t=z8JPtxPmpiy6W-LQEy7JEskF4BG8026c133UYrSPv8g', thumbnailHint: 'laser shaft alignment' },
    { title: 'Troubleshooting Pump Cavitation', category: 'Troubleshooting', level: 'Advanced', thumbnail: 'https://aoblpump.com/wp-content/uploads/2024/11/pump-cavitation.jpg.avif', thumbnailHint: 'pump cavitation diagram' },
    { title: 'Daily Safety Inspection Checklist', category: 'Safety', level: 'Beginner', thumbnail: 'https://www.manwinwin.com/wp-content/uploads/2024/07/Pumps-maintenance.jpg', thumbnailHint: 'pumps maintenance' },
    { title: 'replacing a gland packing', category: 'Maintenance', level: 'Advanced', thumbnail: 'https://giw.ksb.com/hs-fs/hubfs/blog-images/DSC_0230-1.jpg?width=4608&name=DSC_0230-1.jpg', thumbnailHint: 'gland packing' },
    { title: 'Understanding iPUMPNET Features', category: 'Software', level: 'Intermediate', thumbnail: 'https://placehold.co/600x400.png', thumbnailHint: 'software interface' },
    { title: 'Reading a P&ID Diagram', category: 'Operational', level: 'Beginner', thumbnail: 'https://i.ibb.co/9gP6fgy/pid-diagram.png', thumbnailHint: 'P&ID diagram' },
];

const VideoCard = ({ video }: { video: typeof videos[0] }) => (
    <Dialog>
        <DialogTrigger asChild>
            <Card className="cursor-pointer hover:shadow-xl transition-shadow group">
                <CardHeader className="p-0">
                    <div className="relative aspect-video">
                        <Image src={video.thumbnail} alt={video.title} layout="fill" objectFit="cover" className="rounded-t-lg" data-ai-hint={video.thumbnailHint} unoptimized/>
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <PlayCircle className="h-12 w-12 text-white" />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-4">
                    <CardTitle className="text-base font-bold mb-2">{video.title}</CardTitle>
                    <div className="flex gap-2">
                        <span className="text-xs font-semibold bg-primary/10 text-primary px-2 py-1 rounded-full">{video.category}</span>
                         <span className="text-xs font-semibold bg-secondary text-secondary-foreground px-2 py-1 rounded-full">{video.level}</span>
                    </div>
                </CardContent>
            </Card>
        </DialogTrigger>
        <DialogContent className="max-w-4xl p-0">
            <DialogHeader className="p-4">
                <DialogTitle>{video.title}</DialogTitle>
            </DialogHeader>
            <div className="aspect-video bg-black flex items-center justify-center">
                 <div className="text-white text-center">
                    <Film className="h-16 w-16 mx-auto mb-4" />
                    <p>Video Player Placeholder</p>
                </div>
            </div>
        </DialogContent>
    </Dialog>
);

const AnalyticsCard = ({ title, value, icon: Icon }: {title: string, value: string, icon: React.ElementType}) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <p className="text-2xl font-bold">{value}</p>
        </CardContent>
    </Card>
)

export default function VideoLibraryPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-headline">Video Library</h1>
                <p className="text-muted-foreground">Browse training, operational, and safety videos.</p>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Library Analytics</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <AnalyticsCard title="Total Videos" value="128" icon={Film} />
                    <AnalyticsCard title="Total Views" value="1,500" icon={PlayCircle} />
                    <AnalyticsCard title="Avg. Completion Rate" value="78%" icon={BarChart2} />
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex-col md:flex-row gap-4 justify-between items-center">
                    <CardTitle>Browse Videos</CardTitle>
                    <div className="w-full md:w-auto flex flex-col md:flex-row gap-2">
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search videos..." className="pl-8" />
                        </div>
                        <Select>
                            <SelectTrigger className="w-full md:w-[180px]"><SelectValue placeholder="All Categories" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="maintenance">Maintenance</SelectItem>
                                <SelectItem value="troubleshooting">Troubleshooting</SelectItem>
                                <SelectItem value="safety">Safety</SelectItem>
                                <SelectItem value="operational">Operational</SelectItem>
                            </SelectContent>
                        </Select>
                         <Button className="w-full md:w-auto"><Upload className="mr-2 h-4 w-4" /> Upload</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {videos.map((video, index) => <VideoCard key={index} video={video} />)}
                    </div>
                </CardContent>
            </Card>

        </div>
    );
}
