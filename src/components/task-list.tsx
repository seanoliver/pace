import { useEffect } from "react";
import NewTask from "./new-task";
import SortableList from "./sortable-list";

export default function TaskList() {

  useEffect(() => {
    console.log('TaskList mounted')
    const fetchTasks = async () => {
      const res = await fetch('/api/tasks')
      console.log('res', res)
      const data = await res.json()
      console.log('TASKS', data)
    }
    fetchTasks()
    return () => {
      console.log('TaskList unmounted')
    }
  })

  return (
    <div className='flex flex-col w-full lg:w-1/2 md:w-2/3 mx-auto'>
      <h1>Task List</h1>
      <NewTask />
      <SortableList />
    </div>
  )
}