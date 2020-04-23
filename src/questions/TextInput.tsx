import React, { useState } from 'react';
import '../App.css';
import './Question.css';
import Button from '../components/Button';
import { QuestionResult, QuestionResultType } from '../Types';

interface Props {
  maxPoints: number;
  text: string;
  placeholder: string;
  resultTitle: string;
  updateResult: (result: QuestionResult) => void;
  processString: (input: string, maxPoints: number) => number;
}

const TextInput: React.FC<Props> = props => {
  const [input, setInput] = useState('');

  return (
    <div>
      <h1 className='h1'>{props.text}</h1>
      <form
        className='textAndBtn'
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}>
        <input
          id='name'
          className={'inputField'}
          type='text'
          onChange={e => setInput(e.currentTarget.value)}
          placeholder={props.placeholder}
        />
        <Button
          classNames='next'
          onClick={() =>
            props.updateResult({
              mastered: true,
              type: QuestionResultType.Mastery,
              answerValues: [],
              maxPoints: props.maxPoints,
              resultTitle: props.resultTitle,
              pointsAchieved: props.processString(input, props.maxPoints)
            })
          }>
          Neste
        </Button>
      </form>
    </div>
  );
};

export default TextInput;
