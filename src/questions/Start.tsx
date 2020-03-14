import React from 'react';
import '../App.css';
import Button from '../components/Button';
import { QuestionResult, QuestionContent } from '../Types';

interface Props {
  resultTitle: string;
  maxPoints: number;
  getResult: (qResult: QuestionResult) => void;
}

// maybe add a timer to this one to measure how long it takes the user to click

const Start: React.FC<Props> = props => {
  return (
    <Button
      classNames='start'
      onClick={() =>
        props.getResult({
          resultTitle: props.resultTitle,
          maxPoints: props.maxPoints,
          pointsAchieved: props.maxPoints
        })
      }>
      Start
    </Button>
  );
};

export default Start;
