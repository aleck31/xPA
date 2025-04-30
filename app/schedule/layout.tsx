'use client';

import { ReactNode } from "react";
import { AppLayout } from '@/components/shared/AppLayout';
import ScheduleSidebar from "@/components/schedule/ScheduleSidebar";
import {
  Sidebar,
  SidebarContent,
  SidebarProvider,
} from "@/components/ui/sidebar";

interface ScheduleLayoutProps {
  children: ReactNode;
}

export default function ScheduleLayout({ children }: ScheduleLayoutProps) {
  return (
    <SidebarProvider>
      <Sidebar variant="floating" className="w-64 border-r">
        <SidebarContent>
          <ScheduleSidebar />
        </SidebarContent>
      </Sidebar>
      <AppLayout>
        {children}
      </AppLayout>
    </SidebarProvider>
  );
}
