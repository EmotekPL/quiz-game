import React from "react";
import PropTypes from "prop-types";
import "./index.css";

const Question = (props) => {
  function pickingStyle(selected, answer, correct, shouldDisplay) {
    let styling = { background: "#FFFFFF" };
    if (selected === answer) {
      if (shouldDisplay) {
        styling = { background: "#D6DBF5", opacity: "0.5", border: "none" };
      } else {
        styling = { background: "#D6DBF5", border: "none" };
      }
    }
    if (answer === correct && shouldDisplay && selected !== "") {
      styling = { background: "#94D7A2", border: "none" };
    }
    if (selected === answer && selected !== correct && shouldDisplay) {
      styling = { background: "#F8BCBC", opacity: "0.5", border: "none" };
    }
    if (selected === "" && shouldDisplay) {
      styling = { ...styling, border: "1px solid #FF0000" };
    }
    if (shouldDisplay) {
      styling = { ...styling, cursor: "not-allowed" };
    }
    return styling;
  }
  return (
    <div className="question-wrapper">
      <p className="question-title">
        {decodeURIComponent(props.question.question)}
      </p>
      <section className="question-answers">
        {props.question.answers.map((answer, id) => {
          return (
            <button
              className="question-single-answer"
              key={answer}
              onClick={
                !props.checkScores ? () => props.answer(answer, id) : undefined
              }
              style={pickingStyle(
                props.question.selected,
                answer,
                props.question.correct,
                props.checkScores
              )}
            >
              {decodeURIComponent(answer)}
            </button>
          );
        })}
      </section>
      <hr className="question-line" />
    </div>
  );
};
Question.propTypes = {
  question: PropTypes.any,
  id: PropTypes.number,
  answer: PropTypes.func,
  checkScores: PropTypes.bool,
};
export default Question;
