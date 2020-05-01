import React, { useState } from 'react';
import './Question.css';
import { QuestionResult, QuestionResultType } from '../Types';
import FlowButtons from 'components/FlowButtons';

interface Props {
  maxPoints: number;
  text: string;
  resultTitle: string;
  updateResult: (result: QuestionResult) => void;
  skipQuestion: () => void;
}

const CopyText: React.FC<Props> = props => {
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

  const checkInput = () => {
    if (clickedWhileCorrect) {
      resetLocalState();
      props.updateResult({
        type: QuestionResultType.Mastery,
        maxPoints: props.maxPoints,
        resultTitle: props.resultTitle,
        questionTitle: props.text,
        pointsAchieved: points,
        mastered: true,
        answerValues: [props.text]
      });
    } else {
      if (input === props.text) {
        setColor('green');
        setClickedWhileCorrect(true);
      } else {
        const newPoints = points > 0 ? points - 1 : 0;
        setPoints(newPoints);
        setColor('red');
      }
    }
  };

  const failQuestion = () => {
    resetLocalState();
    props.updateResult({
      type: QuestionResultType.Mastery,
      maxPoints: props.maxPoints,
      resultTitle: props.resultTitle,
      questionTitle: props.text,
      pointsAchieved: 0,
      mastered: false,
      answerValues: ['Jeg får ikke dette til']
    });
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
        <FlowButtons skip={failQuestion} update={checkInput} />
      </form>
    </div>
  );
};

export default CopyText;
