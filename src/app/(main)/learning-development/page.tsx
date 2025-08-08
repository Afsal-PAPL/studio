
"use client"
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpenCheck, ChevronRight, GraduationCap, Trophy } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const learningPaths = [
    {
        title: "Operator Onboarding Program",
        description: "Essential training for all new pump station operators.",
        progress: 75,
        modules: 8,
        status: "In Progress"
    },
    {
        title: "Advanced Maintenance Technician",
        description: "Certification path for experienced maintenance professionals.",
        progress: 30,
        modules: 12,
        status: "In Progress"
    },
    {
        title: "Safety Procedures Certification (2024)",
        description: "Annual mandatory safety training and certification.",
        progress: 100,
        modules: 5,
        status: "Completed"
    }
];

const courseCatalog = [
    { title: "Centrifugal Pump Basics", category: "Mechanical", level: "Beginner" },
    { title: "Reading P&ID Diagrams", category: "Operational", level: "Beginner" },
    { title: "Advanced VFD Configuration", category: "Electrical", level: "Advanced" },
    { title: "Mechanical Seal Failure Analysis", category: "Maintenance", level: "Intermediate" },
    { title: "Lockout-Tagout (LOTO) Procedures", category: "Safety", level: "Mandatory" },
]

export default function LearningDevelopmentPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-headline">Learning & Development</h1>
                <p className="text-muted-foreground">Access learning modules, track progress, and earn certifications.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><GraduationCap /> My Learning Paths</CardTitle>
                    <CardDescription>Your currently enrolled programs and certifications.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {learningPaths.map((path, index) => (
                        <Card key={index} className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                     <h3 className="font-bold">{path.title}</h3>
                                     <Badge variant={path.status === 'Completed' ? 'secondary' : 'default'} className={path.status === 'Completed' ? 'bg-green-100 text-green-800' : ''}>
                                        {path.status === 'Completed' ? <Trophy className="h-3 w-3 mr-1" /> : null}
                                        {path.status}
                                    </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-3">{path.description}</p>
                                <div className="flex items-center gap-2">
                                    <Progress value={path.progress} className="w-full md:w-1/2 h-2" />
                                    <span className="text-xs font-semibold">{path.progress}%</span>
                                </div>
                            </div>
                            <Button>
                                {path.status === 'Completed' ? "View Certificate" : "Continue Learning"} <ChevronRight className="h-4 w-4 ml-2" />
                            </Button>
                        </Card>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BookOpenCheck /> Course Catalog</CardTitle>
                    <CardDescription>Browse and enroll in available courses.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {courseCatalog.map((course, index) => (
                        <Card key={index} className="hover:shadow-md transition-shadow">
                            <CardHeader>
                                <CardTitle className="text-lg">{course.title}</CardTitle>
                                 <div className="flex items-center gap-2 pt-2">
                                    <Badge variant="outline">{course.category}</Badge>
                                    <Badge variant="outline">{course.level}</Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                               <Button className="w-full">Enroll Now</Button>
                            </CardContent>
                        </Card>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
