import CountdownTimer from "@/components/countdown-timer";
import NewTask from "@/components/new-task";
import SortableList from "@/components/sortable-list";
import TaskList from "@/components/task-list";
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