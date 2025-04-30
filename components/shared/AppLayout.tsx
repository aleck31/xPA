"use client";

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { 
  SidebarTrigger, 
  SidebarInset
} from '@/components/ui/sidebar';
import { Separator } from "@/components/ui/separator";
import { signOut } from '@/lib/auth';

interface AppLayoutProps {
  children: React.ReactNode;
  rightSidebar?: React.ReactNode;
}

export function AppLayout({ 
  children, 
  rightSidebar 
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

  const handleLogout = async () => {
    console.log('Logout button clicked');
    setIsLoggingOut(true);
    try {
      console.log('Attempting to sign out...');
      await signOut();
      console.log('Sign out successful, redirecting to login page');
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
      setIsLoggingOut(false);
    }
  };

  return (
    <SidebarInset className="flex flex-col h-screen">
      <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <div className="flex-1">
          <h1 className="text-lg font-semibold">{getCurrentModule()}</h1>
        </div>
      </header>
    
      <div className="flex flex-1 overflow-hidden">
        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {children}
        </main>
        
        {/* Right sidebar (optional) */}
        {rightSidebar && (
          <aside className="w-64 border-l bg-background hidden lg:block">
            {rightSidebar}
          </aside>
        )}
      </div>
    </SidebarInset>
  );
}
