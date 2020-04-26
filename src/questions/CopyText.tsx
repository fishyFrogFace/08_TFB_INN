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

const CopyText: React.FC<Props> = props => {
  // set a randomly generated name that will be kept if user doesn't type anything
  const [input, setInput] = useState('');
  const [points, setPoints] = useState(props.maxPoints);
  const [color, setColor] = useState('black');
  const [clickedWhileCorrect, setClickedWhileCorrect] = useState(false);

  const resetLocalState = () => {
    setInput('');
    setPoints(props.maxPoints);
    setColor('black');
    setClickedWhileCorrect(false);
  };

  const checkInput = (value: string) => {
    if (clickedWhileCorrect) {
      resetLocalState();
      props.updateResult({
        type: QuestionResultType.Mastery,
        maxPoints: props.maxPoints,
        resultTitle: props.resultTitle,
        pointsAchieved: points,
        mastered: true,
        answerValues: [props.text]
      });
    } else {
      if (value === props.text) {
        setColor('green');
        setClickedWhileCorrect(true);
      } else {
        const newPoints = points > 0 ? points - 1 : 0;
        setPoints(newPoints);
        setColor('red');
      }
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
        className='text-and-btn'
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}>
        <input
          id='name'
          className={`input-field ${color}`}
          type='text'
          onChange={e => storeInput(e)}
          placeholder={props.text}
        />
        <Button classNames='next' onClick={() => checkInput(input)}>
          {clickedWhileCorrect ? 'Neste' : 'Svar'}
        </Button>
      </form>
    </div>
  );
};

export default CopyText;
