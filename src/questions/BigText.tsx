import React, { useState } from 'react';
import '../App.css';
import './Question.css';
import Button from '../components/Button';
import { QuestionResult } from '../Types';
import { makeOtherResult } from 'helpers/makeResult';

interface Props {
  text: string;
  placeholder: string;
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
        <textarea
          id='name'
          className='big-text'
          placeholder={props.placeholder}
          onChange={e => setInput(e.currentTarget.value)}
        />
        <Button
          classNames='next'
          onClick={() => props.updateResult(makeOtherResult(props, [input]))}>
          Neste
        </Button>
      </form>
    </div>
  );
};

export default BigText;
