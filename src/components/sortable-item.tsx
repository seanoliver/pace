import useTaskListItem from '@/lib/hooks/use-drag-list-item';
import { Task } from '@/lib/types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function SortableItem({ task, id }: { task: Task; id: string }) {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

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
		toggleCompleted } = useTaskListItem(task)
	return (
		<div
			className='flex items-center gap-4 px-4 rounded'
			ref={setNodeRef}
			style={style}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			{...(isEditing ? {} : { ...attributes, ...listeners })}>
			<input
				type='checkbox'
				onClick={toggleCompleted}
			// checked={task.completed}
			/>
			<div className='flex-grow'>
				{isEditing ? (
					<input
						ref={inputRef}
						type='text'
						value={taskTitle}
						onChange={handleTextChange}
						onBlur={handleBlur}
						className='w-full bg-transparent outline-none rounded p-2'
					/>
				) : (
					<div
						onClick={handleTextClick}
						className='flex-grow'>
						<div className='p-2'>{task.title}</div>
					</div>
				)}
			</div>
			<div className='w-16 text-center'>
				{/* TODO: Enable duration editing. */}
				{isEditing ? (
					<input
						type='text'
						value={task.duration?.toString()}
						onChange={handleDurationChange}
						onBlur={handleBlur}
						className='w-full text-center bg-transparent outline-none border-2'
					/>
				) : (
					`${task.duration} min`
				)}
			</div>
		</div>
	);
}
