import React, { useState } from 'react';
import '../App.css';
import './Question.css';
import Button from '../components/Button';
import { QuestionResult } from '../Types';

interface Props {
  maxPoints: number;
  text: string;
  resultTitle: string;
  updateResult: (result: QuestionResult) => void;
}

const CopyText: React.FC<Props> = props => {
  // set a randomly generated name that will be kept if user doesn't type anything
  const [input, setInput] = useState('');
  const [points, setPoints] = useState(props.maxPoints);
  const [color, setColor] = useState('black');

  const checkInput = (value: string) => {
    if (value === props.text) {
      setColor('green');
      props.updateResult({
        maxPoints: props.maxPoints,
        resultTitle: props.resultTitle,
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
    <div className='content'>
      <div className="questiontextContainer subjectColor">
        <h1 className='h2 white normal-font'>{props.text}</h1>
      </div>
      <div className="inputContainer whiteBackground">
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
          </form>

        </div>
        <div className='nextButtonContainer'>
          <Button classNames='next' onClick={() => checkInput(input)}>
            Neste
          </Button>
        </div>
      
    </div>
  );
};

export default CopyText;
