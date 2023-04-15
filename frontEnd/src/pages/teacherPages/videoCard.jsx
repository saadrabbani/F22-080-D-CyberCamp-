import React from "react";
import "../../styles/video.css";

const VideoCard = ({ title, duration, videoUrl }) => {
  return (
    <div className="video-card">
      <div className="video-container">
        <video controls>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="video-details">
        <h2 className="video-title">{title}</h2>
        <p className="video-duration">{duration} seconds</p>
      </div>
    </div>
  );
};

export default VideoCard;
