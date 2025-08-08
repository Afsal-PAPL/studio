
"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileQuestion, History, CheckCircle, XCircle } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

const quizData = {
    title: "Centrifugal Pump Basics Assessment",
    questions: [
        {
            text: "What is the primary purpose of a wear ring in a centrifugal pump?",
            options: [
                "To reduce the motor temperature.",
                "To control leakage between the impeller and casing.",
                "To increase the pump's vibration.",
                "To measure the flow rate."
            ],
            correctAnswer: "To control leakage between the impeller and casing."
        },
        {
            text: "Identify the component highlighted in the image.",
            image: "https://i.ibb.co/L5B0D1N/impeller.png",
            imageHint: "pump impeller",
            options: ["Shaft", "Casing", "Impeller", "Bearing"],
            correctAnswer: "Impeller"
        },
        {
            text: "Cavitation is more likely to occur when:",
            options: [
                "Suction pressure is very high.",
                "Discharge pressure is very low.",
                "The pump is running too slow.",
                "NPSHa is less than NPSHr."
            ],
            correctAnswer: "NPSHa is less than NPSHr."
        }
    ]
};

const assessmentHistory = [
    { name: "Centrifugal Pump Basics", date: "2024-07-15", score: 92, status: "Passed" },
    { name: "Safety Procedures Quiz", date: "2024-06-20", score: 100, status: "Passed" },
    { name: "VFD Configuration Test", date: "2024-05-10", score: 68, status: "Failed" },
];

export default function QuizzesAssessmentsPage() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>(Array(quizData.questions.length).fill(null));
    const [showResults, setShowResults] = useState(false);

    const handleAnswerSelect = (answer: string) => {
        const newAnswers = [...selectedAnswers];
        newAnswers[currentQuestionIndex] = answer;
        setSelectedAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentQuestionIndex < quizData.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };
    
    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };
    
    const handleSubmit = () => {
        setShowResults(true);
    };

    const calculateScore = () => {
        let correctCount = 0;
        quizData.questions.forEach((q, index) => {
            if (selectedAnswers[index] === q.correctAnswer) {
                correctCount++;
            }
        });
        return Math.round((correctCount / quizData.questions.length) * 100);
    };

    const currentQuestion = quizData.questions[currentQuestionIndex];
    const score = showResults ? calculateScore() : 0;
    const passed = score >= 80;


    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-headline">Quizzes & Assessments</h1>
                <p className="text-muted-foreground">Test your knowledge and complete assessments.</p>
            </div>
             <Tabs defaultValue="active-quiz">
                <TabsList>
                    <TabsTrigger value="active-quiz">Active Quiz</TabsTrigger>
                    <TabsTrigger value="history">Assessment History</TabsTrigger>
                </TabsList>
                <TabsContent value="active-quiz" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>{quizData.title}</CardTitle>
                            <CardDescription>Question {currentQuestionIndex + 1} of {quizData.questions.length}</CardDescription>
                        </CardHeader>
                        <CardContent>
                             {showResults ? (
                                <div className="text-center py-12">
                                    <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
                                    <p className="text-lg mb-2">Your Score:</p>
                                    <p className={`text-6xl font-bold mb-4 ${passed ? 'text-green-500' : 'text-red-500'}`}>{score}%</p>
                                    <Badge variant={passed ? "secondary" : "destructive"} className={passed ? "bg-green-100 text-green-800" : ""}>
                                        {passed ? <CheckCircle className="mr-2 h-4 w-4" /> : <XCircle className="mr-2 h-4 w-4" />}
                                        {passed ? "Passed" : "Failed"}
                                    </Badge>
                                    <div className="mt-8">
                                        <Button onClick={() => { setShowResults(false); setCurrentQuestionIndex(0); setSelectedAnswers(Array(quizData.questions.length).fill(null)); }}>
                                            Retake Quiz
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <p className="font-semibold">{currentQuestion.text}</p>
                                    {currentQuestion.image && (
                                        <div className="relative h-64 w-full md:w-1/2 mx-auto my-4">
                                            <Image 
                                                src={currentQuestion.image} 
                                                alt="Quiz Question Illustration"
                                                layout="fill"
                                                objectFit='contain'
                                                data-ai-hint={currentQuestion.imageHint}
                                                unoptimized
                                            />
                                        </div>
                                    )}
                                    <RadioGroup value={selectedAnswers[currentQuestionIndex] || ''} onValueChange={handleAnswerSelect} className="space-y-2">
                                        {currentQuestion.options.map((option, index) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                <RadioGroupItem value={option} id={`q${currentQuestionIndex}-o${index}`} />
                                                <Label htmlFor={`q${currentQuestionIndex}-o${index}`}>{option}</Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                    <div className="flex justify-between mt-6">
                                        <Button variant="outline" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>Previous</Button>
                                        {currentQuestionIndex === quizData.questions.length - 1 ? (
                                            <Button onClick={handleSubmit}>Submit</Button>
                                        ) : (
                                            <Button onClick={handleNext}>Next</Button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="history" className="mt-4">
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><History /> My Assessment History</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Assessment Name</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Score</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {assessmentHistory.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">{item.name}</TableCell>
                                            <TableCell>{item.date}</TableCell>
                                            <TableCell className={`font-bold ${item.status === 'Passed' ? 'text-green-600' : 'text-red-600'}`}>{item.score}%</TableCell>
                                            <TableCell>
                                                <Badge variant={item.status === 'Passed' ? "secondary" : "destructive"} className={item.status === 'Passed' ? "bg-green-100 text-green-800" : ""}>
                                                    {item.status}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
