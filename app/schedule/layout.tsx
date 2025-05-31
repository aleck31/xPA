'use client';

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
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

interface ScheduleLayoutProps {
  children: ReactNode;
}

export default function ScheduleLayout({ children }: ScheduleLayoutProps) {
  const pathname = usePathname();
  
  // Define menu items for schedule module
  const menuItems = [
    {
      label: "Default Pageview",
      items: [{ title: "Calendar", desc: "日历", path: "/schedule", icon: Calendar, isActive: pathname === "/schedule" },]
    },
    {  
      label: "Schedule Management",
      items: [
        { title: "Today", desc: "今天", path: "/schedule/today", icon: Clock, isActive: pathname === "/schedule/today" },
        { title: "Upcoming", desc: "代办", path: "/schedule/upcoming", icon: Clock, isActive: pathname === "/schedule/upcoming" },
        { title: "Tasks", desc: "任务", path: "/schedule/tasks", icon: CheckSquare, isActive: pathname === "/schedule/tasks" },
        { title: "Reminders", desc: "提醒", path: "/schedule/reminders", icon: Bell, isActive: pathname === "/schedule/reminders" },
        { title: "Filters", desc: "筛选", path: "/schedule/filters", icon: Tag, isActive: pathname === "/schedule/filters" }
      ]
    },
    {
      label: "Management",
      items: [
        { title: "Anniversary", desc: "纪念日", path: "/schedule/anniversary", icon: Settings, isActive: pathname === "/schedule/anniversary" },
        { title: "Events/Tasks", desc: "事件/任务", path: "/schedule/items", icon: Settings, isActive: pathname === "/schedule/items" },
        { title: "Category", desc: "分类管理", path: "/schedule/category", icon: Settings, isActive: pathname === "/schedule/category" },
        { title: "Project", desc: "项目管理", path: "/schedule/project", icon: Settings, isActive: pathname === "/schedule/project" },
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
            title: "Add Event/Task",
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
