import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectSelectedImage } from "../features/appSlice";
import "./ChatView.css";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const ChatView = () => {
  const navigate = useNavigate();
  const selectedImage = useSelector(selectSelectedImage);
  

  useEffect(() => {
    if (!selectedImage) {
      exit();
    }
  }, [selectedImage]);
  const exit = () => {
    navigate("/chats");
  };
  return (
    <div className="chatView">
      <img src={selectedImage} onClick={exit} alt="" />
      <div className="chatView_timer">
        <CountdownCircleTimer
          isPlaying
          duration={10}
          strokeWidth={6}
          size={50}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[0.33, 0.33, 0.33, 0.33]}
        >
          {({ remainingTime }) => {
            if (remainingTime === 0) {
              exit();
            }
            return remainingTime;
          }}
        </CountdownCircleTimer>
      </div>
    </div>
  );
};

export default ChatView;
