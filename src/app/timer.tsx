'use client'

import React, { useState, useEffect, useRef } from 'react';

export const CountdownTimer = ({ targetTime }: {targetTime: number}) => {
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

  return (
    <div>
      {`${addLeadingZeros(timeLeft.hours)} : ${addLeadingZeros(timeLeft.minutes)} : ${addLeadingZeros(timeLeft.seconds)}`}
    </div>
  );
};

export default CountdownTimer;
