import CountdownTimer from '@/components/CountdownTimer';
import TaskList from '@/components/SortableList';

export default function Home() {
  return (
    <div className='flex w-full h-full flex-col gap-4'>
      <CountdownTimer />
      <TaskList />
    </div>
  )
}
