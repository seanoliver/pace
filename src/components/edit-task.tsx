interface EditTaskProps {
  taskTitle: string
  handleTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleBlur: () => void
  inputRef: React.RefObject<HTMLInputElement>
  toggleCompleted: () => void
}

export default function EditTask({
  taskTitle,
  handleTextChange,
  handleBlur,
  inputRef,
  toggleCompleted,
}: EditTaskProps) {
  return (
    <div className="flex flex-row items-center gap-2 bg-gray-200">
      <input type="checkbox" onClick={toggleCompleted} />
      <input
        ref={inputRef}
        type="text"
        value={taskTitle}
        onChange={handleTextChange}
        onBlur={handleBlur}
        className="w-full bg-transparent outline-none rounded p-2"
      />
    </div>
  )
}
