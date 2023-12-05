import { Task } from '@/lib/types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useEffect, useRef, useState } from 'react';
import { Input } from './ui/input';

export default function SortableItem({ task, id }: { task: Task; id: number }) {
	const [isEditing, setIsEditing] = useState(false);
	const [isDragging, setIsDragging] = useState(false);
	const [editableText, setEditableText] = useState(task.title);

	const dragTimeoutRef = useRef<NodeJS.Timeout>();

	const dragDelay = 200;
	let dragTimeout: NodeJS.Timeout;

	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	const handleBlur = () => {
		setIsEditing(false);
    task.title = editableText; // TODO: Update in DB

	};

	const handleTextClick = () => {
		console.log('click');
		if (!isDragging) {
			setIsEditing(true);
		}
	};

	const initDrag = () => {
		console.log('drag');
		setIsDragging(true);
	};

	const handleMouseDown = (event: React.MouseEvent) => {
		dragTimeoutRef.current = setTimeout(initDrag, dragDelay);
	};

	const handleMouseUp = () => {
		clearTimeout(dragTimeoutRef.current);
		if (!isDragging) handleTextClick();
		setIsDragging(false);
	};

	const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEditableText(event.target.value);
	};

	useEffect(() => {
		return () => {
			if (dragTimeoutRef.current) {
				clearTimeout(dragTimeoutRef.current);
			}
		};
	}, []);

	return (
		<div
			className='flex items-center gap-4 bg-slate-100 px-4 py-2 rounded'
			ref={setNodeRef}
			style={style}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			{...(isEditing ? {} : { ...attributes, ...listeners })}>
			<input
				type='checkbox'
				checked={task.completed}
			/>
			<div className='flex-grow'>
				{isEditing ? (
					<Input
						type='text'
						value={editableText}
						onChange={handleTextChange}
						onBlur={handleBlur}
						autoFocus
					/>
				) : (
					<div
						onClick={handleTextClick}
						className='flex-grow'>
						<div className='font-bold'>{task.title}</div>
					</div>
				)}
			</div>
			<div className='w-16 text-center'>{task.duration} min</div>
		</div>
	);
}
