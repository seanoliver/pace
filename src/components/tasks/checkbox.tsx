import { Square, XSquare, MinusSquare, CheckSquare } from 'react-feather'

export default function Checkbox({
  taskStatus,
  toggleCompleted,
}: {
  taskStatus: string
  toggleCompleted: () => void
}) {
  switch (taskStatus) {
    case 'todo':
      return <Square onClick={toggleCompleted} />
    case 'done':
      return <CheckSquare onClick={toggleCompleted} />
    case 'doing':
      return <MinusSquare onClick={toggleCompleted} />
    case 'canceled':
      return <XSquare onClick={toggleCompleted} />
    default:
      return <Square onClick={toggleCompleted} />
  }
}
