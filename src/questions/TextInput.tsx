import React, { useState } from 'react';
import '../App.css';
import './Question.css';
import Button from '../components/Button';
import { QuestionResult, QuestionResultType } from '../Types';

interface Props {
  maxPoints: number;
  text: string;
  resultTitle: string;
  updateResult: (result: QuestionResult) => void;
}

const TextInput: React.FC<Props> = props => {
  // set a randomly generated name that will be kept if user doesn't type anything
  const [points, setPoints] = useState(props.maxPoints);
  const [color, setColor] = useState('black');
  const [input, setInput] = useState('');

  const storeInput = (e: React.FormEvent<HTMLInputElement>) => {
    setColor('black');
    setInput(e.currentTarget.value);
  };

  return (
    <div>
      <h1 className='h1'>{props.text}</h1>
      <form
        className='textAndBtn'
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}>
        <input
          id='name'
          className={`inputField ${color}`}
          type='text'
          onChange={e => storeInput(e)}
          placeholder={props.text}
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
              pointsAchieved: points
            })
          }>
          Neste
        </Button>
      </form>
    </div>
  );
};

export default TextInput;
