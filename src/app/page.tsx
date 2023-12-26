import CountdownTimer from "@/components/countdown-timer";
import TaskList from "@/components/sortable-list";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <div className="flex w-full h-full flex-col gap-4">
      <CountdownTimer />
      <TaskList />
      <Toaster />
    </div>
  );
}