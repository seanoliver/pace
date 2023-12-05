'use client';

import { useState } from 'react';
import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableItem from './SortableItem';
import { Task } from '@/lib/types';
import { TASKS } from '@/lib/constants';

export default function SortableList() {
	const [tasks, setTasks] = useState<Task[]>(TASKS);

	const handleDragEnd = (event: any) => {
		const { active, over } = event;
		if (over && active.id !== over.id) {
			setTasks(tasks => {
				const oldIndex = tasks.findIndex(task => task.id === active.id);
				const newIndex = tasks.findIndex(task => task.id === over.id);
				return arrayMove(tasks, oldIndex, newIndex);
			});
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
