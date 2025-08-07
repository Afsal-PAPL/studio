
"use client"
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Bot, User } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
    text: string;
    sender: 'user' | 'bot';
}

export default function ChatPage() {
    const [messages, setMessages] = React.useState<Message[]>([]);
    const [input, setInput] = React.useState('');

    const handleSend = () => {
        if (input.trim()) {
            setMessages([...messages, { text: input, sender: 'user' }]);
            // Mock bot response
            setTimeout(() => {
                setMessages(prev => [...prev, { text: `You asked: "${input}". I am still under development.`, sender: 'bot' }]);
            }, 1000);
            setInput('');
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)]">
            <div className="mb-4">
                <h1 className="text-3xl font-bold font-headline">Chat with Data</h1>
                <p className="text-muted-foreground">Ask questions in natural language to get insights from your data.</p>
            </div>
            
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
                            placeholder="Ask a question about your pump data..." 
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
