import React, { useState } from 'react';
import '../App.css';
import './Question.css';
import Button from '../components/Button';
import { QuestionResult, QuestionResultType } from '../Types';

interface Props {
  text: string;
  resultTitle: string;
  updateResult: (result: QuestionResult) => void;
}

const BigText: React.FC<Props> = props => {
  const [input, setInput] = useState('');

  return (
    <div>
      <h1 className='h1'>{props.text}</h1>
      <form
        className='text-and-btn'
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}>
        <input
          id='name'
          className='big-text'
          type='text'
          onChange={e => setInput(e.currentTarget.value)}
        />
        <Button
          classNames='next'
          onClick={() =>
            props.updateResult({
              mastered: false,
              type: QuestionResultType.Other,
              answerValues: [input],
              maxPoints: 0,
              resultTitle: props.resultTitle,
              pointsAchieved: 0
            })
          }>
          Neste
        </Button>
      </form>
    </div>
  );
};

export default BigText;
