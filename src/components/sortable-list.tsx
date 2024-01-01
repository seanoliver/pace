'use client';

import { PaceStore, usePaceStore } from '@/lib/store';
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
import { useEffect } from 'react';

export default function SortableList() {
	const [tasks, setTasks] = usePaceStore(state => [state.tasks, state.setTasks]);

	const handleDragEnd = (event: any) => {
		const { active, over } = event;
		if (over && active.id !== over.id) {
			const oldIndex = tasks.findIndex(task => task.id === active.id);
			const newIndex = tasks.findIndex(task => task.id === over.id);
			const newTasks = arrayMove(tasks, oldIndex, newIndex);
			setTasks(newTasks);
			
			// TODO: Store the new order in the database.
		}
	};

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	// Fetch tasks from the API.
	useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch('/api/tasks')
      const data = await res.json()
			setTasks(data)
    }
    fetchTasks()
  }, [setTasks])

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
