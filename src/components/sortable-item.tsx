import useTaskActions from '@/lib/hooks/use-task-actions'
import { Task } from '@/lib/types'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import DisplayTask from './display-task'
import EditTask from './edit-task'

export default function SortableItem({ task, id }: { task: Task; id: string }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const {
    isEditing,
    isDragging,
    taskTitle,
    inputRef,
    handleBlur,
    handleTextClick,
    handleMouseDown,
    handleMouseUp,
    handleTextChange,
    handleDurationChange,
    toggleCompleted,
  } = useTaskActions(task)

  return (
    <div
      className="flex items-center gap-4 px-4 rounded"
      ref={setNodeRef}
      style={style}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      {...(isEditing ? {} : { ...attributes, ...listeners })}
    >
      <div className="flex-grow">
        {isEditing ? (
          <EditTask
            taskTitle={taskTitle}
            handleTextChange={handleTextChange}
            handleBlur={handleBlur}
            inputRef={inputRef}
            toggleCompleted={toggleCompleted}
          />
        ) : (
          <DisplayTask
            taskTitle={taskTitle}
            handleTextClick={handleTextClick}
            toggleCompleted={toggleCompleted}
          />
        )}
      </div>
    </div>
  )
}
