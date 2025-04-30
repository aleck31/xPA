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

interface ChatAreaProps {
  chatId: string | null;
}

export default function ChatArea({ chatId }: ChatAreaProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock initial message for demo purposes
  useEffect(() => {
    if (chatId) {
      setMessages([
        {
          id: "1",
          role: "user",
          content: "去桂林旅行出门注意些什么？",
          timestamp: new Date(),
        },
        {
          id: "2",
          role: "assistant",
          content: {
            thinking: `旅游时可能会有很多事情需要注意，建议提前预订住宿和票，避免排队，另外，防晒也很重要的哦，尤其是户外活动，可能还要留意保持环保环境，不乱扔垃圾，尊重当地文化。

用户可关注心态和健康问题，比如随身携带常用药品，注意饮食卫生，购物时比较价格，做价格比较，避免上当，最后，保持手机电量充足，下载离线地图，以备不时之需。`,
            text: `现在四月中旬去桂林正是好时候，天气转暖又没到到雨季高峰期，根据我了解的情况，这几个方面特别需要注意：

1. 穿衣层次
白天20℃左右石头学校衣服较舒适，但是上山下雨夜游两江四湖时，加件防风外套很重要，推荐带条便携雨伞（便于干），半件薄外套也不错，统计价。

4. 摄影黄金时段
象鼻山最佳拍摄点是漓江公园，早上7-9点光线最漂亮，漓龙河竹下午4点后光影层次好，记得给船上20-30元小费全主动帮你拍摄角度。

5. 特殊准备清单
• 带来20元纸币（澜沧江兴坪拍人民币背景用）
• 手机防水袋（钻石手表溶洞顶部会滴水）
• 折叠登山杖（登相公山山全景时会轻松很多）`,
          },
          timestamp: new Date(),
        },
      ]);
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

  const handleSendMessage = () => {
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

    // Simulate AI response
    setTimeout(() => {
      const newAssistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: {
          thinking: "这是AI的思考过程，在实际应用中，这里会显示AI的思考过程。",
          text: "这是一个模拟的AI回复。在实际应用中，这里会调用AI服务获取真实回复。"
        },
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newAssistantMessage]);
      setIsLoading(false);
    }, 1500);
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
      {/* Chat Header */}
      <div className="flex items-center justify-between border-b px-4 py-2">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-medium">Chatbox</h2>
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
            <h3 className="text-lg font-medium">欢迎使用 Myners 智能助理</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              请选择一个聊天会话或创建一个新的会话开始对话
            </p>
          </div>
        )}
      </div>

      {/* Input Area */}
      {chatId && (
        <div className="border-t p-4">
          <div className="flex items-end gap-2">
            <div className="relative flex-1">
              <textarea
                className="min-h-[60px] w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Send a message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
              />
              <div className="absolute bottom-2 right-2 flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <Image className="h-4 w-4" />
                  <span className="sr-only">Attach image</span>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <Paperclip className="h-4 w-4" />
                  <span className="sr-only">Attach file</span>
                </Button>
              </div>
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="h-10 w-10 rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600"
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
