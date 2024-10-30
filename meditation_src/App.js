import React, { useRef, useState, useEffect } from "react";
import "./App.css";
import videoFile from "./video.mp4";

const App = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timer, setTimer] = useState(0);

  const startTimer = (duration) => {
    setTimer(duration);
  };

  const togglePlay = () => {
    if (!isPlaying) {
      videoRef.current.play().catch((error) => {
        console.error("Error trying to play the video:", error);
      });
      setIsPlaying(true);
      if (timer === 0) {
        startTimer(120);
      }
    }
  };

  const togglePause = () => {
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const playForDuration = (duration) => {
    videoRef.current.currentTime = 0;
    startTimer(duration * 60);
  };

  useEffect(() => {
    let id;
    if (isPlaying && timer > 0) {
      id = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(id);
            videoRef.current.pause();
            setIsPlaying(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(id);
  }, [isPlaying, timer]);

  return (
    <div className="app">
      <header className="header">Meditation</header>
      <video ref={videoRef} className="background-video" muted loop>
        <source src={videoFile} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="controls">
        <button onClick={togglePlay}>Play</button>
        <button onClick={togglePause}>Pause</button>
        <div className="timer-buttons">
          <button onClick={() => playForDuration(2)}>2 Min</button>
          <button onClick={() => playForDuration(4)}>4 Min</button>
          <button onClick={() => playForDuration(6)}>6 Min</button>
        </div>
        {timer > 0 && (
          <div className="timer">
            {Math.floor(timer / 60)}:{("0" + (timer % 60)).slice(-2)}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
