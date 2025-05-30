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

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootDashboardLayout({ children }: RootLayoutProps) {
  const pathname = usePathname();
  
  // Define menu items for main module
  const menuItems = [
    {
      title: "Default Pageview",
      items: [
        { name: "Overview", path: "/", icon: Home, isActive: pathname === "/" }
      ]
    },
    {
      title: "Dashboard",
      items: [
        { name: "Analytics", path: "/analytics", icon: BarChart3, isActive: pathname === "/analytics" },
        { name: "Notifications", path: "/notifications", icon: Bell, isActive: pathname === "/notifications" },
        { name: "Reports", path: "/reports", icon: FileText, isActive: pathname === "/reports" },
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
      defaultCollapsed={true}
      sidebar={
        <AppSidebar 
          moduleName="Home"
          menuItems={menuItems}
        />
      }
    >
      {children}
    </AppLayout>
  );
}
