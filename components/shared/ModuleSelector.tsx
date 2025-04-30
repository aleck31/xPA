"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
  Check, 
  ChevronsUpDown, 
  LayoutDashboard, 
  MessageSquare, 
  Wallet, 
  Calendar 
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

interface Module {
  name: string;
  nameZh: string;
  icon: React.ReactNode;
  path: string;
}

interface ModuleSelectorProps {
  currentModule: string;
}

export default function ModuleSelector({ currentModule }: ModuleSelectorProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const modules: Module[] = [
    {
      name: "Main",
      nameZh: "应用主页",
      icon: <LayoutDashboard className="h-5 w-5" />,
      path: "/main",
    },
    {
      name: "Myners",
      nameZh: "智能助理",
      icon: <MessageSquare className="h-5 w-5" />,
      path: "/assistant",
    },
    {
      name: "FinancialBrain",
      nameZh: "财务管理",
      icon: <Wallet className="h-5 w-5" />,
      path: "/finance",
    },
    {
      name: "TimeGuardian",
      nameZh: "日程管理",
      icon: <Calendar className="h-5 w-5" />,
      path: "/schedule",
    },
  ];

  const currentModuleData = modules.find((m) => m.name === currentModule) || modules[0];

  const handleModuleChange = (path: string) => {
    setOpen(false);
    router.push(path);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                {currentModuleData.icon}
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">{currentModuleData.name}</span>
                <span className="">{currentModuleData.nameZh}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width]"
            align="start"
          >
            {modules.map((module) => (
              <DropdownMenuItem
                key={module.name}
                onSelect={() => handleModuleChange(module.path)}
              >
                <div className="mr-2 flex aspect-square size-5 items-center justify-center rounded-md bg-muted">
                  {module.icon}
                </div>
                {module.name}
                {/* <span className="text-xs text-muted-foreground ml-1">{module.nameZh}</span> */}
                {module.name === currentModule && <Check className="ml-auto" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
