import withAuth from "@/components/auth/with-auth";
import CountdownTimer from "@/components/countdown-timer";
import Nav from "@/components/nav";
import TaskList from "@/components/sortable-list";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <div className="flex w-full h-full flex-col gap-4">
      <Nav />
      <CountdownTimer />
      <TaskList />
      <Toaster />
    </div>
  );
}