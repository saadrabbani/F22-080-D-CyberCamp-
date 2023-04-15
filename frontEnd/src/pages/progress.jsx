import React, { useState } from "react";

function Progress() {
  const [progress, setProgress] = useState(0);
  const lectures = ["Lecture 1", "Lecture 2", "Lecture 3"];
  const totalLectures = lectures.length;

  function handleCheck(e) {
    if (e.target.checked) {
      setProgress(progress + 1);
    } else {
      setProgress(progress - 1);
    }
  }

  return (
    <div>
      <div
        className="progress-bar"
        style={{ width: `${(progress / totalLectures) * 100}%` }}
      >
        {progress}/{totalLectures}
      </div>
      {lectures.map((lecture) => (
        <div key={lecture}>
          <input type="checkbox" onChange={handleCheck} />
          <label>{lecture}</label>
        </div>
      ))}
    </div>
  );
}

export default Progress;
