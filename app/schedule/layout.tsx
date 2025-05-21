'use client';

import { ReactNode } from "react";
import { AppLayout } from '@/components/shared/AppLayout';
import AppSidebar from "@/components/shared/AppSidebar";
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
import { usePathname } from "next/navigation";

interface ScheduleLayoutProps {
  children: ReactNode;
}

export default function ScheduleLayout({ children }: ScheduleLayoutProps) {
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
    <AppLayout
      sidebar={
        <AppSidebar 
          moduleName="TimeGuardian"
          menuItems={menuItems}
          quickAction={{
            label: "Add Event/Task",
            icon: PlusCircle,
            onClick: () => {}
          }}
        />
      }
    >
      {children}
    </AppLayout>
  );
}
