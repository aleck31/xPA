"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Send, Image, Paperclip } from "lucide-react";

interface MessageContent {
  text?: string;
  thinking?: string;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string | MessageContent;
  timestamp: Date;
}

interface ChatBotProps {
  chatId: string | null;
}

export default function ChatBot({ chatId }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chat messages when chatId changes
  useEffect(() => {
    if (chatId) {
      // In a real implementation, we would fetch messages from an API
      // Example:
      // async function fetchMessages() {
      //   const response = await fetch(`/api/chats/${chatId}/messages`);
      //   const data = await response.json();
      //   setMessages(data);
      // }
      //
      // fetchMessages();
      
      // For now, we'll just set an empty array
      setMessages([]);
    } else {
      setMessages([]);
    }
  }, [chatId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !chatId) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // In a real implementation, we would send the message to an API
      // Example:
      // const response = await fetch(`/api/chats/${chatId}/messages`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ content: inputValue }),
      // });
      // const data = await response.json();
      // setMessages((prev) => [...prev, data]);

      // For now, we'll simulate a response after a short delay
      setTimeout(() => {
        const newAssistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "I'm your AI assistant. How can I help you today?",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, newAssistantMessage]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error sending message:", error);
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Helper function to get message content text
  const getMessageText = (content: string | MessageContent): string => {
    if (typeof content === 'string') {
      return content;
    } else {
      return content.text || '';
    }
  };

  // Helper function to get message thinking text
  const getMessageThinking = (content: string | MessageContent): string | null => {
    if (typeof content === 'object' && content.thinking) {
      return content.thinking;
    }
    return null;
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Header with actions */}
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="text-xl font-medium">Chat</h2>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span className="sr-only">Chat history</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <span className="sr-only">Notes</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
            <span className="sr-only">More options</span>
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4">
        {chatId ? (
          <div className="space-y-6">
            {messages.map((message) => (
              <div key={message.id}>
                {/* Thinking Process (only for assistant messages) */}
                {message.role === "assistant" && getMessageThinking(message.content) && (
                  <div className="mb-2">
                    <div className="flex items-center mb-1">
                      <div className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M12 6v6l4 2"></path>
                        </svg>
                        Thinking Process
                      </div>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-3 text-sm text-gray-600">
                      <div className="whitespace-pre-wrap">{getMessageThinking(message.content)}</div>
                    </div>
                  </div>
                )}
                
                {/* Main Message */}
                <div className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{getMessageText(message.content)}</div>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg bg-gray-100 p-4 text-gray-900">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-gray-400"></div>
                    <div className="h-2 w-2 animate-pulse rounded-full bg-gray-400 animation-delay-200"></div>
                    <div className="h-2 w-2 animate-pulse rounded-full bg-gray-400 animation-delay-400"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-bold text-blue-600 mb-2">Hi, I'm Myners :)</h1>
            <p className="text-sm text-muted-foreground mb-8">
              <span className="text-gray-400">I can help you manage your knowledge, finances and schedule, simplifying your life and focus on what matters most.</span> 
            </p>
            
            {/* Input Area - Moved above Templates */}
            <div className="w-full max-w-3xl mb-12">
              <div className="relative">
                <input
                  type="text"
                  className="w-full rounded-full border border-gray-300 bg-white px-4 py-3 pr-24 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="E.g., How much did I spend on dining last month?"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isLoading}
                    className="rounded-full bg-blue-500 px-5 py-2 text-sm font-medium text-white hover:bg-blue-600"
                  >
                    Ask
                  </Button>
                </div>
                <div className="absolute inset-y-0 right-24 flex items-center">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="16"></line>
                      <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
                    <span className="sr-only">Add options</span>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Templates section */}
            <div className="w-full max-w-4xl">
              <h3 className="text-sm font-medium text-gray-500 mb-4">Prompts Templates</h3>
              
              <div className="grid grid-cols-2 gap-4">
                {/* Card 1 */}
                <div className="flex border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                  <div className="mr-4 h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    <img src="/images/speech-icon.png" alt="Speech icon" className="h-full w-full object-cover" 
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 2c-1.7 0-3 1.2-3 2.6v6.8c0 1.4 1.3 2.6 3 2.6s3-1.2 3-2.6V4.6C15 3.2 13.7 2 12 2z'%3E%3C/path%3E%3Cpath d='M19 10v1a7 7 0 0 1-14 0v-1'%3E%3C/path%3E%3Cline x1='12' y1='19' x2='12' y2='22'%3E%3C/line%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h4 className="font-medium">旅行助手</h4>
                      <span className="ml-2 rounded-full bg-blue-600 px-2 py-0.5 text-xs text-white">New</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">作为您的专业旅行规划顾问，为您量身定制完美的旅行线路。我们会根据您的具体需求，包括预算、时间、出行人数、兴趣爱好等因素设计最适合的行程安排。</p>
                  </div>
                </div>
                
                {/* Card 2 */}
                <div className="flex border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                  <div className="mr-4 h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    <img src="/images/audio-icon.png" alt="Audio icon" className="h-full w-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3 18v-6a9 9 0 0 1 18 0v6'%3E%3C/path%3E%3Cpath d='M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z'%3E%3C/path%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h4 className="font-medium">Deep research</h4>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">我将为您上下而求索寻找答案</p>
                  </div>
                </div>
                
                {/* Card 3 */}
                <div className="flex border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                  <div className="mr-4 h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    <img src="/images/image-icon.png" alt="Image icon" className="h-full w-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'%3E%3C/rect%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'%3E%3C/circle%3E%3Cpolyline points='21 15 16 10 5 21'%3E%3C/polyline%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">Image generation</h4>
                    <p className="mt-1 text-sm text-gray-600">Interleaved text-and-image generation with the new Gemini 2.0 Flash</p>
                  </div>
                </div>
                
                {/* Card 4 */}
                <div className="flex border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                  <div className="mr-4 h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    <img src="/images/apps-icon.png" alt="Apps icon" className="h-full w-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='3' width='7' height='7'%3E%3C/rect%3E%3Crect x='14' y='3' width='7' height='7'%3E%3C/rect%3E%3Crect x='14' y='14' width='7' height='7'%3E%3C/rect%3E%3Crect x='3' y='14' width='7' height='7'%3E%3C/rect%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">财务管家</h4>
                    <p className="mt-1 text-sm text-gray-600">作为一名专业的财务顾问，我将为您提供全面的财务咨询服务。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
