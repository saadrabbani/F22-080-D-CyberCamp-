import React, { useState, useEffect } from 'react';
import NavBar from "../componrnts/navs/NavStudent";
import 'bootstrap/dist/css/bootstrap.min.css';
import { getLocalStorage } from '../localSrorage/localStorage';
const Quizes = () => {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const storedQuestions = getLocalStorage("questions") || [];
    setQuestions(storedQuestions);
  }, []);

  const handleAnswerChange = (event, index) => {
    const { value } = event.target;
    setUserAnswers((prevState) => ({ ...prevState, [index]: value }));
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const renderQuiz = () => {
    return questions.map((question, index) => (
      <div key={index}>
        <div className="question">{question.question}</div>
        <div className="answers">
          {question.options.map((option, i) => (
            <div key={i}>
              <label>
                <input
                  type="radio"
                  name={`question${index}`}
                  value={String.fromCharCode(i + 97)}
                  onChange={(event) => handleAnswerChange(event, index)}
                />
                {String.fromCharCode(i + 97)}: {option}
              </label>
            </div>
          ))}
        </div>
      </div>
    ));
  };

  const renderResults = () => { 
    let num = questions.length;
    let correctAnswers = 0;
    
    for (let i = 0; i < questions.length; i++) {
      const correctOptionIndex = questions[i].correctOption.charCodeAt(0) - 97; // get the correct option index
      const userAnswerIndex = userAnswers[i].charCodeAt(0) - 97; // get the user answer index
      
      if (correctOptionIndex === userAnswerIndex) {
        console.log("Question no ", i + 1, " is correct");
        correctAnswers++;
      }
      else {
        console.log("Question no ", i + 1, " is incorrect");
      }
    }
  
    return `${correctAnswers} out of ${questions.length}`;
  };


  return (
    <>
      <NavBar />
      <div className="body">
        <div className="container">
          <h1 style={{ color: "#16df70" }}>Test Yourself</h1>
          {renderQuiz()}
          <button className='button' onClick={handleSubmit}>Get Results</button>
          {showResults && <div id="results">{renderResults()}</div>}
        </div>
      </div>
    </>
  );
};

export default Quizes;