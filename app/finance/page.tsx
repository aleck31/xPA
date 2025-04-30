import { Metadata } from "next";
import FinancialDashboard from "@/components/finance/FinancialDashboard";
import { DashboardCard } from '@/components/shared/DashboardCard';

export const metadata: Metadata = {
  title: "FinancialBrain - 财务管理",
  description: "xPA财务管理界面",
};

export default function FinancePage() {
  return (
    <div className="flex h-full flex-col">
      <FinancialDashboard />

      {/* Finance Summary */}
      <DashboardCard
        title="Monthly Budget"
        description="$1,210.00 spent · 48% remaining"
        type="finance"
        value="$2,500.00"
        actionLabel="View finance details"
      />

    </div>
  );
}
