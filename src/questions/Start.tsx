import React from 'react';
import '../App.css';
import Button from '../components/Button';
import { QuestionResult } from '../Types';

interface Props {
  resultTitle: string;
  updateResult: (qResult: QuestionResult) => void;
}

// maybe add a timer to this one to measure how long it takes the user to click

const Start: React.FC<Props> = props => {
  return (
    <Button
      classNames='start'
      onClick={() =>
        props.updateResult({
          common: {
            resultTitle: props.resultTitle,
            questionTitle: 'Klikk startknappen',
            answerValues: ['Klikket på knappen']
          },
          mastered: true,
          type: 'mastery'
        })
      }>
      Start
    </Button>
  );
};

export default Start;
