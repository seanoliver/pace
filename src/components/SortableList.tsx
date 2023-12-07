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
import { TimerStore, useTimerStore } from '@/lib/store';

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
