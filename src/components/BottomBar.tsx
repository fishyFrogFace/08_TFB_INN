import React from 'react';
import './Bar.css';
import { SubjectResult, QuestionDefinition } from 'Types';

interface Props {
  questions: QuestionDefinition[];
  currentQuestion: number;
  subjectResult: SubjectResult;
}

const BottomBar: React.FC<Props> = props => {
  return (
    <div className='bottom-bar'>
      {props.questions.map((question, i) => {
        const dotColor =
          i === props.currentQuestion ? 'teal-background' : 'white-background';
        return [
          <div key={i} className={`bottom-bar-dot ${dotColor}`}></div>,
          <div key={i} className='bottom-bar-line'></div>
        ];
      })}
    </div>
  );
};

export default BottomBar;
