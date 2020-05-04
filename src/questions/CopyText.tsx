import React, { useState } from 'react';
import './Question.css';
import { QuestionResult } from '../Types';
import FlowButtons from 'components/FlowButtons';
import { makePointResult, failPointResult } from 'helpers/makeResult';

interface Props {
  subjectColor: string;
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
    //setSubjectColor(props.subjectColor);
    setColor('black');
    setClickedWhileCorrect(false);
  };

  const checkInput = () => {
    if (clickedWhileCorrect) {
      resetLocalState();
      props.updateResult(makePointResult(props, [props.text], points));
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
    props.updateResult(failPointResult(props));
  };

  const storeInput = (e: React.FormEvent<HTMLInputElement>) => {
    setColor('black');
    setInput(e.currentTarget.value);
  };

  return (
    <div className='content'>
      <div className={`questiontextContainer ${props.subjectColor}`}>
        <h1 className={`h2 white normal-font`}>{props.text}</h1>
      </div>
      <div className='textinputContainer whiteBackground'>
        <form
          className='textAndBtn'
          onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
            e.preventDefault()
          }>
          <input
            id='name'
            className={`inputField ${color}`}
            type='text'
            onChange={e => storeInput(e)}
            placeholder={props.text}
          />
        </form>
      </div>
      <div className='nextButtonContainer '>
        <FlowButtons skip={failQuestion} update={checkInput} />
      </div>
    </div>
  );
};

export default CopyText;
