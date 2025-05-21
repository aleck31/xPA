"use client";

import React from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarRail,
  useSidebar
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import ModuleSelector from "@/components/shared/ModuleSelector";
import {
  Folder,
  Forward,
  MoreHorizontal,
  ChevronRight,
  Trash2,
  type LucideIcon,
} from "lucide-react";

// Define types for menu items
export interface MenuItem {
  name: string;
  path: string;
  icon: LucideIcon;
  isActive?: boolean;
  desc?: string;
}

export interface MenuGroup {
  title: string;
  items: MenuItem[];
}

export interface QuickAction {
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
}

export interface DynamicSection {
  title: string;
  items: Array<{
    id: string;
    name: string;
    path: string;
    icon: LucideIcon;
    isActive?: boolean;
  }>;
}

export interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  moduleName: string;
  menuItems: MenuGroup[];
  quickAction?: QuickAction;
  dynamicSection?: DynamicSection;
}

export default function AppSidebar({ 
  moduleName, 
  menuItems, 
  quickAction,
  dynamicSection,
  ...props 
}: AppSidebarProps) {
  const pathname = usePathname();
  
  // Update isActive based on current pathname if not explicitly set
  const processedMenuItems = menuItems.map(group => ({
    ...group,
    items: group.items.map(item => ({
      ...item,
      isActive: item.isActive !== undefined ? item.isActive : pathname === item.path
    }))
  }));

  const { isMobile } = useSidebar()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <ModuleSelector currentModule={moduleName} />
      </SidebarHeader>
      <SidebarContent>
        {/* Quick Access Function */}
        {quickAction && (
          <div className="p-4 group-data-[collapsible=icon]:hidden">
            <Button
              variant="secondary"
              className="w-full justify-start gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={quickAction.onClick}
            >
              <quickAction.icon className="h-4 w-4" />
              {quickAction.label}
            </Button>
          </div>
        )}

        {/* Dynamic Nav Section (e.g., Projects, Chat Nav) */}
        {dynamicSection && (
          <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>{dynamicSection.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {dynamicSection.items.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      asChild
                      isActive={item.isActive !== undefined ? item.isActive : pathname === item.path}
                      tooltip={item.name}
                    >
                      <Link href={item.path} className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        <span className="truncate">{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <SidebarMenuAction showOnHover>
                            <MoreHorizontal />
                            <span className="sr-only">More</span>
                          </SidebarMenuAction>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          className="w-48 rounded-lg"
                          side={isMobile ? "bottom" : "right"}
                          align={isMobile ? "end" : "start"}
                        >
                          <DropdownMenuItem>
                            <Folder className="text-muted-foreground" />
                            <span>View</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Trash2 className="text-muted-foreground" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>                    
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

      {/* Main Navigation */}
      {processedMenuItems.map((group) => (
        <SidebarGroup key={group.title} >
          <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {group.items.map((item) => (
                <Collapsible
                  key={item.name}
                  asChild
                  defaultOpen={item.isActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem key={item.path}>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.name}>
                        {item.icon && <item.icon />}
                        <span>{item.name}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuButton
                        asChild
                        isActive={item.isActive}
                        tooltip={item.name}
                      >
                        <Link href={item.path} className="flex items-center gap-3">
                          <item.icon className="h-4 w-4" />
                          <span>{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
