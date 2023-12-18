'use client';

import { TimerStore, useTimerStore } from '@/lib/store';
import { Task } from '@/lib/types';
import {
	DndContext,
	KeyboardSensor,
	PointerSensor,
	closestCenter,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import {
	SortableContext,
	arrayMove,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableItem from './sortable-item';

export default function SortableList() {
	const [tasks, setTasks] = useTimerStore((state: unknown) => {
		const timerState = state as TimerStore;
		return [timerState.tasks, timerState.setTasks];
	});

	const handleDragEnd = (event: any) => {
		const { active, over } = event;
		if (over && active.id !== over.id) {
			const oldIndex = tasks.findIndex(task => task.id === active.id);
			const newIndex = tasks.findIndex(task => task.id === over.id);
			const newTasks = arrayMove(tasks, oldIndex, newIndex);
			setTasks(newTasks);
		}
	};

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}>
			<SortableContext
				items={tasks.map(task => task.id)}
				strategy={verticalListSortingStrategy}>
				<div className='flex p-4 flex-col gap-4 text-sm'>
					{tasks.map((task: Task) => (
						<SortableItem
							key={task.id}
							id={task.id}
							task={task}
						/>
					))}
				</div>
			</SortableContext>
		</DndContext>
	);
}
