import React from 'react';
import '../App.css';
import Button from '../components/Button';
import { QuestionResult } from '../Types';

interface Props {
  resultTitle: string;
  maxPoints: number;
  updateResult: (qResult: QuestionResult) => void;
}

// maybe add a timer to this one to measure how long it takes the user to click

const Start: React.FC<Props> = props => {
  return (
    <div className="content">
      <div className="inputContainer transparent">
        <div className="nextButtonContainer">
          <Button
            classNames='start next'
            onClick={() =>
              props.updateResult({
                resultTitle: props.resultTitle,
                maxPoints: props.maxPoints,
                pointsAchieved: props.maxPoints
              })
            }>
            Start
          </Button>
          </div>
      </div>
    </div>
  );
};

export default Start;
