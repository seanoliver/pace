'use client'

import React, { useState, useEffect } from 'react';

export const CountdownTimer = ({ targetTime }: {targetTime: number}) => {
  const [currentTime, setCurrentTime] = useState(targetTime);
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateTimeLeft = () => {
    return {
      hours: Math.floor((currentTime / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((currentTime / 1000 / 60) % 60),
      seconds: Math.floor((currentTime / 1000) % 60),
    };
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
      setCurrentTime(currentTime - 1000);
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentTime])

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) return;

    timerComponents.push(
      <span>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div>
      {timerComponents.length ? timerComponents : <span>Time's up!</span>}
    </div>
  );
};

export default CountdownTimer;
