import React, { useState } from "react";
import axios from "axios";
import {
  setLocalStorage,
  getLocalStorage,
} from "../../localSrorage/localStorage";
import { useNavigate } from "react-router-dom";
const UploadVideo = (props) => {
  const navigate = useNavigate();

  const [Lecture, setLecture] = useState({
    title: "",
    description: "",
    video: "",
  });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setUploading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("video", video);
    console.log(formData);
    try {
      axios
        .post("http://localhost:8000/api/uploadVideo", formData, {
          // .post("http://141.145.196.28:8001/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            console.log(
              "Upload Progress: " +
                Math.round((progressEvent.loaded / progressEvent.total) * 100) +
                "%"
            );
          },
        })
        .then((response) => {
          Lecture.video = response.data.videoID;
          Lecture.title = title;
          Lecture.description = description;
          addLecture(event);
          console.log(response);
          alert("Video uploaded successfully!");
          setUploading(false);
          // setLocalStorage("videoID", response.data.videoID);
          // console.log("Form Data", formData);
        });
    } catch (error) {
      console.error(error);
      setUploading(false);
      alert("Error uploading video!");
      setUploading(false);
    }
  };
  const addLecture = async (e) => {
    e.preventDefault();
    console.log("Lecture", Lecture);
    try {
      const response = await axios.post(
        `http://localhost:8000/api/addCourseLectures/${getLocalStorage(
          "courseID"
        )}`,
        Lecture,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log("Lecture Added", response.data);
        // setLecture(response.data);
        navigate("/editCourse");
      } else {
        console.log("Error status fron API", response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <h1>Upload Video</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            className="input"
            placeholder="Title"
            type="text"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          <textarea
            className="input"
            placeholder="Description"
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div>
          <input
            type="file"
            placeholder="Video"
            className="input"
            id="video"
            accept="video/mp4"
            onChange={(event) => setVideo(event.target.files[0])}
          />
        </div>
        <button type="submit" className="button" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default UploadVideo;

// import React, { useState } from "react";

// function UploadVideo() {
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState("");

//   function handleFileUpload(e) {
//     setFile(e.target.files[0]);
//   }

//   function handleSubmit(e) {
//     e.preventDefault();

//     if (!file) {
//       setMessage("No file selected");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     fetch("http://141.145.196.28:8001/upload", {
//       method: "POST",
//       body: formData,
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         if (data.success) {
//           setMessage(`File uploaded successfully. URL: ${data.file_url}`);
//         } else {
//           setMessage("Error uploading file");
//         }
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//         setMessage("An error occurred. Please try again later.");
//       });
//   }

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <input className="input" type="file" onChange={handleFileUpload} />
//         </div>
//         <div>
//           <button className="button" type="submit">
//             Upload
//           </button>
//         </div>
//       </form>
//       <p>{message}</p>
//     </div>
//   );
// }

// export default UploadVideo;
