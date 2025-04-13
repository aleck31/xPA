'use client';

import { DashboardCard } from '@/components/dashboard/DashboardCard';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export default function Dashboard() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Welcome to xPA dashboard.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Finance Summary */}
        <DashboardCard
          title="Monthly Budget"
          description="$1,210.00 spent · 48% remaining"
          type="finance"
          value="$2,500.00"
          action={() => window.location.href = '/dashboard/finance'}
          actionLabel="View finance details"
        />

        {/* Upcoming Events */}
        <DashboardCard
          title="Upcoming Events"
          description="Team Meeting - 10:00 AM · Lunch with Client - 12:30 PM · Project Deadline - 5:00 PM"
          type="schedule"
          value="3 events today"
          action={() => window.location.href = '/dashboard/schedule'}
          actionLabel="View schedule"
        />

        {/* Financial Insights */}
        <DashboardCard
          title="Financial Insights"
          description="Top category: Groceries ($320) · 15% decrease from last month · 2 budget alerts"
          type="analytics"
          value="Spending Analysis"
          action={() => window.location.href = '/dashboard/finance/insights'}
          actionLabel="View insights"
        />
      </div>

      {/* AI Assistant */}
      <div className="mt-8">
        <div className="overflow-hidden rounded-lg bg-white shadow-sm p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">I'm Mynsers :)</h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>Ask me anything about your finances or schedule.</p>
          </div>
          <div className="mt-5">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="E.g., How much did I spend on dining last month?"
                className="flex-1"
              />
              <Button type="submit">
                <Send className="h-4 w-4 mr-2" />
                Ask
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
