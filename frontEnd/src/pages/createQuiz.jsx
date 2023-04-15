import React, { useState, useEffect } from 'react';
import NavBar from "../componrnts/navs/NavStudent";
import 'bootstrap/dist/css/bootstrap.min.css';
import {setLocalStorage} from "../localSrorage/localStorage";
import { useNavigate } from 'react-router-dom';

const QuizCreator = () => {
  const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], correctOption: '' }]);
  const [quizSaved, setQuizSaved] = useState(false);
    const navigate = useNavigate();

  const handleQuestionChange = (e, index) => {
    const { value } = e.target;
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };
  
  const handleAttempt = () => {
    setLocalStorage("questions", questions);
    // window.location.href = "/quiz";
    navigate("/quiz");
    };


  const handleOptionChange = (e, questionIndex, optionIndex) => {
    const { value } = e.target;
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const handleCorrectOptionChange = (e, index) => {
    const { value } = e.target;
    const newQuestions = [...questions];
    newQuestions[index].correctOption = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correctOption: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(questions);
    setQuizSaved(true);
  };

  const renderOptions = (questionIndex) => {
    const { options } = questions[questionIndex];
    const inputs = [];

    for (let i = 0; i < options.length; i++) {
      inputs.push(
        <div className="form-group" key={i}>
          <label>Option {String.fromCharCode(97 + i)}</label>
          <input
            type="text"
            className="input"
            value={options[i]}
            onChange={(e) => handleOptionChange(e, questionIndex, i)}
            required
          />
        </div>
      );
    }

    inputs.push(
      <div className="form-group" key="correctOption">
        <label>Correct Option</label>
        <input
          type="text"
          className="input"
          value={questions[questionIndex].correctOption}
          onChange={(e) => handleCorrectOptionChange(e, questionIndex)}
          required
        />
      </div>
    );

    return inputs;
  };
  return (
    <>
      <NavBar />
      <div className="body">
        <div className="container">
          <h1 style={{ color: "#16df70" }}>Create a Quiz</h1>
          <form onSubmit={handleSubmit}>
            {questions.map((q, index) => (
              <div key={index}>
                <label>Question {index + 1}</label>
                <input
                  type="text"
                  className="input"
                  value={q.question}
                  onChange={(e) => handleQuestionChange(e, index)}
                  required
                />
                <br />
                {renderOptions(index)}
                <br />
              </div>
            ))}
            <button className="button" onClick={addQuestion}>Add Question</button>
            <button type="submit"className="button">Save Quiz</button>
            <button className="button" onClick={handleAttempt}>Attempt Quiz</button>
          </form>
          {quizSaved && (
            <div style={{ color: "green" }}>
              Quiz saved successfully!
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default QuizCreator;
