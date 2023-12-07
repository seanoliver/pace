import { create } from 'zustand';
import { Task } from './types';
import { TASKS } from './constants';

export interface TimerStore {
  targetTime: number;
  isActive: boolean;
  isPaused: boolean;
  tasks: Task[];

  setTargetTime: (targetTime: number) => void;
  setTasks: (taskList: Task[]) => void;
  start: () => void;
  pause: () => void;
  stop: () => void;
  reset: (initialTime: number) => void;
}

export const useTimerStore = create((set):TimerStore => ({
  targetTime: 0,
  isActive: false,
  isPaused: false,
  tasks: TASKS,

  setTargetTime: (targetTime: number) => set({ targetTime }),
  setTasks: (taskList: Task[]) => set({ taskList }),
  start: () => set({ isActive: true, isPaused: false }),
  pause: () => set((state:TimerStore) => ({ isPaused: !state.isPaused })),
  stop: () => set({ targetTime: 0, isActive: false, isPaused: false }),
  reset: (initialTime) => set({ targetTime: initialTime, isActive: false, isPaused: false }),
}));