'use client';

import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import { AppLayout } from '@/components/shared/AppLayout';
import InfoSidebar from "@/components/assistant/InfoSidebar";
import AppSidebar from "@/components/shared/AppSidebar";
import { MessageSquare, Search, Bookmark, Settings, Settings2, PlusCircle } from "lucide-react";

interface AssistantLayoutProps {
  children: ReactNode;
}

export default function AssistantLayout({ children }: AssistantLayoutProps) {
  const pathname = usePathname();

  const quickAction = {
    title: "New Note",
    icon: PlusCircle,
    // onClick: createNote
  }
  // Define menu items for assistant module
  const menuItems = [
    {
      label: "Settings",
      items: [
        { title: "Preferences", path: "/assistant/settings", icon: Settings2, isActive: pathname === "/assistant/settings" },
        { title: "Templates", path: "/assistant/prompts", icon: Bookmark, isActive: pathname === "/assistant/prompts" },
        { title: "Saved", path: "/assistant/saved", icon: Bookmark, isActive: pathname === "/assistant/saved" },
      ]
    },
    {
      label: "Menu with subMenus",
      items: [
        {
          title: "Level 1 Menu",
          path: "#", // Add required path property
          icon: Bookmark,
          isActive: true,
          subItems: [
            { title: "SubMenu1", path: "#1", icon: Settings2, isActive: pathname === "SubMenu1" },
            { title: "SubMenu2", path: "#2", icon: Settings2, isActive: pathname === "SubMenu2" },
            { title: "SubMenu3", path: "#3", icon: Settings2, isActive: pathname === "SubMenu3" }
          ]
        },
        {
          title: "Level 1 Only",
          path: "#",
          icon: Settings
        },
      ],
    }
  ];

  return (
    <AppLayout
      defaultCollapsed={true}
      sidebar={
        <AppSidebar 
          moduleName="MindKeeper"
          quickAction={quickAction}
          menuItems={menuItems}
        />
      }
      //{ subSidebar={<InfoSidebar />}
    >
      {children}
    </AppLayout>
  );
}
