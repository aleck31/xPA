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
  Calendar, 
  Clock, 
  CheckSquare, 
  Bell, 
  Tag,
  Users,
  PlusCircle,
  Settings 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ModuleSelector from "@/components/shared/ModuleSelector";
import { SearchForm } from "@/components/shared/SearchForm";

export default function ScheduleSidebar() {
  const pathname = usePathname();
  
  // Define menu items for schedule module
  const menuItems = [
    {
      title: "Default Pageview",
      items: [{ name: "Calendar", desc: "日历", path: "/schedule", icon: Calendar, isActive: pathname === "/schedule" },]
    },
    {  
      title: "Schedule Management",
      items: [
        { name: "Today", desc: "今天", path: "/schedule/today", icon: Clock, isActive: pathname === "/schedule/today" },
        { name: "Upcoming", desc: "代办", path: "/schedule/upcoming", icon: Clock, isActive: pathname === "/schedule/upcoming" },
        { name: "Tasks", desc: "任务", path: "/schedule/tasks", icon: CheckSquare, isActive: pathname === "/schedule/tasks" },
        { name: "Reminders", desc: "提醒", path: "/schedule/reminders", icon: Bell, isActive: pathname === "/schedule/reminders" },
        { name: "Filters", desc: "筛选", path: "/schedule/filters", icon: Tag, isActive: pathname === "/schedule/filters" }
      ]
    },
    {
      title: "Management",
      items: [
        { name: "Anniversary", desc: "纪念日", path: "/schedule/anniversary", icon: Settings, isActive: pathname === "/schedule/anniversary" },
        { name: "Events/Tasks", desc: "事件/任务", path: "/schedule/items", icon: Settings, isActive: pathname === "/schedule/items" },
        { name: "Category", desc: "分类管理", path: "/schedule/category", icon: Settings, isActive: pathname === "/schedule/category" },
        { name: "Project", desc: "项目管理", path: "/schedule/project", icon: Settings, isActive: pathname === "/schedule/project" },
      ]
    }
  ];

  return (
    <>
      <SidebarHeader>
        <ModuleSelector currentModule="TimeGuardian" />
        <div className="px-4 pb-2">
          <SearchForm />
        </div>
      </SidebarHeader>

      {/* Quick Access Function */}
      <div className="p-4">
        <Button
          variant="secondary"
          className="w-full justify-start gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <PlusCircle className="h-4 w-4" />
          Add Event/Task
        </Button>
      </div>

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
