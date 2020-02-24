import React, { useState } from 'react';
import '../App.css';
import './Question.css';
import Button from '../components/Button';
import { QuestionResult } from '../App'

interface Props {
  maxPoints: number;
  text: string;
  measures: string;
  getResult: (result: QuestionResult) => void;
}

const CopyText: React.FC<Props> = props => {
  // set a randomly generated name that will be kept if user doesn't type anything
  const [input, setInput] = useState('');
  const [points, setPoints] = useState(props.maxPoints);
  const [color, setColor] = useState('black');

  const checkInput = (value: string) => {
    if (value === props.text) {
      setColor('green');
      props.getResult({
        maxPoints: props.maxPoints,
        measures: props.measures,
        pointsAchieved: points
      });
    } else {
      const newPoints = points > 0 ? points - 1 : 0;
      setPoints(newPoints);
      setColor('red');
    }
  };

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
          onKeyUp={e => storeInput(e)}
          placeholder={props.text}
        />
        <Button classNames='paused' onClick={() => checkInput(input)}>
          Neste
        </Button>
      </form>
    </div>
  );
};

export default CopyText;
