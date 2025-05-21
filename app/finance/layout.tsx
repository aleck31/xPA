'use client';

import { ReactNode } from "react";
import { AppLayout } from '@/components/shared/AppLayout';
import AppSidebar from "@/components/shared/AppSidebar";
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
import { usePathname } from "next/navigation";

interface FinanceLayoutProps {
  children: ReactNode;
}

export default function FinanceLayout({ children }: FinanceLayoutProps) {
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
    <AppLayout
      sidebar={
        <AppSidebar 
          moduleName="FinancialBrain"
          menuItems={menuItems}
          quickAction={{
            label: "Add Transaction",
            icon: CreditCard,
            onClick: () => {}
          }}
        />
      }
    >
      {children}
    </AppLayout>
  );
}
