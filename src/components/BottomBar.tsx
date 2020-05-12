import React from 'react';
import './Bar.css';

interface Props {
  questions: string[];
  currentQuestion: number;
}

const BottomBar: React.FC<Props> = props => {
  return (
    <div className='bottom-bar'>
      {props.questions.map((question, i) => {
        const dotColor = () => {
          if (i === props.currentQuestion) {
            return 'teal-background';
          } else if (i < props.currentQuestion) {
            return 'black-background';
          } else {
            return 'white-background';
          }
        };
        return [
          <div key={i} className={`bottom-bar-dot ${dotColor()}`}></div>,
          <div
            key={i + props.questions.length}
            className='bottom-bar-line'></div>
        ];
      })}
    </div>
  );
};

export default BottomBar;
