import React, { useEffect, useState } from "react";
import axios from "axios";
import { getLocalStorage } from "../../localSrorage/localStorage";

const ReadingMaterial = (props) => {
  const [file, setFile] = useState({
    title: "",
    file: null,
  });
  const [ReadMat, setReadMat] = useState({
    title: "",
    file: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", file.title);
    formData.append("file", file.file);
    axios
      .post("http://localhost:8000/api/uploadReadingMaterial", formData)
      .then((res) => {
        console.log(res);
        console.log("File uploaded successfully");
        console.log("File ID", res.data.data.insertedId);
        // setReadMat({
        //   title: file.title,
        //   file: res.data.data.insertedId,
        // });
        formData.title = file.title;
        formData.file = res.data.data.insertedId;
        console.log("formData", formData);

        // console.log("ReadMat", ReadMat);
        addReadingMaterial(formData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addReadingMaterial = async (formData) => {
    // e.preventDefault();
    console.log("FormData", formData);
    try {
      const response = await axios.post(
        `http://localhost:8000/api/addReadingMaterials/${getLocalStorage(
          "courseID"
        )}`,
        formData
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="body">
        <>
          <h1>Add Material</h1>
        </>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              className="input"
              placeholder="Title"
              type="text"
              id="title"
              value={file.title}
              onChange={(event) =>
                setFile({ ...file, title: event.target.value })
              }
            />
          </div>
          <div>
            <input
              className="input"
              placeholder="File"
              type="file"
              id="file"
              onChange={(event) =>
                setFile({ ...file, file: event.target.files[0] })
              }
            />
          </div>
          <div>
            <button className="button" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default ReadingMaterial;
