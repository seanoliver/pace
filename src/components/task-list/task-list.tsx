import NewTask from '../tasks/new-task'
import SortableList from './sortable-list'

export default function TaskList() {
  return (
    <div>
      <SortableList />
      <NewTask />
    </div>
  )
}
