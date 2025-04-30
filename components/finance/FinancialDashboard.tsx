"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  PlusCircle,
  LayoutDashboard,
  Receipt,
  PieChart,
  Paperclip,
  Users,
  Settings,
  MoreVertical,
} from "lucide-react";
import ModuleSelector from "@/components/shared/ModuleSelector";

interface ExpenseCategory {
  id: string;
  name: string;
  nameZh: string;
  amount: number;
  icon: React.ReactNode;
}

export default function FinancialDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock financial data
  const financialData = {
    totalExpense: {
      amount: "$45,231.89",
      change: "+20.1% from last month",
    },
    totalIncome: {
      amount: "$ 60,123,66",
      change: "+80.1% from last month",
    },
    transactionsCount: {
      count: "126",
      change: "-",
    },
  };

  // Mock expense categories
  const expenseCategories: ExpenseCategory[] = [
    {
      id: "1",
      name: "Education",
      nameZh: "子女教育",
      amount: 1999.0,
      icon: (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
          👩‍🎓
        </div>
      ),
    },
    {
      id: "2",
      name: "Travel",
      nameZh: "旅行开支",
      amount: 399.0,
      icon: (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
          🧳
        </div>
      ),
    },
    {
      id: "3",
      name: "Living Expenses",
      nameZh: "日常生活费",
      amount: 299.0,
      icon: (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
          🛒
        </div>
      ),
    },
    {
      id: "4",
      name: "Housing",
      nameZh: "住房开销",
      amount: 209.0,
      icon: (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
          🏠
        </div>
      ),
    },
    {
      id: "5",
      name: "Healthcare",
      nameZh: "医疗开支",
      amount: 39.0,
      icon: (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
          🏥
        </div>
      ),
    },
  ];

  return (
    <div className="flex h-full w-full">
      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {/* Date Filter */}
          <div className="mb-6 flex items-center justify-between">
            <Tabs defaultValue="overview" className="w-[400px]">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Last 30 days
              </Button>
              <Button variant="outline" size="sm">
                Last 3 months
              </Button>
              <Button variant="outline" size="sm">
                Last year
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                </svg>
                Jan 01, 2023 - Dec 31, 2023
              </Button>
              <Button className="bg-blue-500 text-white hover:bg-blue-600">
                Apply
              </Button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="mb-6 grid grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Expense
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {financialData.totalExpense.amount}
                </div>
                <p className="text-xs text-muted-foreground">
                  {financialData.totalExpense.change}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Income
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {financialData.totalIncome.amount}
                </div>
                <p className="text-xs text-muted-foreground">
                  {financialData.totalIncome.change}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Transactions No.
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {financialData.transactionsCount.count}
                </div>
                <p className="text-xs text-muted-foreground">
                  {financialData.transactionsCount.change}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts and Rankings */}
          <div className="grid grid-cols-3 gap-6">
            {/* Overview Chart */}
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  {/* This would be a real chart in production */}
                  <div className="flex h-full items-end gap-2">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="flex flex-1 flex-col gap-1">
                        <div
                          className="w-full bg-green-500"
                          style={{
                            height: `${Math.random() * 150 + 100}px`,
                          }}
                        ></div>
                        <div
                          className="w-full bg-red-500"
                          style={{
                            height: `${Math.random() * 100 + 50}px`,
                          }}
                        ></div>
                        <div className="text-center text-xs">
                          {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Expense Ranking */}
            <Card>
              <CardHeader>
                <CardTitle>Expense Ranking</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Sort by Expense Categories
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {expenseCategories.map((category) => (
                    <div key={category.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {category.icon}
                        <div>
                          <p className="font-medium">{category.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {category.nameZh}
                          </p>
                        </div>
                      </div>
                      <p className="font-semibold">${category.amount.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
