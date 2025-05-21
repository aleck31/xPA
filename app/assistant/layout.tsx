'use client';

import { ReactNode, useState } from "react";
import { AppLayout } from '@/components/shared/AppLayout';
import InfoSidebar from "@/components/assistant/InfoSidebar";
import AppSidebar from "@/components/shared/AppSidebar";
import { MessageSquare, Search, Bookmark, Settings, PlusCircle } from "lucide-react";
import { usePathname } from "next/navigation";

interface AssistantLayoutProps {
  children: ReactNode;
}

export default function AssistantLayout({ children }: AssistantLayoutProps) {
  const pathname = usePathname();
  
  // Mock chat sessions data
  const [chatSessions, setChatSessions] = useState([
    { id: "history-20250521", name: "history-20250521" },
    { id: "history-20250520", name: "history-20250520" },
    { id: "history-20250511", name: "history-20250511" },
    { id: "history-20250510", name: "history-20250510" },
    { id: "history-20250430", name: "history-20250430" },
    { id: "history-20250321", name: "history-20250321" },
  ]);

  const createNewChat = () => {
    const newChatId = `history-${Date.now()}`;
    setChatSessions([{ id: newChatId, name: newChatId }, ...chatSessions]);
    // In a real app, we would navigate to the new chat
  };

  // Define menu items for assistant module
  const menuItems = [
    {
      title: "Default Pageview",
      items: [
        { name: "Chatbox", path: "/assistant", icon: MessageSquare, isActive: pathname === "/assistant" }
      ]
    },
    {
      title: "Assistant",
      items: [
        { name: "Search", path: "/assistant/search", icon: Search, isActive: pathname === "/assistant/search" },
        { name: "Saved", path: "/assistant/saved", icon: Bookmark, isActive: pathname === "/assistant/saved" },
      ]
    },
    {
      title: "Settings",
      items: [
        { name: "Preferences", path: "/assistant/settings", icon: Settings, isActive: pathname === "/assistant/settings" },
      ]
    }
  ];

  return (
    <AppLayout
      sidebar={
        <AppSidebar 
          moduleName="Myners"
          menuItems={menuItems}
          quickAction={{
            label: "New Chat",
            icon: PlusCircle,
            onClick: createNewChat
          }}
          dynamicSection={{
            title: "Chat History",
            items: chatSessions.map(session => ({
              id: session.id,
              name: session.name,
              path: `/assistant/chat/${session.id}`,
              icon: MessageSquare,
              isActive: pathname === `/assistant/chat/${session.id}`
            }))
          }}
        />
      }
      subSidebar={<InfoSidebar />}
    >
      {children}
    </AppLayout>
  );
}
