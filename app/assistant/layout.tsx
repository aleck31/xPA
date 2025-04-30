'use client';

import { ReactNode } from "react";
import { AppLayout } from '@/components/shared/AppLayout';
import AssistantSidebar from "@/components/assistant/AssistantSidebar";
import InfoSidebar from "@/components/assistant/InfoSidebar";
import {
  Sidebar,
  SidebarContent,
  SidebarProvider,
} from "@/components/ui/sidebar";

interface AssistantLayoutProps {
  children: ReactNode;
}

export default function AssistantLayout({ children }: AssistantLayoutProps) {
  return (
    <SidebarProvider>
      <Sidebar variant="floating" className="w-64 border-r">
        <SidebarContent>
          <AssistantSidebar />
        </SidebarContent>
      </Sidebar>
      <AppLayout
        rightSidebar={<InfoSidebar />}
      >
        {children}
      </AppLayout>
    </SidebarProvider>
  );
}
