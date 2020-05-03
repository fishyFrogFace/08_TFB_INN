import React, { useState } from 'react';
import './Question.css';
import Button from '../components/Button';
import { QuestionResult } from '../Types';
import FlowButtons from 'components/FlowButtons';
import { makeOtherResult, imageAnswer } from 'helpers/makeResult';

interface Props {
  text: string;
  resultTitle: string;
  illustration?: string;
  isImage: boolean;
  answerValues: string[];
  updateResult: (result: QuestionResult) => void;
  skipQuestion: () => void;
}

const ChooseOne: React.FC<Props> = props => {
  const [selectedButton, setSelectedButton] = useState<number>();

  const returnResult = (result: number | undefined) => {
    setSelectedButton(undefined);
    if (result === undefined) {
      props.updateResult(makeOtherResult(props, ['Jeg får ikke dette til']));
    } else {
      props.updateResult(
        makeOtherResult(
          props,
          props.isImage
            ? [imageAnswer(props.answerValues[result])]
            : [props.answerValues[result]]
        )
      );
    }
  };

  return (
    <div>
      {props.illustration === undefined ? (
        <h1 className='h1'>{props.text}</h1>
      ) : (
        <div>
          <h1 className='h1'>{props.text}</h1>
          <img src={props.illustration} alt={'Illustration'} />
        </div>
      )}
      <div className='multiple-button-container'>
        {props.answerValues.map((item, i) => (
          <Button
            key={i}
            classNames={`answer-btn ${selectedButton === i ? 'selected' : ''}`}
            onClick={() => setSelectedButton(i)}>
            {props.isImage ? <img src={item} alt={`Button ${i}`} /> : item}
          </Button>
        ))}
      </div>
      <FlowButtons
        skip={() => {
          returnResult(undefined);
        }}
        update={() => {
          if (selectedButton !== undefined) returnResult(selectedButton);
        }}
      />
    </div>
  );
};

export default ChooseOne;
