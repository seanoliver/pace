'use client'

import { PaceStore, usePaceStore } from '@/lib/store';
import React, { useState, useEffect, useRef } from 'react';
import TimeSetter from './time-setter';
import { TASKS } from '@/lib/constants';

export const CountdownTimer = () => {
  const {
    targetTime,
    setTargetTime,
    isActive,
    isPaused,
    start,
    pause,
    stop,
    reset
  } = usePaceStore((state: unknown) => {
    const timerState = state as PaceStore;
    return {
      targetTime: timerState.targetTime,
      isActive: timerState.isActive,
      isPaused: timerState.isPaused,
      start: timerState.start,
      pause: timerState.pause,
      stop: timerState.stop,
      reset: timerState.reset,
      setTargetTime: timerState.setTargetTime
    };
  });

  const currentTime = useRef(targetTime);

  const calculateTimeLeft = () => {
    return {
      hours: Math.floor((currentTime.current / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((currentTime.current / 1000 / 60) % 60),
      seconds: Math.floor((currentTime.current / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  const addLeadingZeros = (value: number) => {
    let valueString = String(value);
    while (valueString.length < 2) {
      valueString = `0${valueString}`;
    }
    return valueString;
  }

  const totalTime = TASKS.reduce((total, task) => total += task.duration, 0)

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentTime.current <= 0) {
        clearInterval(timer);
        return;
      }
      currentTime.current -= 1000;
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [])

  calculateTimeLeft();

  const inputClasses = 'w-10 dark:bg-black text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'

  return (
    <div className='flex flex-col'>
      <div>
        {`${addLeadingZeros(timeLeft.hours)} : ${addLeadingZeros(timeLeft.minutes)} : ${addLeadingZeros(timeLeft.seconds)}`}
      </div>
      <div className='flex gap-4'>
        <button onClick={start}>Start</button>
        <button onClick={pause}>Pause</button>
        <button onClick={stop}>Stop</button>
      </div>
      <div>
        <TimeSetter onTimeSet={setTargetTime} />
      </div>
    </div>
  );
};

export default CountdownTimer;
