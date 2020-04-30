import React from 'react';
import '../App.css';
import Button from '../components/Button';
import { QuestionResult, QuestionResultType } from '../Types';

interface Props {
  subjectColor: string;
  resultTitle: string;
  maxPoints: number;
  updateResult: (qResult: QuestionResult) => void;
}

// maybe add a timer to this one to measure how long it takes the user to click

const Start: React.FC<Props> = props => {
  return (
    <div className='content'>
      <h1 className={`h1 ${props.subjectColor}`}>Trykk på knappen</h1>
      <div className='textinputContainer transparent'>
        <div className='nextButtonContainer'>
          <Button
            classNames='start'
            onClick={() =>
              props.updateResult({
                type: QuestionResultType.Mastery,
                resultTitle: props.resultTitle,
                maxPoints: props.maxPoints,
                pointsAchieved: props.maxPoints,
                mastered: true,
                answerValues: []
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
