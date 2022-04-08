import React from "react";
import PropTypes from "prop-types";
import "./index.css";

const Start = ({ startingGame }) => {
  return (
    <>
      <p className="title">Quizzical</p>
      <p className="description">Test your knowledge!</p>
      <button onClick={startingGame} className="start-btn">
        Start quiz
      </button>
    </>
  );
};
Start.propTypes = {
  startingGame: PropTypes.func,
};

export default Start;
