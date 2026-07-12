"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquareMore, X, Send, User, Loader2, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { profile } from "@/lib/portfolio-data";

interface Message {
    role: "user" | "assistant";
    content: string;
    suggestions?: string[];
}

const DEFAULT_SUGGESTION = "Why should you hire Kit?";

// Pool of possible follow-up questions. The hiring prompt is shown only on the
// opening greeting; after the user sends any message, suggestions are random only.
const FOLLOW_UP_POOL = [
    DEFAULT_SUGGESTION,
    "What's Kit's tech stack?",
    "Tell me about Kit's recent projects",
    "What's Kit's educational background?",
    "Is Kit available for freelance work?",
    "What achievements has Kit earned?",
    "How can I contact Kit?",
    "What does Kit do outside of coding?",
    "What was Kit's internship experience?",
    "Does Kit have client reviews?",
];

function pickRandomSuggestions(exclude: string, showHiringPrompt: boolean, count = 2) {
    const pool = FOLLOW_UP_POOL.filter(
        (p) => p !== exclude && p !== DEFAULT_SUGGESTION
    );
    const shuffled = [...pool].sort(() => Math.random() - 0.5);

    if (showHiringPrompt) {
        return [DEFAULT_SUGGESTION, ...shuffled.slice(0, count - 1)];
    }

    return shuffled.slice(0, count);
}

export function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content: "Hi! I'm Kit Adrian's AI assistant. How can I help you today?",
            suggestions: pickRandomSuggestions("", true),
        },
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const scrollViewportRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (scrollViewportRef.current) {
            scrollViewportRef.current.scrollTo({
                top: scrollViewportRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const sendMessage = async (text: string) => {
        if (!text.trim() || isLoading) return;

        const userMessage: Message = { role: "user", content: text };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [...messages, userMessage].map((m) => ({
                        role: m.role,
                        content: m.content,
                    })),
                }),
            });

            const data = await response.json();
            if (data.error) throw new Error(data.error);

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: data.content,
                    suggestions: pickRandomSuggestions(text, false),
                },
            ]);
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: `I'm currently offline for maintenance. Please check back later or email me at ${profile.email}!`,
                    suggestions: pickRandomSuggestions(text, false),
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSend = () => sendMessage(input);

    return (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
            {isOpen && (
                <Card className="w-[380px] md:w-[450px] h-[600px] flex flex-col border-4 border-border bg-background animate-in slide-in-from-bottom-5 duration-300 rounded-none shadow-neo-lg py-0 gap-0 overflow-hidden">
                    <CardHeader className="p-4 border-b-4 border-border flex flex-row items-center justify-between bg-secondary text-secondary-foreground">
                        <div className="flex items-center gap-2">
                            <Avatar className="w-8 h-8 border-2 border-border shadow-none">
                                <AvatarImage src="/kit.png" alt="Kit Adrian" className="object-cover" />
                                <AvatarFallback>K</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="font-black text-sm uppercase tracking-tight">Kit Adrian</h3>
                                <p className="text-[10px] font-black uppercase flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 border border-border"></span> Online
                                </p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsOpen(false)}
                            className="h-8 w-8 border-2 border-border shadow-none hover:bg-primary hover:text-white"
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </CardHeader>
                    <CardContent className="flex-1 p-0 overflow-hidden">
                        <ScrollArea className="h-full p-4" viewportRef={scrollViewportRef}>
                            <div className="space-y-4">
                                {messages.map((m, i) => (
                                    <div key={i} className="flex flex-col gap-2">
                                        <div
                                            className={cn(
                                                "flex gap-3 text-sm",
                                                m.role === "user" ? "flex-row-reverse" : "flex-row"
                                            )}
                                        >
                                            <div className="w-8 h-8 shrink-0">
                                                {m.role === "user" ? (
                                                    <div className="w-8 h-8 flex items-center justify-center border-2 border-border bg-secondary text-secondary-foreground">
                                                        <User className="w-4 h-4" />
                                                    </div>
                                                ) : (
                                                    <Avatar className="w-8 h-8 border-2 border-border shadow-none">
                                                        <AvatarImage src="/kit.png" alt="Kit Adrian" className="object-cover" />
                                                        <AvatarFallback>K</AvatarFallback>
                                                    </Avatar>
                                                )}
                                            </div>
                                            <div
                                                className={cn(
                                                    "max-w-[80%] border-4 border-border px-4 py-2",
                                                    m.role === "user"
                                                        ? "bg-primary text-primary-foreground shadow-neo-sm"
                                                        : "bg-card text-card-foreground shadow-neo-sm"
                                                )}
                                            >
                                                <div
                                                    className={cn(
                                                        "prose prose-sm dark:prose-invert max-w-none wrap-break-word font-medium normal-case tracking-normal",
                                                        "[&_h1]:normal-case [&_h2]:normal-case [&_h3]:normal-case [&_strong]:normal-case",
                                                        "[&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4",
                                                        "[&_li]:my-1 [&_p]:leading-relaxed",
                                                        m.role === "user" ? "text-primary-foreground" : "text-foreground"
                                                    )}
                                                >
                                                    <ReactMarkdown>
                                                        {m.content}
                                                    </ReactMarkdown>
                                                </div>
                                            </div>
                                        </div>
                                        {m.role === "assistant" &&
                                            i === messages.length - 1 &&
                                            !isLoading &&
                                            m.suggestions &&
                                            m.suggestions.length > 0 && (
                                                <div className="flex flex-wrap gap-2 pl-11">
                                                    {m.suggestions.map((prompt) => (
                                                        <button
                                                            key={prompt}
                                                            type="button"
                                                            onClick={() => sendMessage(prompt)}
                                                            className="flex items-center gap-1.5 text-[10px] font-bold normal-case px-3 py-2 border-2 border-border bg-secondary text-secondary-foreground shadow-neo-sm hover:bg-primary hover:text-primary-foreground hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all cursor-pointer"
                                                        >
                                                            <Sparkles className="w-3 h-3 shrink-0" />
                                                            {prompt}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex gap-3 text-sm">
                                        <Avatar className="w-8 h-8 border-2 border-border shadow-none">
                                            <AvatarImage src="/kit.png" alt="Kit Adrian" className="object-cover" />
                                            <AvatarFallback>K</AvatarFallback>
                                        </Avatar>
                                        <div className="bg-card border-4 border-border shadow-neo-sm px-4 py-2">
                                            <Loader2 className="w-4 h-4 animate-spin text-primary" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    </CardContent>
                    <CardFooter className="p-4 border-t-4 border-border bg-secondary/20">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSend();
                            }}
                            className="flex w-full gap-2"
                        >
                            <Input
                                placeholder="Ask me anything..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                autoFocus
                                className="border-4 border-border bg-background font-medium normal-case text-sm h-12 shadow-neo-sm focus:shadow-neo transition-all"
                            />
                            <Button
                                type="submit"
                                size="icon"
                                disabled={!input.trim() || isLoading}
                                className="h-12 w-12 border-4 border-border"
                            >
                                <Send className="w-4 h-4" />
                            </Button>
                        </form>
                    </CardFooter>
                </Card>
            )}

            <Button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "border-4 border-border h-12 px-10 gap-2 transition-all hover:scale-105",
                    isOpen ? "bg-card text-foreground" : "bg-primary text-primary-foreground"
                )}
            >
                {!isOpen && <MessageSquareMore className="w-5 h-5 icon-tilt" />}
                {!isOpen ? "CHAT WITH KIT" : "CLOSE CHAT"}
            </Button>
        </div>
    );
}
