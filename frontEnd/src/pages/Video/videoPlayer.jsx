import React, { useState, useEffect } from "react";
import axios from "axios";

const VideoPlayer = ({ videoId }) => {
  const [videoUrl, setVideoUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api//video/${videoId}`
        );
        setVideoUrl(URL.createObjectURL(response.data));
      } catch (err) {
        setError("Failed to load video");
      }
    };

    fetchVideo();
  }, [videoId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!videoUrl) {
    return <div>Loading video...</div>;
  }

  return (
    <video controls>
      <source src={videoUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
