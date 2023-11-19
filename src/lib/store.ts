import { create } from 'zustand';

export interface TimerStore {
  targetTime: number;
  isActive: boolean;
  isPaused: boolean;

  setTargetTime: (targetTime: number) => void;
  start: () => void;
  pause: () => void;
  stop: () => void;
  reset: (initialTime: number) => void;
}

export const useTimerStore = create((set):TimerStore => ({
  targetTime: 0,
  isActive: false,
  isPaused: false,

  setTargetTime: (targetTime: number) => set({ targetTime }),
  start: () => set({ isActive: true, isPaused: false }),
  pause: () => set((state:TimerStore) => ({ isPaused: !state.isPaused })),
  stop: () => set({ targetTime: 0, isActive: false, isPaused: false }),
  reset: (initialTime) => set({ targetTime: initialTime, isActive: false, isPaused: false }),
}));