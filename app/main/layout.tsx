'use client';

import { ReactNode } from "react";
import { AppLayout } from '@/components/shared/AppLayout';
import AppSidebar from "@/components/shared/AppSidebar";
import { 
  Home, 
  BarChart3, 
  Bell, 
  FileText, 
  Settings,
  User
} from "lucide-react";
import { usePathname } from "next/navigation";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();
  
  // Define menu items for main module
  const menuItems = [
    {
      title: "Default Pageview",
      items: [
        { name: "Overview", path: "/main", icon: Home, isActive: pathname === "/main" }
      ]
    },
    {
      title: "Dashboard",
      items: [
        { name: "Analytics", path: "/main/analytics", icon: BarChart3, isActive: pathname === "/main/analytics" },
        { name: "Notifications", path: "/main/notifications", icon: Bell, isActive: pathname === "/main/notifications" },
        { name: "Reports", path: "/main/reports", icon: FileText, isActive: pathname === "/main/reports" },
      ]
    },
    {
      title: "Settings",
      items: [
        { name: "Profile", path: "/profile", icon: User, isActive: pathname === "/profile" },
        { name: "Preferences", path: "/preferences", icon: Settings, isActive: pathname === "/preferences" },
      ]
    }
  ];

  return (
    <AppLayout
      sidebar={
        <AppSidebar 
          moduleName="Dashboard"
          menuItems={menuItems}
        />
      }
    >
      {children}
    </AppLayout>
  );
}
