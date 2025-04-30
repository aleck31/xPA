"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader
} from "@/components/ui/sidebar";
import { 
  PieChart, 
  BarChart, 
  Wallet, 
  CreditCard, 
  Receipt, 
  TrendingUp,
  Settings,
  Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ModuleSelector from "@/components/shared/ModuleSelector";
import { SearchForm } from "@/components/shared/SearchForm";

export default function FinanceSidebar() {
  const pathname = usePathname();
  
  // Define menu items for finance module
  const menuItems = [
    {
      title: "Default Pageview",
      items: [
        { name: "Dashboard", desc: "看板", path: "/finance", icon: PieChart, isActive: pathname === "/finance" }
      ]
    },
    {
      title: "Finance Management",
      items: [
        { name: "Transactions", desc: "交易", path: "/finance/transactions", icon: CreditCard, isActive: pathname === "/finance/transactions" },
        { name: "Budgets", desc: "预算", path: "/finance/budgets", icon: Wallet, isActive: pathname === "/finance/budgets" },
        { name: "Receipts", desc: "收据", path: "/finance/receipts", icon: Receipt, isActive: pathname === "/finance/receipts" },
        { name: "Reports", desc: "报告", path: "/finance/reports", icon: BarChart, isActive: pathname === "/finance/reports" },
        { name: "Investments", desc: "投资", path: "/finance/investments", icon: TrendingUp, isActive: pathname === "/finance/investments" },
      ]
    },
    {
      title: "Settings",
      items: [
        { name: "Accounts", desc: "账户设置", path: "/finance/accounts", icon: Tag, isActive: pathname === "/finance/accounts" },
        { name: "Categories", desc: "分类设置", path: "/finance/categories", icon: Tag, isActive: pathname === "/finance/categories" },
        { name: "Merchants", desc: "商家设置", path: "/finance/merchants", icon: Tag, isActive: pathname === "/finance/merchants" },
        { name: "Projects", desc: "项目设置", path: "/finance/projects", icon: Tag, isActive: pathname === "/finance/projects" }
      ]
    }
  ];

  return (
    <>
      <SidebarHeader>
        <ModuleSelector currentModule="FinancialBrain" />
        <div className="px-4 pb-2">
          <SearchForm />
        </div>
      </SidebarHeader>

      {/* Quick Access Function */}
      <div className="p-4">
        <Button
          variant="secondary"
          className="w-full justify-start gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <CreditCard className="h-4 w-4" />
          Add Event/Task
        </Button>
      </div>

      {menuItems.map((group) => (
        <SidebarGroup key={group.title}>
          <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {group.items.map((item) => (
                <SidebarMenuItem key={item.path}>
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
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
}
