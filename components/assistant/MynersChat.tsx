"use client";

import { useState } from "react";
import ChatBot from "./ChatBot";

export default function MynersChat() {
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  return (
    <div className="h-full w-full">
      <ChatBot 
        chatId={activeChatId} 
      />
    </div>
  );
}
