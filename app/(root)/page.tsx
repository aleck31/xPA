'use client';

import { DashboardCard } from '@/components/shared/DashboardCard';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Your Intelligent Personal Assistant
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            xPA helps you manage your finances and schedule with the power of AI.
            Simplify your life and focus on what matters most.
          </p>
          <div className="flex space-x-4">
            <Link href="/login" className="btn-primary">
              Get Started
            </Link>
            <Link href="/features" className="btn-secondary">
              Learn More
            </Link>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="relative w-full h-80">
            {/* Placeholder for hero image */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center text-white text-4xl font-bold">
              Myners :)
            </div>
          </div>
        </div>
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
    </>
  );
}
