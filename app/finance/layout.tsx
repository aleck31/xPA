'use client';

import { ReactNode } from "react";
import { AppLayout } from '@/components/shared/AppLayout';
import FinanceSidebar from "@/components/finance/FinanceSidebar";
import {
  Sidebar,
  SidebarContent,
  SidebarProvider,
} from "@/components/ui/sidebar";

interface FinanceLayoutProps {
  children: ReactNode;
}

export default function FinanceLayout({ children }: FinanceLayoutProps) {
  return (
    <SidebarProvider>
      <Sidebar variant="floating" className="w-64 border-r">
        <SidebarContent>
          <FinanceSidebar />
        </SidebarContent>
      </Sidebar>
      <AppLayout>
        {children}
      </AppLayout>
    </SidebarProvider>
  );
}
