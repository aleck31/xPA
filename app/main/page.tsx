'use client';

import { DashboardCard } from '@/components/shared/DashboardCard';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  return (
    <>
      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
        {/* Myners AI Assistant */}
        <DashboardCard
          title="Myners AI Assistant"
          description="Your intelligent personal assistant for daily tasks and questions"
          type="assistant"
          value="Ask anything"
          action={() => router.push('/assistant')}
          actionLabel="Open Myners"
        />

        {/* Upcoming Events */}
        <DashboardCard
          title="Upcoming Events"
          description="Team Meeting - 10:00 AM · Lunch with Client - 12:30 PM · Project Deadline - 5:00 PM"
          type="schedule"
          value="3 events today"
          action={() => router.push('/schedule')}
          actionLabel="View schedule"
        />

        {/* Financial Insights */}
        <DashboardCard
          title="Financial Insights"
          description="Top category: Groceries ($320) · 15% decrease from last month · 2 budget alerts"
          type="analytics"
          value="Spending Analysis"
          action={() => window.location.href = '/main/finance/insights'}
          actionLabel="View insights"
        />
      </div>

      {/* AI Assistant */}
      <div className="mt-8">
        <div className="overflow-hidden rounded-lg bg-white shadow-sm p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">I'm Myners :)</h3>
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
              <Button type="submit" onClick={() => router.push('/assistant')}>
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
