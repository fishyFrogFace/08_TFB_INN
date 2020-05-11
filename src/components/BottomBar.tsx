import React from 'react';
import './Bar.css';
import { SubjectResult } from 'Types';

interface Props {
  amountOfQuestions: number;
  subjectResult: SubjectResult;
}

const BottomBar: React.FC<Props> = props => {
  console.log(props.subjectResult);
  return (
    <div className='bottom-bar'>
      {Array.from(Array(props.amountOfQuestions).keys()).map(i => {
        return [
          <div key={i} className='bottom-bar-dot'></div>,
          <div key={i} className='bottom-bar-line'></div>
        ];
      })}
    </div>
  );
};

export default BottomBar;
