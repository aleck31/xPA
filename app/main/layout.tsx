'use client';

import { ReactNode } from "react";
import { AppLayout } from '@/components/shared/AppLayout';
import MainSidebar from "@/components/main/MainSidebar";
import {
  Sidebar,
  SidebarContent,
  SidebarProvider,
} from "@/components/ui/sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <Sidebar variant="floating" className="w-64 border-r">
        <SidebarContent>
          <MainSidebar />
        </SidebarContent>
      </Sidebar>
      <AppLayout>
        {children}
      </AppLayout>
    </SidebarProvider>
  );
}
