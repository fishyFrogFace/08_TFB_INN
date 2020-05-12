import React, { useState } from 'react';
import '../App.css';
import './Question.css';
import Button from '../components/Button';
import { QuestionResult } from '../Types';
import { makeOtherResult } from 'helpers/makeResult';

interface Props {
  subjectColor: string;
  text: string;
  placeholder: string;
  resultTitle: string;
  updateResult: (result: QuestionResult) => void;
}

const BigText: React.FC<Props> = props => {
  const [input, setInput] = useState('');

  return (
    <div className='content'>
      <div className={`question-text-container ${props.subjectColor}`}>
        <h1 className='h2 white normal-font'>{props.text}</h1>
      </div>
      <div className='input-container white-background'>
        <form
          className='text-and-btn'
          onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
            e.preventDefault()
          }>
          <textarea
            id='name'
            className='big-text'
            placeholder={props.placeholder}
            onChange={e => setInput(e.currentTarget.value)}
          />
        </form>
      </div>
      <Button
        classNames='next-button regular-btn'
        onClick={() => props.updateResult(makeOtherResult(props, [input]))}>
        Neste
      </Button>
    </div>
  );
};

export default BigText;
