'use client'

import { TimerStore, useTimerStore } from '@/lib/store';
import React, { useState, useEffect, useRef } from 'react';

export const CountdownTimer = () => {
  const {
    targetTime,
    isActive,
    isPaused,
    start,
    pause,
    stop,
    reset
  } = useTimerStore((state: unknown) => {
    const timerState = state as TimerStore;
    return {
      targetTime: timerState.targetTime,
      isActive: timerState.isActive,
      isPaused: timerState.isPaused,
      start: timerState.start,
      pause: timerState.pause,
      stop: timerState.stop,
      reset: timerState.reset
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
    </div>
  );
};

export default CountdownTimer;
