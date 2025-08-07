
"use client"
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Bot, User, Trash2, Filter } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Message {
    text: string;
    sender: 'user' | 'bot';
}

const locations = [
    { value: "all", label: "All Locations" },
    { value: "kotarpur-wtp", label: "Kotarpur WTP" },
    { value: "raska-wtp", label: "Raska WTP" },
    { value: "dariyapur-wds", label: "Dariyapur WDS" },
    { value: "mihir-tower-wds", label: "Mihir Tower WDS" },
    { value: "daffnala-stp", label: "Daffnala STP" },
    { value: "shankar-bhavan-stp", label: "Shankar Bhavan STP" },
    { value: "w-5-usmanpura-sps", label: "W-5 Usmanpura SPS" },
    { value: "moterra-sps", label: "Moterra SPS" },
    { value: "vejalpur-swps", label: "Vejalpur SWPS" },
    { value: "jaydeep-tower-swps", label: "Jaydeep Tower SWPS" }
];

const dataTypes = [
    { value: "operational", label: "Operational Data" },
    { value: "maintenance", label: "Maintenance Data" },
    { value: "energy", label: "Energy Data" },
    { value: "water-quality", label: "Water Quality Data" },
];

export default function ChatPage() {
    const [messages, setMessages] = React.useState<Message[]>([]);
    const [input, setInput] = React.useState('');
    const [location, setLocation] = React.useState('dariyapur-wds');
    const [dataType, setDataType] = React.useState('operational');

    React.useEffect(() => {
        const selectedLocation = locations.find(l => l.value === location)?.label;
        const selectedDataType = dataTypes.find(d => d.value === dataType)?.label;
        const initialMessage = `Greetings from iPUMPNET Chatbot! ${selectedDataType} for ${selectedLocation} is available. What parameters would you like to explore?`;
        setMessages([{ text: initialMessage, sender: 'bot' }]);
    }, [location, dataType]);

    const handleSend = () => {
        if (input.trim()) {
            setMessages(prev => [...prev, { text: input, sender: 'user' }]);
            // Mock bot response
            setTimeout(() => {
                setMessages(prev => [...prev, { text: `You asked: "${input}". I am still under development.`, sender: 'bot' }]);
            }, 1000);
            setInput('');
        }
    };
    
    const handleClearChat = () => {
        const selectedLocation = locations.find(l => l.value === location)?.label;
        const selectedDataType = dataTypes.find(d => d.value === dataType)?.label;
        const initialMessage = `Greetings from iPUMPNET Chatbot! ${selectedDataType} for ${selectedLocation} is available. What parameters would you like to explore?`;
        setMessages([{ text: initialMessage, sender: 'bot' }]);
    }

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)]">
            <div className="mb-4">
                <h1 className="text-3xl font-bold font-headline">Chat with Data</h1>
                <p className="text-muted-foreground">Ask questions in natural language to get insights from your data.</p>
            </div>
            
             <Card className="mb-4">
                <CardContent className="p-4 flex flex-col md:flex-row gap-4 items-center">
                    <div className="flex items-center gap-2 font-semibold text-sm">
                        <Filter className="h-4 w-4" />
                        Filters
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                         <Select value={dataType} onValueChange={setDataType}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select data type..." />
                            </SelectTrigger>
                            <SelectContent>
                                {dataTypes.map(type => (
                                    <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select value={location} onValueChange={setLocation}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select location..." />
                            </SelectTrigger>
                            <SelectContent>
                                {locations.map(loc => (
                                    <SelectItem key={loc.value} value={loc.value}>{loc.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Button variant="outline" className="w-full md:w-auto" onClick={handleClearChat}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Clear Chat
                    </Button>
                </CardContent>
            </Card>

            <Card className="flex-1 flex flex-col">
                <CardContent className="flex-1 flex flex-col p-6">
                    <ScrollArea className="flex-1 mb-4 pr-4">
                        <div className="space-y-4">
                            {messages.map((message, index) => (
                                <div key={index} className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : ''}`}>
                                    {message.sender === 'bot' && (
                                        <div className="bg-primary rounded-full p-2 text-primary-foreground">
                                            <Bot className="h-5 w-5" />
                                        </div>
                                    )}
                                    <div className={`rounded-lg p-3 max-w-[75%] ${message.sender === 'user' ? 'bg-secondary text-secondary-foreground' : 'bg-muted text-muted-foreground'}`}>
                                        <p className="text-sm">{message.text}</p>
                                    </div>
                                     {message.sender === 'user' && (
                                        <div className="bg-secondary rounded-full p-2 text-secondary-foreground">
                                            <User className="h-5 w-5" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                    <div className="flex items-center gap-2">
                        <Input 
                            placeholder="Ask a question..." 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <Button onClick={handleSend}>
                            <Send className="h-4 w-4" />
                            <span className="sr-only">Send</span>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
