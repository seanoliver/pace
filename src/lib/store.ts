import { create } from 'zustand';
import { Task } from './types';
import { TASKS } from './constants';
import type { User } from '@supabase/supabase-js'

export interface TimerStore {
  user: User | null;
  targetTime: number;
  isActive: boolean;
  isPaused: boolean;
  tasks: Task[];

  setUser: (user: User) => void;
  setTargetTime: (targetTime: number) => void;
  setTasks: (tasks: Task[]) => void;
  start: () => void;
  pause: () => void;
  stop: () => void;
  reset: (initialTime: number) => void;
}

export const useTimerStore = create((set):TimerStore => ({
  user: null,
  targetTime: 0,
  isActive: false,
  isPaused: false,
  tasks: TASKS,

  setUser: (user: User) => set({ user }),
  setTargetTime: (targetTime: number) => set({ targetTime }),
  setTasks: (tasks: Task[]) => set({ tasks }),
  start: () => set({ isActive: true, isPaused: false }),
  pause: () => set((state:TimerStore) => ({ isPaused: !state.isPaused })),
  stop: () => set({ targetTime: 0, isActive: false, isPaused: false }),
  reset: (initialTime) => set({ targetTime: initialTime, isActive: false, isPaused: false }),
}));