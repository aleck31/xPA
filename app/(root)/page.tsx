'use client';

import { DashboardCard } from '@/components/shared/DashboardCard';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import MynersChat from "@/components/assistant/MynersChat";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex h-full flex-col">
      <MynersChat />
      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
        {/* Upcoming Events */}
        <DashboardCard
          title="Upcoming Events"
          description="Team Meeting - 10:00 AM · Lunch with Client - 12:30 PM · Project Deadline - 5:00 PM"
          type="schedule"
          value="3 events today"
          action={() => router.push('/schedule/upcoming')}
          actionLabel="View schedule"
        />

        {/* Financial Insights */}
        <DashboardCard
          title="Financial Insights"
          description="Top category: Groceries ($320) · 15% decrease from last month · 2 budget alerts"
          type="analytics"
          value="Spending Analysis"
          action={() => window.location.href = '/finance/insights'}
          actionLabel="View insights"
        />

        {/* Knowledge Management */}
        <DashboardCard
          title="KnowledgeKeeper"
          description="Your intelligent personal assistant for daily tasks and questions"
          type="knowledge"
          value="xxx"
          action={() => router.push('/knowledge')}
          actionLabel="View Knowledge"
        />
      </div>
    </div>
  );
}
