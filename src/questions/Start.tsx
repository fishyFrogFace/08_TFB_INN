import React from 'react';
import '../App.css';
import Button from '../components/Button';
import { QuestionResult } from '../Types';

interface Props {
  subjectColor: string;
  resultTitle: string;
  updateResult: (qResult: QuestionResult) => void;
}

// maybe add a timer to this one to measure how long it takes the user to click

const Start: React.FC<Props> = props => {
  return (
    <div className='content'>
      <h1 className={`h1 ${props.subjectColor}`}>Trykk på knappen</h1>
      <div className='transparent'>
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
      </div>
    </div>
  );
};

export default Start;
