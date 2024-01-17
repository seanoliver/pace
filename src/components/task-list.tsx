import NewTask from './new-task'
import SortableList from './sortable-list'

export default function TaskList() {
  return (
    <div>
      <SortableList />
      <NewTask />
    </div>
  )
}
