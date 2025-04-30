import { Metadata } from "next";
import MynersChat from "@/components/assistant/MynersChat";

export const metadata: Metadata = {
  title: "Myners - 智能助理",
  description: "xPA智能助理界面",
};

export default function AssistantPage() {
  return (
    <div className="flex h-full flex-col">
      <MynersChat />
    </div>
  );
}
