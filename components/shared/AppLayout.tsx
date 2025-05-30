"use client";

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { 
  SidebarProvider,
  SidebarTrigger, 
  SidebarInset,
  Sidebar
} from '@/components/ui/sidebar';
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { UserMenu } from "@/components/shared/UserMenu";

interface AppLayoutProps {
  sidebar: React.ReactElement<React.ComponentProps<typeof Sidebar>>;
  children: React.ReactNode;
  subSidebar?: React.ReactNode;
  defaultCollapsed?: boolean;
}

export function AppLayout({
  sidebar,
  children,
  subSidebar,
  defaultCollapsed = false
}: AppLayoutProps) {
  const pathname = usePathname();
  const [initialOpen, setInitialOpen] = useState<boolean | undefined>(undefined);
  
  // Check for existing sidebar state cookie on client-side
  useEffect(() => {
    // Only apply defaultCollapsed if there's no existing cookie
    const cookies = document.cookie.split(';');
    const sidebarCookie = cookies.find(cookie => cookie.trim().startsWith('sidebar_state='));
    
    if (sidebarCookie) {
      // Cookie exists, use its value
      const sidebarState = sidebarCookie.split('=')[1].trim();
      setInitialOpen(sidebarState === 'true');
    } else {
      // No cookie, use the defaultCollapsed prop
      setInitialOpen(!defaultCollapsed);
    }
  }, [defaultCollapsed]);

  // Determine current module based on pathname
  const getCurrentModule = () => {
    if (pathname.startsWith('/assistant')) return 'Myners';
    if (pathname.startsWith('/knowledge')) return 'MindKeeper';
    if (pathname.startsWith('/schedule')) return 'TimeGuardian';
    if (pathname.startsWith('/finance')) return 'FinancialBrain';
    return 'Home';
  };

   const getCurrentSubMenu = () => {
    // todo
    return 'SubMenu'
  };

  // Only render when initialOpen is determined
  if (initialOpen === undefined) {
    return null; // Or a loading state if preferred
  }

  return (
    <SidebarProvider defaultOpen={initialOpen}>
      {/* Sidebar */}
      {sidebar}
      <SidebarInset className="flex flex-col flex-1 overflow-x-hidden">
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6 sticky top-0 z-10 min-w-0 shrink-0">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
          <Breadcrumb className="flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  {getCurrentModule()}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{getCurrentSubMenu()}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* User menu with Settings */}
          <UserMenu />
        </header>

        <main className="flex flex-1 overflow-hidden">
          {/* Main content */}
          <section className="flex-1 overflow-hidden w-full">
            {children}
          </section>
          {/* Right sidebar (optional) */}
          {subSidebar && (
            <aside className="w-64 min-w-[16rem] max-w-[16rem] border-l bg-background hidden lg:block shrink-0">
              {subSidebar}
            </aside>
          )}
        </main>
      </SidebarInset>

    </SidebarProvider>
  );
}
