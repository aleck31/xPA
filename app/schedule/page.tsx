import { Metadata } from "next";
import CalendarView from "@/components/schedule/CalendarView";
import ModuleSelector from "@/components/shared/ModuleSelector";

export const metadata: Metadata = {
  title: "TimeGuardian - 日程管理",
  description: "xPA日程管理界面",
};

export default function SchedulePage() {
  return (
    <div className="flex h-full flex-col">
      <CalendarView moduleSelector={<ModuleSelector currentModule="TimeGuardian" />} />
    </div>
  );
}
