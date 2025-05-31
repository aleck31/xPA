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
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
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
export interface QuickAction {
  title: string;
  icon: LucideIcon;
  onClick?: () => void;
}

export interface MenuItem {
  title: string;
  path?: string;
  icon: LucideIcon;
  isActive?: boolean;
  desc?: string;
  subItems?: MenuItem[];
}

export interface MenuGroup {
  label: string;
  items: MenuItem[];
}

export interface DynamicSection {
  label: string;
  items: Array<{
    id: string;
    title: string;
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
  quickAction,
  dynamicSection,
  menuItems,
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
          <SidebarMenu className="p-4 group-data-[collapsible=icon]">
            <SidebarMenuButton
              className="w-full justify-start gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={quickAction.onClick}
            >
              <quickAction.icon className="h-4 w-4" />
              {quickAction.title}
            </SidebarMenuButton>
          </SidebarMenu>
        )}

        {/* Dynamic Nav Section (e.g., Projects, Chat Sessions) */}
        {dynamicSection && (
          <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>{dynamicSection.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {dynamicSection.items.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      asChild
                      isActive={item.isActive !== undefined ? item.isActive : pathname === item.path}
                      tooltip={item.title}
                    >
                      <Link href={item.path} className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        <span className="truncate">{item.title}</span>
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
          <SidebarGroup key={group.label} >
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  item.subItems ? (
                    // Menu item with submenu
                    <Collapsible
                      key={item.title}
                      asChild
                      defaultOpen={item.isActive}
                      className="group/collapsible"
                    >
                      <SidebarMenuItem key={item.path}>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton tooltip={item.title}>
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.subItems.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.path}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={subItem.isActive}
                                >
                                  <Link href={subItem.path || "#"} className="flex items-center gap-3">
                                    <subItem.icon className="h-4 w-4" />
                                    <span>{subItem.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  ) : (
                    // Menu item without submenu
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton
                        asChild
                        isActive={item.isActive}
                        tooltip={item.title}
                      >
                        <Link href={item.path || "#"} className="flex items-center gap-3">
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
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
