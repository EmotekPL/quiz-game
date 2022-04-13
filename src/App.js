import React, { useState, useEffect } from "react";
import { RingLoader } from "react-spinners";
import "./App.css";
import Start from "./components/Start/index.js";
import Question from "./components/Question/index.js";
let counter = 0;

const App = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [settings, setSettings] = useState({})
  const [questionsArray, setQuestionsArray] = useState();
  const [restart, setRestart] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  function changingStartState() {
    setIsStarted((value) => !value);
  }
  useEffect(()=>{
    setLoading(true);
    fetch('https://opentdb.com/api_category.php')
      .then(res=>res.json())
      .then(data=>{
        setSettings({...data.trivia_categories, value: ''})
      });
      setLoading(false);
  }, [])

  useEffect(() => {
    setLoading(true);
    fetch("https://opentdb.com/api.php?amount=5&type=multiple&encode=url3986")
      .then((res) => res.json())
      .then((data) => {
        setQuestionsArray(
          data.results.map((elem) => {
            const orderedArr = [...elem.incorrect_answers, elem.correct_answer];
            const shuffledArr = orderedArr.sort(() => Math.random() - 0.5);
            return {
              answers: shuffledArr,
              correct: elem.correct_answer,
              question: elem.question,
              selected: "",
            };
          })
        );
        setLoading(false);
      });
  }, [isStarted, restart]);
  function selectAnswer(answer, idOfQuestion) {
    setQuestionsArray((prev) =>
      prev.map((e, index) => {
        return index === idOfQuestion ? { ...e, selected: answer } : { ...e };
      })
    );
  }
  function checkAnswers() {
    if (counter === 1) {
      setRestart((prev) => !prev);
      counter = 0;
    } else {
      counter++;
    }
    setIsEnded((prev) => !prev);
  }
  function calculatePoints() {
    let score = 0;
    questionsArray.forEach((element) => {
      if (element.correct === element.selected) {
        score++;
      }
    });
    return `You scored ${score}/${questionsArray.length} correct answers`;
  }
  return (
    <div className="container">
      <div className="svgs">
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className="blob-1"
        >
          <path
            fill="#FFFAD1"
            d="M52.5,-16.1C61.8,11.5,58.7,44,38.8,60.1C18.9,76.1,-17.9,75.6,-41.6,58.2C-65.4,40.7,-76.2,6.2,-67.1,-21.2C-58,-48.5,-29,-68.8,-3.7,-67.6C21.6,-66.4,43.2,-43.7,52.5,-16.1Z"
            transform="translate(100 100)"
          />
        </svg>
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className="blob-2"
        >
          <path
            fill="#DEEBF8"
            d="M55.8,5.9C55.8,29.5,27.9,59,1.7,59C-24.4,59,-48.8,29.5,-48.8,5.9C-48.8,-17.8,-24.4,-35.6,1.7,-35.6C27.9,-35.6,55.8,-17.8,55.8,5.9Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>
      {loading ? (
        <RingLoader color="#293264" size={`10rem`} />
      ) : isStarted ? (
        <div className="question-container">
          {questionsArray.map((question, index) => {
            return (
              <Question
                question={question}
                key={question.question}
                answer={(val) => selectAnswer(val, index)}
                checkScores={isEnded}
              />
            );
          })}
          <section className="summary">
            {isEnded && <div className="score">{calculatePoints()}</div>}
            <button className="check-answers" onClick={() => checkAnswers()}>
              {!isEnded ? "Check answers" : "Play again"}
            </button>
          </section>
        </div>
      ) : (
        <Start startingGame={() => changingStartState()} settings={()=>handleSettings}/>
      )}
    </div>
  );
};

export default App;
