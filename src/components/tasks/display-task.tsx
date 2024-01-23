import Checkbox from './checkbox'

interface DisplayTaskProps {
  taskTitle: string
  handleTextClick: () => void
  toggleCompleted: () => void
}

export default function DisplayTask({
  taskTitle,
  handleTextClick,
  toggleCompleted,
}: DisplayTaskProps) {
  return (
    <div className='flex flex-row items-center gap-2'>
      <Checkbox
        taskStatus='todo'
        toggleCompleted={toggleCompleted}
      />
      <div
        onClick={handleTextClick}
        className='flex-grow'
      >
        <div className='p-2'>{taskTitle}</div>
      </div>
    </div>
  )
}
