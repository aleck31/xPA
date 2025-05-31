'use client';

import { ReactNode, useState } from "react";
import { AppLayout } from '@/components/shared/AppLayout';
import AppSidebar from "@/components/shared/AppSidebar";
import InfoSidebar from "@/components/assistant/InfoSidebar";
import { usePathname } from "next/navigation";
import { 
  Home, 
  BarChart3, 
  Bell, 
  FileText,
  Search,
  Bookmark,
  Settings,
  Settings2,
  MessageSquare,
  PlusCircle,
  User
} from "lucide-react";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootDashboardLayout({ children }: RootLayoutProps) {
  const pathname = usePathname();

  // Mock chat sessions data
  const [chatSessions, setChatSessions] = useState([
    { id: "history-20250521", title: "history-20250521" },
    { id: "history-20250520", title: "history-20250520" },
    { id: "history-20250511", title: "history-20250511" },
    { id: "history-20250510", title: "history-20250510" },
    { id: "history-20250430", title: "history-20250430" },
    { id: "history-20250321", title: "history-20250321" },
  ]);

  const createNewChat = () => {
    const newChatId = `history-${Date.now()}`;
    setChatSessions([{ id: newChatId, title: newChatId }, ...chatSessions]);
    // In a real app, we would navigate to the new chat
  };

  const quickAction = {
    title: "New Chat",
    icon: PlusCircle,
    onClick: createNewChat
  }

  // Define menu items for Home page
  const menuItems = [
    {
      label: "Dashboard",
      items: [
        { title: "Analytics", path: "/analytics", icon: BarChart3, isActive: pathname === "/analytics" },
        { title: "Notifications", path: "/notifications", icon: Bell, isActive: pathname === "/notifications" },
        { title: "Reports", path: "/reports", icon: FileText, isActive: pathname === "/reports" },
      ]
    },
    {
      label: "Settings",
      items: [
        {
          title: "Assistant",
          icon: Bookmark,
          isActive: true,
          subItems: [
            { title: "SubMenu1", path: "#1", icon: Settings2, isActive: pathname === "SubMenu1" },
            { title: "SubMenu2", path: "#2", icon: Settings2, isActive: pathname === "SubMenu2" },
            { title: "SubMenu3", path: "#3", icon: Settings2, isActive: pathname === "SubMenu3" }
          ]
        },
        {
          title: "User",
          icon: User,
          isActive: true,
          subItems: [
            { title: "Profile", path: "/user/profile", icon: User, isActive: pathname === "profile" },
            { title: "Preferences", path: "/user/preferences", icon: Settings, isActive: pathname === "preferences" },
          ]
        },
        { title: "Options", path: "/preferences", icon: Settings2, isActive: pathname === "/preferences" },
      ]
    }
  ];

  return (
    <AppLayout
      defaultCollapsed={true}
      sidebar={
        <AppSidebar 
          moduleName="Home"
          quickAction={quickAction}
          menuItems={menuItems}
          dynamicSection={{
            label: "Chat History",
            items: chatSessions.map(session => ({
              id: session.id,
              title: session.title,
              path: `/assistant/chat/${session.id}`,
              icon: MessageSquare,
              isActive: pathname === `/assistant/${session.id}`
            }))
          }}
        />
      }
      //{ subSidebar={<InfoSidebar />}
    >
      {children}
    </AppLayout>
  );
}
