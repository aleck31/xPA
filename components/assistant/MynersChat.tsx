"use client";

import { useState } from "react";
import ChatArea from "./ChatArea";

export default function MynersChat() {
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  return (
    <div className="h-full w-full">
      <ChatArea 
        chatId={activeChatId} 
      />
    </div>
  );
}
