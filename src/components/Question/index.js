import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const Question = (props) => {
    const connectedArr = [props.question.correct_answer, ...props.question.incorrect_answers];
    const shuffledArr = connectedArr.sort(() =>Math.random() - 0.5);
    return(
        <div className='question-wrapper'>
            <p className='question-title'>{decodeURIComponent(props.question.question)}</p>
            <section className='question-answers'>
                {shuffledArr.map((answer)=>{
                    return(
                        <button className='question-single-answer' key={answer}>
                            {decodeURI(answer)}
                        </button>
                    )
                })}
            </section>
            <br className='question-line'></br>
        </div>
    )
}
Question.propTypes = {
    question: PropTypes.any
 }
export default Question;