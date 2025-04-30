"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  Home, 
  BarChart3, 
  Bell, 
  FileText, 
  Settings,
  User
} from "lucide-react";
import ModuleSelector from "@/components/shared/ModuleSelector";
import { SearchForm } from "@/components/shared/SearchForm";

export default function MainSidebar() {
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
    <>
      <SidebarHeader>
        <ModuleSelector currentModule="Dashboard" />
        <div className="px-4 pb-2">
          <SearchForm />
        </div>
      </SidebarHeader>
      
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
