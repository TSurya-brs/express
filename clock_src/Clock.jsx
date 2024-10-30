import React, { useEffect, useState } from "react";
import "./Clock.css";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const secondDegrees = (seconds / 60) * 360;
  const minuteDegrees = (minutes / 60) * 360 + (seconds / 60) * 6;
  const hourDegrees = ((hours % 12) / 12) * 360 + (minutes / 60) * 30;

  return (
    <div className="clock">
      <div
        className="hand hour"
        style={{ transform: `rotate(${hourDegrees}deg)` }}
      />
      <div
        className="hand minute"
        style={{ transform: `rotate(${minuteDegrees}deg)` }}
      />
      <div
        className="hand second"
        style={{ transform: `rotate(${secondDegrees}deg)` }}
      />
      <div className="center" />
    </div>
  );
};

export default Clock;
