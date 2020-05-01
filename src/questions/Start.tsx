import React from 'react';
import '../App.css';
import Button from '../components/Button';
import { QuestionResult, QuestionResultType } from '../Types';

interface Props {
  resultTitle: string;
  maxPoints: number;
  updateResult: (qResult: QuestionResult) => void;
}

// maybe add a timer to this one to measure how long it takes the user to click

const Start: React.FC<Props> = props => {
  return (
    <Button
      classNames='start'
      onClick={() =>
        props.updateResult({
          type: QuestionResultType.Mastery,
          resultTitle: props.resultTitle,
          questionTitle: 'Klikk startknappen',
          maxPoints: props.maxPoints,
          pointsAchieved: props.maxPoints,
          mastered: true,
          answerValues: ['Klikket på knappen']
        })
      }>
      Start
    </Button>
  );
};

export default Start;
