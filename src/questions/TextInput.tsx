import React, { useState } from 'react';
import './Question.css';
import { QuestionResult } from '../Types';
import FlowButtons from 'components/FlowButtons';
import { makePointResult, failPointResult } from 'helpers/makeResult';

interface Props {
  subjectColor: string;
  maxPoints: number;
  text: string;
  placeholder: string;
  resultTitle: string;
  updateResult: (result: QuestionResult) => void;
  skipQuestion: () => void;
  processString: (input: string, maxPoints: number) => number;
}

const TextInput: React.FC<Props> = props => {
  const [input, setInput] = useState('');

  const failQuestion = () => {
    setInput('');
    props.updateResult(failPointResult(props));
  };

  const returnResult = () => {
    setInput('');
    props.updateResult(
      makePointResult(
        props,
        [input],
        props.processString(input, props.maxPoints)
      )
    );
  };

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
          <input
            id='name'
            className={'input-field'}
            type='text'
            onChange={e => setInput(e.currentTarget.value)}
            placeholder={props.placeholder}
          />
        </form>
      </div>
      <FlowButtons skip={failQuestion} update={returnResult} />
    </div>
  );
};

export default TextInput;
