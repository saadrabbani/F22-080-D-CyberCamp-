import React, { useState } from "react";
// import "../../styles/video.css";
import VideoCard from "./videoCard";
import axios from "axios";

const VideoUploader = () => {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [videoUploaded, setVideoUploaded] = useState(false);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };

  const handleVideoFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleUploadVideo = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("duration", duration);
      formData.append("videoFile", videoFile);
    } catch (error) {
      console.log(error);
    }

    // TODO: Implement video upload logic using a backend API
    setVideoUploaded(true);
  };

  const handleEditVideo = () => {
    // TODO: Implement edit video logic using a backend API
  };

  return (
    <div className="video-uploader">
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          className="form-control"
          id="title"
          placeholder="Enter video title"
          value={title}
          onChange={handleTitleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="duration">Duration (in seconds)</label>
        <input
          type="number"
          className="form-control"
          id="duration"
          placeholder="Enter video duration"
          value={duration}
          onChange={handleDurationChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="video-file">Choose video file</label>
        <input
          type="file"
          className="form-control-file"
          id="video-file"
          accept="video/*"
          onChange={handleVideoFileChange}
        />
      </div>

      <button
        className="btn btn-primary"
        disabled={!title || !duration || !videoFile}
        onClick={handleUploadVideo}
      >
        Upload Video
      </button>
    </div>
  );
};

export default VideoUploader;
