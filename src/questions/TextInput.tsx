import React, { useState } from 'react';
import './Question.css';
import { QuestionResult, QuestionResultType } from '../Types';
import FlowButtons from 'components/FlowButtons';

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

  return (
    <div>
      <h1 className='h1'>{props.text}</h1>
      <form
        className='text-and-btn'
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}>
        <input
          id='name'
          className={'input-field'}
          type='text'
          onChange={e => setInput(e.currentTarget.value)}
          placeholder={props.placeholder}
        />
        <FlowButtons
          skip={() => {
            setInput('');
            props.skipQuestion();
          }}
          update={() => {
            setInput('');
            props.updateResult({
              mastered: true,
              type: QuestionResultType.Mastery,
              answerValues: [],
              maxPoints: props.maxPoints,
              resultTitle: props.resultTitle,
              pointsAchieved: props.processString(input, props.maxPoints)
            });
          }}
        />
      </form>
    </div>
  );
};

export default TextInput;
