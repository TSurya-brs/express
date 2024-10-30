import { useEffect, useState } from "react";
import React from "react";
import img1 from "../src/rocket.jpeg";
import img2 from "../src/rocketfail.jpeg";
import "./Rocket.css";

const Rocket = () => {
  const [position, setPosition] = useState(0);
  const [flying, setFlying] = useState(false);
  const [message, setMessage] = useState("");
  const [currentImage, setCurrentImage] = useState(img1);

  const launch = () => {
    setFlying(true);
    setMessage("");
    setPosition(0);
    setCurrentImage(img1);
  };

  useEffect(() => {
    let interval;
    if (flying) {
      const randomNum = Math.floor(Math.random() * 20) + 1;
      const isSuccess = randomNum <= 10;

      if (isSuccess) {
        interval = setInterval(() => {
          setPosition((prevPosition) => {
            if (prevPosition >= 400) {
              clearInterval(interval);
              setFlying(false);
              setMessage("Launch success");
              return prevPosition;
            }
            return prevPosition + 5;
          });
        }, 10);
      } else {
        const halfDistance = 300;
        interval = setInterval(() => {
          setPosition((prevPosition) => {
            if (prevPosition >= halfDistance) {
              clearInterval(interval);
              setCurrentImage(img2);
              const downInterval = setInterval(() => {
                setPosition((prevPosition) => {
                  if (prevPosition <= 0) {
                    clearInterval(downInterval);
                    setFlying(false);
                    setMessage("Launch failed");
                    return 0;
                  }
                  return prevPosition - 1;
                });
              }, 10);
              return prevPosition;
            }
            return prevPosition + 5;
          });
        }, 10);
      }
    }

    return () => clearInterval(interval);
  }, [flying]);

  return (
    <div className="rocket-container">
      <h1 className="rocket-heading">Rocket Launch</h1>
      <button className="launch-button" onClick={launch}>
        {" "}
        Start{" "}
      </button>
      <img
        src={currentImage}
        alt="rocket"
        className="rocket-image"
        style={{
          bottom: position,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />
      {message && <p className="launch-message">{message}</p>}
    </div>
  );
};

export default Rocket;
