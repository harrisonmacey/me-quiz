"use client";

//Timer.tsx: This component represents the timer functionality in your app. 
// It could use the useEffect hook to update the elapsed time.

import React, { useState, useEffect } from 'react';

const Timer: React.FC = () => {
    const [seconds, setSeconds] = useState(0);
  
    useEffect(() => {
      const timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
  
      return () => clearInterval(timer);
    }, []);
  
    const formatTime = (time: number): string => {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
  
      const formattedMinutes = String(minutes).padStart(2, '0');
      const formattedSeconds = String(seconds).padStart(2, '0');
  
      return `${formattedMinutes}:${formattedSeconds}`;
    };
  
    return <div>{formatTime(seconds)}</div>;
  };

export default Timer;