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

  const failQuestion = () => {
    setInput('');
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

  const returnResult = () => {
    setInput('');
    props.updateResult({
      mastered: true,
      type: QuestionResultType.Mastery,
      answerValues: [input],
      maxPoints: props.maxPoints,
      resultTitle: props.resultTitle,
      questionTitle: props.text,
      pointsAchieved: props.processString(input, props.maxPoints)
    });
  };

  return (
    <div className='content'>
      <div className={`questiontextContainer ${props.subjectColor}`}>
        <h1 className='h2 white normal-font'>{props.text}</h1>
      </div>
      <div className='inputContainer whiteBackground'>
        <form
          className='text-and-btn'
          onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
            e.preventDefault()
          }>
          <input
            id='name'
            className={'inputField'}
            type='text'
            onChange={e => setInput(e.currentTarget.value)}
            placeholder={props.placeholder}
          />
        </form>
      </div>
      <div className='nextButtonContainer '>
        <FlowButtons skip={failQuestion} update={returnResult} />
      </div>
    </div>
  );
};

export default TextInput;
