import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const Question = (props) => {
    return(
        <div className='question-wrapper'>
            <p className='question-title'>{decodeURIComponent(props.question.question)}</p>
            <section className='question-answers'>
                {props.question.answers.map((answer, id)=>{
                    return(
                        <button className='question-single-answer' key={answer} onClick={()=>props.answer(answer, id)}>
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
    question: PropTypes.any,
    id: PropTypes.number,
    answer: PropTypes.func
 }
export default Question;