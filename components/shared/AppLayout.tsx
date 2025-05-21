"use client";

import React from 'react';
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
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { signOut } from '@/lib/auth';
import { LogOut, User, Settings } from "lucide-react";

interface AppLayoutProps {
  sidebar: React.ReactElement<React.ComponentProps<typeof Sidebar>>;
  children: React.ReactNode;
  subSidebar?: React.ReactNode;
}

export function AppLayout({
  sidebar,
  children, 
  subSidebar 
}: AppLayoutProps) {
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);
  const router = useRouter();

  // Determine current module based on pathname
  const getCurrentModule = () => {
    if (pathname.startsWith('/assistant')) return 'Myners';
    if (pathname.startsWith('/finance')) return 'FinancialBrain';
    if (pathname.startsWith('/schedule')) return 'TimeGuardian';
    return 'Overview';
  };

   const getCurrentSubMenu = () => {
    // todo
    return 'SubMenu'
  };

  const handleLogout = async () => {
    // console.log('Logout button clicked');
    setIsLoggingOut(true);
    try {
      await signOut();
      // console.log('Sign out successful, redirecting to login page');
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
      setIsLoggingOut(false);
    }
  };

  return (
    <SidebarProvider>
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
          {/* User menu with logout */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full h-8 w-8 border shrink-0"
                aria-label="User menu"
              >
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem 
                className="cursor-pointer"
                onClick={() => router.push('/profile')}
              >
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="cursor-pointer"
                onClick={() => router.push('/preferences')}
              >
                <Settings className="mr-2 h-4 w-4" />
                <span>Preferences</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="cursor-pointer text-red-500 focus:text-red-500"
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Main content */}
          <main className="flex-1 overflow-hidden w-full">
            {children}
          </main>
          {/* Right sidebar (optional) */}
          {subSidebar && (
            <aside className="w-64 min-w-[16rem] max-w-[16rem] border-l bg-background hidden lg:block shrink-0">
              {subSidebar}
            </aside>
          )}
        </div>
      </SidebarInset>

    </SidebarProvider>
  );
}
