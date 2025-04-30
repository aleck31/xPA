"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { 
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader
} from "@/components/ui/sidebar";
import { 
  MessageSquare, 
  Search, 
  Bookmark, 
  HelpCircle, 
  Settings,
  PlusCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ModuleSelector from "@/components/shared/ModuleSelector";
import { SearchForm } from "@/components/shared/SearchForm";

interface ChatSession {
  id: string;
  name: string;
}

export default function AssistantSidebar() {
  const pathname = usePathname();
  
  // Mock chat sessions data
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    { id: "history-20250521", name: "history-20250521" },
    { id: "history-20250520", name: "history-20250520" },
    { id: "history-20250511", name: "history-20250511" },
    { id: "history-20250510", name: "history-20250510" },
    { id: "history-20250430", name: "history-20250430" },
    { id: "history-20250321", name: "history-20250321" },
  ]);

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

  const createNewChat = () => {
    const newChatId = `history-${Date.now()}`;
    setChatSessions([{ id: newChatId, name: newChatId }, ...chatSessions]);
    // In a real app, we would navigate to the new chat
  };

  return (
    <>
      <SidebarHeader>
        <ModuleSelector currentModule="Myners" />
        <div className="px-4 pb-2">
          <SearchForm />
        </div>
      </SidebarHeader>
      
      {/* Quick Access Function */}
      <div className="p-4">
        <Button
          variant="secondary"
          className="w-full justify-start gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={createNewChat}
        >
          <PlusCircle className="h-4 w-4" />
          New Chat
        </Button>
      </div>

      {/* Chat History */}
      <SidebarGroup>
        <SidebarGroupLabel>Chat History</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {chatSessions.map((session) => (
              <SidebarMenuItem key={session.id}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === `/assistant/chat/${session.id}`}
                >
                  <Link href={`/assistant/chat/${session.id}`} className="flex items-center gap-3">
                    <MessageSquare className="h-4 w-4" />
                    <span className="truncate">{session.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Main Navigation */}
      {menuItems.map((group) => (
        <SidebarGroup key={group.title}>
          <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {group.items.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.isActive}
                    tooltip={item.name}
                  >
                    <Link href={item.path} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
}
